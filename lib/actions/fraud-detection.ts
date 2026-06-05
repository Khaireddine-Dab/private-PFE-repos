'use server';

import { createClient } from "@/lib/supabase/server";

// ═══════════════════════════════════════════════════════════════════════════════
// 🔐 FRAUD DETECTION SYSTEM - BASED ON FRAUD_DETECTION_ARCHITECTURE.md
// ═══════════════════════════════════════════════════════════════════════════════
// 
// Architecture: 4-Layer Multi-Signal Fraud Detection
// Layer 1: Collect 7 Heuristic Signals
// Layer 2: Calculate Heuristic Score (0-100)
// Layer 3: AI Analysis (OpenRouter)
// Layer 4: Final Classification & Action
//
// ═══════════════════════════════════════════════════════════════════════════════

// ─── TYPES ─────────────────────────────────────────────────────────────────────

export interface FraudSignal {
  type: string;
  severity: "low" | "medium" | "high";
  description: string;
  weight: number; // contribution to score 0-100
}

export interface FraudAnalysis {
  score: number; // 0-100
  level: "safe" | "suspicious" | "high_risk" | "blocked";
  signals: FraudSignal[];
  recommendation: "approve" | "review" | "reject";
  ai_reasoning: string;
  checked_at: string;
}

export interface FraudContext {
  customer_id: string;
  store_id: number;
  item_id: number;
  quantity?: number;
  total: number;
  delivery_address?: string;
  customer_ip?: string;
  entity_type: 'ORDER' | 'BOOKING';
}

// ─── SCORE THRESHOLDS (From Architecture) ──────────────────────────────────────

const SCORE_THRESHOLDS = {
  safe: 25,           // Score < 25
  suspicious: 55,     // Score 25-54
  high_risk: 75,      // Score 55-74
  // Score >= 75 = blocked
};

// ═══════════════════════════════════════════════════════════════════════════════
// LAYER 1: COLLECT 7 HEURISTIC SIGNALS
// ═══════════════════════════════════════════════════════════════════════════════

async function collectHeuristicSignals(
  ctx: FraudContext
): Promise<FraudSignal[]> {
  const supabase = createClient();
  const signals: FraudSignal[] = [];
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000).toISOString();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();

  const isOrder = ctx.entity_type === 'ORDER';
  const table = isOrder ? 'orders' : 'bookings';

  // ───────────────────────────────────────────────────────────────────────────
  // SIGNAL 1️⃣: NEW ACCOUNT (Lines 60-82 of ARCHITECTURE)
  // ───────────────────────────────────────────────────────────────────────────
  // Account < 1h → HIGH (30 pts)
  // Account < 24h → MEDIUM (15 pts)

  try {
    const { data: profile } = await supabase
      .from("users")
      .select("created_at, phone, email")
      .eq("id", ctx.customer_id)
      .single();

    if (profile) {
      const createdAt = profile.created_at ? new Date(profile.created_at) : now;
      const accountAge = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60); // heures

      if (accountAge < 1) {
        signals.push({
          type: "new_account_under_1h",
          severity: "high",
          description: "Compte créé il y a moins d'1 heure",
          weight: 30, // From ARCHITECTURE
        });
      } else if (accountAge < 24) {
        signals.push({
          type: "new_account_under_24h",
          severity: "medium",
          description: `Compte créé il y a ${Math.round(accountAge)}h`,
          weight: 15, // From ARCHITECTURE
        });
      }

      if (!profile.phone) {
        signals.push({
          type: "no_phone",
          severity: "low",
          description: "Aucun numéro de téléphone vérifié",
          weight: 0, // Signal info only
        });
      }
    }
  } catch (error) {
    console.error("Signal 1 error:", error);
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SIGNAL 2️⃣: BURST VELOCITY (Lines 85-119 of ARCHITECTURE)
  // ───────────────────────────────────────────────────────────────────────────
  // ORDERS: 5+ in 1h → HIGH (35 pts) | 3+ → MEDIUM (20 pts)
  // BOOKINGS: 3+ in 1h → HIGH (35 pts) | 2+ → MEDIUM (20 pts)

  try {
    const { count: activitiesLastHour } = await (supabase
      .from(table) as any)
      .select("*", { count: "exact", head: true })
      .eq("customer_id", ctx.customer_id)
      .gte("created_at", oneHourAgo);

    const burstThresholdHigh = isOrder ? 5 : 3;
    const burstThresholdMed = isOrder ? 3 : 2;

    if ((activitiesLastHour ?? 0) >= burstThresholdHigh) {
      signals.push({
        type: `${ctx.entity_type.toLowerCase()}_burst_velocity_high`,
        severity: "high",
        description: `${activitiesLastHour} ${isOrder ? 'commandes' : 'réservations'} en 1 heure`,
        weight: 35, // From ARCHITECTURE
      });
    } else if ((activitiesLastHour ?? 0) >= burstThresholdMed) {
      signals.push({
        type: `${ctx.entity_type.toLowerCase()}_burst_velocity_medium`,
        severity: "medium",
        description: `${activitiesLastHour} ${isOrder ? 'commandes' : 'réservations'} en 1 heure`,
        weight: 20, // Adjusted for consistency
      });
    }
  } catch (error) {
    console.error("Signal 2 error:", error);
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SIGNAL 3️⃣: HIGH CANCELLATION RATE (Lines 122-133 of ARCHITECTURE)
  // ───────────────────────────────────────────────────────────────────────────
  // 3+ cancelled/rejected in 24h → MEDIUM (20 pts)

  try {
    const { count: cancelledActivities } = await (supabase
      .from(table) as any)
      .select("*", { count: "exact", head: true })
      .eq("customer_id", ctx.customer_id)
      .in("status", ["CANCELLED", "REJECTED"])
      .gte("created_at", oneDayAgo);

    if ((cancelledActivities ?? 0) >= 3) {
      signals.push({
        type: "high_cancellation_rate",
        severity: "medium",
        description: `${cancelledActivities} ${isOrder ? 'commandes' : 'réservations'} annulées/rejetées en 24h`,
        weight: 20, // From ARCHITECTURE
      });
    }
  } catch (error) {
    console.error("Signal 3 error:", error);
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SIGNAL 4️⃣: ABNORMAL AMOUNT (Lines 136-178 of ARCHITECTURE)
  // ───────────────────────────────────────────────────────────────────────────
  // Amount > 4x average → HIGH (25 pts)
  // Amount > 2.5x average → LOW (10 pts)

  try {
    const priceColumn = isOrder ? "total_price" : "price";
    const { data: avgActivity } = await (supabase
      .from(table) as any)
      .select(priceColumn)
      .eq("store_id", ctx.store_id)
      .eq("status", "COMPLETED")
      .limit(50);

    let avg = 500; // Fallback baseline
    if (avgActivity && avgActivity.length > 5) {
      avg = avgActivity.reduce((sum: number, o: any) => sum + (o[priceColumn] ?? 0), 0) / avgActivity.length;
    }

    if (ctx.total > avg * 4) {
      signals.push({
        type: "abnormal_amount_high",
        severity: "high",
        description: `Montant ${ctx.total} TND — ${Math.round(ctx.total / avg)}x la moyenne (${Math.round(avg)} TND)`,
        weight: 25, // From ARCHITECTURE
      });
    } else if (ctx.total > avg * 2.5) {
      signals.push({
        type: "abnormal_amount_medium",
        severity: "medium",
        description: `Montant ${ctx.total} TND — ${(ctx.total / avg).toFixed(1)}x la moyenne`,
        weight: 10, // From ARCHITECTURE
      });
    }
  } catch (error) {
    console.error("Signal 4 error:", error);
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SIGNAL 5️⃣: BULK QUANTITY (Lines 181-188 of ARCHITECTURE)
  // ───────────────────────────────────────────────────────────────────────────
  // Quantity > 20 → MEDIUM (15 pts) - ORDERS ONLY

  if (isOrder && ctx.quantity && ctx.quantity > 20) {
    signals.push({
      type: "bulk_quantity",
      severity: "medium",
      description: `Quantité inhabituelle: ${ctx.quantity} unités`,
      weight: 15, // From ARCHITECTURE
    });
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SIGNAL 6️⃣: INVALID DELIVERY ADDRESS (Lines 191-198 of ARCHITECTURE)
  // ───────────────────────────────────────────────────────────────────────────
  // Address empty or < 10 chars → MEDIUM (15 pts) - ORDERS ONLY

  if (isOrder && (!ctx.delivery_address || ctx.delivery_address.trim().length < 10)) {
    signals.push({
      type: "invalid_address",
      severity: "medium",
      description: "Adresse de livraison incomplète ou invalide",
      weight: 15, // From ARCHITECTURE
    });
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SIGNAL 7️⃣: SAME BUSINESS SPAM (Lines 201-216 of ARCHITECTURE)
  // ───────────────────────────────────────────────────────────────────────────
  // 3+ PENDING activities to same merchant in 1h → HIGH (30 pts)

  try {
    const { count: sameBusinessActivities } = await (supabase
      .from(table) as any)
      .select("*", { count: "exact", head: true })
      .eq("customer_id", ctx.customer_id)
      .eq("store_id", ctx.store_id)
      .eq("status", "PENDING")
      .gte("created_at", oneHourAgo);

    if ((sameBusinessActivities ?? 0) >= 3) {
      signals.push({
        type: "same_business_spam",
        severity: "high",
        description: `${sameBusinessActivities} ${isOrder ? 'commandes' : 'réservations'} PENDING chez le même merchant en 1h`,
        weight: 30, // From ARCHITECTURE
      });
    }
  } catch (error) {
    console.error("Signal 7 error:", error);
  }

  return signals;
}

// ═══════════════════════════════════════════════════════════════════════════════
// LAYER 2: COMPUTE HEURISTIC SCORE
// ═══════════════════════════════════════════════════════════════════════════════
// Lines 217-221 of ARCHITECTURE

function computeHeuristicScore(signals: FraudSignal[]): number {
  const rawScore = signals.reduce((sum, s) => sum + s.weight, 0);
  return Math.min(100, rawScore); // Cap at 100
}

// ═══════════════════════════════════════════════════════════════════════════════
// LAYER 3: AI ANALYSIS (OpenRouter)
// ═══════════════════════════════════════════════════════════════════════════════
// Lines 223-303 of ARCHITECTURE

async function analyzeWithAI(
  ctx: FraudContext,
  signals: FraudSignal[],
  heuristicScore: number
): Promise<string> {
  // Only call AI if there are signals or score >= 15
  if (signals.length === 0 && heuristicScore < 15) {
    return "Aucun signal de fraude détecté. Analyse rapide approuvée.";
  }

  const signalDescriptions = signals
    .map(s => `[${s.severity.toUpperCase()}] ${s.type}: ${s.description} (+${s.weight}pts)`)
    .join("\n");

  const prompt = `Tu es un système anti-fraude pour Ro2ya, une marketplace tunisienne.

Analyse cette ${ctx.entity_type === 'ORDER' ? 'COMMANDE' : 'RÉSERVATION'} suspecte et donne un avis court (2-3 phrases max) en français:

CONTEXTE:
- Type: ${ctx.entity_type}
- Montant: ${ctx.total} TND
- Quantité: ${ctx.quantity ?? 'N/A'}
- Score heuristique: ${heuristicScore.toFixed(0)}/100

SIGNAUX DÉTECTÉS:
${signalDescriptions || "Aucun"}

Donne uniquement ton analyse du risque et si le merchant doit approuver, vérifier manuellement ou rejeter. Sois direct et concis.`;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.OPENROUTER_MODEL || "meta-llama/llama-3.2-3b-instruct",
        messages: [
          {
            role: "system",
            content: "Tu es un expert en détection de fraude pour une marketplace e-commerce. Réponds en français, sois concis.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenRouter error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "Analyse IA non disponible";
  } catch (error) {
    console.error("AI analysis error:", error);
    // Fallback reasoning based on score
    if (heuristicScore >= 75) {
      return "Score de risque très élevé. Vérification manuelle fortement recommandée avant validation.";
    }
    if (heuristicScore >= 55) {
      return "Plusieurs signaux suspects détectés. Contacter le client pour vérification.";
    }
    return "Signaux mineurs détectés. Peut être approuvé avec vigilance.";
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// LAYER 4: FINAL CLASSIFICATION
// ═══════════════════════════════════════════════════════════════════════════════
// Lines 305-318 of ARCHITECTURE

function computeLevel(score: number): FraudAnalysis["level"] {
  if (score < SCORE_THRESHOLDS.safe) return "safe";
  if (score < SCORE_THRESHOLDS.suspicious) return "suspicious";
  if (score < SCORE_THRESHOLDS.high_risk) return "high_risk";
  return "blocked";
}

function computeRecommendation(level: FraudAnalysis["level"]): FraudAnalysis["recommendation"] {
  if (level === "safe") return "approve";
  if (level === "suspicious") return "review";
  return "reject";
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN FUNCTION: analyzeFraud
// ═══════════════════════════════════════════════════════════════════════════════
// Lines 323-333 of ARCHITECTURE

export async function analyzeFraud(ctx: FraudContext): Promise<FraudAnalysis> {
  const startTime = performance.now();

  try {
    // Step 1: Collect signals
    const signals = await collectHeuristicSignals(ctx);

    // Step 2: Compute heuristic score
    const score = computeHeuristicScore(signals);

    // Step 3: AI analysis
    const ai_reasoning = await analyzeWithAI(ctx, signals, score);

    // Step 4: Final classification
    const level = computeLevel(score);
    const recommendation = computeRecommendation(level);

    const latency = performance.now() - startTime;

    const analysis: FraudAnalysis = {
      score: parseFloat(score.toFixed(1)),
      level,
      signals,
      recommendation,
      ai_reasoning,
      checked_at: new Date().toISOString(),
    };

    // Log for monitoring
    console.log(
      `[Fraud] ${ctx.customer_id}: score=${score.toFixed(1)} level=${level} latency=${latency.toFixed(1)}ms signals=${signals.length}`
    );

    return analysis;
  } catch (error) {
    console.error("Fraud analysis error:", error);
    return {
      score: 0,
      level: "safe",
      signals: [],
      recommendation: "approve",
      ai_reasoning: "Erreur lors de l'analyse - approuvé par sécurité",
      checked_at: new Date().toISOString(),
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// DATABASE PERSISTENCE
// ═══════════════════════════════════════════════════════════════════════════════
// Lines 337-365 of ARCHITECTURE

export async function saveFraudAnalysis(
  entityId: number,
  analysis: FraudAnalysis,
  type: 'ORDER' | 'BOOKING'
): Promise<void> {
  const supabase = createClient();
  const table = type === 'ORDER' ? 'order_fraud_checks' : 'booking_fraud_checks';
  const fkColumn = type === 'ORDER' ? 'order_id' : 'booking_id';

  try {
    await (supabase.from(table) as any).insert({
      [fkColumn]: entityId,
      score: analysis.score,
      level: analysis.level,
      signals: analysis.signals,
      recommendation: analysis.recommendation,
      ai_reasoning: analysis.ai_reasoning,
      checked_at: analysis.checked_at,
    });

    console.log(`[Saved] ${type} fraud check ${entityId}: level=${analysis.level}`);
  } catch (error) {
    console.error(`Failed to save ${type} fraud check:`, error);
  }
}

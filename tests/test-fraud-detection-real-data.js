#!/usr/bin/env node

/**
 * 🔍 Test Fraud Detection avec Données Réelles Supabase
 * Utilise les vraies commandes et réservations de la base de données
 */

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Variables d'environnement manquantes:");
  console.error("  - NEXT_PUBLIC_SUPABASE_URL");
  console.error("  - SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// ═══════════════════════════════════════════════════════════════════════════════
// SIMULATION LOCALE DE analyzeFraud
// (Le code réel vit dans lib/actions/fraud-detection.ts)
// ═══════════════════════════════════════════════════════════════════════════════

const SCORE_THRESHOLDS = {
  safe: 25,
  suspicious: 55,
  high_risk: 75,
};

async function collectHeuristicSignals(ctx) {
  const signals = [];
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000).toISOString();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();

  const isOrder = ctx.entity_type === "ORDER";
  const table = isOrder ? "orders" : "bookings";

  // SIGNAL 1: NEW ACCOUNT
  try {
    const { data: profile } = await supabase
      .from("users")
      .select("created_at, phone, email")
      .eq("id", ctx.customer_id)
      .single();

    if (profile) {
      const createdAt = profile.created_at ? new Date(profile.created_at) : now;
      const accountAge = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60);

      if (accountAge < 1) {
        signals.push({
          type: "new_account_under_1h",
          severity: "high",
          description: "Compte créé il y a moins d'1 heure",
          weight: 30,
        });
      } else if (accountAge < 24) {
        signals.push({
          type: "new_account_under_24h",
          severity: "medium",
          description: `Compte créé il y a ${Math.round(accountAge)}h`,
          weight: 15,
        });
      }
    }
  } catch (error) {
    console.error("Signal 1 error:", error.message);
  }

  // SIGNAL 2: BURST VELOCITY
  try {
    const { count: activitiesLastHour } = await supabase
      .from(table)
      .select("*", { count: "exact", head: true })
      .eq("customer_id", ctx.customer_id)
      .gte("created_at", oneHourAgo);

    const burstThresholdHigh = isOrder ? 5 : 3;
    const burstThresholdMed = isOrder ? 3 : 2;

    if ((activitiesLastHour ?? 0) >= burstThresholdHigh) {
      signals.push({
        type: `${ctx.entity_type.toLowerCase()}_burst_velocity_high`,
        severity: "high",
        description: `${activitiesLastHour} ${isOrder ? "commandes" : "réservations"} en 1 heure`,
        weight: 35,
      });
    } else if ((activitiesLastHour ?? 0) >= burstThresholdMed) {
      signals.push({
        type: `${ctx.entity_type.toLowerCase()}_burst_velocity_medium`,
        severity: "medium",
        description: `${activitiesLastHour} ${isOrder ? "commandes" : "réservations"} en 1 heure`,
        weight: 20,
      });
    }
  } catch (error) {
    console.error("Signal 2 error:", error.message);
  }

  // SIGNAL 3: HIGH CANCELLATION RATE
  try {
    const { count: cancelledActivities } = await supabase
      .from(table)
      .select("*", { count: "exact", head: true })
      .eq("customer_id", ctx.customer_id)
      .in("status", ["CANCELLED", "REJECTED"])
      .gte("created_at", oneDayAgo);

    if ((cancelledActivities ?? 0) >= 3) {
      signals.push({
        type: "high_cancellation_rate",
        severity: "medium",
        description: `${cancelledActivities} ${isOrder ? "commandes" : "réservations"} annulées/rejetées en 24h`,
        weight: 20,
      });
    }
  } catch (error) {
    console.error("Signal 3 error:", error.message);
  }

  // SIGNAL 4: ABNORMAL AMOUNT
  try {
    const priceColumn = isOrder ? "total_price" : "price";
    const { data: avgActivity } = await supabase
      .from(table)
      .select(priceColumn)
      .eq("store_id", ctx.store_id)
      .eq("status", "COMPLETED")
      .limit(50);

    let avg = 500;
    if (avgActivity && avgActivity.length > 5) {
      avg =
        avgActivity.reduce((sum, o) => sum + (o[priceColumn] ?? 0), 0) /
        avgActivity.length;
    }

    if (ctx.total > avg * 4) {
      signals.push({
        type: "abnormal_amount_high",
        severity: "high",
        description: `Montant ${ctx.total} TND — ${Math.round(ctx.total / avg)}x la moyenne (${Math.round(avg)} TND)`,
        weight: 25,
      });
    } else if (ctx.total > avg * 2.5) {
      signals.push({
        type: "abnormal_amount_medium",
        severity: "medium",
        description: `Montant ${ctx.total} TND — ${(ctx.total / avg).toFixed(1)}x la moyenne`,
        weight: 10,
      });
    }
  } catch (error) {
    console.error("Signal 4 error:", error.message);
  }

  // SIGNAL 5: BULK QUANTITY
  if (isOrder && ctx.quantity && ctx.quantity > 20) {
    signals.push({
      type: "bulk_quantity",
      severity: "medium",
      description: `Quantité inhabituelle: ${ctx.quantity} unités`,
      weight: 15,
    });
  }

  // SIGNAL 6: INVALID ADDRESS
  if (
    isOrder &&
    (!ctx.delivery_address || ctx.delivery_address.trim().length < 10)
  ) {
    signals.push({
      type: "invalid_address",
      severity: "medium",
      description: "Adresse de livraison incomplète ou invalide",
      weight: 15,
    });
  }

  // SIGNAL 7: SAME BUSINESS SPAM
  try {
    const { count: sameBusinessActivities } = await supabase
      .from(table)
      .select("*", { count: "exact", head: true })
      .eq("customer_id", ctx.customer_id)
      .eq("store_id", ctx.store_id)
      .eq("status", "PENDING")
      .gte("created_at", oneHourAgo);

    if ((sameBusinessActivities ?? 0) >= 3) {
      signals.push({
        type: "same_business_spam",
        severity: "high",
        description: `${sameBusinessActivities} ${isOrder ? "commandes" : "réservations"} PENDING chez le même merchant en 1h`,
        weight: 30,
      });
    }
  } catch (error) {
    console.error("Signal 7 error:", error.message);
  }

  return signals;
}

function computeHeuristicScore(signals) {
  const rawScore = signals.reduce((sum, s) => sum + s.weight, 0);
  return Math.min(100, rawScore);
}

function computeLevel(score) {
  if (score < SCORE_THRESHOLDS.safe) return "safe";
  if (score < SCORE_THRESHOLDS.suspicious) return "suspicious";
  if (score < SCORE_THRESHOLDS.high_risk) return "high_risk";
  return "blocked";
}

function computeRecommendation(level) {
  if (level === "safe") return "approve";
  if (level === "suspicious") return "review";
  return "reject";
}

async function analyzeFraud(ctx) {
  const startTime = performance.now();

  try {
    const signals = await collectHeuristicSignals(ctx);
    const score = computeHeuristicScore(signals);
    const level = computeLevel(score);
    const recommendation = computeRecommendation(level);
    const latency = performance.now() - startTime;

    return {
      score: parseFloat(score.toFixed(1)),
      level,
      signals,
      recommendation,
      latency: parseFloat(latency.toFixed(2)),
      checked_at: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Fraud analysis error:", error);
    return {
      score: 0,
      level: "safe",
      signals: [],
      recommendation: "approve",
      checked_at: new Date().toISOString(),
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN: Récupérer et analyser les vraies commandes
// ═══════════════════════════════════════════════════════════════════════════════

async function runRealDataTests() {
  console.log("\n");
  console.log("═".repeat(80));
  console.log("  🔍 TEST FRAUDE DETECTION AVEC DONNÉES RÉELLES");
  console.log("═".repeat(80));

  // 1️⃣ Récupérer les 10 dernières commandes
  console.log("\n📝 Récupération des vraies commandes de Supabase...");

  const { data: orders, error: orderError } = await supabase
    .from("orders")
    .select(
      `
      id,
      customer_id,
      store_id,
      quantity,
      total_price,
      delivery_address,
      created_at,
      status,
      users!orders_customer_id_fkey(email, created_at),
      stores(name, category)
    `
    )
    .order("created_at", { ascending: false })
    .limit(10);

  if (orderError) {
    console.error("❌ Erreur Supabase:", orderError.message);
    process.exit(1);
  }

  if (!orders || orders.length === 0) {
    console.log("⚠️  Aucune commande trouvée dans la base de données");
    return;
  }

  console.log(`✅ ${orders.length} commandes trouvées\n`);

  // 2️⃣ Analyser chaque commande
  console.log("🔐 ANALYSE DE FRAUDE - VRAIES DONNÉES");
  console.log("─".repeat(80));

  const results = [];
  let highRiskCount = 0;
  let suspiciousCount = 0;
  let safeCount = 0;

  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];

    const ctx = {
      customer_id: order.customer_id,
      store_id: order.store_id,
      item_id: order.id,
      quantity: order.quantity,
      total: order.total_price,
      delivery_address: order.delivery_address,
      entity_type: "ORDER",
    };

    const analysis = await analyzeFraud(ctx);

    results.push({
      order_id: order.id,
      customer_email: order.users?.email || "Unknown",
      store_name: order.stores?.name || "Unknown",
      amount: order.total_price,
      analysis,
    });

    // Compter les résultats
    if (analysis.level === "high_risk" || analysis.level === "blocked") {
      highRiskCount++;
    } else if (analysis.level === "suspicious") {
      suspiciousCount++;
    } else {
      safeCount++;
    }

    // Afficher le résultat
    const emoji =
      analysis.level === "blocked" || analysis.level === "high_risk"
        ? "🔴"
        : analysis.level === "suspicious"
          ? "🟡"
          : "🟢";

    console.log(
      `${emoji} Commande #${order.id.toString().padEnd(5)} | Score: ${analysis.score
        .toString()
        .padEnd(5)} | ${analysis.level.padEnd(11)} | ${analysis.recommendation.padEnd(6)} | ${analysis.latency}ms`
    );

    if (analysis.signals.length > 0) {
      console.log(
        `   Signaux: ${analysis.signals.map((s) => `${s.type}(+${s.weight})`).join(", ")}`
      );
    }
  }

  // 3️⃣ Résumé des résultats
  console.log("\n" + "─".repeat(80));
  console.log("📊 RÉSUMÉ DES RÉSULTATS");
  console.log("─".repeat(80));

  console.log(`
Commandes analysées: ${orders.length}

✅ SAFE (Approuvées):      ${safeCount} (${((safeCount / orders.length) * 100).toFixed(1)}%)
🟡 SUSPICIOUS (À revoir):  ${suspiciousCount} (${((suspiciousCount / orders.length) * 100).toFixed(1)}%)
🔴 HIGH_RISK/BLOCKED:      ${highRiskCount} (${((highRiskCount / orders.length) * 100).toFixed(1)}%)

Recommandations d'action:
  - ${results.filter((r) => r.analysis.recommendation === "approve").length} à approuver immédiatement
  - ${results.filter((r) => r.analysis.recommendation === "review").length} à vérifier manuellement
  - ${results.filter((r) => r.analysis.recommendation === "reject").length} à rejeter
`);

  // 4️⃣ Cas détectés comme risqués
  if (highRiskCount > 0) {
    console.log("🔴 COMMANDES À RISQUE ÉLEVÉ:");
    console.log("─".repeat(80));

    results
      .filter(
        (r) => r.analysis.level === "high_risk" || r.analysis.level === "blocked"
      )
      .forEach((result) => {
        console.log(`
Commande #${result.order_id}
  Client: ${result.customer_email}
  Marchand: ${result.store_name}
  Montant: ${result.amount} TND
  Score: ${result.analysis.score}/100
  Niveau: ${result.analysis.level.toUpperCase()}
  Action: ${result.analysis.recommendation.toUpperCase()}
  Signaux (${result.analysis.signals.length}):
${result.analysis.signals.map((s) => `    • [${s.severity.toUpperCase()}] ${s.type}: ${s.description}`).join("\n")}
        `);
      });
  }

  // 5️⃣ Test avec réservations (si disponibles)
  console.log("\n" + "═".repeat(80));
  console.log("  📅 TEST AVEC DONNÉES DE RÉSERVATIONS");
  console.log("═".repeat(80));

  const { data: bookings, error: bookingError } = await supabase
    .from("bookings")
    .select(
      `
      id,
      customer_id,
      store_id,
      price,
      created_at,
      status,
      users!bookings_customer_id_fkey(email),
      stores(name, category)
    `
    )
    .order("created_at", { ascending: false })
    .limit(5);

  if (bookingError) {
    console.log("⚠️  Pas de réservations trouvées");
  } else if (bookings && bookings.length > 0) {
    console.log(`\n✅ ${bookings.length} réservations trouvées\n`);

    let bookingResults = [];
    for (const booking of bookings) {
      const ctx = {
        customer_id: booking.customer_id,
        store_id: booking.store_id,
        item_id: booking.id,
        total: booking.price,
        entity_type: "BOOKING",
      };

      const analysis = await analyzeFraud(ctx);
      bookingResults.push({
        booking_id: booking.id,
        customer_email: booking.users?.email || "Unknown",
        store_name: booking.stores?.name || "Unknown",
        price: booking.price,
        analysis,
      });

      const emoji =
        analysis.level === "blocked" || analysis.level === "high_risk"
          ? "🔴"
          : analysis.level === "suspicious"
            ? "🟡"
            : "🟢";

      console.log(
        `${emoji} Réservation #${booking.id.toString().padEnd(5)} | Score: ${analysis.score
          .toString()
          .padEnd(5)} | ${analysis.level.padEnd(11)} | ${analysis.recommendation.padEnd(6)} | ${analysis.latency}ms`
      );
    }
  }

  // 6️⃣ Export JSON
  const report = {
    timestamp: new Date().toISOString(),
    test_type: "REAL_DATA_FRAUD_DETECTION",
    orders_analyzed: results.length,
    summary: {
      safe: safeCount,
      suspicious: suspiciousCount,
      high_risk: highRiskCount,
      total: orders.length,
    },
    results,
  };

  const fs = require("fs");
  const reportPath = `reports/real-data-fraud-test-${Date.now()}.json`;
  fs.mkdirSync("reports", { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  console.log(`\n✅ Rapport sauvegardé: ${reportPath}`);
  console.log("\n" + "═".repeat(80));
}

runRealDataTests().catch((error) => {
  console.error("Erreur fatale:", error);
  process.exit(1);
});

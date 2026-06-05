#!/usr/bin/env node

/**
 * 🧪 SCRIPT EXECUTABLE - Exemples de Test Fraude Detection
 * 
 * Exécution: node tests/test-fraud-examples.js
 */

// Simuler les fonctions du système (le vrai code vit dans lib/actions/fraud-detection.ts)

const SCORE_THRESHOLDS = {
  safe: 25,
  suspicious: 55,
  high_risk: 75,
};

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

// Simulation simplifiée des signaux pour démonstration
function simulateAnalysis(signals) {
  const score = Math.min(100, signals.reduce((sum, s) => sum + s.weight, 0));
  const level = computeLevel(score);
  const recommendation = computeRecommendation(level);

  return {
    score: parseFloat(score.toFixed(1)),
    level,
    signals,
    recommendation,
    checked_at: new Date().toISOString(),
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXEMPLE 1️⃣: Commande Légitime (SAFE)
// ═══════════════════════════════════════════════════════════════════════════════

console.log("\n🟢 EXEMPLE 1: Commande Légitime");
console.log("─".repeat(80));

const example1 = simulateAnalysis([]);

console.log(`
Contexte:
  - Client: user_123_john_doe
  - Montant: 300 TND
  - Adresse: 45 Avenue Habib Bourguiba, 1000 Tunis
  - Quantité: 1

Résultats:
  📊 Score: ${example1.score}/100
  🎯 Niveau: ${example1.level}
  ✅ Recommandation: ${example1.recommendation}
  🚨 Signaux: ${example1.signals.length}
`);

// ═══════════════════════════════════════════════════════════════════════════════
// EXEMPLE 2️⃣: Nouveau Compte + Montant Élevé (SUSPICIOUS/HIGH_RISK)
// ═══════════════════════════════════════════════════════════════════════════════

console.log("🟡 EXEMPLE 2: Nouveau Compte + Montant Anormal");
console.log("─".repeat(80));

const example2 = simulateAnalysis([
  {
    type: "new_account_under_1h",
    severity: "high",
    description: "Compte créé il y a moins d'1 heure",
    weight: 30,
  },
  {
    type: "abnormal_amount_high",
    severity: "high",
    description: "Montant 2500 TND — 5x la moyenne (500 TND)",
    weight: 25,
  },
]);

console.log(`
Contexte:
  - Client: user_new_suspicious (compte < 1h)
  - Montant: 2500 TND (5x moyenne du magasin)
  - Adresse: 123 Rue Ben Arous, Sfax

Signaux Détectés:
${example2.signals.map((s) => `  • [${s.severity.toUpperCase()}] ${s.type}: +${s.weight}pts`).join("\n")}

Résultats:
  📊 Score: ${example2.score}/100
  🎯 Niveau: ${example2.level}
  ❌ Recommandation: ${example2.recommendation}
  🚨 Signaux: ${example2.signals.length}

⚠️  ACTION: Cette commande DOIT être rejetée immédiatement
`);

// ═══════════════════════════════════════════════════════════════════════════════
// EXEMPLE 3️⃣: Burst Velocity (SUSPICIOUS)
// ═══════════════════════════════════════════════════════════════════════════════

console.log("🟡 EXEMPLE 3: Vélocité Burst - 6 Commandes en 1h");
console.log("─".repeat(80));

const example3 = simulateAnalysis([
  {
    type: "order_burst_velocity_high",
    severity: "high",
    description: "6 commandes en 1 heure",
    weight: 35,
  },
]);

console.log(`
Contexte:
  - Client: user_rapid_buyer
  - Commandes en 1h: 6 (seuil: 5+)
  - Montant cette commande: 1200 TND

Signaux Détectés:
${example3.signals.map((s) => `  • [${s.severity.toUpperCase()}] ${s.type}: +${s.weight}pts`).join("\n")}

Résultats:
  📊 Score: ${example3.score}/100
  🎯 Niveau: ${example3.level}
  ⏸️  Recommandation: ${example3.recommendation}
  🚨 Signaux: ${example3.signals.length}

⚠️  ACTION: Demander au client de vérifier son compte
`);

// ═══════════════════════════════════════════════════════════════════════════════
// EXEMPLE 4️⃣: Spam du Même Merchant (HIGH_RISK)
// ═══════════════════════════════════════════════════════════════════════════════

console.log("🔴 EXEMPLE 4: Spam du Même Merchant - 4 Réservations PENDING");
console.log("─".repeat(80));

const example4 = simulateAnalysis([
  {
    type: "same_business_spam",
    severity: "high",
    description: "4 réservations PENDING chez le même merchant en 1h",
    weight: 30,
  },
]);

console.log(`
Contexte:
  - Client: user_booking_spammer
  - Type: BOOKING (réservation)
  - Réservations PENDING chez même merchant: 4 (seuil: 3+)
  - Montant: 500 TND

Signaux Détectés:
${example4.signals.map((s) => `  • [${s.severity.toUpperCase()}] ${s.type}: +${s.weight}pts`).join("\n")}

Résultats:
  📊 Score: ${example4.score}/100
  🎯 Niveau: ${example4.level}
  ⏸️  Recommandation: ${example4.recommendation}
  🚨 Signaux: ${example4.signals.length}

⚠️  ACTION: Mettre la réservation en révision manuelle
`);

// ═══════════════════════════════════════════════════════════════════════════════
// EXEMPLE 5️⃣: Quantité Massive (SAFE mais vigilant)
// ═══════════════════════════════════════════════════════════════════════════════

console.log("🟡 EXEMPLE 5: Quantité Massive - 50 Unités");
console.log("─".repeat(80));

const example5 = simulateAnalysis([
  {
    type: "bulk_quantity",
    severity: "medium",
    description: "Quantité inhabituelle: 50 unités",
    weight: 15,
  },
]);

console.log(`
Contexte:
  - Client: user_bulk_buyer
  - Quantité: 50 unités (seuil: >20)
  - Montant: 5000 TND
  - Adresse: 789 Avenue Mohammed VI, Marrakech

Signaux Détectés:
${example5.signals.map((s) => `  • [${s.severity.toUpperCase()}] ${s.type}: +${s.weight}pts`).join("\n")}

Résultats:
  📊 Score: ${example5.score}/100
  🎯 Niveau: ${example5.level}
  ✅ Recommandation: ${example5.recommendation}
  🚨 Signaux: ${example5.signals.length}

⚠️  ACTION: Approuver mais confirmer avec le client (achat professionnel possible)
`);

// ═══════════════════════════════════════════════════════════════════════════════
// EXEMPLE 6️⃣: Adresse Invalide (SAFE mais demander correction)
// ═══════════════════════════════════════════════════════════════════════════════

console.log("🟡 EXEMPLE 6: Adresse Invalide/Incomplète");
console.log("─".repeat(80));

const example6 = simulateAnalysis([
  {
    type: "invalid_address",
    severity: "medium",
    description: "Adresse de livraison incomplète ou invalide",
    weight: 15,
  },
]);

console.log(`
Contexte:
  - Client: user_no_address
  - Adresse fournie: "Tunis" (< 10 caractères)
  - Montant: 600 TND

Signaux Détectés:
${example6.signals.map((s) => `  • [${s.severity.toUpperCase()}] ${s.type}: +${s.weight}pts`).join("\n")}

Résultats:
  📊 Score: ${example6.score}/100
  🎯 Niveau: ${example6.level}
  ✅ Recommandation: ${example6.recommendation}
  🚨 Signaux: ${example6.signals.length}

⚠️  ACTION: Approuver mais demander au client de compléter son adresse
`);

// ═══════════════════════════════════════════════════════════════════════════════
// EXEMPLE 7️⃣: Annulations Élevées (SAFE avec vigilance)
// ═══════════════════════════════════════════════════════════════════════════════

console.log("🟡 EXEMPLE 7: Taux d'Annulation Élevé - 4 Annulations en 24h");
console.log("─".repeat(80));

const example7 = simulateAnalysis([
  {
    type: "high_cancellation_rate",
    severity: "medium",
    description: "4 commandes annulées/rejetées en 24h",
    weight: 20,
  },
]);

console.log(`
Contexte:
  - Client: user_canceller
  - Annulations en 24h: 4 (seuil: 3+)
  - Montant actuelle: 800 TND

Signaux Détectés:
${example7.signals.map((s) => `  • [${s.severity.toUpperCase()}] ${s.type}: +${s.weight}pts`).join("\n")}

Résultats:
  📊 Score: ${example7.score}/100
  🎯 Niveau: ${example7.level}
  ✅ Recommandation: ${example7.recommendation}
  🚨 Signaux: ${example7.signals.length}

⚠️  ACTION: Approuver mais surveiller le compte du client
`);

// ═══════════════════════════════════════════════════════════════════════════════
// EXEMPLE 8️⃣: FRAUDE COMPLÈTE - Tous les Signaux Majeurs (BLOCKED)
// ═══════════════════════════════════════════════════════════════════════════════

console.log("🔴 EXEMPLE 8: FRAUDE DÉTECTÉE - Combinaison Parfaite");
console.log("─".repeat(80));

const example8 = simulateAnalysis([
  {
    type: "new_account_under_1h",
    severity: "high",
    description: "Compte créé il y a 15 minutes",
    weight: 30,
  },
  {
    type: "order_burst_velocity_high",
    severity: "high",
    description: "7 commandes en 40 minutes",
    weight: 35,
  },
  {
    type: "abnormal_amount_high",
    severity: "high",
    description: "Montant 4000 TND — 8x la moyenne (500 TND)",
    weight: 25,
  },
  {
    type: "bulk_quantity",
    severity: "medium",
    description: "Quantité: 100 unités",
    weight: 15,
  },
]);

console.log(`
Contexte:
  - Client: user_fraud_combined (NOUVEAU)
  - Commandes créées: 7 en 40 minutes
  - Montant: 4000 TND (8x moyenne)
  - Quantité: 100 unités
  - Adresse: incomplète

Signaux Détectés:
${example8.signals.map((s) => `  • [${s.severity.toUpperCase()}] ${s.type}: +${s.weight}pts`).join("\n")}

Résultats:
  📊 Score: ${example8.score}/100 ⚠️⚠️⚠️
  🎯 Niveau: ${example8.level.toUpperCase()}
  ❌ Recommandation: ${example8.recommendation.toUpperCase()}
  🚨 Signaux: ${example8.signals.length}

🚨 ACTION IMMÉDIATE: BLOQUER LA COMMANDE ET NOTIFIER L'ÉQUIPE DE SÉCURITÉ
`);

// ═══════════════════════════════════════════════════════════════════════════════
// TABLEAU RÉCAPITULATIF
// ═══════════════════════════════════════════════════════════════════════════════

console.log("\n" + "═".repeat(80));
console.log("📊 TABLEAU RÉCAPITULATIF DES SEUILS");
console.log("═".repeat(80));

console.log(`
Score     Classification    Recommandation    Action
──────────────────────────────────────────────────────────────
0-24      SAFE              APPROVE ✅        Approuver directement
25-54     SUSPICIOUS        REVIEW 🔍         Vérification manuelle
55-74     HIGH_RISK         REJECT ❌         Demander correction
≥75       BLOCKED           REJECT ❌         BLOQUER + Alerter

Les 7 Signaux et leurs Points:
──────────────────────────────────────────────────────────────
1. Nouveau Compte (< 1h)           +30 pts  [HIGH]
2. Burst Velocity (5+ en 1h)       +35 pts  [HIGH]
3. Annulations (3+ en 24h)         +20 pts  [MEDIUM]
4. Montant Anormal (> 4x moyenne)  +25 pts  [HIGH]
5. Quantité Massive (> 20 unités)  +15 pts  [MEDIUM]
6. Adresse Invalide (< 10 chars)   +15 pts  [MEDIUM]
7. Spam Merchant (3+ PENDING 1h)   +30 pts  [HIGH]

Maximum Possible: 170 pts → Capped à 100 pts
`);

// ═══════════════════════════════════════════════════════════════════════════════
// COMMENT UTILISER DANS VOTRE CODE
// ═══════════════════════════════════════════════════════════════════════════════

console.log("\n" + "═".repeat(80));
console.log("💻 INTÉGRATION DANS VOTRE CODE");
console.log("═".repeat(80));

console.log(`
ÉTAPE 1: Importer la fonction
────────────────────────────────────────────────────────────────
import { analyzeFraud, saveFraudAnalysis } from "@/lib/actions/fraud-detection";

ÉTAPE 2: Préparer le contexte
────────────────────────────────────────────────────────────────
const fraudContext = {
  customer_id: req.body.customer_id,
  store_id: req.body.store_id,
  item_id: req.body.item_id,
  quantity: req.body.quantity,
  total: req.body.total,
  delivery_address: req.body.delivery_address,
  entity_type: 'ORDER'  // ou 'BOOKING'
};

ÉTAPE 3: Analyser la fraude
────────────────────────────────────────────────────────────────
const analysis = await analyzeFraud(fraudContext);

ÉTAPE 4: Prendre une décision
────────────────────────────────────────────────────────────────
if (analysis.recommendation === 'reject') {
  // Bloquer la commande
  return res.status(403).json({ 
    error: 'Commande bloquée pour raisons de sécurité',
    score: analysis.score 
  });
}

if (analysis.recommendation === 'review') {
  // Mettre en révision
  await db.orders.create({ ...orderData, status: 'PENDING_REVIEW' });
  await notifyModerators(analysis);
}

if (analysis.recommendation === 'approve') {
  // Approuver normalement
  await db.orders.create({ ...orderData, status: 'CONFIRMED' });
}

ÉTAPE 5: Sauvegarder l'analyse (optionnel)
────────────────────────────────────────────────────────────────
await saveFraudAnalysis(order.id, analysis, 'ORDER');

FILES DE RÉFÉRENCES:
────────────────────────────────────────────────────────────────
• lib/actions/fraud-detection.ts          (Code principal)
• TEST_FRAUD_DETECTION_GUIDE.md           (Guide complet)
• RESULTATS_REELS_FRAUDE_DETECTION.md     (Données réelles)
• EXAMPLES_FRAUD_DETECTION_USAGE.ts       (11 exemples complets)
`);

console.log("\n" + "═".repeat(80));
console.log("✅ TOUS LES EXEMPLES COMPLÉTÉS");
console.log("═".repeat(80) + "\n");

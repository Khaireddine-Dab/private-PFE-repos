/**
 * 🔐 EXEMPLES D'UTILISATION - Détection de Fraude Ro2ya
 * 
 * Ce fichier montre comment tester et utiliser le système de détection de fraude
 * dans votre code Next.js 14, Server Actions, et routes API.
 */

import type { FraudContext, FraudAnalysis } from "@/lib/actions/fraud-detection";
import { analyzeFraud, saveFraudAnalysis } from "@/lib/actions/fraud-detection";

// ═══════════════════════════════════════════════════════════════════════════════
// EXEMPLE 1️⃣: Test Simple - Commande Légitime
// ═══════════════════════════════════════════════════════════════════════════════

async function example1_legitimate_order() {
  console.log("\n🟢 EXEMPLE 1: Commande Légitime");
  console.log("─".repeat(80));

  // Contexte d'une commande normale
  const ctx: FraudContext = {
    customer_id: "user_123_john_doe",
    store_id: 101,
    item_id: 5001,
    quantity: 1,
    total: 300,
    delivery_address: "45 Avenue Habib Bourguiba, 1000 Tunis",
    entity_type: "ORDER",
  };

  // Analyser la fraude
  const analysis = await analyzeFraud(ctx);

  console.log("Résultat:");
  console.log(`  Score: ${analysis.score}/100`);
  console.log(`  Niveau: ${analysis.level}`);
  console.log(`  Recommandation: ${analysis.recommendation}`);
  console.log(`  Signaux détectés: ${analysis.signals.length}`);

  // Résultat attendu:
  // Score: 0/100
  // Niveau: safe
  // Recommandation: approve
  // Signaux détectés: 0
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXEMPLE 2️⃣: Test - Nouveau Compte + Montant Élevé (Signal 1 + 4)
// ═══════════════════════════════════════════════════════════════════════════════

async function example2_new_account_high_amount() {
  console.log("\n🟡 EXEMPLE 2: Nouveau Compte avec Montant Anormal");
  console.log("─".repeat(80));

  const ctx: FraudContext = {
    customer_id: "user_new_suspicious",  // Compte créé il y a 30 minutes
    store_id: 102,
    item_id: 5002,
    quantity: 1,
    total: 2500,  // 5x la moyenne (500 TND)
    delivery_address: "123 Rue Ben Arous, Sfax",
    entity_type: "ORDER",
  };

  const analysis = await analyzeFraud(ctx);

  console.log("Résultat:");
  console.log(`  Score: ${analysis.score}/100`);
  console.log(`  Niveau: ${analysis.level}`);
  console.log(`  Recommandation: ${analysis.recommendation}`);
  console.log(`  Signaux:`);
  analysis.signals.forEach((signal: any) => {
    console.log(`    • [${signal.severity.toUpperCase()}] ${signal.type}: +${signal.weight}pts`);
    console.log(`      ${signal.description}`);
  });

  // Résultat attendu:
  // Score: 55/100 (30 + 25)
  // Niveau: high_risk
  // Recommandation: reject
  // Signaux: 2
  //   • [HIGH] new_account_under_1h: +30pts
  //   • [HIGH] abnormal_amount_high: +25pts
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXEMPLE 3️⃣: Test - Burst Velocity (Signal 2)
// ═══════════════════════════════════════════════════════════════════════════════

async function example3_burst_velocity() {
  console.log("\n🔴 EXEMPLE 3: Vélocité Burst - 6 Commandes en 1h");
  console.log("─".repeat(80));

  // Scénario: Un utilisateur créant rapidement 6 commandes
  const ctx: FraudContext = {
    customer_id: "user_rapid_buyer",  // 6 commandes en 45 minutes
    store_id: 103,
    item_id: 5003,
    quantity: 2,
    total: 1200,
    delivery_address: "567 Rue Mongi Slim, Marrakech",
    entity_type: "ORDER",
  };

  const analysis = await analyzeFraud(ctx);

  console.log("Résultat:");
  console.log(`  Score: ${analysis.score}/100`);
  console.log(`  Niveau: ${analysis.level}`);
  console.log(`  Recommandation: ${analysis.recommendation}`);
  console.log(`  Signaux:`);
  analysis.signals.forEach((signal: any) => {
    console.log(`    • [${signal.severity.toUpperCase()}] ${signal.type}: +${signal.weight}pts`);
  });

  // Résultat attendu:
  // Score: 35/100
  // Niveau: suspicious
  // Recommandation: review
  // Signaux:
  //   • [HIGH] order_burst_velocity_high: +35pts
  //     6 commandes en 1 heure
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXEMPLE 4️⃣: Test - Réservation avec Spam du Même Merchant (Signal 7)
// ═══════════════════════════════════════════════════════════════════════════════

async function example4_same_business_spam() {
  console.log("\n🔴 EXEMPLE 4: Spam du Même Merchant - 4 Réservations PENDING");
  console.log("─".repeat(80));

  const ctx: FraudContext = {
    customer_id: "user_booking_spammer",
    store_id: 200,  // Même merchant pour toutes les réservations
    item_id: 6001,
    total: 500,
    entity_type: "BOOKING",  // BOOKING, pas ORDER
  };

  const analysis = await analyzeFraud(ctx);

  console.log("Résultat:");
  console.log(`  Score: ${analysis.score}/100`);
  console.log(`  Niveau: ${analysis.level}`);
  console.log(`  Recommandation: ${analysis.recommendation}`);
  console.log(`  Signaux:`);
  analysis.signals.forEach((signal: any) => {
    console.log(`    • [${signal.severity.toUpperCase()}] ${signal.type}: +${signal.weight}pts`);
    console.log(`      ${signal.description}`);
  });

  // Résultat attendu:
  // Score: 30/100
  // Niveau: suspicious
  // Recommandation: review
  // Signaux:
  //   • [HIGH] same_business_spam: +30pts
  //     4 réservations PENDING chez le même merchant en 1h
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXEMPLE 5️⃣: Test - Quantité Massive (Signal 5) - ORDERS ONLY
// ═══════════════════════════════════════════════════════════════════════════════

async function example5_bulk_quantity() {
  console.log("\n🟡 EXEMPLE 5: Quantité Massive - 50 Unités");
  console.log("─".repeat(80));

  const ctx: FraudContext = {
    customer_id: "user_bulk_buyer",
    store_id: 104,
    item_id: 5005,
    quantity: 50,  // > 20 unités
    total: 5000,
    delivery_address: "789 Avenue Mohammed VI, Marrakech",
    entity_type: "ORDER",
  };

  const analysis = await analyzeFraud(ctx);

  console.log("Résultat:");
  console.log(`  Score: ${analysis.score}/100`);
  console.log(`  Niveau: ${analysis.level}`);
  console.log(`  Recommandation: ${analysis.recommendation}`);
  console.log(`  Signaux:`);
  analysis.signals.forEach((signal: any) => {
    console.log(`    • [${signal.severity.toUpperCase()}] ${signal.type}: +${signal.weight}pts`);
  });

  // Résultat attendu:
  // Score: 15/100
  // Niveau: safe (car 15 < 25)
  // Recommandation: approve (mais avec vigilance)
  // Signaux:
  //   • [MEDIUM] bulk_quantity: +15pts
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXEMPLE 6️⃣: Test - Adresse Invalide (Signal 6) - ORDERS ONLY
// ═══════════════════════════════════════════════════════════════════════════════

async function example6_invalid_address() {
  console.log("\n🟡 EXEMPLE 6: Adresse Invalide/Incomplète");
  console.log("─".repeat(80));

  const ctx: FraudContext = {
    customer_id: "user_no_address",
    store_id: 105,
    item_id: 5006,
    quantity: 1,
    total: 600,
    delivery_address: "Tunis",  // < 10 caractères
    entity_type: "ORDER",
  };

  const analysis = await analyzeFraud(ctx);

  console.log("Résultat:");
  console.log(`  Score: ${analysis.score}/100`);
  console.log(`  Niveau: ${analysis.level}`);
  console.log(`  Recommandation: ${analysis.recommendation}`);
  console.log(`  Signaux:`);
  analysis.signals.forEach((signal: any) => {
    console.log(`    • [${signal.severity.toUpperCase()}] ${signal.type}: +${signal.weight}pts`);
    console.log(`      ${signal.description}`);
  });

  // Résultat attendu:
  // Score: 15/100
  // Niveau: safe
  // Recommandation: approve (mais en demandant complétion adresse)
  // Signaux:
  //   • [MEDIUM] invalid_address: +15pts
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXEMPLE 7️⃣: Test - Annulations Élevées (Signal 3)
// ═══════════════════════════════════════════════════════════════════════════════

async function example7_high_cancellation() {
  console.log("\n🟡 EXEMPLE 7: Taux d'Annulation Élevé - 4 Annulations en 24h");
  console.log("─".repeat(80));

  const ctx: FraudContext = {
    customer_id: "user_canceller",  // 4 commandes annulées/rejetées en 20h
    store_id: 106,
    item_id: 5007,
    quantity: 1,
    total: 800,
    delivery_address: "999 Rue El Fehri, Sfax",
    entity_type: "ORDER",
  };

  const analysis = await analyzeFraud(ctx);

  console.log("Résultat:");
  console.log(`  Score: ${analysis.score}/100`);
  console.log(`  Niveau: ${analysis.level}`);
  console.log(`  Recommandation: ${analysis.recommendation}`);
  console.log(`  Signaux:`);
  analysis.signals.forEach((signal: any) => {
    console.log(`    • [${signal.severity.toUpperCase()}] ${signal.type}: +${signal.weight}pts`);
    console.log(`      ${signal.description}`);
  });

  // Résultat attendu:
  // Score: 20/100
  // Niveau: safe
  // Recommandation: approve (avec surveillance)
  // Signaux:
  //   • [MEDIUM] high_cancellation_rate: +20pts
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXEMPLE 8️⃣: Test - FRAUDE BLOQUÉE (Score >= 75)
// ═══════════════════════════════════════════════════════════════════════════════

async function example8_fraud_blocked() {
  console.log("\n🔴 EXEMPLE 8: FRAUDE DÉTECTÉE - Blocage Immédiat");
  console.log("─".repeat(80));

  // Scénario parfait pour fraude: Nouveau compte + burst + montant élevé
  const ctx: FraudContext = {
    customer_id: "user_fraud_combined",
    store_id: 107,
    item_id: 5008,
    quantity: 30,  // + 15 pts (Signal 5)
    total: 3000,  // + 25 pts (Signal 4)
    delivery_address: "Tunis",  // + 15 pts (Signal 6)
    entity_type: "ORDER",
    // + 30 pts (Signal 1: nouveau compte)
    // + 35 pts (Signal 2: 5+ commandes en 1h)
  };

  const analysis = await analyzeFraud(ctx);

  console.log("Résultat:");
  console.log(`  Score: ${analysis.score}/100 ⚠️`);
  console.log(`  Niveau: ${analysis.level.toUpperCase()}`);
  console.log(`  Recommandation: ${analysis.recommendation.toUpperCase()}`);
  console.log(`  Signaux (${analysis.signals.length}):`);
  analysis.signals.forEach((signal: any) => {
    console.log(`    • [${signal.severity.toUpperCase()}] ${signal.type}: +${signal.weight}pts`);
  });

  // Résultat attendu:
  // Score: 100/100 (cap)
  // Niveau: blocked
  // Recommandation: reject
  // Signaux: 5+
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXEMPLE 9️⃣: Intégration - Route API Next.js
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * app/api/orders/create/route.ts
 * 
 * POST /api/orders/create
 * Body: { customer_id, store_id, item_id, quantity, total, delivery_address }
 */
export async function POST_CREATE_ORDER(request: Request) {
  try {
    const body = await request.json();

    // 1️⃣ Valider les données
    const { customer_id, store_id, item_id, quantity, total, delivery_address } = body;

    if (!customer_id || !store_id || !item_id || total <= 0) {
      return Response.json(
        { error: "Données manquantes ou invalides" },
        { status: 400 }
      );
    }

    // 2️⃣ Analyser la fraude
    const fraudAnalysis = await analyzeFraud({
      customer_id,
      store_id,
      item_id,
      quantity,
      total,
      delivery_address,
      entity_type: "ORDER",
    });

    // 3️⃣ Prendre une décision
    if (fraudAnalysis.recommendation === "reject") {
      console.log(`🔴 COMMANDE BLOQUÉE: Score ${fraudAnalysis.score}/100`);
      return Response.json(
        {
          error: "Votre commande a été bloquée pour des raisons de sécurité",
          recommendation: fraudAnalysis.recommendation,
          reason: fraudAnalysis.signals.map((s: any) => s.description).join("; "),
        },
        { status: 403 }
      );
    }

    if (fraudAnalysis.recommendation === "review") {
      console.log(`🟡 COMMANDE EN RÉVISION: Score ${fraudAnalysis.score}/100`);
      // Créer la commande mais la marquer comme "PENDING_REVIEW"
      // Notifier l'équipe de modération
    }

    // 4️⃣ Créer la commande en base de données
    // const order = await db.orders.create({ ... });

    // 5️⃣ Sauvegarder l'analyse de fraude
    // await saveFraudAnalysis(order.id, fraudAnalysis, 'ORDER');

    console.log(`✅ COMMANDE APPROUVÉE: Score ${fraudAnalysis.score}/100`);
    return Response.json(
      {
        success: true,
        order_id: 12345,  // À remplacer par le vrai ID
        fraud_analysis: fraudAnalysis,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur création commande:", error);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXEMPLE 🔟: Server Action - Créer Commande avec Vérification Fraude
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * "use server"
 * 
 * app/actions/orders.ts
 */
export async function createOrderWithFraudCheck(data: {
  customer_id: string;
  store_id: number;
  item_id: number;
  quantity: number;
  total: number;
  delivery_address: string;
}) {
  try {
    // 1️⃣ Analyser la fraude immédiatement
    const fraudAnalysis = await analyzeFraud({
      customer_id: data.customer_id,
      store_id: data.store_id,
      item_id: data.item_id,
      quantity: data.quantity,
      total: data.total,
      delivery_address: data.delivery_address,
      entity_type: "ORDER",
    });

    // 2️⃣ Si bloquée, retourner l'erreur tout de suite
    if (fraudAnalysis.recommendation === "reject") {
      return {
        success: false,
        error: "Commande bloquée",
        fraud_score: fraudAnalysis.score,
        signals: fraudAnalysis.signals,
      };
    }

    // 3️⃣ Créer la commande
    // const order = await prisma.order.create({ data: { ... } });

    // 4️⃣ Sauvegarder l'analyse
    // await saveFraudAnalysis(order.id, fraudAnalysis, 'ORDER');

    return {
      success: true,
      order_id: 12345,
      fraud_analysis: fraudAnalysis,
    };
  } catch (error) {
    return {
      success: false,
      error: "Erreur serveur",
    };
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// EXEMPLE 1️⃣1️⃣: Tester Directement dans le Terminal
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Commandes pour tester depuis le terminal:
 * 
 * # 1. Installer les dépendances (si nécessaire)
 * npm install @supabase/supabase-js
 * 
 * # 2. Copier ce fichier en tests/examples.js
 * 
 * # 3. Exécuter les exemples
 * node tests/examples.js
 * 
 * # 4. Tester un seul exemple
 * node -e "
 *   import('./tests/examples.js').then(m => m.example1_legitimate_order())
 * "
 */

// ═══════════════════════════════════════════════════════════════════════════════
// SCRIPT DE TEST: Exécuter Tous les Exemples
// ═══════════════════════════════════════════════════════════════════════════════

export async function runAllExamples() {
  console.log("\n");
  console.log("═".repeat(80));
  console.log("  🔐 TESTS COMPLETS - DÉTECTION DE FRAUDE");
  console.log("═".repeat(80));

  try {
    await example1_legitimate_order();
    await example2_new_account_high_amount();
    await example3_burst_velocity();
    await example4_same_business_spam();
    await example5_bulk_quantity();
    await example6_invalid_address();
    await example7_high_cancellation();
    await example8_fraud_blocked();

    console.log("\n" + "═".repeat(80));
    console.log("  ✅ TOUS LES TESTS TERMINÉS");
    console.log("═".repeat(80) + "\n");
  } catch (error) {
    console.error("Erreur lors de l'exécution des tests:", error);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// RÉSUMÉ: Comment Utiliser
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * ÉTAPE 1: Importer les fonctions
 * ────────────────────────────────────────
 * import { analyzeFraud, saveFraudAnalysis } from "@/lib/actions/fraud-detection";
 *
 * ÉTAPE 2: Créer le contexte
 * ────────────────────────────────────────
 * const ctx = {
 *   customer_id: "user_123",
 *   store_id: 101,
 *   item_id: 5001,
 *   quantity: 1,
 *   total: 300,
 *   delivery_address: "45 Avenue X",
 *   entity_type: "ORDER"  // ou "BOOKING"
 * };
 *
 * ÉTAPE 3: Analyser
 * ────────────────────────────────────────
 * const analysis = await analyzeFraud(ctx);
 *
 * ÉTAPE 4: Vérifier le résultat
 * ────────────────────────────────────────
 * if (analysis.recommendation === "reject") {
 *   // Bloquer la commande
 * } else if (analysis.recommendation === "review") {
 *   // Marquer pour révision manuelle
 * } else {
 *   // Approuver la commande
 * }
 *
 * ÉTAPE 5: Sauvegarder (optionnel)
 * ────────────────────────────────────────
 * await saveFraudAnalysis(order_id, analysis, "ORDER");
 */

// Export pour tests
if (typeof require !== 'undefined' && (require as any).main === module) {
  runAllExamples().catch(console.error);
}

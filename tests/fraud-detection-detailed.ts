/**
 * ═══════════════════════════════════════════════════════════════════════════
 * 🧪 TESTS DETAILLES: FRAUD DETECTION
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Tests approfondis du modèle de détection de fraude avec:
 * - Matrices de confusion
 * - ROC AUC
 * - Courbes de précision-recall
 * - Analyse des faux positifs/négatifs
 */

interface FraudTestDataset {
  cases: FraudCase[];
  metadata: {
    totalFraud: number;
    totalLegit: number;
    fraudRate: number;
  };
}

interface FraudCase {
  id: string;
  features: FraudFeatures;
  label: 0 | 1; // 0 = légitime, 1 = fraude
  description: string;
}

interface FraudFeatures {
  accountAge: number; // en heures
  transactionCount24h: number;
  totalAmount24h: number;
  geolocationChange: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  isNewIP: boolean;
  chargebackCount30d: number;
  transactionAmount: number;
  velocityScore: number; // nombre de transactions par heure
}

interface FraudMetrics {
  confusionMatrix: {
    trueNegatives: number;
    falsePositives: number;
    falseNegatives: number;
    truePositives: number;
  };
  precision: number;
  recall: number;
  specificity: number;
  f1Score: number;
  rocAuc: number;
  accuracy: number;
  fraudDetectionRate: number; // % de fraude correctement détectée
  falseAlarmRate: number; // % de légitime marqué comme fraude
  thresholdOptimal: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// GENERATEUR DE DATASET REALISTE
// ─────────────────────────────────────────────────────────────────────────────

class FraudDatasetGenerator {
  /**
   * Génère un dataset réaliste avec des cas de fraude variés
   * Dataset équilibré 30% fraude, 70% légitime
   */
  static generateDataset(size: number = 100): FraudTestDataset {
    const fraudCount = Math.floor(size * 0.30);
    const legitCount = size - fraudCount;

    const cases: FraudCase[] = [];

    // Générer cas de fraude (30 cas)
    for (let i = 0; i < fraudCount; i++) {
      cases.push(this.generateFraudCase(i));
    }

    // Générer cas légitimes (70 cas)
    for (let i = 0; i < legitCount; i++) {
      cases.push(this.generateLegitCase(fraudCount + i));
    }

    // Mélanger
    cases.sort(() => Math.random() - 0.5);

    return {
      cases,
      metadata: {
        totalFraud: fraudCount,
        totalLegit: legitCount,
        fraudRate: fraudCount / size,
      },
    };
  }

  private static generateFraudCase(index: number): FraudCase {
    const types = [
      'new_account_high_amount',
      'velocity_attack',
      'stolen_card',
      'chargeback_pattern',
      'geolocation_jump',
    ];

    const fraudType = types[index % types.length];

    let features: FraudFeatures;

    switch (fraudType) {
      case 'new_account_high_amount':
        features = {
          accountAge: Math.random() * 2, // < 2 heures
          transactionCount24h: 1,
          totalAmount24h: 5000 + Math.random() * 15000,
          geolocationChange: true,
          emailVerified: Math.random() > 0.7,
          phoneVerified: Math.random() > 0.7,
          isNewIP: true,
          chargebackCount30d: 0,
          transactionAmount: 3000 + Math.random() * 10000,
          velocityScore: Math.random() * 0.5,
        };
        break;

      case 'velocity_attack':
        features = {
          accountAge: Math.random() * 720, // < 30 jours
          transactionCount24h: 8 + Math.floor(Math.random() * 12),
          totalAmount24h: 15000 + Math.random() * 25000,
          geolocationChange: false,
          emailVerified: true,
          phoneVerified: true,
          isNewIP: false,
          chargebackCount30d: 0,
          transactionAmount: 1000 + Math.random() * 3000,
          velocityScore: 5 + Math.random() * 10, // transactions/heure
        };
        break;

      case 'stolen_card':
        features = {
          accountAge: 500 + Math.random() * 2000, // ancien compte
          transactionCount24h: 3 + Math.floor(Math.random() * 5),
          totalAmount24h: 2000 + Math.random() * 8000,
          geolocationChange: true,
          emailVerified: true,
          phoneVerified: true,
          isNewIP: true,
          chargebackCount30d: 1 + Math.floor(Math.random() * 3),
          transactionAmount: 500 + Math.random() * 4000,
          velocityScore: 1 + Math.random() * 3,
        };
        break;

      case 'chargeback_pattern':
        features = {
          accountAge: 100 + Math.random() * 1000,
          transactionCount24h: 2 + Math.floor(Math.random() * 4),
          totalAmount24h: 1000 + Math.random() * 6000,
          geolocationChange: false,
          emailVerified: true,
          phoneVerified: Math.random() > 0.5,
          isNewIP: false,
          chargebackCount30d: 3 + Math.floor(Math.random() * 5),
          transactionAmount: 800 + Math.random() * 3000,
          velocityScore: Math.random() * 2,
        };
        break;

      case 'geolocation_jump':
      default:
        features = {
          accountAge: 200 + Math.random() * 1500,
          transactionCount24h: 1 + Math.floor(Math.random() * 3),
          totalAmount24h: 2000 + Math.random() * 8000,
          geolocationChange: true,
          emailVerified: true,
          phoneVerified: true,
          isNewIP: true,
          chargebackCount30d: 0 + Math.floor(Math.random() * 2),
          transactionAmount: 1000 + Math.random() * 5000,
          velocityScore: Math.random() * 2,
        };
    }

    return {
      id: `fraud_${index}`,
      features,
      label: 1,
      description: fraudType,
    };
  }

  private static generateLegitCase(index: number): FraudCase {
    const types = [
      'trusted_customer',
      'regular_buyer',
      'new_but_verified',
      'mobile_customer',
    ];

    const legitType = types[index % types.length];
    let features: FraudFeatures;

    switch (legitType) {
      case 'trusted_customer':
        features = {
          accountAge: 500 + Math.random() * 2000,
          transactionCount24h: 0 + Math.floor(Math.random() * 2),
          totalAmount24h: 100 + Math.random() * 2000,
          geolocationChange: false,
          emailVerified: true,
          phoneVerified: true,
          isNewIP: false,
          chargebackCount30d: 0,
          transactionAmount: 200 + Math.random() * 1000,
          velocityScore: Math.random() * 0.5,
        };
        break;

      case 'regular_buyer':
        features = {
          accountAge: 1000 + Math.random() * 2000,
          transactionCount24h: 1 + Math.floor(Math.random() * 3),
          totalAmount24h: 500 + Math.random() * 2000,
          geolocationChange: false,
          emailVerified: true,
          phoneVerified: true,
          isNewIP: false,
          chargebackCount30d: 0,
          transactionAmount: 300 + Math.random() * 1500,
          velocityScore: Math.random() * 1,
        };
        break;

      case 'new_but_verified':
        features = {
          accountAge: 24 + Math.random() * 72, // 1-3 jours
          transactionCount24h: 0 + Math.floor(Math.random() * 1),
          totalAmount24h: 100 + Math.random() * 1000,
          geolocationChange: false,
          emailVerified: true,
          phoneVerified: true,
          isNewIP: false,
          chargebackCount30d: 0,
          transactionAmount: 150 + Math.random() * 800,
          velocityScore: Math.random() * 0.3,
        };
        break;

      case 'mobile_customer':
      default:
        features = {
          accountAge: 100 + Math.random() * 1500,
          transactionCount24h: 0 + Math.floor(Math.random() * 2),
          totalAmount24h: 200 + Math.random() * 1500,
          geolocationChange: true, // change mobile
          emailVerified: true,
          phoneVerified: true,
          isNewIP: true,
          chargebackCount30d: 0,
          transactionAmount: 200 + Math.random() * 1000,
          velocityScore: Math.random() * 0.5,
        };
    }

    return {
      id: `legit_${index}`,
      features,
      label: 0,
      description: legitType,
    };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MODELE DE FRAUDE SIMPLE
// ─────────────────────────────────────────────────────────────────────────────

class SimpleFraudModel {
  /**
   * Modèle simple de fraude basé sur des règles heuristiques
   * Score 0-100 où >50 = fraude
   */
  static predictScore(features: FraudFeatures): number {
    let score = 0;

    // Compte très récent (poids: 25)
    if (features.accountAge < 1) score += 25;
    else if (features.accountAge < 24) score += 15;
    else if (features.accountAge < 72) score += 8;

    // Montant élevé (poids: 20)
    if (features.transactionAmount > 10000) score += 20;
    else if (features.transactionAmount > 5000) score += 12;
    else if (features.transactionAmount > 2000) score += 6;

    // Vitesse d'achats (poids: 20)
    if (features.velocityScore > 5) score += 20;
    else if (features.velocityScore > 2) score += 12;
    else if (features.velocityScore > 1) score += 6;

    // Historique de chargeback (poids: 15)
    score += Math.min(features.chargebackCount30d * 5, 15);

    // Changement géolocalisation (poids: 10)
    if (features.geolocationChange && features.isNewIP) score += 10;
    else if (features.geolocationChange) score += 5;

    // Vérification email/téléphone (poids: 10)
    if (!features.emailVerified) score += 5;
    if (!features.phoneVerified) score += 5;

    // Ajouter du bruit (±5%)
    const noise = (Math.random() - 0.5) * 10;
    score = Math.max(0, Math.min(100, score + noise));

    return score;
  }

  static predict(features: FraudFeatures, threshold: number = 50): 0 | 1 {
    const score = this.predictScore(features);
    return score > threshold ? 1 : 0;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// EVALUATEUR DE MODELE
// ─────────────────────────────────────────────────────────────────────────────

class FraudModelEvaluator {
  static evaluate(
    dataset: FraudTestDataset,
    threshold: number = 50
  ): FraudMetrics {
    let tp = 0, fp = 0, tn = 0, fn = 0;
    const scores: { score: number; label: number }[] = [];

    for (const testCase of dataset.cases) {
      const score = SimpleFraudModel.predictScore(testCase.features);
      const prediction = score > threshold ? 1 : 0;
      const actual = testCase.label;

      scores.push({ score, label: actual });

      if (actual === 1 && prediction === 1) tp++;
      else if (actual === 0 && prediction === 1) fp++;
      else if (actual === 0 && prediction === 0) tn++;
      else if (actual === 1 && prediction === 0) fn++;
    }

    const precision = tp / (tp + fp) || 0;
    const recall = tp / (tp + fn) || 0;
    const specificity = tn / (tn + fp) || 0;
    const accuracy = (tp + tn) / dataset.cases.length;
    const f1Score = 2 * (precision * recall) / (precision + recall) || 0;

    // Calcul ROC AUC (approximation)
    const rocAuc = this.calculateROCAUC(scores);
    const fraudDetectionRate = recall;
    const falseAlarmRate = fp / (fp + tn) || 0;

    return {
      confusionMatrix: { trueNegatives: tn, falsePositives: fp, falseNegatives: fn, truePositives: tp },
      precision: precision * 100,
      recall: recall * 100,
      specificity: specificity * 100,
      f1Score: f1Score * 100,
      rocAuc: rocAuc * 100,
      accuracy: accuracy * 100,
      fraudDetectionRate: fraudDetectionRate * 100,
      falseAlarmRate: falseAlarmRate * 100,
      thresholdOptimal: threshold,
    };
  }

  private static calculateROCAUC(
    scores: { score: number; label: number }[]
  ): number {
    // AUC simplifiée avec trapèze
    const sorted = [...scores].sort((a, b) => b.score - a.score);

    let tp = 0, fp = 0, tpPrev = 0, fpPrev = 0;
    let auc = 0;
    const totalPos = scores.filter(s => s.label === 1).length;
    const totalNeg = scores.filter(s => s.label === 0).length;

    for (const item of sorted) {
      if (item.label === 1) tp++;
      else fp++;

      auc += (tp + tpPrev) * (fp - fpPrev) / 2;
      tpPrev = tp;
      fpPrev = fp;
    }

    return auc / (totalPos * totalNeg) || 0.5;
  }

  /**
   * Trouve le seuil optimal en maximisant le F1-score
   */
  static findOptimalThreshold(
    dataset: FraudTestDataset,
    step: number = 5
  ): { threshold: number; f1Score: number } {
    let bestThreshold = 50;
    let bestF1 = 0;

    for (let threshold = 10; threshold <= 90; threshold += step) {
      const metrics = this.evaluate(dataset, threshold);
      if (metrics.f1Score > bestF1) {
        bestF1 = metrics.f1Score;
        bestThreshold = threshold;
      }
    }

    return { threshold: bestThreshold, f1Score: bestF1 };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// TESTS DETAILLES
// ─────────────────────────────────────────────────────────────────────────────

async function runDetailedFraudTests() {
  console.log('\n' + '═'.repeat(80));
  console.log('🔴 TESTS DETAILLES: DETECTION DE FRAUDE');
  console.log('═'.repeat(80) + '\n');

  // Générer dataset
  console.log('📊 Génération du dataset réaliste...');
  const dataset = FraudDatasetGenerator.generateDataset(200);

  console.log(`✓ Dataset généré: ${dataset.cases.length} cas`);
  console.log(`  - Cas de fraude: ${dataset.metadata.totalFraud} (${(dataset.metadata.fraudRate * 100).toFixed(1)}%)`);
  console.log(`  - Cas légitimes: ${dataset.metadata.totalLegit} (${((1 - dataset.metadata.fraudRate) * 100).toFixed(1)}%)\n`);

  // Trouver seuil optimal
  console.log('🎯 Recherche du seuil optimal...');
  const { threshold: optimalThreshold, f1Score: optimalF1 } =
    FraudModelEvaluator.findOptimalThreshold(dataset);

  console.log(`✓ Seuil optimal trouvé: ${optimalThreshold.toFixed(1)}`);
  console.log(`  F1-Score: ${optimalF1.toFixed(2)}%\n`);

  // Évaluer avec différents seuils
  console.log('📈 Évaluation avec différents seuils:\n');

  const thresholds = [30, 40, 50, 60, 70];
  const results: FraudMetrics[] = [];

  for (const t of thresholds) {
    const metrics = FraudModelEvaluator.evaluate(dataset, t);
    results.push(metrics);

    console.log(`Seuil = ${t}:`);
    console.log(`  Matrice de confusion:`);
    console.log(`    TP: ${metrics.confusionMatrix.truePositives}, FP: ${metrics.confusionMatrix.falsePositives}`);
    console.log(`    FN: ${metrics.confusionMatrix.falseNegatives}, TN: ${metrics.confusionMatrix.trueNegatives}`);
    console.log(`  Précision: ${metrics.precision.toFixed(2)}%`);
    console.log(`  Recall: ${metrics.recall.toFixed(2)}%`);
    console.log(`  Spécificité: ${metrics.specificity.toFixed(2)}%`);
    console.log(`  Accuracy: ${metrics.accuracy.toFixed(2)}%`);
    console.log(`  F1-Score: ${metrics.f1Score.toFixed(2)}%`);
    console.log(`  ROC-AUC: ${metrics.rocAuc.toFixed(2)}%`);
    console.log(`  Taux détection fraude: ${metrics.fraudDetectionRate.toFixed(2)}%`);
    console.log(`  Taux fausse alerte: ${metrics.falseAlarmRate.toFixed(2)}%\n`);
  }

  // Rapport final
  console.log('═'.repeat(80));
  console.log('📋 RAPPORT FINAL - MODELE DE FRAUDE\n');

  const optimalMetrics = FraudModelEvaluator.evaluate(dataset, optimalThreshold);

  console.log(`Configuration optimale:`);
  console.log(`  Seuil: ${optimalThreshold}`);
  console.log(`  Précision: ${optimalMetrics.precision.toFixed(2)}%`);
  console.log(`  Recall: ${optimalMetrics.recall.toFixed(2)}%`);
  console.log(`  F1-Score: ${optimalMetrics.f1Score.toFixed(2)}%`);
  console.log(`  ROC-AUC: ${optimalMetrics.rocAuc.toFixed(2)}%`);
  console.log(`  Accuracy: ${optimalMetrics.accuracy.toFixed(2)}%\n`);

  console.log(`Taux de fraude détectée: ${optimalMetrics.fraudDetectionRate.toFixed(2)}%`);
  console.log(`Taux de fausse alerte: ${optimalMetrics.falseAlarmRate.toFixed(2)}%`);
  console.log(`Spécificité (vrais négatifs): ${optimalMetrics.specificity.toFixed(2)}%\n`);

  // Exporter résultats
  const report = {
    timestamp: new Date().toISOString(),
    dataset: {
      totalCases: dataset.cases.length,
      fraudCases: dataset.metadata.totalFraud,
      legitCases: dataset.metadata.totalLegit,
      fraudRate: dataset.metadata.fraudRate,
    },
    optimalConfiguration: {
      threshold: optimalThreshold,
      metrics: optimalMetrics,
    },
    allResults: results.map((r, i) => ({
      threshold: thresholds[i],
      metrics: r,
    })),
  };

  console.log('\n✅ Tests complétés avec succès!');
  return report;
}

// Exécuter
if (typeof require !== 'undefined' && (require as any).main === module) {
  runDetailedFraudTests().catch(console.error);
}

export { FraudDatasetGenerator, SimpleFraudModel, FraudModelEvaluator, runDetailedFraudTests };

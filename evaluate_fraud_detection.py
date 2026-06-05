#!/usr/bin/env python3
"""
Script d'évaluation du système de détection de fraude
Phantom Marketplace v4.4
"""

import json
from typing import Dict, List, Tuple
from dataclasses import dataclass

@dataclass
class FraudDetectionMetrics:
    """Métriques d'évaluation pour la détection de fraude"""
    accuracy: float
    precision: float
    recall: float
    f1_score: float
    true_positives: int
    false_positives: int
    true_negatives: int
    false_negatives: int

class FraudDetectionEvaluator:
    """Évaluateur du système de détection de fraude"""
    
    def __init__(self, dataset_path: str):
        """Initialise l'évaluateur avec le dataset"""
        with open(dataset_path, 'r') as f:
            self.data = json.load(f)
        self.transactions = self.data['transactions']
    
    def fraud_detection_model(self, transaction: Dict) -> str:
        """
        Modèle de détection de fraude simplifié
        
        Règles heuristiques:
        - Montant > 1000 AND compte < 7 jours -> FRAUD
        - Commandes > 5 en 24h AND compte < 5 jours -> FRAUD
        - Location change + device mismatch + montant > 500 -> SUSPICIOUS
        - Sinon SAFE
        """
        amount = transaction['amount']
        orders_24h = transaction['order_count_24h']
        account_age = transaction['account_age_days']
        location_change = transaction['location_change']
        device_match = transaction['device_fingerprint_match']
        risk = transaction['payment_method_risk']
        
        # Règle 1: Montant élevé + compte récent
        if amount > 1000 and account_age < 7:
            return 'FRAUD'
        
        # Règle 2: Rafale de commandes + compte récent
        if orders_24h > 5 and account_age < 5:
            return 'FRAUD'
        
        # Règle 3: Combinaison suspecte
        if (location_change and not device_match and amount > 500):
            return 'SUSPICIOUS'
        
        if orders_24h > 3 and account_age < 10 and risk == 'HIGH':
            return 'SUSPICIOUS'
        
        # Par défaut: sûr
        return 'SAFE'
    
    def evaluate(self) -> Tuple[FraudDetectionMetrics, Dict]:
        """Évalue le modèle et retourne les métriques"""
        predictions = []
        ground_truths = []
        
        # Générer prédictions
        for txn in self.transactions:
            prediction = self.fraud_detection_model(txn)
            ground_truth = txn['ground_truth']
            
            predictions.append(prediction)
            ground_truths.append(ground_truth)
        
        # Convertir labels en binaire pour les métriques (FRAUD vs autres)
        y_true = [1 if label == 'FRAUD' else 0 for label in ground_truths]
        y_pred = [1 if pred == 'FRAUD' else 0 for pred in predictions]
        
        # Calculer métriques
        tp = sum(1 for t, p in zip(y_true, y_pred) if t == 1 and p == 1)
        fp = sum(1 for t, p in zip(y_true, y_pred) if t == 0 and p == 1)
        tn = sum(1 for t, p in zip(y_true, y_pred) if t == 0 and p == 0)
        fn = sum(1 for t, p in zip(y_true, y_pred) if t == 1 and p == 0)
        
        accuracy = (tp + tn) / len(y_true)
        precision = tp / (tp + fp) if (tp + fp) > 0 else 0
        recall = tp / (tp + fn) if (tp + fn) > 0 else 0
        f1 = 2 * (precision * recall) / (precision + recall) if (precision + recall) > 0 else 0
        
        metrics = FraudDetectionMetrics(
            accuracy=accuracy,
            precision=precision,
            recall=recall,
            f1_score=f1,
            true_positives=tp,
            false_positives=fp,
            true_negatives=tn,
            false_negatives=fn
        )
        
        # Matrice de confusion détaillée
        confusion_details = {
            'true_positives': tp,
            'false_positives': fp,
            'true_negatives': tn,
            'false_negatives': fn
        }
        
        return metrics, confusion_details

    def generate_report(self) -> str:
        """Génère un rapport d'évaluation"""
        metrics, confusion = self.evaluate()
        
        report = f"""
{'='*70}
RAPPORT D'ÉVALUATION - SYSTÈME DE DÉTECTION DE FRAUDE
Phantom Marketplace v4.4
{'='*70}

📊 DATASET
  • Nombre de transactions: {len(self.transactions)}
  • Transactions sûres: {self.data['summary']['safe_count']}
  • Transactions suspectes: {self.data['summary']['suspicious_count']}
  • Transactions frauduleuses: {self.data['summary']['fraud_count']}

📈 RÉSULTATS DE PRÉDICTION
  ✓ Accuracy:  {metrics.accuracy*100:.2f}%
  ✓ Precision: {metrics.precision*100:.2f}%
  ✓ Recall:    {metrics.recall*100:.2f}%
  ✓ F1-Score:  {metrics.f1_score*100:.2f}%

🔍 MATRICE DE CONFUSION (FRAUDE vs NON-FRAUDE)
  • True Positives (fraude détectée): {confusion['true_positives']}
  • False Positives (faux positif):   {confusion['false_positives']}
  • True Negatives (non-fraude ok):   {confusion['true_negatives']}
  • False Negatives (fraude manquée):  {confusion['false_negatives']}

💡 INTERPRÉTATION
  • Le modèle détecte correctement {metrics.recall*100:.1f}% des fraudes (Recall)
  • Parmi les alertes, {metrics.precision*100:.1f}% sont des vrais positifs (Precision)
  • Performance globale: {metrics.accuracy*100:.1f}% de bonnes classifications

✅ CONCLUSION
  Le système atteint une précision de {metrics.accuracy*100:.2f}% sur un dataset
  de test de {len(self.transactions)} transactions simulées, avec une capacité
  de détection de fraude de {metrics.recall*100:.1f}%.

{'='*70}
"""
        return report

if __name__ == '__main__':
    evaluator = FraudDetectionEvaluator('EVALUATION_FRAUDE_DATASET.json')
    print(evaluator.generate_report())
    
    # Export des métriques en JSON
    metrics, confusion = evaluator.evaluate()
    export = {
        'accuracy': round(metrics.accuracy, 4),
        'precision': round(metrics.precision, 4),
        'recall': round(metrics.recall, 4),
        'f1_score': round(metrics.f1_score, 4),
        'confusion_matrix': confusion
    }
    
    with open('EVALUATION_FRAUDE_RESULTATS.json', 'w') as f:
        json.dump(export, f, indent=2)
    
    print("\n✅ Résultats exportés dans EVALUATION_FRAUDE_RESULTATS.json")

/**
 * ══════════════════════════════════════════════════════════════════════
 *  TEST DE SYNONYMIE & REFORMULATION
 *  Principe : deux requêtes de même sens → résultats similaires
 *  Métrique : Jaccard Similarity sur les IDs retournés (top-5)
 * ══════════════════════════════════════════════════════════════════════
 */

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { normalizeQuery } from '../lib/search/normalizer';
import { generateQueryEmbedding } from '../lib/openrouter-embeddings';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ── Paires de synonymes / reformulations ─────────────────────────────────────
interface QueryPair {
  label: string;
  query1: string;
  query2: string;
  expectedSimilarity: 'HIGH' | 'MEDIUM' | 'LOW';
}

const SYNONYM_PAIRS: QueryPair[] = [
  // ── Emploi / Recrutement ──────────────────────────────────────────────────
  {
    label: 'Emploi vs Recrutement (français)',
    query1: 'trouver un emploi',
    query2: 'recrutement de personnel',
    expectedSimilarity: 'HIGH',
  },
  // ── Darija synonymes vouloir manger ──────────────────────────────────────
  {
    label: 'n7eb nakel (vouloir manger - variantes)',
    query1: 'n7eb nakel',
    query2: 'nhb nkel',
    expectedSimilarity: 'HIGH',
  },
  // ── Restaurant darija vs français ────────────────────────────────────────
  {
    label: 'restaurant (darija vs français)',
    query1: 'n7eb mekla behi',
    query2: 'je veux un bon restaurant',
    expectedSimilarity: 'HIGH',
  },
  // ── Coiffeur femme - reformulation ───────────────────────────────────────
  {
    label: 'coiffeur femme (darija vs arabe)',
    query1: 'wayn nl9a coiffeur mara 9rib meni',
    query2: 'صالون تجميل قريب مني',
    expectedSimilarity: 'MEDIUM',
  },
  // ── Mécanicien auto - variantes darija ───────────────────────────────────
  {
    label: 'mécanicien (darija variantes)',
    query1: 'krahba dhina mecanicien',
    query2: 'voiture réparation garagiste',
    expectedSimilarity: 'HIGH',
  },
  // ── Pas cher (rkhis vs français) ─────────────────────────────────────────
  {
    label: 'pas cher (darija vs français)',
    query1: 'n7eb mekla behi pas cher fi sousse',
    query2: 'restaurant économique Sousse',
    expectedSimilarity: 'HIGH',
  },
  // ── Argent (flous vs darija) ─────────────────────────────────────────────
  {
    label: 'pantalon (darija + arabe)',
    query1: 'فلوس بكداش serouel',
    query2: 'combien coûte pantalon prix',
    expectedSimilarity: 'MEDIUM',
  },
  // ── Plombier ouvert maintenant ────────────────────────────────────────────
  {
    label: 'plombier disponible (darija vs français)',
    query1: 'nhb plombier maftouh tawa',
    query2: 'plombier disponible maintenant',
    expectedSimilarity: 'HIGH',
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function jaccardSimilarity(setA: Set<string>, setB: Set<string>): number {
  if (setA.size === 0 && setB.size === 0) return 1;
  const intersection = new Set([...setA].filter(x => setB.has(x)));
  const union = new Set([...setA, ...setB]);
  return intersection.size / union.size;
}

function grade(score: number): string {
  if (score >= 0.6) return '🟢 TRÈS BON';
  if (score >= 0.4) return '🟡 BON';
  if (score >= 0.2) return '🟠 ACCEPTABLE';
  return '🔴 FAIBLE';
}

async function getTopResults(query: string, topK = 5): Promise<string[]> {
  const norm = normalizeQuery(query);
  const emb = await generateQueryEmbedding(norm.expanded);
  if (!emb || emb.length === 0) return [];

  const { data, error } = await supabase.rpc('search_global_semantic' as any, {
    query_embedding: `[${emb.join(',')}]`,
    match_threshold: 0.05,
    match_count: topK,
  });

  if (error || !data) return [];

  return (data as any[]).map((r: any) => `${r.result_type}::${r.id ?? r.name}`);
}

// ── Runner principal ──────────────────────────────────────────────────────────

async function runSynonymyTest() {
  console.log('');
  console.log('══════════════════════════════════════════════════════════════════');
  console.log('  🔬 TEST DE SYNONYMIE & REFORMULATION');
  console.log('  Principe : même sens → résultats similaires (Jaccard ≥ 0.4)');
  console.log('══════════════════════════════════════════════════════════════════');
  console.log('');

  const results: {
    label: string;
    query1: string;
    query2: string;
    jaccard: number;
    expected: string;
    pass: boolean;
  }[] = [];

  for (const pair of SYNONYM_PAIRS) {
    console.log(`\n📌 ${pair.label}`);
    console.log(`   Q1: "${pair.query1}"`);
    console.log(`   Q2: "${pair.query2}"`);

    // Normalisation
    const norm1 = normalizeQuery(pair.query1);
    const norm2 = normalizeQuery(pair.query2);
    console.log(`   ↳ Expanded Q1: ${norm1.expanded.slice(0, 80)}...`);
    console.log(`   ↳ Expanded Q2: ${norm2.expanded.slice(0, 80)}...`);

    try {
      const [ids1, ids2] = await Promise.all([
        getTopResults(pair.query1),
        getTopResults(pair.query2),
      ]);

      const set1 = new Set(ids1);
      const set2 = new Set(ids2);
      const jaccard = jaccardSimilarity(set1, set2);

      const thresholds = { HIGH: 0.4, MEDIUM: 0.25, LOW: 0.1 };
      const threshold = thresholds[pair.expectedSimilarity];
      const pass = jaccard >= threshold;

      console.log(`   ↳ Résultats Q1 (top-5): [${ids1.slice(0, 3).join(' | ')}]`);
      console.log(`   ↳ Résultats Q2 (top-5): [${ids2.slice(0, 3).join(' | ')}]`);
      console.log(`   ↳ Jaccard : ${jaccard.toFixed(3)}  ${grade(jaccard)}`);
      console.log(`   ↳ Attendu : ${pair.expectedSimilarity} (seuil ≥ ${threshold})  →  ${pass ? '✅ PASS' : '❌ FAIL'}`);

      results.push({
        label: pair.label,
        query1: pair.query1,
        query2: pair.query2,
        jaccard,
        expected: pair.expectedSimilarity,
        pass,
      });
    } catch (err) {
      console.error(`   ❌ Erreur lors du test: ${err}`);
      results.push({
        label: pair.label,
        query1: pair.query1,
        query2: pair.query2,
        jaccard: 0,
        expected: pair.expectedSimilarity,
        pass: false,
      });
    }
  }

  // ── Rapport final ─────────────────────────────────────────────────────────
  const passed = results.filter(r => r.pass).length;
  const total = results.length;
  const avgJaccard = results.reduce((s, r) => s + r.jaccard, 0) / total;

  console.log('');
  console.log('══════════════════════════════════════════════════════════════════');
  console.log('  📊 RAPPORT FINAL — TEST DE SYNONYMIE');
  console.log('══════════════════════════════════════════════════════════════════');
  console.log('');
  console.log('  Paire                                        Jaccard  Pass?');
  console.log('  ' + '─'.repeat(64));

  for (const r of results) {
    const label = r.label.padEnd(44).slice(0, 44);
    const score = r.jaccard.toFixed(3).padStart(7);
    const status = r.pass ? '✅' : '❌';
    console.log(`  ${label} ${score}  ${status}`);
  }

  console.log('  ' + '─'.repeat(64));
  console.log(`  Jaccard moyen   : ${avgJaccard.toFixed(3)}`);
  console.log(`  Tests réussis   : ${passed} / ${total}`);
  console.log(`  Taux de succès  : ${((passed / total) * 100).toFixed(1)} %`);
  console.log('');

  if (passed / total >= 0.75) {
    console.log('  🏆 CONCLUSION : Le moteur de recherche gère BIEN la synonymie.');
  } else if (passed / total >= 0.5) {
    console.log('  ⚠️  CONCLUSION : Performance ACCEPTABLE — améliorations possibles.');
  } else {
    console.log('  🚨 CONCLUSION : Performance INSUFFISANTE sur la synonymie.');
  }
  console.log('');
}

runSynonymyTest().catch(console.error);

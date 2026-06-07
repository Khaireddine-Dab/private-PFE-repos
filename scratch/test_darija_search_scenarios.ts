import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { normalizeQuery } from '../lib/search/normalizer';
import { generateQueryEmbedding } from '../lib/openrouter-embeddings';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const queries = [
  "n7eb mekla behi pas cher fi sousse",
  "krahba dhina mecanicien",
  "wayn nl9a coiffeur mara 9rib meni",
  "فلوس بكداش serouel",
  "صالون تجميل قريب مني"
];

async function runTest() {
  console.log("==================================================");
  console.log("🧪 DARIJA SEMANTIC SEARCH INTEGRATION TEST");
  console.log("==================================================");

  for (const q of queries) {
    console.log(`\n\nQuery: "${q}"`);
    console.log("-".repeat(40));

    // 1. Normalization & Translation using dictionary
    const norm = normalizeQuery(q);
    console.log("Parsed result:");
    console.log(`  - Original:   "${norm.original}"`);
    console.log(`  - Translated: "${norm.translated}"`);
    console.log(`  - Expanded:   "${norm.expanded}"`);
    console.log(`  - Script:     ${norm.script}`);
    console.log(`  - Categories: [${norm.detectedCategories.join(', ')}]`);
    console.log(`  - Keywords:   [${norm.keywords.join(', ')}]`);
    console.log(`  - Darija Words detected:`, norm.darijaWords.map(w => `${w.original} -> ${w.french} (${w.category})`));

    // 2. Vector search simulation
    try {
      console.log("Generating embedding...");
      const emb = await generateQueryEmbedding(norm.expanded);
      if (emb && emb.length > 0) {
        console.log(`Embedding generated successfully (${emb.length} dims). Performing vector search...`);
        const { data: results, error } = await supabase.rpc(
          'search_global_semantic' as any,
          {
            query_embedding: `[${emb.join(',')}]`,
            match_threshold: 0.1,
            match_count: 3,
          }
        );
        if (error) {
          console.error("Vector search error:", error);
        } else {
          console.log("Top 3 Vector Search Results:");
          if (results && results.length > 0) {
            results.forEach((r: any, idx: number) => {
              console.log(`  ${idx+1}. [${r.result_type}] "${r.name}" (${r.location_city}) - similarity: ${r.similarity?.toFixed(4)}`);
            });
          } else {
            console.log("  No matches found.");
          }
        }
      }
    } catch (err) {
      console.error("Embedding / Search failed:", err);
    }
  }
}

runTest().catch(console.error);

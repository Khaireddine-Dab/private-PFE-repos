import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import { doGlobalSemanticSearch } from '../lib/actions/search'
import {
  getSearchResultHref,
  getSearchResultBadge,
  formatSearchResultLocation,
} from '../lib/search/navigation'

async function main() {
  const queries = [
    { q: 'restaurant italien', loc: 'Tunis' },
    { q: 'plombier urgence', loc: 'Ariana' },
    { q: 'pc portable', loc: '' },
  ]

  for (const { q, loc } of queries) {
    console.log(`\n=== Suggestion: "${q}" @ ${loc || 'partout'} ===`)
    const results = await doGlobalSemanticSearch(q, loc || undefined, undefined, undefined, undefined, true)
    console.log(`${results.length} résultats`)
    results.slice(0, 5).forEach((r, i) => {
      console.log(
        `${i + 1}. [${getSearchResultBadge(r)}] ${r.name}`,
        `| ${formatSearchResultLocation(r) || 'sans lieu'}`,
        `→ ${getSearchResultHref(r)}`,
      )
    })
  }
}

main().catch(console.error)

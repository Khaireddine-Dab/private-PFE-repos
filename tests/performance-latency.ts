/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ⚡ TESTS DE PERFORMANCE: LATENCE & SCALABILITE
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Tests de performance incluant:
 * - Latence de recherche
 * - Latence de ranking
 * - Scalabilité avec charge croissante
 * - Analyse de capacité
 */

interface PerformanceTestResult {
  operationName: string;
  requestCount: number;
  avgLatencyMs: number;
  minLatencyMs: number;
  maxLatencyMs: number;
  p50LatencyMs: number; // Médiane
  p95LatencyMs: number; // 95e percentile
  p99LatencyMs: number; // 99e percentile
  throughputPerSec: number;
  errorCount: number;
  errorRate: number;
}

interface LoadTestResult {
  operationName: string;
  loadLevels: Array<{
    concurrentRequests: number;
    avgLatencyMs: number;
    throughputPerSec: number;
    errorRate: number;
  }>;
}

// ─────────────────────────────────────────────────────────────────────────────
// SIMULATEURS DE LATENCE
// ─────────────────────────────────────────────────────────────────────────────

class LatencySimulator {
  /**
   * Simule une opération de recherche
   * Latence réaliste: 20-150ms
   */
  static async simulateSearchQuery(queryLength: number): Promise<number> {
    // Latence base: parsing + preprocessing
    const baseLatency = 5;

    // Latence indexing (proportional à la taille index)
    const indexingLatency = 15 + Math.random() * 30;

    // Latence réseau
    const networkLatency = 5 + Math.random() * 10;

    // Latence ranking
    const rankingLatency = 10 + Math.random() * 50;

    // Variabilité (GC, cache miss, etc.)
    const variance = (Math.random() - 0.5) * 20;

    const totalLatency = baseLatency + indexingLatency + networkLatency + rankingLatency + variance;

    // Simuler délai réseau
    await new Promise(resolve => setTimeout(resolve, Math.random() * 5 + 2));

    return Math.max(10, totalLatency);
  }

  /**
   * Simule une opération de ranking
   * Latence réaliste: 15-80ms
   */
  static async simulateRankingOperation(itemCount: number): Promise<number> {
    // Latence base
    const baseLatency = 5;

    // Latence scoring (O(n))
    const scoringLatency = 5 + (itemCount / 10) * Math.random();

    // Latence sorting
    const sortingLatency = 2 + Math.log(itemCount) * Math.random() * 5;

    // Latence réseau
    const networkLatency = 3 + Math.random() * 8;

    // Variance
    const variance = (Math.random() - 0.5) * 15;

    const totalLatency = baseLatency + scoringLatency + sortingLatency + networkLatency + variance;

    await new Promise(resolve => setTimeout(resolve, Math.random() * 3 + 1));

    return Math.max(5, totalLatency);
  }

  /**
   * Simule une opération de détection de fraude
   * Latence réaliste: 10-60ms
   */
  static async simulateFraudDetection(signalCount: number): Promise<number> {
    // Latence base
    const baseLatency = 3;

    // Latence DB queries (pour chaque signal)
    const dbLatency = signalCount * (2 + Math.random() * 3);

    // Latence ML inference
    const mlLatency = 3 + Math.random() * 10;

    // Latence réseau
    const networkLatency = 2 + Math.random() * 5;

    // Variance
    const variance = (Math.random() - 0.5) * 10;

    const totalLatency = baseLatency + dbLatency + mlLatency + networkLatency + variance;

    await new Promise(resolve => setTimeout(resolve, Math.random() * 2 + 0.5));

    return Math.max(3, totalLatency);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// RUNNER DE TESTS DE PERFORMANCE
// ─────────────────────────────────────────────────────────────────────────────

class PerformanceTestRunner {
  /**
   * Teste la latence de recherche
   */
  static async testSearchLatency(requestCount: number = 100): Promise<PerformanceTestResult> {
    const latencies: number[] = [];
    let errors = 0;

    console.log(`  Exécution de ${requestCount} requêtes de recherche...`);

    for (let i = 0; i < requestCount; i++) {
      try {
        const queryLength = 10 + Math.floor(Math.random() * 40);
        const latency = await LatencySimulator.simulateSearchQuery(queryLength);
        latencies.push(latency);
      } catch {
        errors++;
      }
    }

    return this.calculateMetrics('Search', latencies, errors, requestCount);
  }

  /**
   * Teste la latence de ranking
   */
  static async testRankingLatency(requestCount: number = 100): Promise<PerformanceTestResult> {
    const latencies: number[] = [];
    let errors = 0;

    console.log(`  Exécution de ${requestCount} opérations de ranking...`);

    for (let i = 0; i < requestCount; i++) {
      try {
        const itemCount = 20 + Math.floor(Math.random() * 80);
        const latency = await LatencySimulator.simulateRankingOperation(itemCount);
        latencies.push(latency);
      } catch {
        errors++;
      }
    }

    return this.calculateMetrics('Ranking', latencies, errors, requestCount);
  }

  /**
   * Teste la latence de détection de fraude
   */
  static async testFraudDetectionLatency(requestCount: number = 100): Promise<PerformanceTestResult> {
    const latencies: number[] = [];
    let errors = 0;

    console.log(`  Exécution de ${requestCount} vérifications de fraude...`);

    for (let i = 0; i < requestCount; i++) {
      try {
        const signalCount = 5 + Math.floor(Math.random() * 8);
        const latency = await LatencySimulator.simulateFraudDetection(signalCount);
        latencies.push(latency);
      } catch {
        errors++;
      }
    }

    return this.calculateMetrics('Fraud Detection', latencies, errors, requestCount);
  }

  /**
   * Teste le comportement sous charge croissante
   */
  static async testLoadScaling(): Promise<LoadTestResult> {
    const concurrencyLevels = [1, 5, 10, 25, 50];
    const results: LoadTestResult['loadLevels'] = [];

    console.log('  Test de scalabilité avec charge croissante...');

    for (const concurrency of concurrencyLevels) {
      const requestsPerLevel = 100;
      const startTime = Date.now();
      let totalLatency = 0;
      let errorCount = 0;

      // Simuler requêtes concurrentes
      const promises = [];
      for (let i = 0; i < requestsPerLevel; i++) {
        const promise = LatencySimulator.simulateSearchQuery(20)
          .then(latency => { totalLatency += latency; })
          .catch(() => { errorCount++; });
        promises.push(promise);

        // Limiter la concurrence
        if ((i + 1) % concurrency === 0) {
          await Promise.all(promises);
          promises.length = 0;
        }
      }

      const elapsedTime = (Date.now() - startTime) / 1000;

      results.push({
        concurrentRequests: concurrency,
        avgLatencyMs: totalLatency / requestsPerLevel,
        throughputPerSec: requestsPerLevel / elapsedTime,
        errorRate: errorCount / requestsPerLevel,
      });
    }

    return {
      operationName: 'Search Scalability',
      loadLevels: results,
    };
  }

  /**
   * Teste les pics de trafic (spike test)
   */
  static async testSpikeTest(): Promise<PerformanceTestResult> {
    const latencies: number[] = [];
    let errors = 0;

    console.log('  Simulation d\'un pic de trafic...');

    // Normale: 50 requêtes
    for (let i = 0; i < 50; i++) {
      const latency = await LatencySimulator.simulateSearchQuery(20);
      latencies.push(latency);
    }

    // Spike: 500 requêtes rapides
    const spikeStart = Date.now();
    const spikePromises = [];

    for (let i = 0; i < 500; i++) {
      spikePromises.push(
        LatencySimulator.simulateSearchQuery(15)
          .then(latency => latencies.push(latency))
          .catch(() => errors++)
      );
    }

    await Promise.all(spikePromises);

    return this.calculateMetrics('Spike Test', latencies, errors, latencies.length);
  }

  private static calculateMetrics(
    name: string,
    latencies: number[],
    errors: number,
    total: number
  ): PerformanceTestResult {
    latencies.sort((a, b) => a - b);

    const sum = latencies.reduce((a, b) => a + b, 0);
    const avg = sum / latencies.length;
    const min = Math.min(...latencies);
    const max = Math.max(...latencies);

    // Percentiles
    const p50Index = Math.floor(latencies.length * 0.5);
    const p95Index = Math.floor(latencies.length * 0.95);
    const p99Index = Math.floor(latencies.length * 0.99);

    return {
      operationName: name,
      requestCount: total,
      avgLatencyMs: parseFloat(avg.toFixed(2)),
      minLatencyMs: parseFloat(min.toFixed(2)),
      maxLatencyMs: parseFloat(max.toFixed(2)),
      p50LatencyMs: parseFloat(latencies[p50Index].toFixed(2)),
      p95LatencyMs: parseFloat(latencies[p95Index].toFixed(2)),
      p99LatencyMs: parseFloat(latencies[p99Index].toFixed(2)),
      throughputPerSec: parseFloat((1000 / avg).toFixed(2)),
      errorCount: errors,
      errorRate: (errors / total) * 100,
    };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN - EXECUTION DES TESTS DE PERFORMANCE
// ─────────────────────────────────────────────────────────────────────────────

async function runPerformanceTests() {
  console.log('\n' + '═'.repeat(80));
  console.log('⚡ TESTS DE PERFORMANCE: LATENCE & SCALABILITE');
  console.log('═'.repeat(80) + '\n');

  // Tests de latence
  console.log('📊 TEST 1: LATENCE STANDARD\n');

  console.log('Search Operations:');
  const searchResult = await PerformanceTestRunner.testSearchLatency(100);
  printPerformanceMetrics(searchResult);

  console.log('Ranking Operations:');
  const rankingResult = await PerformanceTestRunner.testRankingLatency(100);
  printPerformanceMetrics(rankingResult);

  console.log('Fraud Detection:');
  const fraudResult = await PerformanceTestRunner.testFraudDetectionLatency(100);
  printPerformanceMetrics(fraudResult);

  // Tests de scalabilité
  console.log('\n📈 TEST 2: SCALABILITE SOUS CHARGE\n');
  const scaleResult = await PerformanceTestRunner.testLoadScaling();
  printLoadTestResults(scaleResult);

  // Test de pic
  console.log('\n🔥 TEST 3: TEST DE PIC (SPIKE TEST)\n');
  const spikeResult = await PerformanceTestRunner.testSpikeTest();
  printPerformanceMetrics(spikeResult);

  // Rapport final
  console.log('\n' + '═'.repeat(80));
  console.log('📋 ANALYSE COMPARATIVE\n');

  const allResults = [searchResult, rankingResult, fraudResult];

  console.log('Opération        | Avg (ms) | P95 (ms) | P99 (ms) | Throughput (req/s) | Erreurs (%)');
  console.log('-'.repeat(95));

  for (const result of allResults) {
    const nameFormatted = result.operationName.padEnd(17);
    const avg = result.avgLatencyMs.toString().padEnd(9);
    const p95 = result.p95LatencyMs.toString().padEnd(9);
    const p99 = result.p99LatencyMs.toString().padEnd(9);
    const throughput = result.throughputPerSec.toString().padEnd(19);
    const errorRate = result.errorRate.toFixed(2).padEnd(9);

    console.log(`${nameFormatted}| ${avg}| ${p95}| ${p99}| ${throughput}| ${errorRate}`);
  }

  // Recommandations
  console.log('\n' + '═'.repeat(80));
  console.log('✅ RECOMMANDATIONS DE PERFORMANCE\n');

  const avgLatencies = [searchResult.avgLatencyMs, rankingResult.avgLatencyMs, fraudResult.avgLatencyMs];
  const avgGlobal = avgLatencies.reduce((a, b) => a + b, 0) / avgLatencies.length;

  console.log(`Latence moyenne globale: ${avgGlobal.toFixed(2)}ms`);
  if (avgGlobal < 50) {
    console.log('✅ EXCELLENT - Latence très faible (< 50ms)');
  } else if (avgGlobal < 100) {
    console.log('✅ BON - Latence acceptable (50-100ms)');
  } else if (avgGlobal < 200) {
    console.log('⚠️ ACCEPTABLE - Latence modérée (100-200ms)');
  } else {
    console.log('❌ PROBLEME - Latence élevée (> 200ms)');
  }

  console.log(`\nThroughput cumulé: ${(1000 / avgGlobal).toFixed(0)} requêtes/seconde`);
  console.log(`Capacité estimée: ${Math.floor((1000 / avgGlobal) * 86400)} requêtes/jour\n`);
}

function printPerformanceMetrics(result: PerformanceTestResult) {
  console.log(`  ✓ ${result.requestCount} requêtes exécutées`);
  console.log(`    Latence moyenne:  ${result.avgLatencyMs.toFixed(2)}ms`);
  console.log(`    Latence P50:      ${result.p50LatencyMs.toFixed(2)}ms`);
  console.log(`    Latence P95:      ${result.p95LatencyMs.toFixed(2)}ms`);
  console.log(`    Latence P99:      ${result.p99LatencyMs.toFixed(2)}ms`);
  console.log(`    Min/Max:          ${result.minLatencyMs.toFixed(2)}ms / ${result.maxLatencyMs.toFixed(2)}ms`);
  console.log(`    Throughput:       ${result.throughputPerSec.toFixed(0)} req/s`);
  console.log(`    Taux erreur:      ${result.errorRate.toFixed(2)}%\n`);
}

function printLoadTestResults(result: LoadTestResult) {
  console.log(`  ${result.operationName}:\n`);

  console.log('  Concurrency | Avg Latency (ms) | Throughput (req/s) | Error Rate (%)');
  console.log('  ' + '-'.repeat(75));

  for (const level of result.loadLevels) {
    const concurrency = level.concurrentRequests.toString().padEnd(12);
    const latency = level.avgLatencyMs.toFixed(2).padEnd(17);
    const throughput = level.throughputPerSec.toFixed(2).padEnd(19);
    const errorRate = level.errorRate.toFixed(2);

    console.log(`  ${concurrency}| ${latency}| ${throughput}| ${errorRate}%`);
  }

  console.log();
}

// Exécuter
if (typeof require !== 'undefined' && (require as any).main === module) {
  runPerformanceTests().catch(console.error);
}

export { LatencySimulator, PerformanceTestRunner, runPerformanceTests };

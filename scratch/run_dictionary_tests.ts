const tests: Array<{ name: string; fn: () => void }> = [];
let currentSuite = '';

(global as any).describe = (name: string, fn: () => void) => {
  currentSuite = name;
  fn();
};

(global as any).test = (name: string, fn: () => void) => {
  tests.push({ name: `${currentSuite} > ${name}`, fn });
};

(global as any).expect = (actual: any) => {
  return {
    toBe(expected: any) {
      if (actual !== expected) {
        throw new Error(`Expected ${JSON.stringify(actual)} to be ${JSON.stringify(expected)}`);
      }
    },
    toContainEqual(expected: any) {
      if (!Array.isArray(actual)) {
        throw new Error(`Expected ${JSON.stringify(actual)} to be an array`);
      }
      const found = actual.some(item => {
        return JSON.stringify(item) === JSON.stringify(expected);
      });
      if (!found) {
        throw new Error(`Expected ${JSON.stringify(actual)} to contain item equal to ${JSON.stringify(expected)}`);
      }
    },
    toBeGreaterThan(expected: number) {
      if (!(actual > expected)) {
        throw new Error(`Expected ${JSON.stringify(actual)} to be greater than ${expected}`);
      }
    }
  };
};

require('../lib/darija-dictionary.test');

let passed = 0;
let failed = 0;

console.log('Running Darija Dictionary tests...');
for (const t of tests) {
  try {
    t.fn();
    console.log(`✅ PASSED: ${t.name}`);
    passed++;
  } catch (err: any) {
    console.error(`❌ FAILED: ${t.name}`);
    console.error(err.stack || err);
    failed++;
  }
}

console.log(`\nTest results: ${passed} passed, ${failed} failed`);
if (failed > 0) {
  process.exit(1);
}

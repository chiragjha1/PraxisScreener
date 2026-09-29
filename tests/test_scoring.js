const { calculateRiskTier } = require('../js/scoring.js');
const assert = require('assert');

console.log('Testing calculateRiskTier clinical scoring logic...');

// Test 1: Full NICE NG226 match + CDC STEADI <= 9 reps => HIGH RISK
const res1 = calculateRiskTier(
  { age: 58, painWithActivity: true, morningStiffness: 'under_30', squatStairsDifficulty: 'some' },
  { standReps: 7, rom: 75, smoothness: 3.2 }
);
assert.strictEqual(res1.tier, 'high', 'Patient meeting NICE + low reps must be High Risk');
assert.strictEqual(res1.reasons.length, 3, 'Must provide 3 reasons');
console.log('✓ Test 1 passed (High Risk - NICE + CDC STEADI <= 9 stands)');

// Test 2: Full NICE NG226 match + high reps (> 9) => MODERATE RISK
const res2 = calculateRiskTier(
  { age: 52, painWithActivity: true, morningStiffness: 'under_30', squatStairsDifficulty: 'none' },
  { standReps: 13, rom: 85, smoothness: 2.1 }
);
assert.strictEqual(res2.tier, 'moderate', 'NICE criteria met with good functional reserve should be Moderate');
console.log('✓ Test 2 passed (Moderate Risk - NICE criteria met with good reserve)');

// Test 3: Low risk (younger, no pain, good reps) => LOW RISK
const res3 = calculateRiskTier(
  { age: 36, painWithActivity: false, morningStiffness: 'under_30', squatStairsDifficulty: 'none' },
  { standReps: 15, rom: 90, smoothness: 1.8 }
);
assert.strictEqual(res3.tier, 'low', 'Young, pain free, good functional reps must be Low Risk');
console.log('✓ Test 3 passed (Low Risk - Young, pain free, active)');

// Test 4: Atypical stiffness (>=30 min) + low reps => MODERATE RISK
const res4 = calculateRiskTier(
  { age: 60, painWithActivity: true, morningStiffness: 'over_30', squatStairsDifficulty: 'some' },
  { standReps: 8, rom: 65, smoothness: 3.0 }
);
assert.strictEqual(res4.tier, 'moderate', 'Over 30m stiffness with low reps is Moderate (inflammatory flag)');
console.log('✓ Test 4 passed (Moderate Risk - Morning stiffness >=30m flag)');

// Test 5: Severe functional impairment with severe rep deficit (reps <= 6)
const res5 = calculateRiskTier(
  { age: 62, painWithActivity: true, morningStiffness: 'over_30', squatStairsDifficulty: 'unable' },
  { standReps: 4, rom: 48, smoothness: 4.5 }
);
assert.strictEqual(res5.tier, 'high', 'Severe functional limitation (4 stands + unable to squat) is High Risk');
console.log('✓ Test 5 passed (High Risk - Severe functional deficit)');

console.log('All scoring unit tests passed successfully!');

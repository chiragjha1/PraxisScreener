/**
 * Clinical Scoring Engine - PraxisScreener
 * 
 * Implements a transparent, rule-based clinical scoring algorithm combining:
 * 1. NICE Guideline NG226:
 *    - Clinical diagnosis of osteoarthritis without imaging: Age >= 45,
 *      activity-related joint pain, morning stiffness <= 30 minutes.
 * 2. OARSI 30-Second Chair Stand Protocol (Dobson et al., 2013, Osteoarthritis and Cartilage):
 *    - Standardized functional test measuring lower-limb strength and endurance.
 * 3. CDC STEADI Fall-Risk Toolkit Threshold:
 *    - Cutoff: <= 9 stands in 30 seconds flags low lower-body functional capacity.
 *    - NOTE: Used here as a practical, validated proxy for functional deficit in community screening,
 *      not an OA-specific diagnostic cutoff.
 * 4. Supplementary Functional & Biomechanical Signals:
 *    - Stair climbing / deep squatting difficulty.
 *    - Knee Range of Motion (ROM) and movement smoothness.
 */

/**
 * Calculates the clinical risk tier and produces plain, specific reasons and guidance.
 * 
 * @param {Object} intake - Clinical intake data
 * @param {number} intake.age - Patient age in years
 * @param {boolean} intake.painWithActivity - True if joint pain worsens with activity
 * @param {string} intake.morningStiffness - 'under_30' | 'over_30'
 * @param {string} intake.squatStairsDifficulty - 'none' | 'some' | 'unable'
 * 
 * @param {Object} movement - Movement test biomechanical metrics
 * @param {number} movement.standReps - Completed chair stand repetitions in 30 seconds
 * @param {number} [movement.rom] - Knee Range of Motion in degrees (max - min angle)
 * @param {number} [movement.smoothness] - Average frame-to-frame angular delta
 * @param {number} [movement.maxAngle] - Peak knee extension angle in degrees
 * @param {number} [movement.minAngle] - Peak knee flexion angle in degrees
 * 
 * @returns {Object} Result containing tier ('low'|'moderate'|'high'), reasons array, and guidance array.
 */
function calculateRiskTier(intake, movement) {
  const age = Number(intake.age) || 0;
  const painWithActivity = Boolean(intake.painWithActivity);
  const morningStiffness = intake.morningStiffness; // 'under_30' | 'over_30'
  const squatStairs = intake.squatStairsDifficulty || 'none'; // 'none' | 'some' | 'unable'
  
  const standReps = Number(movement.standReps) || 0;
  const rom = movement.rom !== undefined ? Number(movement.rom) : null;
  const smoothness = movement.smoothness !== undefined ? Number(movement.smoothness) : null;

  // --- RULE 1: NICE NG226 Clinical OA Criteria ---
  // Age >= 45 AND activity-induced pain AND morning stiffness under 30 minutes
  const meetsAge = age >= 45;
  const meetsPain = painWithActivity;
  const meetsStiffness = morningStiffness === 'under_30';
  const meetsNiceCriteria = meetsAge && meetsPain && meetsStiffness;

  // --- RULE 2: CDC STEADI Functional Capacity Benchmark (OARSI 30s chair stand) ---
  // <= 9 stands indicates compromised lower extremity strength / functional deficit
  const hasLowFunctionalStands = standReps <= 9;
  const hasSevereFunctionalStands = standReps <= 6;

  // --- RULE 3: Supplementary Physical Impairment Signals ---
  const hasStairSquatImpairment = squatStairs === 'unable' || squatStairs === 'some';
  const hasRestrictedRom = rom !== null && rom < 60; // Less than 60 deg functional knee ROM

  // --- DETERMINE RISK TIER ---
  let tier = 'low';
  const reasons = [];

  if (meetsNiceCriteria) {
    if (hasLowFunctionalStands || squatStairs === 'unable' || hasRestrictedRom) {
      // Full NICE criteria + demonstrated lower body functional impairment
      tier = 'high';
    } else {
      // Full NICE criteria, but functional reserve is preserved (> 9 stands, minimal difficulty)
      tier = 'moderate';
    }
  } else {
    // Does not meet complete NICE triage triad
    const partialRiskCount = (meetsAge ? 1 : 0) + (meetsPain ? 1 : 0) + (meetsStiffness ? 1 : 0);

    if (hasSevereFunctionalStands && (meetsPain || meetsAge)) {
      // Severe functional deficit with joint pain or older age
      tier = 'high';
    } else if (hasLowFunctionalStands || hasStairSquatImpairment || partialRiskCount >= 2) {
      // Significant functional limitation or 2 out of 3 clinical signs
      tier = 'moderate';
    } else {
      // Good functional capacity and low clinical signs
      tier = 'low';
    }
  }

  // --- ASSEMBLE 2-3 SHORT, ICON-PAIRED CLINICAL REASONS ---
  // Every reason is specific, referencing actual patient figures and thresholds

  // Reason 1: Movement Test finding (Dobson et al. 2013 / CDC STEADI)
  if (hasLowFunctionalStands) {
    reasons.push({
      icon: 'directions_run',
      text: `${standReps} stands in 30s (low function, ≤9 cutoff)`
    });
  } else {
    reasons.push({
      icon: 'directions_run',
      text: `${standReps} stands in 30s (healthy functional strength)`
    });
  }

  // Reason 2: NICE NG226 Symptoms & Age finding
  if (meetsNiceCriteria) {
    reasons.push({
      icon: 'fact_check',
      text: `Age ${age}, activity pain & <30m morning stiffness meet NICE NG226 criteria`
    });
  } else if (morningStiffness === 'over_30') {
    reasons.push({
      icon: 'schedule',
      text: `Morning stiffness ≥ 30 min (suggests inflammatory or advanced involvement)`
    });
  } else if (meetsPain) {
    reasons.push({
      icon: 'accessibility_new',
      text: `Pain worsens with movement (common mechanical OA indicator)`
    });
  } else if (meetsAge) {
    reasons.push({
      icon: 'person',
      text: `Age ${age} (≥45 clinical risk age threshold)`
    });
  } else {
    reasons.push({
      icon: 'verified',
      text: `No activity-aggravated joint pain reported`
    });
  }

  // Reason 3: Supplementary functional or biomechanical finding
  if (squatStairs === 'unable') {
    reasons.push({
      icon: 'stairs',
      text: `Severe difficulty with squatting and stairs`
    });
  } else if (hasRestrictedRom) {
    reasons.push({
      icon: 'straighten',
      text: `Restricted knee ROM (${Math.round(rom)}° detected)`
    });
  } else if (squatStairs === 'some') {
    reasons.push({
      icon: 'stairs',
      text: `Mild to moderate difficulty climbing stairs or squatting`
    });
  } else {
    reasons.push({
      icon: 'check_circle',
      text: `No difficulty climbing stairs or squatting`
    });
  }

  // Limit to 3 most relevant reasons
  const topReasons = reasons.slice(0, 3);

  // --- NICE NG226 FIRST-LINE PREVENTATIVE GUIDANCE ---
  const guidance = [
    {
      icon: 'fitness_center',
      text: 'Gentle daily knee-strengthening movement (exercise, not rest)'
    },
    {
      icon: 'monitor_weight',
      text: 'Healthy weight management to reduce knee joint load'
    },
    {
      icon: 'chair',
      text: 'Use a low stool instead of deep squatting for floor tasks'
    }
  ];

  return {
    tier, // 'low' | 'moderate' | 'high'
    reps: standReps,
    meetsNiceCriteria,
    reasons: topReasons,
    guidance: guidance,
    metrics: {
      standReps,
      rom: rom !== null ? Math.round(rom) : null,
      smoothness: smoothness !== null ? Number(smoothness.toFixed(1)) : null,
      maxAngle: movement.maxAngle !== undefined ? Math.round(movement.maxAngle) : null,
      minAngle: movement.minAngle !== undefined ? Math.round(movement.minAngle) : null
    }
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { calculateRiskTier };
}

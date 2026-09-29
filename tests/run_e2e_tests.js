const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const PORT = 3000;
const ROOT_DIR = path.resolve(__dirname, '..');
const SCREENSHOT_DIR = path.resolve(ROOT_DIR, 'screenshots');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(ROOT_DIR, reqPath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

async function runTests() {
  server.listen(PORT, async () => {
    console.log(`Server listening on http://localhost:${PORT}`);

    const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

    const browser = await puppeteer.launch({
      executablePath: chromePath,
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--autoplay-policy=no-user-gesture-required',
        '--use-fake-ui-for-media-stream',
        '--use-fake-device-for-media-stream'
      ]
    });

    const page = await browser.newPage();
    // Emulate mobile phone viewport (390x844)
    await page.setViewport({
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true
    });

    console.log('Navigating to PraxisScreener...');
    await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'networkidle0' });

    // Verify Title & Header
    const title = await page.title();
    console.log(`Page title: ${title}`);
    if (title !== 'PraxisScreener') {
      throw new Error(`Expected title 'PraxisScreener', got '${title}'`);
    }

    // --- SCREEN 1: INTAKE ---
    console.log('1. Testing Screen 1: Clinical Intake (Compact layout)...');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_screen_intake.png') });
    console.log('Saved 01_screen_intake.png');

    // Test Screener Guide Modal
    console.log('Opening Screener Reference Guide Modal...');
    await page.click('#btn-open-guide');
    await new Promise(r => setTimeout(r, 300));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01d_screener_guide_modal.png') });
    console.log('Saved 01d_screener_guide_modal.png');

    // Close Modal
    await page.click('#btn-close-guide');
    await new Promise(r => setTimeout(r, 200));

    // Test Language Switcher (Hindi)
    await page.select('#lang-select', 'hi');
    await new Promise(r => setTimeout(r, 200));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01b_screen_intake_hindi.png') });
    console.log('Saved 01b_screen_intake_hindi.png');

    // Test Language Switcher (Assamese)
    await page.select('#lang-select', 'as');
    await new Promise(r => setTimeout(r, 200));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01c_screen_intake_assamese.png') });
    console.log('Saved 01c_screen_intake_assamese.png');

    // Switch back to English
    await page.select('#lang-select', 'en');
    await new Promise(r => setTimeout(r, 200));

    // Fill Intake Form (Age 54, Activity pain = Yes, Morning stiffness = <30m, Squat/stairs = Some difficulty)
    await page.type('#input-age', '54');
    await page.click('#pain-yes');
    await page.click('#stiff-under');
    await page.click('#squat-some');

    // Submit form to go to Movement screen
    console.log('Submitting intake form...');
    await page.click('button[type="submit"]');
    await new Promise(r => setTimeout(r, 400));

    // --- SCREEN 2: MOVEMENT TEST ---
    console.log('2. Testing Screen 2: Movement Test...');
    // Step 2a: Permission Explainer
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02a_movement_permission.png') });
    console.log('Saved 02a_movement_permission.png');

    // Transition to Instructions screen (simulating accepted camera permission)
    await page.evaluate(() => {
      document.getElementById('movement-step-permission').classList.add('hidden');
      document.getElementById('movement-step-instructions').classList.remove('hidden');
    });
    await new Promise(r => setTimeout(r, 300));

    // Step 2b: Shooting Rules Card & Instructions & Arm Push-off disclosure
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02b_movement_instructions.png') });
    console.log('Saved 02b_movement_instructions.png');

    // Step 2c: Start Movement Test & Show Live HUD with Reps & Knee Angle
    console.log('Testing live movement test HUD...');
    await page.evaluate(() => {
      document.getElementById('movement-step-instructions').classList.add('hidden');
      const stepLive = document.getElementById('movement-step-live');
      stepLive.classList.remove('hidden');

      const timerDisplay = document.getElementById('live-timer');
      const repsDisplay = document.getElementById('live-reps');
      const angleDisplay = document.getElementById('live-angle');
      const statusDisplay = document.getElementById('live-status');
      const guidanceText = document.getElementById('live-guidance-text');
      const guidancePill = document.getElementById('live-guidance-pill');

      timerDisplay.textContent = '19s';
      repsDisplay.textContent = '7';
      angleDisplay.textContent = '165°';
      statusDisplay.textContent = 'Standing';
      statusDisplay.className = 'status-pill status-standing';
      guidanceText.textContent = 'Side profile detected — Ready!';
      guidancePill.className = 'live-guidance-pill guidance-success';

      // Draw synthetic skeleton on live canvas
      const canvas = document.getElementById('live-canvas');
      canvas.width = 390;
      canvas.height = 292;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw side silhouette guide box
      ctx.save();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 6]);
      ctx.strokeRect(canvas.width * 0.15, canvas.height * 0.08, canvas.width * 0.70, canvas.height * 0.84);
      ctx.restore();

      // Draw skeleton lines in brand cyan (#38bdf8)
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#38bdf8';
      ctx.fillStyle = '#0284c7';

      // Hip -> Knee -> Ankle
      const hip = { x: 195, y: 110 };
      const knee = { x: 215, y: 190 };
      const ankle = { x: 200, y: 260 };

      ctx.beginPath();
      ctx.moveTo(hip.x, hip.y);
      ctx.lineTo(knee.x, knee.y);
      ctx.lineTo(ankle.x, ankle.y);
      ctx.stroke();

      // Joints
      [hip, knee, ankle].forEach(pt => {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 8, 0, 2 * Math.PI);
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();
      });

      // Angle callout
      ctx.fillStyle = '#fde047';
      ctx.font = 'bold 15px sans-serif';
      ctx.fillText('165° (Extension)', knee.x + 15, knee.y);
    });

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02c_movement_live_active.png') });
    console.log('Saved 02c_movement_live_active.png');

    // --- SCREEN 3: RESULTS SCREEN ---
    console.log('3. Testing Screen 3: Results...');
    await page.evaluate(() => {
      const intakeData = {
        age: 54,
        painWithActivity: true,
        morningStiffness: 'under_30',
        squatStairsDifficulty: 'some'
      };
      const movementData = {
        standReps: 7,
        rom: 78,
        smoothness: 2.8,
        maxAngle: 168,
        minAngle: 90
      };

      const result = calculateRiskTier(intakeData, movementData);
      
      const screenMovement = document.getElementById('screen-movement');
      const screenResults = document.getElementById('screen-results');
      screenMovement.classList.remove('active');
      screenResults.classList.add('active');

      const resultCard = document.getElementById('result-card');
      const resultTierIcon = document.getElementById('result-tier-icon');
      const resultTierText = document.getElementById('result-tier-text');
      const resultStandsText = document.getElementById('result-stands-text');
      const findingsList = document.getElementById('findings-list');
      const guidanceList = document.getElementById('guidance-list');
      const metricRom = document.getElementById('metric-rom-val');
      const metricSmoothness = document.getElementById('metric-smoothness-val');
      const metricAngles = document.getElementById('metric-angles-val');

      resultCard.className = `result-banner tier-${result.tier}`;
      resultTierIcon.textContent = result.tier === 'high' ? 'error' : (result.tier === 'moderate' ? 'warning' : 'check_circle');
      resultTierText.textContent = result.tier === 'high' ? 'High Risk' : (result.tier === 'moderate' ? 'Moderate Risk' : 'Low Risk');
      resultStandsText.textContent = `${result.reps} stands in 30 seconds`;

      findingsList.innerHTML = '';
      result.reasons.forEach(r => {
        findingsList.innerHTML += `<li class="reason-item"><span class="material-symbols-outlined reason-icon">${r.icon}</span><span class="reason-text">${r.text}</span></li>`;
      });

      guidanceList.innerHTML = '';
      result.guidance.forEach(g => {
        guidanceList.innerHTML += `<li class="guidance-item"><span class="material-symbols-outlined guidance-icon">${g.icon}</span><span class="guidance-text">${g.text}</span></li>`;
      });

      metricRom.textContent = `${result.metrics.rom}°`;
      metricSmoothness.textContent = `${result.metrics.smoothness}°/f`;
      metricAngles.textContent = `${result.metrics.maxAngle}° / ${result.metrics.minAngle}°`;

      const records = [{
        id: 'PS_' + Date.now(),
        dateFormatted: 'Sep 29, 2026, 08:05 PM',
        intake: intakeData,
        movement: movementData,
        tier: result.tier,
        reps: result.reps,
        reasons: result.reasons
      }];
      localStorage.setItem('praxisscreener_records', JSON.stringify(records));
    });

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_screen_results.png') });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_screen_results_full.png'), fullPage: true });
    console.log('Saved 03_screen_results.png and 03_screen_results_full.png');

    // --- SCREEN 4: HISTORY SCREEN ---
    console.log('4. Testing Screen 4: History...');
    await page.click('#nav-history');
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_screen_history.png') });
    console.log('Saved 04_screen_history.png');

    // --- LANDSCAPE TESTING ---
    console.log('5. Testing Landscape Viewport (844x390)...');
    await page.setViewport({
      width: 844,
      height: 390,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true
    });
    await page.click('#nav-intake');
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05_screen_landscape.png') });
    console.log('Saved 05_screen_landscape.png');

    await browser.close();
    server.close();
    console.log('All updated mobile tests completed and screenshots saved!');
    process.exit(0);
  });
}

runTests().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});

/**
 * PraxisScreener - Application Controller
 * Manages screen navigation, intake validation, movement orchestration,
 * rule-based scoring, localStorage persistence, and multi-language support.
 */

(function () {
  'use strict';

  // Global app state
  const state = {
    currentLanguage: 'en',
    currentScreen: 'screen-intake',
    intakeData: null,
    movementData: null,
    currentResult: null,
    testController: null
  };

  const STORAGE_KEY = 'praxisscreener_records';

  // DOM Elements
  const screens = {
    intake: document.getElementById('screen-intake'),
    movement: document.getElementById('screen-movement'),
    results: document.getElementById('screen-results'),
    history: document.getElementById('screen-history')
  };

  // Nav buttons
  const navBtns = {
    intake: document.getElementById('nav-intake'),
    history: document.getElementById('nav-history')
  };

  // Language buttons
  const langSelect = document.getElementById('lang-select');

  // Screener Guide Modal Elements
  const btnOpenGuide = document.getElementById('btn-open-guide');
  const btnCloseGuide = document.getElementById('btn-close-guide');
  const btnCloseGuideFooter = document.getElementById('btn-close-guide-footer');
  const guideModal = document.getElementById('guide-modal');

  // Intake Form Elements
  const formIntake = document.getElementById('form-intake');
  const inputAge = document.getElementById('input-age');
  const inputPainYes = document.getElementById('pain-yes');
  const inputPainNo = document.getElementById('pain-no');
  const inputStiffUnder = document.getElementById('stiff-under');
  const inputStiffOver = document.getElementById('stiff-over');
  const inputSquatNone = document.getElementById('squat-none');
  const inputSquatSome = document.getElementById('squat-some');
  const inputSquatUnable = document.getElementById('squat-unable');
  const intakeError = document.getElementById('intake-error');

  // Movement Screen Elements
  const stepPerm = document.getElementById('movement-step-permission');
  const stepInst = document.getElementById('movement-step-instructions');
  const stepLive = document.getElementById('movement-step-live');
  const stepError = document.getElementById('movement-step-error');

  const btnEnableCam = document.getElementById('btn-enable-camera');
  const btnStartTest = document.getElementById('btn-start-test');
  const btnStopTest = document.getElementById('btn-stop-test');
  const btnRetryCam = document.getElementById('btn-retry-camera');
  const btnDemoMode = document.getElementById('btn-demo-mode');
  const btnDemoLive = document.getElementById('btn-demo-live');

  const liveVideo = document.getElementById('live-video');
  const liveCanvas = document.getElementById('live-canvas');
  const timerDisplay = document.getElementById('live-timer');
  const repsDisplay = document.getElementById('live-reps');
  const angleDisplay = document.getElementById('live-angle');
  const statusDisplay = document.getElementById('live-status');
  const liveGuidancePill = document.getElementById('live-guidance-pill');
  const liveGuidanceText = document.getElementById('live-guidance-text');

  // Results Screen Elements
  const resultCard = document.getElementById('result-card');
  const resultTierIcon = document.getElementById('result-tier-icon');
  const resultTierText = document.getElementById('result-tier-text');
  const resultStandsText = document.getElementById('result-stands-text');
  const findingsList = document.getElementById('findings-list');
  const guidanceList = document.getElementById('guidance-list');
  const metricRom = document.getElementById('metric-rom-val');
  const metricSmoothness = document.getElementById('metric-smoothness-val');
  const metricAngles = document.getElementById('metric-angles-val');

  const btnSaveRecord = document.getElementById('btn-save-record');
  const btnNewScreening = document.getElementById('btn-new-screening');

  // History Elements
  const historyList = document.getElementById('history-list');
  const historyEmpty = document.getElementById('history-empty');
  const btnClearHistory = document.getElementById('btn-clear-history');

  // ==========================================================================
  // INITIALIZATION
  // ==========================================================================
  function init() {
    const savedLang = localStorage.getItem('praxisscreener_lang') || 'en';
    setLanguage(savedLang);

    setupNavigationListeners();
    setupGuideModalListeners();
    setupIntakeListeners();
    setupMovementListeners();
    setupResultListeners();
    setupHistoryListeners();

    window.addEventListener('resize', syncCanvasDimensions);

    showScreen('screen-intake');
  }

  // ==========================================================================
  // SCREEN NAVIGATION
  // ==========================================================================
  function showScreen(screenId) {
    state.currentScreen = screenId;
    Object.values(screens).forEach((screen) => {
      if (screen) screen.classList.remove('active');
    });

    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add('active');
      window.scrollTo(0, 0);
    }

    if (screenId !== 'screen-movement' && state.testController) {
      state.testController.stopCamera();
    }

    if (screenId === 'screen-history') {
      renderHistoryList();
    }

    if (navBtns.intake) navBtns.intake.classList.toggle('nav-active', screenId === 'screen-intake');
    if (navBtns.history) navBtns.history.classList.toggle('nav-active', screenId === 'screen-history');
  }

  function setupNavigationListeners() {
    if (navBtns.intake) {
      navBtns.intake.addEventListener('click', () => {
        showScreen('screen-intake');
      });
    }

    if (navBtns.history) {
      navBtns.history.addEventListener('click', () => {
        showScreen('screen-history');
      });
    }

    if (langSelect) {
      langSelect.addEventListener('change', (e) => {
        setLanguage(e.target.value);
      });
    }
  }

  // ==========================================================================
  // SCREENER GUIDE MODAL CONTROLLER
  // ==========================================================================
  function setupGuideModalListeners() {
    if (btnOpenGuide) {
      btnOpenGuide.addEventListener('click', () => {
        if (guideModal) guideModal.classList.remove('hidden');
      });
    }

    const btnGuidePerm = document.getElementById('btn-guide-perm');
    if (btnGuidePerm) {
      btnGuidePerm.addEventListener('click', () => {
        if (guideModal) guideModal.classList.remove('hidden');
      });
    }

    const closeGuide = () => {
      if (guideModal) guideModal.classList.add('hidden');
    };

    if (btnCloseGuide) btnCloseGuide.addEventListener('click', closeGuide);
    if (btnCloseGuideFooter) btnCloseGuideFooter.addEventListener('click', closeGuide);

    if (guideModal) {
      guideModal.addEventListener('click', (e) => {
        if (e.target === guideModal) closeGuide();
      });
    }
  }

  // ==========================================================================
  // MULTI-LANGUAGE LOCALIZATION
  // ==========================================================================
  function setLanguage(lang) {
    if (!translations[lang]) lang = 'en';
    state.currentLanguage = lang;
    localStorage.setItem('praxisscreener_lang', lang);

    if (langSelect) {
      langSelect.value = lang;
    }

    const dict = translations[lang];

    document.querySelectorAll('[data-i18n]').forEach((elem) => {
      const key = elem.getAttribute('data-i18n');
      if (dict[key]) {
        elem.textContent = dict[key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((elem) => {
      const key = elem.getAttribute('data-i18n-placeholder');
      if (dict[key]) {
        elem.setAttribute('placeholder', dict[key]);
      }
    });

    if (state.currentResult && state.currentScreen === 'screen-results') {
      renderResults(state.currentResult);
    }
  }

  function t(key) {
    const dict = translations[state.currentLanguage] || translations.en;
    return dict[key] || key;
  }

  // ==========================================================================
  // SCREEN 1: INTAKE CONTROLLER
  // ==========================================================================
  function setupIntakeListeners() {
    formIntake.addEventListener('submit', (e) => {
      e.preventDefault();

      const age = parseInt(inputAge.value, 10);
      const painYes = inputPainYes.checked;
      const painNo = inputPainNo.checked;
      const stiffUnder = inputStiffUnder.checked;
      const stiffOver = inputStiffOver.checked;
      const squatNone = inputSquatNone.checked;
      const squatSome = inputSquatSome.checked;
      const squatUnable = inputSquatUnable.checked;

      if (isNaN(age) || age < 1 || age > 120 || (!painYes && !painNo) || (!stiffUnder && !stiffOver) || (!squatNone && !squatSome && !squatUnable)) {
        intakeError.textContent = t('validation_fill_all');
        intakeError.classList.remove('hidden');
        return;
      }

      intakeError.classList.add('hidden');

      state.intakeData = {
        age: age,
        painWithActivity: painYes,
        morningStiffness: stiffUnder ? 'under_30' : 'over_30',
        squatStairsDifficulty: squatUnable ? 'unable' : (squatSome ? 'some' : 'none')
      };

      openMovementScreen();
    });
  }

  // ==========================================================================
  // SCREEN 2: MOVEMENT TEST CONTROLLER
  // ==========================================================================
  function openMovementScreen() {
    showScreen('screen-movement');
    setMovementStep('permission');

    if (!state.testController) {
      state.testController = new MovementTestController({
        videoElement: liveVideo,
        canvasElement: liveCanvas,
        onTick: updateMovementLiveHUD,
        onComplete: onMovementTestCompleted,
        onError: onMovementCameraError,
        onStateChange: onMovementStateChange,
        onGuidancePrompt: onMovementGuidancePrompt
      });
    }

    state.testController.loadPoseModel();
  }

  function setMovementStep(step) {
    stepPerm.classList.toggle('hidden', step !== 'permission');
    stepInst.classList.toggle('hidden', step !== 'instructions');
    stepLive.classList.toggle('hidden', step !== 'live');
    stepError.classList.toggle('hidden', step !== 'error');
  }

  function setupMovementListeners() {
    btnEnableCam.addEventListener('click', async () => {
      btnEnableCam.disabled = true;
      btnEnableCam.textContent = '...';
      const success = await state.testController.startCamera();
      btnEnableCam.disabled = false;
      btnEnableCam.textContent = t('btn_allow_camera');

      if (success) {
        setMovementStep('instructions');
        syncCanvasDimensions();
      } else {
        setMovementStep('error');
      }
    });

    btnRetryCam.addEventListener('click', async () => {
      const success = await state.testController.startCamera();
      if (success) {
        setMovementStep('instructions');
        syncCanvasDimensions();
      } else {
        setMovementStep('error');
      }
    });

    const triggerDemo = () => {
      setMovementStep('live');
      syncCanvasDimensions();
      state.testController.startTest(true);
    };

    if (btnDemoMode) btnDemoMode.addEventListener('click', triggerDemo);
    if (btnDemoLive) btnDemoLive.addEventListener('click', triggerDemo);

    btnStartTest.addEventListener('click', () => {
      setMovementStep('live');
      syncCanvasDimensions();
      state.testController.startTest(false);
    });

    btnStopTest.addEventListener('click', () => {
      state.testController.finishTest();
    });
  }

  function syncCanvasDimensions() {
    if (liveVideo && liveCanvas) {
      const w = liveVideo.videoWidth || liveVideo.clientWidth || 360;
      const h = liveVideo.videoHeight || liveVideo.clientHeight || 480;
      liveCanvas.width = w;
      liveCanvas.height = h;
    }
  }

  function updateMovementLiveHUD(data) {
    if (timerDisplay) timerDisplay.textContent = `${data.timeRemaining}s`;
    if (repsDisplay) repsDisplay.textContent = `${data.reps}`;
    if (angleDisplay) angleDisplay.textContent = `${data.currentAngle}°`;

    if (statusDisplay) {
      if (data.position === 'standing') {
        statusDisplay.textContent = t('status_standing');
        statusDisplay.className = 'status-pill status-standing';
      } else if (data.position === 'seated') {
        statusDisplay.textContent = t('status_seated');
        statusDisplay.className = 'status-pill status-seated';
      } else {
        statusDisplay.textContent = t('status_moving');
        statusDisplay.className = 'status-pill status-moving';
      }
    }
  }

  function onMovementGuidancePrompt(prompt) {
    if (liveGuidanceText && liveGuidancePill) {
      liveGuidanceText.textContent = t(prompt.key);
      liveGuidancePill.className = `live-guidance-pill guidance-${prompt.level}`;
    }
  }

  function onMovementStateChange(event) {
    const statusMsg = document.getElementById('movement-hud-status');
    if (!statusMsg) return;

    if (event.status === 'loading_model') {
      statusMsg.textContent = t('model_loading');
    } else if (event.status === 'model_ready') {
      statusMsg.textContent = '';
    }
  }

  function onMovementCameraError(err) {
    console.warn('Camera error caught:', err);
    setMovementStep('error');
  }

  function onMovementTestCompleted(movementSummary) {
    state.movementData = movementSummary;

    const result = calculateRiskTier(state.intakeData, state.movementData);
    state.currentResult = result;

    renderResults(result);
    showScreen('screen-results');
  }

  // ==========================================================================
  // SCREEN 3: RESULTS CONTROLLER
  // ==========================================================================
  function renderResults(result) {
    const tier = result.tier;

    resultCard.className = `result-banner tier-${tier}`;

    if (tier === 'low') {
      resultTierIcon.textContent = 'check_circle';
      resultTierText.textContent = t('risk_low');
    } else if (tier === 'moderate') {
      resultTierIcon.textContent = 'warning';
      resultTierText.textContent = t('risk_moderate');
    } else {
      resultTierIcon.textContent = 'error';
      resultTierText.textContent = t('risk_high');
    }

    resultStandsText.textContent = `${result.reps} ${t('stands_result_suffix')}`;

    findingsList.innerHTML = '';
    result.reasons.forEach((reason) => {
      const li = document.createElement('li');
      li.className = 'reason-item';
      li.innerHTML = `
        <span class="material-symbols-outlined reason-icon">${reason.icon}</span>
        <span class="reason-text">${escapeHtml(reason.text)}</span>
      `;
      findingsList.appendChild(li);
    });

    guidanceList.innerHTML = '';
    result.guidance.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'guidance-item';
      li.innerHTML = `
        <span class="material-symbols-outlined guidance-icon">${item.icon}</span>
        <span class="guidance-text">${escapeHtml(item.text)}</span>
      `;
      guidanceList.appendChild(li);
    });

    if (metricRom) metricRom.textContent = result.metrics.rom ? `${result.metrics.rom}°` : '--';
    if (metricSmoothness) metricSmoothness.textContent = result.metrics.smoothness ? `${result.metrics.smoothness}°/f` : '--';
    if (metricAngles) {
      if (result.metrics.maxAngle !== null && result.metrics.minAngle !== null) {
        metricAngles.textContent = `${result.metrics.maxAngle}° / ${result.metrics.minAngle}°`;
      } else {
        metricAngles.textContent = '--';
      }
    }
  }

  function setupResultListeners() {
    btnSaveRecord.addEventListener('click', () => {
      saveCurrentScreening();
      btnSaveRecord.disabled = true;
      btnSaveRecord.textContent = t('record_saved');
      setTimeout(() => {
        btnSaveRecord.disabled = false;
        btnSaveRecord.textContent = t('btn_save_record');
        showScreen('screen-history');
      }, 1000);
    });

    btnNewScreening.addEventListener('click', () => {
      resetForNewScreening();
      showScreen('screen-intake');
    });
  }

  function resetForNewScreening() {
    state.intakeData = null;
    state.movementData = null;
    state.currentResult = null;
    formIntake.reset();
  }

  function saveCurrentScreening() {
    if (!state.currentResult) return;

    const record = {
      id: 'PS_' + Date.now(),
      timestamp: Date.now(),
      dateFormatted: new Date().toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      intake: state.intakeData,
      movement: state.movementData,
      tier: state.currentResult.tier,
      reps: state.currentResult.reps,
      reasons: state.currentResult.reasons
    };

    const existing = getStoredRecords();
    existing.unshift(record);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  }

  function getStoredRecords() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  // ==========================================================================
  // SCREEN 4: HISTORY CONTROLLER
  // ==========================================================================
  function renderHistoryList() {
    const records = getStoredRecords();

    if (records.length === 0) {
      historyEmpty.classList.remove('hidden');
      historyList.innerHTML = '';
      if (btnClearHistory) btnClearHistory.classList.add('hidden');
      return;
    }

    historyEmpty.classList.add('hidden');
    if (btnClearHistory) btnClearHistory.classList.remove('hidden');
    historyList.innerHTML = '';

    records.forEach((rec) => {
      const item = document.createElement('div');
      item.className = 'history-item';

      let tierIcon = 'check_circle';
      let tierColor = 'tier-low';
      let tierLabel = t('risk_low');

      if (rec.tier === 'moderate') {
        tierIcon = 'warning';
        tierColor = 'tier-moderate';
        tierLabel = t('risk_moderate');
      } else if (rec.tier === 'high') {
        tierIcon = 'error';
        tierColor = 'tier-high';
        tierLabel = t('risk_high');
      }

      item.innerHTML = `
        <div class="history-item-top">
          <div class="history-date">
            <span class="material-symbols-outlined">event</span>
            <span>${escapeHtml(rec.dateFormatted || '')}</span>
          </div>
          <div class="history-tier ${tierColor}">
            <span class="material-symbols-outlined">${tierIcon}</span>
            <span>${tierLabel}</span>
          </div>
        </div>
        <div class="history-item-details">
          <div class="history-detail-chip">
            <span class="material-symbols-outlined">person</span>
            <span>${t('patient_age')}: ${rec.intake?.age || '--'}</span>
          </div>
          <div class="history-detail-chip font-bold">
            <span class="material-symbols-outlined">accessibility_new</span>
            <span>${rec.reps} stands / 30s</span>
          </div>
        </div>
      `;

      historyList.appendChild(item);
    });
  }

  function setupHistoryListeners() {
    if (btnClearHistory) {
      btnClearHistory.addEventListener('click', () => {
        if (confirm(t('history_clear_confirm'))) {
          localStorage.removeItem(STORAGE_KEY);
          renderHistoryList();
        }
      });
    }
  }

  function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

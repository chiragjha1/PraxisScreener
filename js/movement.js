/**
 * Movement Test Controller - PraxisScreener
 * 
 * Implements the OARSI-recommended 30-second chair stand test (Dobson et al., 2013, Osteoarthritis and Cartilage).
 * Tracks knee-flexion angle using MediaPipe Pose ("lite" variant) at ~5 fps.
 */

// ============================================================================
// CALIBRATION THRESHOLDS (OARSI 30-Second Chair Stand Protocol)
// NOTE: These angle thresholds are first-pass estimates that need calibrating
// against real recorded footage before they're trustworthy in clinical production.
// ============================================================================
const SEATED_ANGLE_THRESHOLD = 105;   // Knee flexion <= 105° indicates patient is seated
const STANDING_ANGLE_THRESHOLD = 155; // Knee extension >= 155° indicates full upright stand

const PROCESS_INTERVAL_MS = 200; // ~5 fps throttle for low-end Android efficiency
const TEST_DURATION_SECONDS = 30; // Standard 30-second protocol duration

class MovementTestController {
  constructor(options = {}) {
    this.videoElement = options.videoElement;
    this.canvasElement = options.canvasElement;
    this.canvasCtx = this.canvasElement ? this.canvasElement.getContext('2d') : null;
    
    this.onTick = options.onTick || (() => {});
    this.onComplete = options.onComplete || (() => {});
    this.onError = options.onError || (() => {});
    this.onStateChange = options.onStateChange || (() => {});

    this.mediaStream = null;
    this.poseTracker = null;
    this.isModelLoaded = false;
    this.isModelLoading = false;
    this.isTestRunning = false;
    this.isProcessingFrame = false;
    this.lastProcessTimestamp = 0;
    this.isSimulation = false;
    this.simInterval = null;

    // Movement metrics
    this.resetMetrics();
  }

  resetMetrics() {
    this.reps = 0;
    this.hasStoodUp = false; // State machine flag for completed rep cycle
    this.currentPosition = 'seated'; // 'seated' | 'moving' | 'standing'
    this.currentAngle = 0;
    this.anglesHistory = [];
    this.minAngle = 180;
    this.maxAngle = 0;
    this.timeRemaining = TEST_DURATION_SECONDS;
    this.timerId = null;
    this.animationFrameId = null;
  }

  /**
   * Lazy-loads MediaPipe Pose library via CDN only when the Movement Test is entered.
   */
  async loadPoseModel() {
    if (this.isModelLoaded) return true;
    if (this.isModelLoading) return false;

    this.isModelLoading = true;
    this.onStateChange({ status: 'loading_model' });

    try {
      // Check if MediaPipe script is already injected
      if (typeof window.Pose === 'undefined') {
        await this.injectScript('https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1675469404/pose.js');
      }

      this.poseTracker = new window.Pose({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1675469404/${file}`
      });

      // Use "lite" model variant (modelComplexity: 0) for low-end phone performance
      this.poseTracker.setOptions({
        modelComplexity: 0,
        smoothLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
      });

      this.poseTracker.onResults((results) => this.handlePoseResults(results));

      this.isModelLoaded = true;
      this.isModelLoading = false;
      this.onStateChange({ status: 'model_ready' });
      return true;
    } catch (err) {
      console.warn('MediaPipe Pose CDN load warning:', err);
      this.isModelLoading = false;
      // Do not block app: allow camera with simulation or fallback
      this.onStateChange({ status: 'model_load_failed', error: err.message });
      return false;
    }
  }

  injectScript(src) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.crossOrigin = 'anonymous';
      script.onload = () => resolve();
      script.onerror = (e) => reject(new Error(`Failed to load ${src}`));
      document.head.appendChild(script);
    });
  }

  /**
   * Starts the camera stream.
   * Strictly requests REAR/environment camera: facingMode: { ideal: 'environment' }.
   * Does not mirror video preview.
   */
  async startCamera() {
    try {
      // Check if mediaDevices is supported (requires HTTPS or localhost on phones)
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('CAMERA_NOT_SUPPORTED_OR_HTTP');
      }

      // Stop any existing stream
      this.stopCamera();

      // Request REAR camera by default: facingMode: { ideal: 'environment' }
      const constraints = {
        audio: false,
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 640 },
          height: { ideal: 480 }
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.mediaStream = stream;
      this.videoElement.srcObject = stream;
      this.videoElement.playsInline = true;
      this.videoElement.muted = true;
      this.videoElement.autoplay = true;
      
      try {
        await this.videoElement.play();
      } catch (playErr) {
        console.warn('Video play warning:', playErr);
      }

      this.onStateChange({ status: 'camera_active' });
      return true;
    } catch (err) {
      console.error('Camera access error:', err);
      this.onError(err);
      return false;
    }
  }

  /**
   * Stops the camera stream immediately.
   */
  stopCamera() {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch (e) {}
      });
      this.mediaStream = null;
    }
    if (this.videoElement) {
      this.videoElement.srcObject = null;
    }
  }

  /**
   * Calculates the 2D joint angle at vertex B formed by points A-B-C.
   */
  calculateJointAngle(pointA, pointB, pointC) {
    const v1x = pointA.x - pointB.x;
    const v1y = pointA.y - pointB.y;
    const v2x = pointC.x - pointB.x;
    const v2y = pointC.y - pointB.y;

    const dot = v1x * v2x + v1y * v2y;
    const mag1 = Math.sqrt(v1x * v1x + v1y * v1y);
    const mag2 = Math.sqrt(v2x * v2x + v2y * v2y);

    if (mag1 === 0 || mag2 === 0) return 0;
    const cosAngle = Math.max(-1, Math.min(1, dot / (mag1 * mag2)));
    return (Math.acos(cosAngle) * 180) / Math.PI;
  }

  /**
   * Processes MediaPipe Pose detection results.
   */
  handlePoseResults(results) {
    if (!this.isTestRunning) return;

    // Draw visual feedback overlay
    this.renderPoseOverlay(results);

    if (!results.poseLandmarks) return;

    const lm = results.poseLandmarks;
    // Landmark indices:
    // Left side: Hip 23, Knee 25, Ankle 27
    // Right side: Hip 24, Knee 26, Ankle 28
    const leftHip = lm[23];
    const leftKnee = lm[25];
    const leftAnkle = lm[27];

    const rightHip = lm[24];
    const rightKnee = lm[26];
    const rightAnkle = lm[28];

    const leftConf = (leftHip?.visibility || 0) + (leftKnee?.visibility || 0) + (leftAnkle?.visibility || 0);
    const rightConf = (rightHip?.visibility || 0) + (rightKnee?.visibility || 0) + (rightAnkle?.visibility || 0);

    let angle = 0;
    if (leftConf >= rightConf && leftConf > 1.2) {
      angle = this.calculateJointAngle(leftHip, leftKnee, leftAnkle);
    } else if (rightConf > 1.2) {
      angle = this.calculateJointAngle(rightHip, rightKnee, rightAnkle);
    }

    if (angle > 0) {
      this.processAngleSample(angle);
    }
  }

  /**
   * Evaluates a knee flexion angle sample through the rep counting state machine.
   */
  processAngleSample(angle) {
    this.currentAngle = Math.round(angle);
    this.anglesHistory.push(this.currentAngle);

    if (this.currentAngle < this.minAngle) this.minAngle = this.currentAngle;
    if (this.currentAngle > this.maxAngle) this.maxAngle = this.currentAngle;

    // -------------------------------------------------------------
    // REP COUNTING STATE MACHINE:
    // 1 rep = Seated -> Standing (>=155°) -> Seated (<=105°)
    // -------------------------------------------------------------
    if (this.currentAngle >= STANDING_ANGLE_THRESHOLD) {
      this.currentPosition = 'standing';
      this.hasStoodUp = true;
    } else if (this.currentAngle <= SEATED_ANGLE_THRESHOLD) {
      if (this.hasStoodUp) {
        // Full stand-and-sit cycle completed!
        this.reps++;
        this.hasStoodUp = false;
      }
      this.currentPosition = 'seated';
    } else {
      this.currentPosition = 'moving';
    }

    this.onTick({
      timeRemaining: this.timeRemaining,
      reps: this.reps,
      currentAngle: this.currentAngle,
      position: this.currentPosition
    });
  }

  /**
   * Renders pose skeleton overlay on the canvas.
   */
  renderPoseOverlay(results) {
    if (!this.canvasCtx || !this.canvasElement) return;
    const ctx = this.canvasCtx;
    const width = this.canvasElement.width;
    const height = this.canvasElement.height;

    ctx.clearRect(0, 0, width, height);

    if (!results || !results.poseLandmarks) return;
    const lm = results.poseLandmarks;

    // High-contrast color theme matching PraxisScreener logo cyan/blue (#38bdf8 / #0284c7)
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#38bdf8';
    ctx.fillStyle = '#0284c7';

    // Draw leg segments (23-25-27 and 24-26-28)
    const pairs = [
      [23, 25], [25, 27], // Left hip-knee-ankle
      [24, 26], [26, 28], // Right hip-knee-ankle
      [11, 12], [11, 23], [12, 24], [23, 24] // Torso
    ];

    pairs.forEach(([i, j]) => {
      if (lm[i] && lm[j] && (lm[i].visibility || 0) > 0.4 && (lm[j].visibility || 0) > 0.4) {
        ctx.beginPath();
        ctx.moveTo(lm[i].x * width, lm[i].y * height);
        ctx.lineTo(lm[j].x * width, lm[j].y * height);
        ctx.stroke();
      }
    });

    // Draw key joint dots
    [23, 24, 25, 26, 27, 28].forEach((idx) => {
      const pt = lm[idx];
      if (pt && (pt.visibility || 0) > 0.4) {
        ctx.beginPath();
        ctx.arc(pt.x * width, pt.y * height, 7, 0, 2 * Math.PI);
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();
      }
    });
  }

  /**
   * Starts the 30-second chair stand recording test.
   */
  startTest(isSimulation = false) {
    if (this.isTestRunning) return;

    this.resetMetrics();
    this.isTestRunning = true;
    this.isSimulation = isSimulation;
    this.lastProcessTimestamp = 0;

    this.onStateChange({ status: 'test_started' });

    if (this.isSimulation) {
      this.runSimulationLoop();
    } else {
      this.runCameraTrackingLoop();
    }

    // 30-Second countdown timer
    this.timerId = setInterval(() => {
      this.timeRemaining--;

      this.onTick({
        timeRemaining: this.timeRemaining,
        reps: this.reps,
        currentAngle: this.currentAngle,
        position: this.currentPosition
      });

      if (this.timeRemaining <= 0) {
        this.finishTest();
      }
    }, 1000);
  }

  /**
   * Frame-by-frame loop throttled to ~5 fps (200ms) for low-end device efficiency.
   */
  runCameraTrackingLoop() {
    const loop = async (timestamp) => {
      if (!this.isTestRunning) return;

      // Throttle frame processing to PROCESS_INTERVAL_MS (~5 fps)
      if (timestamp - this.lastProcessTimestamp >= PROCESS_INTERVAL_MS) {
        this.lastProcessTimestamp = timestamp;

        if (this.poseTracker && this.videoElement && this.videoElement.readyState >= 2 && !this.isProcessingFrame) {
          this.isProcessingFrame = true;
          try {
            await this.poseTracker.send({ image: this.videoElement });
          } catch (e) {
            console.warn('Frame processing dropped:', e);
          } finally {
            this.isProcessingFrame = false;
          }
        }
      }

      this.animationFrameId = requestAnimationFrame(loop);
    };

    this.animationFrameId = requestAnimationFrame(loop);
  }

  /**
   * Simulation mode for devices without camera or automated testing.
   * Generates realistic biomechanical knee angle cycles (95° <-> 165°).
   */
  runSimulationLoop() {
    let t = 0;
    this.simInterval = setInterval(() => {
      if (!this.isTestRunning) return;
      t += 0.25;
      // Synthesize realistic sit-to-stand periodic wave:
      // Sinusoid between 95° (seated) and 165° (standing), ~3.2s per rep cycle
      const angle = 130 + 35 * Math.sin(t * 1.8);
      this.processAngleSample(angle);
    }, 200);
  }

  /**
   * Concludes the test, calculates summary metrics, and terminates camera immediately.
   */
  finishTest() {
    this.isTestRunning = false;
    clearInterval(this.timerId);
    if (this.simInterval) clearInterval(this.simInterval);
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);

    // Stop camera stream immediately once test ends as required
    this.stopCamera();

    // Compute range of motion & movement smoothness
    const rom = Math.max(0, this.maxAngle - this.minAngle);
    let totalDelta = 0;
    for (let i = 1; i < this.anglesHistory.length; i++) {
      totalDelta += Math.abs(this.anglesHistory[i] - this.anglesHistory[i - 1]);
    }
    const smoothness = this.anglesHistory.length > 1
      ? totalDelta / (this.anglesHistory.length - 1)
      : 0;

    const summary = {
      standReps: this.reps,
      rom: Math.round(rom),
      smoothness: Number(smoothness.toFixed(1)),
      maxAngle: Math.round(this.maxAngle),
      minAngle: Math.round(this.minAngle)
    };

    this.onComplete(summary);
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MovementTestController,
    SEATED_ANGLE_THRESHOLD,
    STANDING_ANGLE_THRESHOLD,
    TEST_DURATION_SECONDS
  };
}

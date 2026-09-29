/**
 * PraxisScreener - Multilingual Translation Dictionary
 * Languages: English (en), Hindi (hi), Assamese (as)
 * 
 * Note: The brand name "PraxisScreener" is immutable across all locales.
 */
const translations = {
  en: {
    app_name: "PraxisScreener",
    tagline: "Early OA Risk Screening for Community Health Workers",
    nav_intake: "Intake",
    nav_movement: "Movement",
    nav_results: "Results",
    nav_history: "History",
    nav_guide: "Guide",
    nav_new: "New",
    
    // Screen 1: Intake
    intake_title: "Clinical Intake",
    intake_subtitle: "NICE Guideline NG226 Assessment",
    age_label: "Patient Age (years)",
    age_placeholder: "Enter age (e.g. 52)",
    age_hint: "Age 45 or older is a primary NICE clinical indicator",
    
    pain_label: "Is your joint pain worse with activity or movement?",
    yes: "Yes",
    no: "No",
    
    stiffness_label: "How long does your morning joint stiffness usually last?",
    stiffness_under_30: "Less than 30 minutes",
    stiffness_over_30: "30 minutes or longer",
    
    supplementary_badge: "Supplementary Functional Item",
    squat_label: "Can you squat down or climb a few stairs without much difficulty?",
    difficulty_none: "Yes (No difficulty)",
    difficulty_some: "Some difficulty",
    difficulty_unable: "No (Unable or severe difficulty)",
    
    btn_next_movement: "Next: Movement Test",
    validation_fill_all: "Please complete all fields to proceed.",
    
    // Screen 2: Movement Test & Camera Setup
    movement_title: "30-Second Chair Stand Test",
    protocol_citation: "OARSI Protocol (Dobson et al., 2013)",
    
    camera_perm_title: "Camera Access Required",
    camera_perm_desc: "Camera access is needed to observe and count chair stand movements in real time.",
    camera_https_notice: "Camera access requires HTTPS or localhost on mobile phones.",
    btn_allow_camera: "Enable Rear Camera",
    
    camera_error_title: "Camera Access Issue",
    camera_error_desc: "Could not access the rear camera. Please verify camera permissions in browser settings.",
    btn_retry_camera: "Retry Camera",
    btn_use_demo: "Try Demo Simulation",
    
    // MIUI / Android Bubble Overlay Error Guidance
    miui_overlay_title: "Seeing 'Close Bubbles on Screen' Error?",
    miui_step_1: "1. Tap the Lock 🔒 or Tune icon in Chrome's address bar",
    miui_step_2: "2. Tap 'Permissions' > 'Camera' > Select 'Allow'",
    miui_step_3: "3. Tap 'Retry Camera' below to start",
    miui_bubble_tip: "Or close any floating chat heads (Messenger, WhatsApp) or MIUI Sidebar in phone Settings.",
    btn_native_video: "Record Video with Phone Camera",
    video_processing: "Processing recorded video...",
    
    // Crucial Camera Angle & Shooting Guide
    shoot_guide_title: "Camera Angle & Shooting Rules",
    shoot_angle_heading: "FILM FROM THE SIDE (Lateral Profile)",
    shoot_angle_desc: "Hold camera directly at the patient's SIDE (90° profile), NEVER from the front. Knee flexion angle can only be detected from the side.",
    shoot_distance_heading: "Distance: 2 to 3 meters (6–10 ft)",
    shoot_distance_desc: "Step back until patient's head, hips, knees, and feet are all fully visible in frame at chair height.",
    shoot_chair_heading: "Armless Chair & Crossed Arms",
    shoot_chair_desc: "Use a sturdy chair with NO armrests. Patient must keep arms crossed over chest throughout.",
    
    arm_disclosure: "This version can't detect if arms were used to help stand up — try to keep arms crossed for an accurate count.",
    btn_start_test: "Start 30-Second Test",
    
    // Live Camera HUD
    time_remaining: "Time",
    reps_completed: "Stands",
    knee_angle: "Knee Angle",
    status_seated: "Seated",
    status_standing: "Standing",
    status_moving: "In Motion",
    btn_stop_test: "Finish Test Early",
    model_loading: "Initializing Pose Tracker (Lite)...",
    test_complete_toast: "Movement test complete!",
    prompt_align_side: "Ensure patient is viewed from the SIDE",
    prompt_step_back: "Step back: keep full body (head to feet) in frame",
    prompt_ready: "Side profile detected — Ready!",
    
    // Screen 3: Results
    results_title: "Screening Results",
    risk_low: "Low Risk",
    risk_moderate: "Moderate Risk",
    risk_high: "High Risk",
    stands_result_suffix: "stands in 30 seconds",
    findings_title: "Key Clinical Findings",
    preventive_title: "Preventative Guidance (NICE NG226)",
    
    prev_exercise: "Gentle daily knee-strengthening movement (exercise, not rest)",
    prev_weight: "Healthy weight management to reduce knee joint load",
    prev_stool: "Use a low stool instead of deep squatting for floor tasks",
    
    metrics_title: "Biomechanical Summary",
    metric_rom: "Range of Motion (ROM)",
    metric_smoothness: "Movement Smoothness",
    metric_ext_flex: "Max / Min Angles",
    
    btn_save_record: "Save to History",
    btn_new_screening: "New Screening",
    record_saved: "Screening saved successfully!",
    
    // Screen 4: History
    history_title: "Saved Screenings",
    history_empty: "No screening records stored on this device yet.",
    history_clear_all: "Clear History",
    history_clear_confirm: "Are you sure you want to delete all saved screening records?",
    patient_age: "Age",
    screened_on: "Screened on",
    view_details: "View Details",

    // Screener Reference Guide
    guide_title: "Screener Reference Guide",
    guide_close: "Close Guide",
    guide_q1_title: "What does '0 stands in 30s' mean?",
    guide_q1_desc: "Clinically, 0 stands means the patient was physically unable to rise from the chair even once without using their arms. This signals severe lower-extremity muscular weakness or advanced joint pathology. Technically, if the patient did stand up but 0 was recorded, the camera was misaligned (e.g. filmed from the front instead of the side, or legs were cut off from the frame).",
    guide_q2_title: "Why must you film from the SIDE?",
    guide_q2_desc: "When viewed from the front, human legs appear straight even when sitting. The computer vision model measures the knee flexion angle (from ~90° seated to ~180° standing), which is only visible from a 90° lateral profile view.",
    guide_q3_title: "What do the stand count cutoffs mean?",
    guide_q3_desc: "CDC STEADI Protocol Cutoff: 9 or fewer completed stands in 30 seconds indicates low lower-body functional capacity and fall risk. 10 or more stands indicates preserved functional strength.",
    guide_q4_title: "Icon Legend",
    guide_icon_stand: "Stands Count (replaces old dumbbell icon with clear chair stand)",
    guide_icon_timer: "30-Second OARSI validated countdown",
    guide_icon_low: "Low Risk: Preserved physical function & negative clinical criteria",
    guide_icon_mod: "Moderate Risk: Partial clinical signs or borderline functional capacity",
    guide_icon_high: "High Risk: NICE NG226 criteria met with low functional stand count (≤9)",
    guide_icon_exercise: "Daily knee-strengthening movement (exercise, not rest)",
    guide_icon_weight: "Healthy weight management to reduce joint load",
    guide_icon_stool: "Use low stool instead of deep squatting for floor tasks"
  },
  
  hi: {
    app_name: "PraxisScreener",
    tagline: "सामुदायिक स्वास्थ्य कार्यकर्ताओं के लिए प्रारंभिक ओस्टियोआर्थराइटिस जांच",
    nav_intake: "प्रश्नावली",
    nav_movement: "गति परीक्षण",
    nav_results: "परिणाम",
    nav_history: "इतिहास",
    nav_guide: "मार्गदर्शिका",
    nav_new: "नई जांच",
    
    // Screen 1: Intake
    intake_title: "नैदानिक प्रश्नावली",
    intake_subtitle: "NICE दिशानिर्देश NG226 मूल्यांकन",
    age_label: "रोगी की आयु (वर्ष)",
    age_placeholder: "आयु दर्ज करें (उदा. 52)",
    age_hint: "45 वर्ष या अधिक आयु NICE का मुख्य नैदानिक संकेत है",
    
    pain_label: "क्या आपका जोड़ों का दर्द गतिविधि या चलने-फिरने से बढ़ता है?",
    yes: "हाँ",
    no: "नहीं",
    
    stiffness_label: "सुबह के समय जोड़ों की अकड़न आमतौर पर कितनी देर रहती है?",
    stiffness_under_30: "30 मिनट से कम",
    stiffness_over_30: "30 मिनट या उससे अधिक",
    
    supplementary_badge: "पूरक कार्यात्मक प्रश्न",
    squat_label: "क्या आप बिना अधिक कठिनाई के उकड़ू बैठ सकते हैं या कुछ सीढ़ियाँ चढ़ सकते हैं?",
    difficulty_none: "हाँ (कोई कठिनाई नहीं)",
    difficulty_some: "कुछ कठिनाई",
    difficulty_unable: "नहीं (असमर्थ या अत्यधिक कठिनाई)",
    
    btn_next_movement: "आगे: गति परीक्षण",
    validation_fill_all: "कृपया आगे बढ़ने के लिए सभी विवरण भरें।",
    
    // Screen 2: Movement Test & Camera Setup
    movement_title: "30-सेकंड कुर्सी पर उठने-बैठने का परीक्षण",
    protocol_citation: "OARSI प्रोटोकॉल (Dobson et al., 2013)",
    
    camera_perm_title: "कैमरा अनुमति आवश्यक",
    camera_perm_desc: "कुर्सी पर उठने-बैठने की गति गिनने के लिए कैमरे की अनुमति आवश्यक है।",
    camera_https_notice: "मोबाइल पर कैमरे के लिए HTTPS या localhost आवश्यक है।",
    btn_allow_camera: "पीछे का कैमरा चालू करें",
    
    camera_error_title: "कैमरा त्रुटि",
    camera_error_desc: "पीछे का कैमरा उपलब्ध नहीं हो सका। कृपया ब्राउज़र अनुमति जांचें।",
    btn_retry_camera: "पुनः प्रयास करें",
    btn_use_demo: "डेमो सिमुलेशन चलाएं",
    
    // MIUI / Android Bubble Overlay Error Guidance
    miui_overlay_title: "'Close Bubbles on Screen' त्रुटि आ रही है?",
    miui_step_1: "1. Chrome एड्रेस बार में लॉक 🔒 या ट्यून आइकन पर टैप करें",
    miui_step_2: "2. 'Permissions' > 'Camera' पर जाकर 'Allow' चुनें",
    miui_step_3: "3. नीचे दिए गए 'पुनः प्रयास करें' पर टैप करें",
    miui_bubble_tip: "या फोन सेटिंग्स में फ़्लोटिंग चैट हेड्स (Messenger, WhatsApp) या MIUI साइडबार बंद करें।",
    btn_native_video: "फ़ोन के कैमरे से वीडियो रिकॉर्ड करें",
    video_processing: "रिकॉर्ड किया गया वीडियो प्रोसेस हो रहा है...",
    
    // Crucial Camera Angle & Shooting Guide
    shoot_guide_title: "कैमरा कोण और शूटिंग नियम",
    shoot_angle_heading: "साइड से वीडियो बनाएं (साइड प्रोफाइल)",
    shoot_angle_desc: "कैमरे को हमेशा रोगी के साइड (बगल) में 90° पर रखें, सामने से कभी नहीं। घुटने का मुड़ना केवल साइड से ही ठीक से पहचाना जा सकता है।",
    shoot_distance_heading: "दूरी: 2 से 3 मीटर (6-10 फीट)",
    shoot_distance_desc: "इतना पीछे खड़े हों कि रोगी का सिर से पैर तक पूरा शरीर कुर्सी की ऊंचाई पर कैमरे के फ्रेम में दिखे।",
    shoot_chair_heading: "बिना हत्थे की कुर्सी और बंधे हाथ",
    shoot_chair_desc: "बिना हत्थे वाली मजबूत कुर्सी का उपयोग करें। परीक्षण के दौरान हाथ सीने पर क्रॉस रखें।",
    
    arm_disclosure: "यह संस्करण हाथों की सहायता को नहीं पहचान सकता — सटीक गिनती के लिए हाथ सीने पर रखें।",
    btn_start_test: "30-सेकंड परीक्षण शुरू करें",
    
    // Live Camera HUD
    time_remaining: "समय",
    reps_completed: "उठक-बैठक",
    knee_angle: "घुटने का कोण",
    status_seated: "बैठे हुए",
    status_standing: "खड़े हुए",
    status_moving: "गति में",
    btn_stop_test: "परीक्षण पहले समाप्त करें",
    model_loading: "पोज ट्रैकर (Lite) लोड हो रहा है...",
    test_complete_toast: "गति परीक्षण पूर्ण हुआ!",
    prompt_align_side: "रोगी को साइड (बगल) से दिखाएं",
    prompt_step_back: "पीछे हटें: सिर से पैर तक पूरा शरीर दिखाएं",
    prompt_ready: "साइड प्रोफाइल तैयार है — शुरू करें!",
    
    // Screen 3: Results
    results_title: "जांच परिणाम",
    risk_low: "कम जोखिम",
    risk_moderate: "मध्यम जोखिम",
    risk_high: "उच्च जोखिम",
    stands_result_suffix: "30 सेकंड में खड़े होने की संख्या",
    findings_title: "प्रमुख नैदानिक निष्कर्ष",
    preventive_title: "निवारक मार्गदर्शन (NICE NG226)",
    
    prev_exercise: "प्रतिदिन घुटनों को मजबूत करने वाले हल्के व्यायाम (सक्रिय रहें, पूर्ण आराम नहीं)",
    prev_weight: "घुटनों पर भार कम करने के लिए स्वस्थ वजन प्रबंधन",
    prev_stool: "जमीन पर बैठने के बजाय छोटे स्टूल या पीढ़ी का उपयोग करें",
    
    metrics_title: "बायोमैकेनिकल सारांश",
    metric_rom: "गति का दायरा (ROM)",
    metric_smoothness: "गति की स्थिरता",
    metric_ext_flex: "अधिकतम / न्यूनतम कोण",
    
    btn_save_record: "इतिहास में सहेजें",
    btn_new_screening: "नई जांच",
    record_saved: "रिकॉर्ड सफलतापूर्वक सहेजा गया!",
    
    // Screen 4: History
    history_title: "सहेजी गई जांचें",
    history_empty: "इस डिवाइस पर अभी तक कोई जांच रिकॉर्ड नहीं है।",
    history_clear_all: "इतिहास मिटाएं",
    history_clear_confirm: "क्या आप सभी जांच रिकॉर्ड हटाना चाहते हैं?",
    patient_age: "आयु",
    screened_on: "जांच की तारीख",
    view_details: "विवरण देखें",

    // Screener Reference Guide
    guide_title: "स्क्रीनर मार्गदर्शिका",
    guide_close: "बंद करें",
    guide_q1_title: "30 सेकंड में '0 बार उठना' का क्या अर्थ है?",
    guide_q1_desc: "चिकित्सकीय रूप से, 0 का अर्थ है कि रोगी 30 सेकंड में बिना हाथों की सहायता लिए एक बार भी कुर्सी से खड़ा नहीं हो सका। यह पैरों की गंभीर कमजोरी या घुटनों की गंभीर समस्या का संकेत है। तकनीकी रूप से, यदि रोगी खड़ा हुआ किंतु ऐप में 0 दर्ज हुआ, तो कैमरा गलत कोण पर था (जैसे सामने से शूट किया गया या पैर फ्रेम से बाहर थे)।",
    guide_q2_title: "साइड (बगल) से ही वीडियो क्यों बनाना चाहिए?",
    guide_q2_desc: "सामने से देखने पर घुटने मुड़े होने पर भी पैर सीधे दिखते हैं। एआई मॉडल घुटने के कोण (बैठने पर ~90° से खड़े होने पर ~180°) को केवल साइड व्यू से ही माप सकता है।",
    guide_q3_title: "उठने-बैठने की संख्या का पैमाना क्या है?",
    guide_q3_desc: "CDC STEADI मानक: 30 सेकंड में 9 या उससे कम बार उठना कमजोरी और गिरने के जोखिम का संकेत है। 10 या अधिक बार उठना पर्याप्त शारीरिक शक्ति दर्शाता है।",
    guide_q4_title: "चिह्नों का विवरण",
    guide_icon_stand: "उठने-बैठने की गिनती (पुराने डम्बल चिह्न को कुर्सी-खड़े होने के स्पष्ट चिह्न से बदला गया)",
    guide_icon_timer: "30-सेकंड का मानक समय",
    guide_icon_low: "कम जोखिम: सामान्य शारीरिक शक्ति और नकारात्मक नैदानिक लक्षण",
    guide_icon_mod: "मध्यम जोखिम: आंशिक लक्षण या मध्यम शारीरिक क्षमता",
    guide_icon_high: "उच्च जोखिम: 9 या उससे कम उठक-बैठक के साथ NICE लक्षण",
    guide_icon_exercise: "घुटने मजबूत करने वाले दैनिक व्यायाम",
    guide_icon_weight: "स्वस्थ वजन बनाए रखना",
    guide_icon_stool: "जमीन के काम के लिए छोटी पीढ़ी/स्टूल का उपयोग"
  },
  
  as: {
    app_name: "PraxisScreener",
    tagline: "সমাজ স্বাস্থ্যকৰ্মীসকলৰ বাবে অষ্টিঅ’আৰ্থ্ৰাইটিছৰ প্ৰাৰম্ভিক পৰীক্ষা",
    nav_intake: "প্ৰশ্নাৱলী",
    nav_movement: "গতি পৰীক্ষা",
    nav_results: "ফলাফল",
    nav_history: "ইতিহাস",
    nav_guide: "সহায়িকা",
    nav_new: "নতুন পৰীক্ষা",
    
    // Screen 1: Intake
    intake_title: "ক্লিনিকেল প্ৰশ্নাৱলী",
    intake_subtitle: "NICE নিৰ্দেশনা NG226 মূল্যায়ন",
    age_label: "ৰোগীৰ বয়স (বছৰ)",
    age_placeholder: "বয়স দিয়ক (যেনে ৫২)",
    age_hint: "৪৫ বছৰ বা তাতকৈ অধিক বয়স NICE ৰ প্ৰাথমিক লক্ষণ",
    
    pain_label: "আপোনাৰ গাঁঠিৰ বিষ কাম কৰিলে বা লৰচৰ কৰিলে বেছি হয়নে?",
    yes: "হয়",
    no: "নহয়",
    
    stiffness_label: "ৰাতিপুৱা গাঁঠিৰ টান ভাৱ সাধাৰণতে কিমান সময় থাকে?",
    stiffness_under_30: "৩০ মিনিটতকৈ কম",
    stiffness_over_30: "৩০ মিনিট বা তাতকৈ বেছি",
    
    supplementary_badge: "অতিৰিক্ত কাৰ্য্যকৰী প্ৰশ্ন",
    squat_label: "আপুনি বেছি অসুবিধা নোহোৱাকৈ বহিব পাৰেনে বা চিৰি উঠিব পাৰেনে?",
    difficulty_none: "হয় (কোনো অসুবিধা নাই)",
    difficulty_some: "কিছু অসুবিধা হয়",
    difficulty_unable: "নহয় (একেবাৰে নোৱাৰি বা অতি অসুবিধা)",
    
    btn_next_movement: "পৰৱৰ্তী: গতি পৰীক্ষা",
    validation_fill_all: "অনুগ্ৰহ কৰি আগবাঢ়িবলৈ সকলো তথ্য পূৰণ কৰক।",
    
    // Screen 2: Movement Test & Camera Setup
    movement_title: "৩০-ছেকেণ্ড চকীৰ পৰা উঠা-বহা পৰীক্ষা",
    protocol_citation: "OARSI প্ৰট’কল (Dobson et al., 2013)",
    
    camera_perm_title: "কেমেৰা অনুমতিৰ প্ৰয়োজন",
    camera_perm_desc: "চকীৰ পৰা উঠা-বহাৰ গতি সঠিকভাৱে গণনা কৰিবলৈ কেমেৰাৰ প্ৰয়োজন।",
    camera_https_notice: "ম’বাইলত কেমেৰাৰ বাবে HTTPS বা localhost প্ৰয়োজন।",
    btn_allow_camera: "পিছৰ কেমেৰা অন কৰক",
    
    camera_error_title: "কেমেৰা সমস্যা",
    camera_error_desc: "পিছৰ কেমেৰা লাভ কৰা নগল। ব্ৰাউজাৰৰ অনুমতি পৰীক্ষা কৰক।",
    btn_retry_camera: "পুনৰ চেষ্টা কৰক",
    btn_use_demo: "ডেম’ অনুৰূপ ব্যৱহাৰ কৰক",
    
    // MIUI / Android Bubble Overlay Error Guidance
    miui_overlay_title: "'Close Bubbles on Screen' সমস্যা আহিছে নেকি?",
    miui_step_1: "1. Chrome এড্ৰেছ বাৰত থকা লক 🔒 বা টিউন চিনত টেপ কৰক",
    miui_step_2: "2. 'Permissions' > 'Camera' ত গৈ 'Allow' বাছক",
    miui_step_3: "3. তলত দিয়া 'পুনৰ চেষ্টা কৰক' বুটামত টেপ কৰক",
    miui_bubble_tip: "বা ফোনৰ ফ্লোটিং চ্যাট হেড (Messenger, WhatsApp) বা MIUI ছাইডবাৰ বন্ধ কৰক।",
    btn_native_video: "ফোনৰ কেমেৰাৰে ভিডিঅ’ ৰেকৰ্ড কৰক",
    video_processing: "ৰেকৰ্ড কৰা ভিডিঅ’ প্ৰচেছিং হৈ আছে...",
    
    // Crucial Camera Angle & Shooting Guide
    shoot_guide_title: "কেমেৰা কোণ আৰু নিৰ্দেশনা",
    shoot_angle_heading: "কাষৰ পৰা ভিডিঅ’ কৰক (Side Profile)",
    shoot_angle_desc: "কেমেৰাটো সদায় ৰোগীৰ কাষত (Side View) ৯০° কোণত ৰাখক, কেতিয়াও সন্মুখৰ পৰা নহয়। আঁঠুৰ কোণ কাষৰ পৰাহে সঠিকভাৱে ধৰিব পাৰি।",
    shoot_distance_heading: "দূৰত্ব: ২ পৰা ৩ মিটাৰ (৬-১০ ফুট)",
    shoot_distance_desc: "ইমান পিছলৈ যাওক যাতে ৰোগীৰ মূৰৰ পৰা ভৰিলৈকে সম্পূৰ্ণ শৰীৰটো কেমেৰাৰ ভিতৰত থাকে।",
    shoot_chair_heading: "হাত নথকা চকী আৰু বন্ধা হাত",
    shoot_chair_desc: "হাত নথকা মজবুত চকী ব্যৱহাৰ কৰক। ৰোগীয়ে হাত দুখন বুকুত বান্ধি ৰাখিব লাগিব।",
    
    arm_disclosure: "এই সংস্কৰণে হাতৰ সহায় লোৱাটো ধৰিব নোৱাৰে — সঠিক গণনাৰ বাবে হাত বুকুত বান্ধি ৰাখক।",
    btn_start_test: "৩০-ছেকেণ্ড পৰীক্ষা আৰম্ভ কৰক",
    
    // Live Camera HUD
    time_remaining: "সময়",
    reps_completed: "উঠা-বহা",
    knee_angle: "আঁঠুৰ কোণ",
    status_seated: "বহি আছে",
    status_standing: "থিয় হৈছে",
    status_moving: "গতিশীল",
    btn_stop_test: "পৰীক্ষা সোনকালে শেষ কৰক",
    model_loading: "প’জ ট্ৰেকাৰ (Lite) লোড হৈ আছে...",
    test_complete_toast: "গতি পৰীক্ষা সম্পূৰ্ণ হ’ল!",
    prompt_align_side: "ৰোগীক কাষৰ (Side) পৰা ধৰক",
    prompt_step_back: "পিছলৈ যাওক: মূৰৰ পৰা ভৰিলৈকে দেখুৱাওক",
    prompt_ready: "কাষৰ ছবি ধৰা পৰিছে — সাজু!",
    
    // Screen 3: Results
    results_title: "পৰীক্ষাৰ ফলাফল",
    risk_low: "কম বিপদ (Low Risk)",
    risk_moderate: "মধ্যম বিপদ (Moderate Risk)",
    risk_high: "উচ্চ বিপদ (High Risk)",
    stands_result_suffix: "৩০ ছেকেণ্ডত উঠা-বহা",
    findings_title: "মুখ্য ক্লিনিকেল লক্ষণসমূহ",
    preventive_title: "প্ৰতিৰোধমূলক পৰামৰ্শ (NICE NG226)",
    
    prev_exercise: "দৈনিক আঁঠু শক্তিশালী কৰা সহজ ব্যায়াম (সক্ৰিয় থাকক, সম্পূৰ্ণ বিশ্ৰাম নহয়)",
    prev_weight: "আঁঠুৰ ওপৰত চাপ কমাবলৈ স্বাস্থ্যকৰ ওজন ৰখা",
    prev_stool: "মজিয়াত বহাৰ সলনি কম ওখ পীৰা ব্যৱহাৰ কৰক",
    
    metrics_title: "গতিবিজ্ঞানৰ সাৰাংশ",
    metric_rom: "গতিৰ পৰিসৰ (ROM)",
    metric_smoothness: "গতিৰ মসৃণতা",
    metric_ext_flex: "সৰ্বাধিক / সৰ্বনিম্ন কোণ",
    
    btn_save_record: "ইতিহাসত সংৰক্ষণ কৰক",
    btn_new_screening: "নতুন পৰীক্ষা",
    record_saved: "সফলভাৱে সংৰক্ষণ কৰা হ’ল!",
    
    // Screen 4: History
    history_title: "সংৰক্ষিত পৰীক্ষাসমূহ",
    history_empty: "এই ডিভাইচত এতিয়ালৈকে কোনো পৰীক্ষা সংৰক্ষিত হোৱা নাই।",
    history_clear_all: "ইতিহাস মচি পেলাওক",
    history_clear_confirm: "আপুনি সকলো সংৰক্ষিত পৰীক্ষা ডিলিট কৰিব বিচাৰেনে?",
    patient_age: "বয়স",
    screened_on: "পৰীক্ষাৰ তাৰিখ",
    view_details: "বিস্তাৰিত চাওক",

    // Screener Reference Guide
    guide_title: "পৰীক্ষক সহায়িকা",
    guide_close: "বন্ধ কৰক",
    guide_q1_title: "৩০ ছেকেণ্ডত '০ বাৰ উঠা' মানে কি?",
    guide_q1_desc: "ক্লিনিকেলভাৱে, ০ বাৰ মানে ৰোগীজনে ৩০ ছেকেণ্ডত হাতৰ সহায় নোলোৱাকৈ এবাৰো চকীৰ পৰা উঠিব নোৱাৰিলে। ই ভৰিৰ তীব্ৰ দুৰ্বলতাৰ লক্ষণ। কাৰিকৰীভাৱে, যদি ৰোগী উঠিল কিন্তু ০ দেখালে, তেন্তে কেমেৰাটো সঠিকভাৱে ৰখা হোৱা নাছিল (যেনে সন্মুখৰ পৰা কৰা হৈছিল বা ভৰি দুখন স্ক্ৰীণৰ বাহিৰত আছিল)।",
    guide_q2_title: "কেমেৰাটো সদায় কাষৰ পৰা (Side Profile) কিয় ধৰিব লাগে?",
    guide_q2_desc: "সন্মুখৰ পৰা ধৰিলে বহাৰ সময়তো ভৰি পোন দেখা যায়। কম্পিউটাৰ ভিজনে আঁঠুৰ কোণ কেৱল ৯০° কাষৰ পৰাহে জুখিব পাৰে।",
    guide_q3_title: "উঠা-বহাৰ সংখ্যাৰ মানদণ্ড কি?",
    guide_q3_desc: "CDC STEADI প্ৰট’কল: ৩০ ছেকেণ্ডত ৯ বা তাতকৈ কম উঠা-বহা মানে শাৰীৰিক দুৰ্বলতা আৰু পৰি যোৱাৰ সম্ভাৱনা। ১০ বা তাতকৈ বেছি মানে স্বাভাৱিক শক্তি।",
    guide_q4_title: "প্ৰতীকসমূহৰ বিৱৰণ",
    guide_icon_stand: "উঠা-বহাৰ গণনা (ডাম্বেলৰ সলনি চকীৰ পৰা উঠাৰ স্পষ্ট প্ৰতীক)",
    guide_icon_timer: "৩০ ছেকেণ্ডৰ নিৰ্ধাৰিত সময়",
    guide_icon_low: "কম বিপদ: ভাল শক্তি আৰু কোনো গুৰুতৰ লক্ষণ নাই",
    guide_icon_mod: "মধ্যম বিপদ: আংশিক লক্ষণ বা মজলীয়া শক্তি",
    guide_icon_high: "উচ্চ বিপদ: ৯ বা তাতকৈ কম উঠা-বহা আৰু ক্লিনিকেল লক্ষণ",
    guide_icon_exercise: "দৈনিক আঁঠুৰ ব্যায়াম",
    guide_icon_weight: "উজন নিয়ন্ত্ৰণ",
    guide_icon_stool: "মজিয়াৰ কামৰ বাবে কম ওখ পীৰা ব্যৱহাৰ"
  }
};

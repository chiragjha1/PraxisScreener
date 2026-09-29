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
    
    // Screen 2: Movement Test
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
    
    instructions_title: "Test Instructions",
    inst_1: "Sit in a sturdy chair with no armrests.",
    inst_2: "Cross your arms firmly over your chest.",
    inst_3: "Stand fully upright and sit back down as many times as possible in 30 seconds.",
    arm_disclosure: "This version can't detect if arms were used to help stand up — try to keep arms crossed for an accurate count.",
    
    btn_start_test: "Start 30-Second Test",
    countdown_get_ready: "Get Ready...",
    time_remaining: "Time Left",
    reps_completed: "Stands Counted",
    knee_angle: "Knee Angle",
    status_seated: "Seated",
    status_standing: "Standing",
    status_moving: "In Motion",
    btn_stop_test: "Finish Test Early",
    model_loading: "Initializing Pose Tracker (Lite)...",
    test_complete_toast: "Movement test complete!",
    
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
    view_details: "View Details"
  },
  
  hi: {
    app_name: "PraxisScreener",
    tagline: "सामुदायिक स्वास्थ्य कार्यकर्ताओं के लिए प्रारंभिक ओस्टियोआर्थराइटिस जांच",
    nav_intake: "प्रश्नावली",
    nav_movement: "गति परीक्षण",
    nav_results: "परिणाम",
    nav_history: "इतिहास",
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
    
    // Screen 2: Movement Test
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
    
    instructions_title: "परीक्षण निर्देश",
    inst_1: "बिना हत्थे वाली मजबूत कुर्सी पर बैठें।",
    inst_2: "अपने हाथों को सीने पर क्रॉस करके रखें।",
    inst_3: "30 सेकंड में जितनी बार संभव हो पूरा खड़े हों और बैठें।",
    arm_disclosure: "यह संस्करण हाथों की सहायता को नहीं पहचान सकता — सटीक गिनती के लिए हाथ सीने पर रखें।",
    
    btn_start_test: "30-सेकंड परीक्षण शुरू करें",
    countdown_get_ready: "तैयार हो जाएं...",
    time_remaining: "शेष समय",
    reps_completed: "उठने-बैठने की संख्या",
    knee_angle: "घुटने का कोण",
    status_seated: "बैठे हुए",
    status_standing: "खड़े हुए",
    status_moving: "गति में",
    btn_stop_test: "परीक्षण पहले समाप्त करें",
    model_loading: "पोज ट्रैकर (Lite) लोड हो रहा है...",
    test_complete_toast: "गति परीक्षण पूर्ण हुआ!",
    
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
    view_details: "विवरण देखें"
  },
  
  as: {
    app_name: "PraxisScreener",
    tagline: "সমাজ স্বাস্থ্যকৰ্মীসকলৰ বাবে অষ্টিঅ’আৰ্থ্ৰাইটিছৰ প্ৰাৰম্ভিক পৰীক্ষা",
    nav_intake: "প্ৰশ্নাৱলী",
    nav_movement: "গতি পৰীক্ষা",
    nav_results: "ফলাফল",
    nav_history: "ইতিহাস",
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
    
    // Screen 2: Movement Test
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
    
    instructions_title: "পৰীক্ষাৰ নিয়ম",
    inst_1: "হাত নথকা এখন মজবুত চকীত বহক।",
    inst_2: "হাত দুখন বুকুত ওপৰা-উপৰিকৈ বান্ধি ৰাখক।",
    inst_3: "৩০ ছেকেণ্ডত যিমান পাৰে সম্পূৰ্ণকৈ উঠক আৰু বহক।",
    arm_disclosure: "এই সংস্কৰণে হাতৰ সহায় লোৱাটো ধৰিব নোৱাৰে — সঠিক গণনাৰ বাবে হাত বুকুত বান্ধি ৰাখক।",
    
    btn_start_test: "৩০-ছেকেণ্ড পৰীক্ষা আৰম্ভ কৰক",
    countdown_get_ready: "প্ৰস্তুত হওক...",
    time_remaining: "বাকী সময়",
    reps_completed: "উঠা-বহাৰ সংখ্যা",
    knee_angle: "আঁঠুৰ কোণ",
    status_seated: "বহি আছে",
    status_standing: "থিয় হৈছে",
    status_moving: "গতিশীল",
    btn_stop_test: "পৰীক্ষা সোনকালে শেষ কৰক",
    model_loading: "প’জ ট্ৰেকাৰ (Lite) লোড হৈ আছে...",
    test_complete_toast: "গতি পৰীক্ষা সম্পূৰ্ণ হ’ল!",
    
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
    view_details: "বিস্তাৰিত চাওক"
  }
};

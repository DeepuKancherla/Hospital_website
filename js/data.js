const clinicData = {
    departments: [
        { id: "dept_cardio", icon: "❤️", title: "Cardiology & Cardiac Surgery", desc: "Advanced cardiac care including cath lab procedures, bypass surgery, valve replacements, and heart failure management.", specialists: 18, category: "medicine surgery" },
        { id: "dept_neuro", icon: "🧠", title: "Neurology & Neurosurgery", desc: "Comprehensive care for stroke, epilepsy, Parkinson's, brain tumours, and spinal cord injuries using advanced neuro-navigation.", specialists: 14, category: "medicine surgery" },
        { id: "dept_ortho", icon: "🦴", title: "Orthopedics & Sports Medicine", desc: "Joint replacements, arthroscopy, spine surgery, sports injury rehab using robotic-assisted surgical systems.", specialists: 12, category: "surgery" },
        { id: "dept_onco", icon: "🎗️", title: "Oncology & Cancer Care", desc: "Multidisciplinary tumour boards, chemotherapy, immunotherapy, targeted therapy, and precision radiation oncology.", specialists: 16, category: "medicine" },
        { id: "dept_pedia", icon: "👶", title: "Pediatrics & Neonatology", desc: "Child-centred care from premature newborns to adolescents — NICU, paediatric surgery, and developmental medicine.", specialists: 10, category: "child" },
        { id: "dept_gyno", icon: "🌸", title: "Obstetrics & Gynecology", desc: "Complete women's health — prenatal care, high-risk pregnancy, laparoscopic surgery, fertility treatments.", specialists: 9, category: "women" },
        { id: "dept_radio", icon: "🔬", title: "Radiology & Imaging", desc: "3T MRI, 256-slice CT, PET-CT, digital X-ray and AI-assisted reporting with same-day turnaround.", specialists: 8, category: "diagnostic" },
        { id: "dept_pulmo", icon: "🫁", title: "Pulmonology & Sleep Medicine", desc: "Asthma, COPD, interstitial lung disease, sleep apnea diagnosis, and advanced bronchoscopy services.", specialists: 7, category: "medicine" }
    ],

    doctors: [
        { id: "doc_1", name: "Dr. Arjun Mehta", specialty: "Senior Interventional Cardiologist", department: "Cardiology", experience: "18 Years Experience", credentials: "MBBS, MD, DM", rating: 4.9, reviews: 312, tags: ["Angioplasty", "Heart Failure", "Echocardiography"], image: "👨‍⚕️", availability: "today" },
        { id: "doc_2", name: "Dr. Priya Nair", specialty: "Consultant Neurologist", department: "Neurology", experience: "14 Years Experience", credentials: "MBBS, MD, DM", rating: 4.8, reviews: 247, tags: ["Stroke", "Epilepsy", "Parkinson's"], image: "👩‍⚕️", availability: "today" },
        { id: "doc_3", name: "Dr. Ravi Shankar", specialty: "Orthopedic Surgeon & Sports Medicine", department: "Orthopedics", experience: "22 Years Experience", credentials: "MBBS, MS Ortho", rating: 4.9, reviews: 418, tags: ["Joint Replacement", "ACL Repair", "Spine"], image: "👨‍⚕️", availability: "tomorrow" },
        { id: "doc_4", name: "Dr. Sneha Reddy", specialty: "Medical Oncologist & Hematologist", department: "Oncology", experience: "16 Years Experience", credentials: "MBBS, MD, DM", rating: 4.9, reviews: 289, tags: ["Breast Cancer", "Immunotherapy", "Leukemia"], image: "👩‍⚕️", availability: "today" },
        { id: "doc_5", name: "Dr. Ananya Rao", specialty: "Pediatrician & Neonatologist", department: "Pediatrics", experience: "10 Years Experience", credentials: "MBBS, MD Pediatrics", rating: 4.7, reviews: 156, tags: ["Newborn Care", "Vaccination", "Asthma"], image: "👩‍⚕️", availability: "tomorrow" },
        { id: "doc_6", name: "Dr. Vikram Singh", specialty: "Pulmonologist", department: "Pulmonology", experience: "15 Years Experience", credentials: "MBBS, MD Chest", rating: 4.8, reviews: 210, tags: ["COPD", "Sleep Apnea", "Bronchoscopy"], image: "👨‍⚕️", availability: "today" },
        { id: "doc_7", name: "Dr. Meera Patel", specialty: "Gynecologist & Obstetrician", department: "Gynecology", experience: "20 Years Experience", credentials: "MBBS, MS OBG", rating: 4.9, reviews: 520, tags: ["High Risk Pregnancy", "IVF", "Laparoscopy"], image: "👩‍⚕️", availability: "today" },
        { id: "doc_8", name: "Dr. Amit Kumar", specialty: "Radiologist", department: "Radiology", experience: "12 Years Experience", credentials: "MBBS, MD Radio", rating: 4.6, reviews: 95, tags: ["MRI", "CT Scan", "Ultrasound"], image: "👨‍⚕️", availability: "tomorrow" }
    ],

    packages: [
        { id: "pkg_1", title: "Basic Wellness Check", icon: "🩺", desc: "Essential tests to monitor your overall health and catch early warning signs.", price: "999", originalPrice: "1,800", save: "44% OFF", testCount: "20 Tests Included", features: ["Complete Blood Count (CBC)", "Blood Sugar (Fasting & PP)", "Lipid Profile", "Liver Function Test", "Kidney Function Test", "Thyroid Profile (T3, T4, TSH)"], featured: false },
        { id: "pkg_2", title: "Comprehensive Wellness", icon: "💎", desc: "Full-body evaluation with specialist consultation, imaging and cardiac screening.", price: "3,499", originalPrice: "6,500", save: "46% OFF", testCount: "75 Tests Included", features: ["All Basic Tests +", "ECG & 2D Echocardiography", "Chest X-Ray (PA View)", "Cancer Markers (PSA, CEA, CA-125)", "Vitamin D, B12 & Ferritin", "Specialist Doctor Consultation"], featured: true },
        { id: "pkg_3", title: "Family Wellness Plan", icon: "👨‍👩‍👧‍👦", desc: "Protect your entire family with customised checkup plans for every age group.", price: "9,999", originalPrice: "18,000", save: "44% OFF", testCount: "4 Members · 50 Tests Each", features: ["Individual Basic + Advanced Tests", "Paediatric Assessment (child)", "Women's Health Screening", "Cardiac Risk Evaluation (adults)", "Free Annual Follow-up", "Health Manager Assigned"], featured: false }
    ],

    patientStories: [
        { id: "story_1", name: "Rajesh Kumar, 54", location: "Hyderabad · May 2025", department: "Cardiac Surgery", quote: "After my bypass surgery here, I can genuinely say the level of care was extraordinary. Every person — from nurses to surgeons — made me feel safe throughout my stay and recovery.", avatar: "RK" },
        { id: "story_2", name: "Aarti Patel, 31", location: "Bangalore · Mar 2025", department: "Oncology", quote: "Dr. Sneha and her oncology team gave my mother a second chance at life. Their approach was not just clinical but deeply compassionate. We are forever grateful.", avatar: "AP" },
        { id: "story_3", name: "Vikram Singh, 42", location: "Pune · Jan 2025", department: "Spine Surgery", quote: "I came in after a complex spine injury from an accident. The robotic surgery and the rehabilitation team helped me walk again in just 8 weeks. Truly world-class.", avatar: "VS" }
    ]
};

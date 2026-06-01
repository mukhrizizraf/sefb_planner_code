/* ============================================================================
   data.js - SEFB curriculum data (GRADES + PROGRAMS for all 5 programs).
   Extracted verbatim from SEFB_Dashboard.html - single source of truth for
   course catalog, components, tracks, and official recommended plans.
   Do not hand-edit course objects here; regenerate from the canonical file.
============================================================================ */

const GRADES = [
  {g:"A+",p:4.00,s:"Excellent"},{g:"A",p:4.00,s:"Excellent"},
  {g:"A-",p:3.67,s:"Credit"},{g:"B+",p:3.33,s:"Credit"},{g:"B",p:3.00,s:"Credit"},
  {g:"B-",p:2.67,s:"Good"},{g:"C+",p:2.33,s:"Good"},{g:"C",p:2.00,s:"Pass"},
  {g:"C-",p:1.67,s:"Fail-Retake"},{g:"D+",p:1.33,s:"Fail-Retake"},
  {g:"D",p:1.00,s:"Fail-Retake"},{g:"F",p:0.00,s:"Fail-Retake"}
];

/* ============================================================================
   PROGRAMS DATA — all 5 SEFB programs with correct credits/components
   BFin has 8 semesters; the others have 7 (6 regular + 1 short for industrial)
============================================================================ */
const PROGRAMS = {};

/* ─────────── BFIN — 122 cr, 8 semesters, 7 components ─────────── */
PROGRAMS.BFIN = {
  id:"BFIN", short:"BFin (Hons)",
  fullName:"SARJANA MUDA KEWANGAN DENGAN KEPUJIAN [BFIN (HONS)]",
  nameEn:"Bachelor of Finance with Honours",
  total:122, semCount:8,
  components:[
    {l:"A",ms:"Teras Universiti",en:"University Core",req:12},
    {l:"B",ms:"Teras Bahasa Inggeris",en:"English Core",req:6},
    {l:"C",ms:"Teras Program",en:"Program Core",req:48},
    {l:"D",ms:"Pengkhususan",en:"Specialization",req:30},
    {l:"E",ms:"Elektif Program",en:"Program Elective",req:15},
    {l:"F",ms:"Elektif Bebas",en:"Free Elective",req:3},
    {l:"G",ms:"Latihan Industri",en:"Industrial Training",req:8}
  ],
  tracks:[
    {id:"INV",en:"Investment Management",ms:"Pengurusan Pelaburan"},
    {id:"WLT",en:"Wealth Management",ms:"Pengurusan Kekayaan"}
  ],
  shortSems:[8],
  courses:[
    /* A */
    {code:"MPU1012",ms:"Falsafah dan Isu Semasa",en:"Philosophy & Current Issues",cr:2,cat:"A",pre:[]},
    {code:"MPU1022",ms:"Penghayatan Etika dan Peradaban",en:"Ethics & Civilizations",cr:2,cat:"A",pre:[]},
    {code:"MPU1042",ms:"Kenegaraan Malaysia",en:"Malaysian Studies",cr:2,cat:"A",pre:[]},
    {code:"MPU1052",ms:"Prinsip Keusahawanan",en:"Entrepreneurship Principles",cr:2,cat:"A",pre:[]},
    {code:"MPU1062",ms:"Integriti dan Antirasuah",en:"Integrity & Anti-Corruption",cr:2,cat:"A",pre:[]},
    {code:"VKKK1011",ms:"Ko-Kurikulum I",en:"Co-Curriculum I",cr:1,cat:"A",pre:[]},
    {code:"VKKK1021",ms:"Ko-Kurikulum II",en:"Co-Curriculum II",cr:1,cat:"A",pre:[]},
    /* B — English Core: pathway-aware (per LAMPIRAN A: Path 1 = 9cr, Path 2 = 6cr, Path 3 = 6cr+ESP) */
    {code:"MPB1013",ms:"Penguasaan Asas Bahasa Inggeris",en:"Basic English Proficiency",cr:3,cat:"B",pre:[],pathway:"L1"},
    {code:"MPB2013",ms:"Pengayaan Bahasa Inggeris I",en:"English Language Enrichment I",cr:3,cat:"B",pre:["MPB1013"],pathway:"L1L2"},
    {code:"MPB3013",ms:"Pengayaan Bahasa Inggeris II",en:"English Language Enrichment II",cr:3,cat:"B",pre:["MPB2013"],pathway:"L1L2L3"},
    {code:"SBLEK3023",ms:"English for Small Group Communication",en:"English for Small Group Communication",cr:3,cat:"B",pre:["MPB3013"],pathway:"ESP"},
    {code:"SBLEK3033",ms:"Report Writing",en:"Report Writing",cr:3,cat:"B",pre:["MPB3013"],pathway:"ESP"},
    {code:"SBLEK3043",ms:"Hospitality English",en:"Hospitality English",cr:3,cat:"B",pre:["MPB3013"],pathway:"ESP"},
    {code:"SBLEK3053",ms:"Public Speaking Skills",en:"Public Speaking Skills",cr:3,cat:"B",pre:["MPB3013"],pathway:"ESP"},
    {code:"SBLEK3063",ms:"English for Professional Communication",en:"English for Professional Communication",cr:3,cat:"B",pre:["MPB3013"],pathway:"ESP"},
    /* C */
    {code:"SQQSK1013",ms:"Pengantar Statistik",en:"Introduction to Statistics",cr:3,cat:"C",pre:[]},
    {code:"BEEBK1013",ms:"Prinsip Ekonomi",en:"Principles of Economics",cr:3,cat:"C",pre:[]},
    {code:"BKAFK1023",ms:"Pengantar Perakaunan Kewangan",en:"Introduction to Financial Accounting",cr:3,cat:"C",pre:[]},
    {code:"BWFFK2033",ms:"Pengurusan Kewangan",en:"Financial Management",cr:3,cat:"C",pre:["BKAFK1023"]},
    {code:"BWFFK2043",ms:"Pengurusan Kewangan Lanjutan",en:"Advanced Financial Management",cr:3,cat:"C",pre:["BWFFK2033"]},
    {code:"BWFFK2053",ms:"Analisis Penyata Kewangan & Penilaian",en:"Financial Statement Analysis & Valuation",cr:3,cat:"C",pre:["BWFFK2043"]},
    {code:"BWFFK3013",ms:"Kewangan Korporat",en:"Corporate Finance",cr:3,cat:"C",pre:["BWFFK2043"]},
    {code:"BWFFK3033",ms:"Institusi dan Pasaran Kewangan",en:"Financial Markets & Institutions",cr:3,cat:"C",pre:["BWFFK2033"]},
    {code:"BWFFK3043",ms:"Kewangan Antarabangsa",en:"International Finance",cr:3,cat:"C",pre:["BWFFK2043"]},
    {code:"BWFFK3073",ms:"Kewangan Peribadi",en:"Personal Finance",cr:3,cat:"C",pre:["BWFFK2043"]},
    {code:"BWFNK3013",ms:"Analisis Pelaburan",en:"Investment Analysis",cr:3,cat:"C",pre:["BWFFK2043"]},
    {code:"BPMNK1013",ms:"Pengantar Pengurusan",en:"Introduction to Management",cr:3,cat:"C",pre:[]},
    {code:"BWFFK3113",ms:"Etika dan Urus Tadbir",en:"Ethics & Governance",cr:3,cat:"C",pre:[]},
    {code:"BPMNK3143",ms:"Kaedah Penyelidikan",en:"Research Methodology",cr:3,cat:"C",pre:["SQQSK1013"],minCr:70},
    {code:"BPMNK3023",ms:"Pengurusan Strategik",en:"Strategic Management",cr:3,cat:"C",pre:[],minCr:90},
    {code:"GLULK2023",ms:"Undang-Undang Perniagaan",en:"Business Law",cr:3,cat:"C",pre:[]},
    /* D — Specialization (per handbook: INV-only, WLT-only, and SHARED courses) */
    /* D · Investment Management-only */
    {code:"BWFNK3033",ms:"Pengurusan Portfolio",en:"Portfolio Management",cr:3,cat:"D",track:"INV",pre:["BWFFK2043"]},
    {code:"BWFNK3043",ms:"Gelagat Kewangan",en:"Behavioral Finance",cr:3,cat:"D",track:"INV",pre:["BWFFK2043"]},
    {code:"BWFNK3053",ms:"Sekuriti Pendapatan Tetap",en:"Fixed Income Securities",cr:3,cat:"D",track:"INV",pre:["BWFFK2043"],offer:"even"},
    {code:"BWFNK3063",ms:"Derivatif & Pengurusan Risiko",en:"Derivatives & Risk Mgmt",cr:3,cat:"D",track:"INV",pre:["BWFFK2043"]},
    {code:"BWFFK3083",ms:"Modal Teroka",en:"Venture Capital",cr:3,cat:"D",track:"INV",pre:["BWFFK2043"]},
    /* D · Wealth Management-only */
    {code:"BWRRK1013",ms:"Risiko dan Insurans",en:"Risk & Insurance",cr:3,cat:"D",track:"WLT",pre:[]},
    {code:"BWRRK3103",ms:"Perancangan Estet",en:"Estate Planning",cr:3,cat:"D",track:"WLT",pre:["BWFFK2033"]},
    {code:"BWRRK3133",ms:"Analisis Risiko & Pembuatan Keputusan",en:"Risk Analysis & Decision Making",cr:3,cat:"D",track:"WLT",pre:["BWFFK2043","BWRRK1013"]},
    {code:"BWRRK3113",ms:"Perancangan Persaraan",en:"Retirement Planning",cr:3,cat:"D",track:"WLT",pre:["BWFFK2033"],offer:"even"},
    {code:"BWRRK3143",ms:"Pengurusan Risiko Harta & Liabiliti",en:"Property & Liability Risk Mgmt",cr:3,cat:"D",track:"WLT",pre:["BWRRK1013"],offer:"odd"},
    /* D · SHARED between INV & WLT (no track restriction) */
    {code:"BWBBK3053",ms:"Pemasaran Servis Kewangan",en:"Marketing of Financial Services",cr:3,cat:"D",pre:[]},
    {code:"BWFFK3053",ms:"Pemodelan Kewangan",en:"Financial Modelling",cr:3,cat:"D",pre:["BWFFK3013"]},
    {code:"BWFFK3103",ms:"Kewangan Perniagaan Kecil",en:"Small Business Finance",cr:3,cat:"D",pre:["BWFFK2043"]},
    {code:"BWFFK3193",ms:"Seminar Kewangan",en:"Seminar in Finance",cr:3,cat:"D",pre:[],minCr:90},
    {code:"BKATK2013",ms:"Prinsip Pecukaian",en:"Principles of Taxation",cr:3,cat:"D",pre:["BKAFK1023"]},
    /* E */
    {code:"BWFEK3013",ms:"Pengurusan Hartanah",en:"Real Estate Management",cr:3,cat:"E",pre:["BWFFK2033"],offer:"odd"},
    {code:"BWFFK3023",ms:"Pengurusan Kredit",en:"Credit Management",cr:3,cat:"E",pre:["BWFFK2033"],offer:"even"},
    {code:"BEEQK2023",ms:"Ekonometrik Asas",en:"Basic Econometrics",cr:3,cat:"E",pre:["SQQSK2013"]},
    {code:"BKAMK2013",ms:"Perakaunan Pengurusan 1",en:"Management Accounting 1",cr:3,cat:"E",pre:["BKAFK1023"]},
    {code:"BWBBK2013",ms:"Pengurusan Bank",en:"Bank Management",cr:3,cat:"E",pre:[]},
    {code:"BWBBK3013",ms:"Operasi Bank Perdagangan",en:"Commercial Bank Operations",cr:3,cat:"E",pre:["BWBBK2013"]},
    {code:"BWBBK3033",ms:"Perbankan Antarabangsa",en:"International Banking",cr:3,cat:"E",pre:["BWBBK2013"]},
    {code:"GLULK3033",ms:"Undang-Undang Syarikat",en:"Company Law",cr:3,cat:"E",pre:[]},
    {code:"SQQSK2013",ms:"Statistik Gunaan",en:"Applied Statistics",cr:3,cat:"E",pre:["SQQSK1013"]},
    /* F */
    {code:"FREE3013",ms:"Elektif Bebas",en:"Free Elective (any non-equiv. course)",cr:3,cat:"F",pre:[],ph:true},
    /* G */
    {code:"BWFXK4908",ms:"Latihan Industri",en:"Industrial Training",cr:8,cat:"G",pre:[],all:true}
  ],
  recommended:{
    INV:{
      1:["BPMNK1013","BKAFK1023","SQQSK1013","BEEBK1013","MPU1012","MPB2013","VKKK1011"],
      2:["BWFFK2033","GLULK2023","BWBBK3053","MPU1022","MPU1042","MPB3013","VKKK1021"],
      3:["BWFFK2043","BWFFK3033","BWFFK3113","BKAMK2013","BWBBK2013","MPU1052"],
      4:["BWFFK2053","BWFFK3013","BWFFK3043","BWFNK3053","BWFFK3023","MPU1062"],
      5:["BWFFK3073","BWFNK3033","BWFNK3013","BWFNK3063","BWFNK3043"],
      6:["BPMNK3143","BWFFK3053","BWFFK3103","BKATK2013","BWBBK3033"],
      7:["BPMNK3023","BWFFK3083","BWFFK3193","FREE3013","SQQSK2013"],
      8:["BWFXK4908"]
    },
    WLT:{
      1:["BPMNK1013","BKAFK1023","SQQSK1013","BEEBK1013","MPU1012","MPB2013","VKKK1011"],
      2:["BWFFK2033","GLULK2023","BWRRK1013","MPU1022","MPU1042","MPB3013","VKKK1021"],
      3:["BWFFK2043","BWFFK3033","BWRRK3103","BWBBK3053","BWBBK2013","MPU1052"],
      4:["BWFFK2053","BWFFK3013","BWFFK3043","BWRRK3113","BWFFK3023","MPU1062"],
      5:["BWFFK3073","BWFFK3113","BWFNK3013","BWRRK3143","BKAMK2013"],
      6:["BPMNK3143","BWRRK3133","BWFFK3103","BKATK2013","BWBBK3033"],
      7:["BPMNK3023","BWFFK3193","BWFFK3053","SQQSK2013","FREE3013"],
      8:["BWFXK4908"]
    }
  }
};

/* ─────────── BBANK — 120 cr, 7 semesters (6+1 short), 7 components ─────────── */
PROGRAMS.BBANK = {
  id:"BBANK", short:"BBank (Hons)",
  fullName:"SARJANA MUDA PERBANKAN DENGAN KEPUJIAN [BBANK (HONS)]",
  nameEn:"Bachelor of Banking with Honours",
  total:120, semCount:7,
  components:[
    {l:"A",ms:"Teras Universiti",en:"University Core",req:12},
    {l:"B",ms:"Teras Bahasa Inggeris",en:"English Core",req:6},
    {l:"C",ms:"Teras Program",en:"Program Core",req:66},
    {l:"D",ms:"Elektif Bidang",en:"Field Elective",req:18},
    {l:"E",ms:"Elektif Program",en:"Program Elective",req:9},
    {l:"F",ms:"Elektif Bebas",en:"Free Elective",req:3},
    {l:"G",ms:"Latihan Industri",en:"Industrial Training",req:6}
  ],
  tracks:[
    {id:"KK",en:"Contemporary Finance",ms:"Kewangan Kontemporari"},
    {id:"PR",en:"Risk Management",ms:"Pengurusan Risiko"},
    {id:"MP",en:"Decision Mathematics",ms:"Matematik Pemutusan"},
    {id:"PM",en:"Muamalat Administration",ms:"Pentadbiran Muamalat"}
  ],
  shortSems:[7],
  courses:[
    /* A — University Core */
    {code:"MPU1012",ms:"Falsafah dan Isu Semasa",en:"Philosophy & Current Issues",cr:2,cat:"A",pre:[]},
    {code:"MPU1022",ms:"Penghayatan Etika dan Peradaban",en:"Ethics & Civilizations",cr:2,cat:"A",pre:[]},
    {code:"MPU1042",ms:"Kenegaraan Malaysia",en:"Malaysian Studies",cr:2,cat:"A",pre:[]},
    {code:"MPU1052",ms:"Prinsip Keusahawanan",en:"Entrepreneurship Principles",cr:2,cat:"A",pre:[]},
    {code:"MPU1062",ms:"Integriti dan Antirasuah",en:"Integrity & Anti-Corruption",cr:2,cat:"A",pre:[]},
    {code:"VKKK1011",ms:"Ko-Kurikulum I",en:"Co-Curriculum I",cr:1,cat:"A",pre:[]},
    {code:"VKKK1021",ms:"Ko-Kurikulum II",en:"Co-Curriculum II",cr:1,cat:"A",pre:[]},
    /* B — English Core: pathway-aware */
    {code:"MPB1013",ms:"Penguasaan Asas Bahasa Inggeris",en:"Basic English Proficiency",cr:3,cat:"B",pre:[],pathway:"L1"},
    {code:"MPB2013",ms:"Pengayaan Bahasa Inggeris I",en:"English Language Enrichment I",cr:3,cat:"B",pre:["MPB1013"],pathway:"L1L2"},
    {code:"MPB3013",ms:"Pengayaan Bahasa Inggeris II",en:"English Language Enrichment II",cr:3,cat:"B",pre:["MPB2013"],pathway:"L1L2L3"},
    {code:"SBLEK3023",ms:"English for Small Group Communication",en:"English for Small Group Communication",cr:3,cat:"B",pre:["MPB3013"],pathway:"ESP"},
    {code:"SBLEK3033",ms:"Report Writing",en:"Report Writing",cr:3,cat:"B",pre:["MPB3013"],pathway:"ESP"},
    {code:"SBLEK3043",ms:"Hospitality English",en:"Hospitality English",cr:3,cat:"B",pre:["MPB3013"],pathway:"ESP"},
    {code:"SBLEK3053",ms:"Public Speaking Skills",en:"Public Speaking Skills",cr:3,cat:"B",pre:["MPB3013"],pathway:"ESP"},
    {code:"SBLEK3063",ms:"Bahasa Inggeris untuk Komunikasi Profesional",en:"English for Professional Communication",cr:3,cat:"B",pre:["MPB3013"],pathway:"ESP"},
    /* C — Program Core (66 cr) */
    {code:"SQQSK1013",ms:"Pengantar Statistik",en:"Introduction to Statistics",cr:3,cat:"C",pre:[]},
    {code:"BEEBK1013",ms:"Prinsip Ekonomi",en:"Principles of Economics",cr:3,cat:"C",pre:[]},
    {code:"BKAFK1023",ms:"Pengantar Perakaunan Kewangan",en:"Introduction to Financial Accounting",cr:3,cat:"C",pre:[]},
    {code:"BWFFK2033",ms:"Pengurusan Kewangan",en:"Financial Management",cr:3,cat:"C",pre:["BKAFK1023"]},
    {code:"BWFFK2043",ms:"Pengurusan Kewangan Lanjutan",en:"Advanced Financial Management",cr:3,cat:"C",pre:["BWFFK2033"]},
    {code:"BWFNK3013",ms:"Analisis Pelaburan",en:"Investment Analysis",cr:3,cat:"C",pre:["BWFFK2043"]},
    {code:"BWFFK3033",ms:"Institusi dan Pasaran Kewangan",en:"Financial Markets & Institutions",cr:3,cat:"C",pre:["BWFFK2033"]},
    {code:"BWFFK3113",ms:"Etika dan Urus Tadbir",en:"Ethics & Governance",cr:3,cat:"C",pre:[]},
    {code:"BWFFK3073",ms:"Kewangan Peribadi",en:"Personal Finance",cr:3,cat:"C",pre:["BWFFK2043"]},
    {code:"BWBBK1013",ms:"Asas Perbankan",en:"Fundamentals of Banking",cr:3,cat:"C",pre:[]},
    {code:"BWBBK2013",ms:"Pengurusan Bank",en:"Bank Management",cr:3,cat:"C",pre:[]},
    {code:"BWBBK3013",ms:"Operasi Bank Perdagangan",en:"Commercial Bank Operations",cr:3,cat:"C",pre:["BWBBK2013"]},
    {code:"BWBBK3023",ms:"Pengurusan Pinjaman",en:"Loan Management",cr:3,cat:"C",pre:["BWBBK2013"]},
    {code:"BIBMK3043",ms:"Pengurusan Perbankan Islam",en:"Islamic Banking Management",cr:3,cat:"C",pre:[]},
    {code:"BWBBK3053",ms:"Pemasaran Servis Kewangan",en:"Financial Services Marketing",cr:3,cat:"C",pre:[]},
    {code:"BWBBK3063",ms:"Pembiayaan & Perdagangan Antarabangsa",en:"International Trade & Finance",cr:3,cat:"C",pre:["BWBBK2013"]},
    {code:"BWBBK3193",ms:"Seminar Perbankan",en:"Banking Seminar",cr:3,cat:"C",pre:[],minCr:90},
    {code:"BMPNK1013",ms:"Pengantar Pengurusan",en:"Introduction to Management",cr:3,cat:"C",pre:[]},
    {code:"BMPNK3023",ms:"Pengurusan Strategik",en:"Strategic Management",cr:3,cat:"C",pre:[],minCr:90},
    {code:"BMPNK3143",ms:"Kaedah Penyelidikan",en:"Research Methodology",cr:3,cat:"C",pre:["SQQSK1013"],minCr:70},
    {code:"GLULK2013",ms:"Undang-Undang Perniagaan",en:"Business Law",cr:3,cat:"C",pre:[]},
    {code:"GLULK3023",ms:"Undang-Undang Perbankan",en:"Banking Law",cr:3,cat:"C",pre:[]},
    /* D — Field Elective 1: Contemporary Finance (KK) */
    {code:"BWFFK2053",ms:"Analisis & Penilaian Penyataan Kewangan",en:"Financial Statement Analysis & Valuation",cr:3,cat:"D",track:"KK",pre:["BWFFK2043"]},
    {code:"BWFFK3013",ms:"Kewangan Korporat",en:"Corporate Finance",cr:3,cat:"D",track:"KK",pre:["BWFFK2043"]},
    {code:"BWFFK3043",ms:"Kewangan Antarabangsa",en:"International Finance",cr:3,cat:"D",track:"KK",pre:["BWFFK2043"]},
    {code:"BWFNK3033",ms:"Pengurusan Portfolio",en:"Portfolio Management",cr:3,cat:"D",track:"KK",pre:["BWFFK2043"]},
    {code:"BWFFK3053",ms:"Pemodelan Kewangan",en:"Financial Modelling",cr:3,cat:"D",track:"KK",pre:["BWFFK3013"]},
    {code:"BWFNK3103",ms:"Pembiayaan Perniagaan Kecil",en:"Small Business Financing",cr:3,cat:"D",track:"KK",pre:["BWFFK2043"]},
    {code:"BWFFK3023",ms:"Pengurusan Kredit",en:"Credit Management",cr:3,cat:"D",track:"KK",pre:["BWFFK2033"],offer:"even"},
    /* D — Field Elective 2: Risk Management (PR) */
    {code:"BWRRK1013",ms:"Risiko dan Insurans",en:"Risk & Insurance",cr:3,cat:"D",track:"PR",pre:[]},
    {code:"BWRRK3033",ms:"Pengurusan Risiko",en:"Risk Management",cr:3,cat:"D",track:"PR",pre:["BWFFK2033"]},
    {code:"BWRRK3043",ms:"Pengurusan Manfaat Pekerja",en:"Employee Benefits Management",cr:3,cat:"D",track:"PR",pre:["BWRRK1013","BWFFK2033"]},
    {code:"BWRRK3123",ms:"Urus Tadbir Korporat",en:"Corporate Governance",cr:3,cat:"D",track:"PR",pre:[]},
    {code:"BWRRK3133",ms:"Analisis Risiko & Pembuatan Keputusan",en:"Risk Analysis & Decision Making",cr:3,cat:"D",track:"PR",pre:["BWRRK1013","BWFFK2043"],offer:"odd"},
    {code:"BWRRK3143",ms:"Pengurusan Risiko Harta & Liabiliti",en:"Property & Liability Risk Mgmt",cr:3,cat:"D",track:"PR",pre:["BWRRK1013"]},
    {code:"BWRRK3063",ms:"Pengurusan Risiko Kewangan",en:"Financial Risk Management",cr:3,cat:"D",track:"PR",pre:["BWFFK2043"],offer:"even"},
    /* D — Field Elective 3: Decision Mathematics (MP) */
    {code:"SQQMK1034",ms:"Kalkulus I",en:"Calculus I",cr:4,cat:"D",track:"MP",pre:[]},
    {code:"SQQMK1063",ms:"Matematik Diskret",en:"Discrete Mathematics",cr:3,cat:"D",track:"MP",pre:[]},
    {code:"SQQMK1073",ms:"Matematik Perniagaan",en:"Business Mathematics",cr:3,cat:"D",track:"MP",pre:["SQQMK1034"]},
    {code:"SQITK1013",ms:"Pengaturcaraan dlm Aplikasi Perniagaan",en:"Programming in Business Applications",cr:3,cat:"D",track:"MP",pre:[]},
    {code:"SQITK3053",ms:"Pembuatan Keputusan Berbantu Komputer",en:"Computer-Aided Decision Making",cr:3,cat:"D",track:"MP",pre:["SQITK1013"]},
    {code:"SQITK3063",ms:"Perlombongan Data",en:"Data Mining",cr:3,cat:"D",track:"MP",pre:[]},
    {code:"SQITK3083",ms:"Visualisasi Data",en:"Data Visualization",cr:3,cat:"D",track:"MP",pre:[]},
    /* D — Field Elective 4: Muamalat Administration (PM) */
    {code:"BIMEK1013",ms:"Teori dan Amalan Perniagaan Islam",en:"Theory & Practice of Islamic Business",cr:3,cat:"D",track:"PM",pre:[]},
    {code:"BIMCK2033",ms:"Etika Perniagaan Islam",en:"Islamic Business Ethics",cr:3,cat:"D",track:"PM",pre:[]},
    {code:"BIMCK1043",ms:"Prinsip Pengurusan dalam Islam",en:"Principles of Management in Islam",cr:3,cat:"D",track:"PM",pre:[]},
    {code:"BIMCK2083",ms:"Pengurusan Baitulmal, Wakaf & Zakat",en:"Baitulmal, Waqf & Zakat Management",cr:3,cat:"D",track:"PM",pre:[]},
    {code:"BIMCK3063",ms:"Pengurusan Sumber Manusia utk Perniagaan Islam",en:"HR Management for Islamic Business",cr:3,cat:"D",track:"PM",pre:["BIMCK1043"]},
    {code:"BIMEK3023",ms:"Pengurusan Takaful",en:"Takaful Management",cr:3,cat:"D",track:"PM",pre:[]},
    {code:"BIMEK3123",ms:"Kepimpinan dalam Islam",en:"Leadership in Islam",cr:3,cat:"D",track:"PM",pre:[]},
    /* E — Program Electives */
    {code:"BWBBK3033",ms:"Perbankan Antarabangsa",en:"International Banking",cr:3,cat:"E",pre:["BWBBK2013"]},
    {code:"BWBBK3043",ms:"Sekuriti Perbankan",en:"Banking Securities",cr:3,cat:"E",pre:["BWBBK2013"]},
    {code:"BWBBK3073",ms:"Pengurusan Perbendaharaan",en:"Treasury Management",cr:3,cat:"E",pre:["BWBBK2013"]},
    {code:"BWBBK3083",ms:"Perbankan Korporat",en:"Corporate Banking",cr:3,cat:"E",pre:["BWBBK2013"]},
    {code:"BWBBK3093",ms:"Perbankan Luar Pesisir",en:"Offshore Banking",cr:3,cat:"E",pre:["BWBBK2013"]},
    {code:"BWFEK3013",ms:"Pengurusan Harta Tanah",en:"Real Estate Management",cr:3,cat:"E",pre:["BWFFK2033"]},
    {code:"BWBZK3993",ms:"Projek Akademik",en:"Academic Project",cr:3,cat:"E",pre:["BMPNK3143"],minCr:90},
    /* F */
    {code:"FREE3013",ms:"Elektif Bebas",en:"Free Elective",cr:3,cat:"F",pre:[],ph:true},
    /* G */
    {code:"BWBXK4956",ms:"Latihan Industri",en:"Industrial Training",cr:6,cat:"G",pre:[],all:true}
  ],
  recommended:{
    KK:{
      1:["MPB2013","MPU1042","MPU1022","SQQSK1013","BKAFK1023","BEEBK1013","BWBBK1013"],
      2:["MPB3013","MPU1012","MPU1052","BMPNK1013","BWFFK2033","BIBMK3043","BWBBK2013"],
      3:["MPU1062","BWFFK2043","BWBBK3013","BWBBK3023","GLULK2013","BWBBK3053","GLULK3023"],
      4:["BWFNK3013","BWFFK3033","BWFFK2053","BWBBK3033","BWFFK3013","BWFFK3043","VKKK1011"],
      5:["BWFFK3073","BWFFK3113","BWBBK3063","BWBBK3043","BWFNK3033","BWFFK3053","VKKK1021"],
      6:["BMPNK3143","BWBBK3193","BMPNK3023","BWBBK3073","BWFNK3103","FREE3013"],
      7:["BWBXK4956"]
    },
    PR:{
      1:["MPB2013","MPU1042","MPU1022","SQQSK1013","BKAFK1023","BEEBK1013","BWBBK1013"],
      2:["MPB3013","MPU1012","MPU1052","BMPNK1013","BWFFK2033","BIBMK3043","BWBBK2013"],
      3:["MPU1062","BWFFK2043","BWBBK3013","BWBBK3023","GLULK2013","BWBBK3053","BWRRK1013"],
      4:["BWFNK3013","BWFFK3033","GLULK3023","BWBBK3033","BWRRK3033","BWRRK3123","VKKK1011"],
      5:["BWFFK3073","BWFFK3113","BWBBK3063","BWBBK3043","BWRRK3043","BWRRK3133","VKKK1021"],
      6:["BMPNK3143","BWBBK3193","BMPNK3023","BWBBK3073","BWRRK3143","FREE3013"],
      7:["BWBXK4956"]
    },
    MP:{
      1:["MPB2013","MPU1042","MPU1022","SQQSK1013","BKAFK1023","BEEBK1013","BWBBK1013"],
      2:["MPB3013","MPU1012","MPU1052","BMPNK1013","BWFFK2033","BIBMK3043","BWBBK2013"],
      3:["MPU1062","BWFFK2043","BWBBK3013","BWBBK3023","GLULK2013","BWBBK3053","SQQMK1063"],
      4:["BWFNK3013","BWFFK3033","GLULK3023","BWBBK3033","SQQMK1034","SQITK1013","VKKK1011"],
      5:["BWFFK3073","BWFFK3113","BWBBK3063","BWBBK3043","SQQMK1073","SQITK3053","VKKK1021"],
      6:["BMPNK3143","BWBBK3193","BMPNK3023","BWBBK3073","SQITK3063","FREE3013"],
      7:["BWBXK4956"]
    },
    PM:{
      1:["MPB2013","MPU1042","MPU1022","SQQSK1013","BKAFK1023","BEEBK1013","BWBBK1013"],
      2:["MPB3013","MPU1012","MPU1052","BMPNK1013","BWFFK2033","BIBMK3043","BWBBK2013"],
      3:["MPU1062","BWFFK2043","BWBBK3013","BWBBK3023","GLULK2013","BWBBK3053","BIMEK1013"],
      4:["BWFNK3013","BWFFK3033","GLULK3023","BWBBK3033","BIMCK1043","BIMCK2033","VKKK1011"],
      5:["BWFFK3073","BWFFK3113","BWBBK3063","BWBBK3043","BIMCK3063","BIMCK2083","VKKK1021"],
      6:["BMPNK3143","BWBBK3193","BMPNK3023","BWBBK3073","BIMEK3023","FREE3013"],
      7:["BWBXK4956"]
    }
  }
};

/* ─────────── BSc. Economics — 125 cr, 7 semesters, 8 components ─────────── */
PROGRAMS.BECONS = {
  id:"BECONS", short:"BSc. Economics (Hons)",
  fullName:"SARJANA MUDA SAINS EKONOMI DENGAN KEPUJIAN [BSc. Economics (Hons)]",
  nameEn:"Bachelor of Economics Science with Honours",
  total:125, semCount:7,
  components:[
    {l:"A",ms:"Teras Universiti",en:"University Core",req:12},
    {l:"B",ms:"Teras Bahasa Inggeris",en:"English Core",req:6},
    {l:"C",ms:"Teras Program",en:"Program Core",req:57},
    {l:"D",ms:"Keperluan Bahasa Asing",en:"Foreign Language Requirement",req:9},
    {l:"E",ms:"Elektif Ekonomi",en:"Economics Elective",req:12},
    {l:"F",ms:"Elektif Bidang",en:"Field Elective",req:18},
    {l:"G",ms:"Elektif Bebas",en:"Free Elective",req:3},
    {l:"H",ms:"Latihan Industri",en:"Industrial Training",req:8}
  ],
  tracks:[],
  fFields:[
    {id:"BM", ms:"Pengurusan Bank",                  en:"Bank Management"},
    {id:"FIN",ms:"Kewangan",                          en:"Finance"},
    {id:"HRM",ms:"Pengurusan Sumber Manusia",         en:"Human Resource Management"},
    {id:"MKT",ms:"Pemasaran Kontemporari",            en:"Contemporary Marketing"},
    {id:"MUA",ms:"Pentadbiran Muamalat",              en:"Muamalat Administration"},
    {id:"PM", ms:"Pengurusan Awam",                   en:"Public Management"}
  ],
  shortSems:[7],
  courses:[
    /* A */
    {code:"MPU1012",ms:"Falsafah dan Isu Semasa",en:"Philosophy & Current Issues",cr:2,cat:"A",pre:[]},
    {code:"MPU1022",ms:"Penghayatan Etika dan Peradaban",en:"Ethics & Civilizations",cr:2,cat:"A",pre:[]},
    {code:"MPU1042",ms:"Kenegaraan Malaysia",en:"Malaysian Studies",cr:2,cat:"A",pre:[]},
    {code:"MPU1052",ms:"Prinsip Keusahawanan",en:"Entrepreneurship Principles",cr:2,cat:"A",pre:[]},
    {code:"MPU1062",ms:"Integriti dan Antirasuah",en:"Integrity & Anti-Corruption",cr:2,cat:"A",pre:[]},
    {code:"VKKK1011",ms:"Ko-Kurikulum I",en:"Co-Curriculum I",cr:1,cat:"A",pre:[]},
    {code:"VKKK1021",ms:"Ko-Kurikulum II",en:"Co-Curriculum II",cr:1,cat:"A",pre:[]},
    /* B — English Core: pathway-dependent (see Language pathway selector) */
    {code:"MPB1013",ms:"Penguasaan Asas Bahasa Inggeris",en:"Basic English Proficiency",cr:3,cat:"B",pre:[],offer:"both",pathway:"L1"},
    {code:"MPB2013",ms:"Pengayaan Bahasa Inggeris I",en:"English Language Enrichment I",cr:3,cat:"B",pre:["MPB1013"],offer:"both",pathway:"L1L2"},
    {code:"MPB3013",ms:"Pengayaan Bahasa Inggeris II",en:"English Language Enrichment II",cr:3,cat:"B",pre:["MPB2013"],offer:"both",pathway:"L1L2L3"},
    {code:"SBLEK3023",ms:"English for Small Group Communication",en:"English for Small Group Communication",cr:3,cat:"B",pre:["MPB3013"],offer:"both",pathway:"ESP"},
    {code:"SBLEK3033",ms:"Report Writing",en:"Report Writing",cr:3,cat:"B",pre:["MPB3013"],offer:"both",pathway:"ESP"},
    {code:"SBLEK3043",ms:"Hospitality English",en:"Hospitality English",cr:3,cat:"B",pre:["MPB3013"],offer:"both",pathway:"ESP"},
    {code:"SBLEK3053",ms:"Public Speaking Skills",en:"Public Speaking Skills",cr:3,cat:"B",pre:["MPB3013"],offer:"both",pathway:"ESP"},
    /* C */
    {code:"BEEBK1013",ms:"Prinsip Ekonomi",en:"Principles of Economics",cr:3,cat:"C",pre:[],offer:"both"},
    {code:"BEEBK2013",ms:"Mikroekonomi",en:"Microeconomics",cr:3,cat:"C",pre:["BEEBK1013"],offer:"both"},
    {code:"BEEBK2023",ms:"Makroekonomi",en:"Macroeconomics",cr:3,cat:"C",pre:["BEEBK1013"],offer:"both"},
    {code:"BEEBK3013",ms:"Mikroekonomi Pertengahan",en:"Intermediate Microeconomics",cr:3,cat:"C",pre:["BEEBK2013"],offer:"both"},
    {code:"BEEBK3023",ms:"Makroekonomi Pertengahan",en:"Intermediate Macroeconomics",cr:3,cat:"C",pre:["BEEBK2023"],offer:"both"},
    {code:"BEEDK1013",ms:"Ekonomi Malaysia",en:"Malaysian Economy",cr:3,cat:"C",pre:[],offer:"both"},
    {code:"BEEQK1013",ms:"Pengantar Matematik Ekonomi",en:"Introduction to Mathematical Economics",cr:3,cat:"C",pre:[],offer:"both"},
    {code:"BEEQK1023",ms:"Pengantar Statistik Ekonomi",en:"Introduction to Statistical Economics",cr:3,cat:"C",pre:[],offer:"both"},
    {code:"BEEQK2013",ms:"Ekonomi Matematik",en:"Mathematical Economics",cr:3,cat:"C",pre:["BEEQK1013"],offer:"both"},
    {code:"BEEQK2023",ms:"Ekonometrik Asas",en:"Basic Econometrics",cr:3,cat:"C",pre:["BEEQK1023"],offer:"both"},
    {code:"BEERK3043",ms:"Kaedah Penyelidikan",en:"Research Methods",cr:3,cat:"C",pre:["BEEBK2013","BEEBK2023"],offer:"both"},
    {code:"BEESK3033",ms:"Sejarah Pemikiran Ekonomi",en:"History of Economic Thoughts",cr:3,cat:"C",pre:["BEEBK2013","BEEBK2023"],offer:"both"},
    {code:"BEESK3053",ms:"Isu-Isu Ekonomi Semasa",en:"Current Issues in Economics",cr:3,cat:"C",pre:["BEEBK2013","BEEBK2023"],offer:"both"},
    {code:"BKANK1013",ms:"Perakaunan Asas",en:"Basic Accounting",cr:3,cat:"C",pre:[],offer:"both"},
    {code:"BPMNK1013",ms:"Prinsip Pengurusan",en:"Principles of Management",cr:3,cat:"C",pre:[],offer:"both"},
    {code:"BPMNK3123",ms:"Etika Pengurusan",en:"Management Ethics",cr:3,cat:"C",pre:[],minCr:70,offer:"both"},
    {code:"SBLEK3063",ms:"English for Professional Communication",en:"English for Professional Communication",cr:3,cat:"C",pre:["MPB3013"],offer:"both"},
    {code:"BEEZK3996",ms:"Projek Ilmiah",en:"Academic Project",cr:6,cat:"C",pre:["BEERK3043"],minCr:90,offer:"both"},
    /* D — Foreign Language (3 sequential courses, students choose ONE language).
       Chinese students / Chinese-medium school students must choose a non-Mandarin language. */
    {code:"SBLFK1053",ms:"Bahasa Mandarin I",en:"Mandarin Language I",cr:3,cat:"D",pre:[],offer:"both",lang:"MAN"},
    {code:"SBLFK2053",ms:"Bahasa Mandarin II",en:"Mandarin Language II",cr:3,cat:"D",pre:["SBLFK1053"],offer:"both",lang:"MAN"},
    {code:"SBLFK3053",ms:"Bahasa Mandarin III",en:"Mandarin Language III",cr:3,cat:"D",pre:["SBLFK2053"],offer:"both",lang:"MAN"},
    {code:"SBLFK1023",ms:"Bahasa Arab I",en:"Arabic Language I",cr:3,cat:"D",pre:[],offer:"both",lang:"ARA"},
    {code:"SBLFK2023",ms:"Bahasa Arab II",en:"Arabic Language II",cr:3,cat:"D",pre:["SBLFK1023"],offer:"both",lang:"ARA"},
    {code:"SBLFK3023",ms:"Bahasa Arab III",en:"Arabic Language III",cr:3,cat:"D",pre:["SBLFK2023"],offer:"both",lang:"ARA"},
    {code:"SBLFK1033",ms:"Bahasa Jepun I",en:"Japanese Language I",cr:3,cat:"D",pre:[],offer:"both",lang:"JPN"},
    {code:"SBLFK2033",ms:"Bahasa Jepun II",en:"Japanese Language II",cr:3,cat:"D",pre:["SBLFK1033"],offer:"both",lang:"JPN"},
    {code:"SBLFK3033",ms:"Bahasa Jepun III",en:"Japanese Language III",cr:3,cat:"D",pre:["SBLFK2033"],offer:"both",lang:"JPN"},
    {code:"SBLFK1043",ms:"Bahasa Perancis I",en:"French Language I",cr:3,cat:"D",pre:[],offer:"both",lang:"FRA"},
    {code:"SBLFK2043",ms:"Bahasa Perancis II",en:"French Language II",cr:3,cat:"D",pre:["SBLFK1043"],offer:"both",lang:"FRA"},
    {code:"SBLFK3043",ms:"Bahasa Perancis III",en:"French Language III",cr:3,cat:"D",pre:["SBLFK2043"],offer:"both",lang:"FRA"},
    {code:"SBLFK1063",ms:"Bahasa Korea I",en:"Korean Language I",cr:3,cat:"D",pre:[],offer:"both",lang:"KOR"},
    {code:"SBLFK2063",ms:"Bahasa Korea II",en:"Korean Language II",cr:3,cat:"D",pre:["SBLFK1063"],offer:"both",lang:"KOR"},
    {code:"SBLFK3063",ms:"Bahasa Korea III",en:"Korean Language III",cr:3,cat:"D",pre:["SBLFK2063"],offer:"both",lang:"KOR"},
    {code:"FOREIGN1013",ms:"Bahasa Asing I",en:"Foreign Language I",cr:3,cat:"D",pre:[],offer:"both",lang:"OTH",ph:true},
    {code:"FOREIGN2013",ms:"Bahasa Asing II",en:"Foreign Language II",cr:3,cat:"D",pre:["FOREIGN1013"],offer:"both",lang:"OTH",ph:true},
    {code:"FOREIGN3013",ms:"Bahasa Asing III",en:"Foreign Language III",cr:3,cat:"D",pre:["FOREIGN2013"],offer:"both",lang:"OTH",ph:true},
    /* E — Economics Electives (pick 4) — semester offerings per academic guide */
    {code:"BEEDK2013",ms:"Ekonomi Pembangunan",en:"Development Economics",cr:3,cat:"E",pre:["BEEBK1013"],offer:"odd"},
    {code:"BEEDK3023",ms:"Perancangan Ekonomi",en:"Economic Planning",cr:3,cat:"E",pre:["BEEBK2013","BEEBK2023"],offer:"even"},
    {code:"BEEDK3043",ms:"Penilaian Projek",en:"Project Appraisal",cr:3,cat:"E",pre:["BEEBK2013","BEEBK2023"],offer:"even"},
    {code:"BEEEK3073",ms:"Ekonomi Alam Sekitar",en:"Environmental Economics",cr:3,cat:"E",pre:["BEEBK1013"],offer:"odd"},
    {code:"BEEEK3103",ms:"Analisis Ekonomi Pelancongan",en:"Economic Analysis of Tourism",cr:3,cat:"E",pre:["BEEBK1013"],offer:"even"},
    {code:"BEEIK2053",ms:"Ekonomi Buruh",en:"Labour Economics",cr:3,cat:"E",pre:["BEEBK1013"],offer:"odd"},
    {code:"BEEIK3053",ms:"Organisasi Industri",en:"Industrial Organization",cr:3,cat:"E",pre:["BEEBK2013","BEEBK2023"],offer:"even"},
    {code:"BEEIK3063",ms:"Pengawalan Industri",en:"Industrial Regulation",cr:3,cat:"E",pre:["BEEBK2013","BEEBK2023"],offer:"odd"},
    {code:"BEEMK2033",ms:"Teori & Institusi Wang",en:"Monetary Theory and Institutions",cr:3,cat:"E",pre:["BEEBK1013"],offer:"even"},
    {code:"BEEMK3043",ms:"Ekonomi Monetari",en:"Monetary Economics",cr:3,cat:"E",pre:["BEEBK2013","BEEBK2023"],offer:"even"},
    {code:"BEEMK3053",ms:"Teori Pelaburan",en:"Investment Theory",cr:3,cat:"E",pre:["BEEBK2013","BEEBK2023"],offer:"odd"},
    {code:"BEEPK3013",ms:"Kewangan Awam",en:"Public Finance",cr:3,cat:"E",pre:["BEEBK2013","BEEBK2023"],offer:"even"},
    {code:"BEEPK3083",ms:"Ekonomi Kesihatan",en:"Health Economics",cr:3,cat:"E",pre:["BEEBK2013","BEEBK2023"],offer:"odd"},
    {code:"BEEQK3013",ms:"Ekonometrik",en:"Econometrics",cr:3,cat:"E",pre:["BEEQK2023"],offer:"both"},
    {code:"BEESK3093",ms:"Sistem & Pemikiran Ekonomi Islam",en:"Islamic Economic System and Thoughts",cr:3,cat:"E",pre:["BEEBK2013","BEEBK2023"],offer:"odd"},
    {code:"BEETK2013",ms:"Ekonomi Antarabangsa",en:"International Economics",cr:3,cat:"E",pre:["BEEBK1013"],offer:"odd"},
    {code:"BEETK3013",ms:"Perdagangan Antarabangsa",en:"International Trade",cr:3,cat:"E",pre:["BEEBK2013","BEEBK2023"],offer:"odd"},
    {code:"BEETK3023",ms:"Kewangan Antarabangsa",en:"International Finance",cr:3,cat:"E",pre:["BEEBK2013","BEEBK2023"],offer:"even"},
    {code:"BEETK3033",ms:"Pelaburan Antarabangsa",en:"International Investments",cr:3,cat:"E",pre:["BEEBK2013","BEEBK2023"],offer:"even"},
    /* F — Field Electives: 6 fields, choose ONE field and complete SIX courses (18 cr) */
    /* 1. Bank Management */
    {code:"BWBBK1013",ms:"Asas Perbankan",en:"Foundation of Banking",cr:3,cat:"F",field:"BM",pre:[]},
    {code:"BWBBK2013",ms:"Pengurusan Bank",en:"Bank Management",cr:3,cat:"F",field:"BM",pre:[]},
    {code:"BWBBK3013",ms:"Operasi Bank Perdagangan",en:"Commercial Bank Operations",cr:3,cat:"F",field:"BM",pre:["BWBBK2013"]},
    {code:"BWBBK3023",ms:"Pengurusan Pinjaman",en:"Lending Management",cr:3,cat:"F",field:"BM",pre:["BWBBK2013"]},
    {code:"BWBBK3043",ms:"Sekuriti Perbankan",en:"Banking Securities",cr:3,cat:"F",field:"BM",pre:["BWBBK2013"]},
    {code:"BWBBK3063",ms:"Pembiayaan & Perdagangan Antarabangsa",en:"International Trade and Finance",cr:3,cat:"F",field:"BM",pre:["BWBBK2013"]},
    {code:"BWBBK3083",ms:"Perbankan Korporat",en:"Corporate Banking",cr:3,cat:"F",field:"BM",pre:["BWBBK2013"]},
    /* 2. Finance */
    {code:"BWFFK2033",ms:"Pengurusan Kewangan",en:"Financial Management",cr:3,cat:"F",field:"FIN",pre:["BKANK1013"]},
    {code:"BWFFK2043",ms:"Pengurusan Kewangan Lanjutan",en:"Advance Financial Management",cr:3,cat:"F",field:"FIN",pre:["BWFFK2033"]},
    {code:"BWFFK2053",ms:"Analisis Penyata Kewangan & Penilaian",en:"Financial Statement Analysis and Valuation",cr:3,cat:"F",field:"FIN",pre:["BWFFK2043"]},
    {code:"BWFFK3013",ms:"Kewangan Korporat",en:"Corporate Finance",cr:3,cat:"F",field:"FIN",pre:["BWFFK2043"]},
    {code:"BWFFK3033",ms:"Institusi dan Pasaran Kewangan",en:"Financial Market and Institutions",cr:3,cat:"F",field:"FIN",pre:["BWFFK2033"]},
    {code:"BWFFK3073",ms:"Kewangan Peribadi",en:"Personal Finance",cr:3,cat:"F",field:"FIN",pre:["BWFFK2043"]},
    {code:"BWFNK3013",ms:"Analisis Pelaburan",en:"Investment Analysis",cr:3,cat:"F",field:"FIN",pre:["BWFFK2043"]},
    /* 3. Human Resource Management */
    {code:"BPMHK2013",ms:"Pengurusan Sumber Manusia",en:"Human Resource Management",cr:3,cat:"F",field:"HRM",pre:["BPMNK1013"]},
    {code:"BPMHK3023",ms:"Penstafan",en:"Staffing",cr:3,cat:"F",field:"HRM",pre:["BPMHK2013"]},
    {code:"BPMHK3033",ms:"Latihan dan Pembangunan",en:"Training and Development",cr:3,cat:"F",field:"HRM",pre:["BPMHK2013"]},
    {code:"BPMHK3053",ms:"Pengurusan Prestasi Pekerja",en:"Employee Performance Management",cr:3,cat:"F",field:"HRM",pre:["BPMHK2013"]},
    {code:"BPMHK3063",ms:"Pengurusan Perubahan",en:"Change Management",cr:3,cat:"F",field:"HRM",pre:["BPMHK2013"]},
    {code:"BPMHK3083",ms:"Pengenalan Keselamatan dan Kesihatan Pekerjaan",en:"Introduction to Occupational Safety and Health",cr:3,cat:"F",field:"HRM",pre:["BPMHK2013"]},
    {code:"BPMHK3113",ms:"Pengurusan Sumber Manusia Antarabangsa",en:"International Human Resource Management",cr:3,cat:"F",field:"HRM",pre:["BPMHK2013"]},
    /* 4. Contemporary Marketing */
    {code:"BPMMK1013",ms:"Pengantar Pemasaran",en:"Introduction to Marketing",cr:3,cat:"F",field:"MKT",pre:[]},
    {code:"BPMMK2023",ms:"Pengurusan Pemasaran",en:"Marketing Management",cr:3,cat:"F",field:"MKT",pre:["BPMMK1013"]},
    {code:"BPMMK3023",ms:"Pengurusan Jualan",en:"Sales Management",cr:3,cat:"F",field:"MKT",pre:["BPMMK1013"]},
    {code:"BPMMK3083",ms:"Pemasaran Perkhidmatan",en:"Service Marketing",cr:3,cat:"F",field:"MKT",pre:["BPMMK1013"]},
    {code:"BPMMK3313",ms:"Gelagat Pengguna & Analitik",en:"Consumer Behavior and Analytic",cr:3,cat:"F",field:"MKT",pre:["BPMMK1013"]},
    {code:"BPMMK3333",ms:"Pemasaran Global",en:"Global Marketing",cr:3,cat:"F",field:"MKT",pre:["BPMMK1013"]},
    {code:"BPMMK3353",ms:"Pemasaran Digital",en:"Digital Marketing",cr:3,cat:"F",field:"MKT",pre:["BPMMK1013"]},
    /* 5. Muamalat Administration */
    {code:"BIMEK1013",ms:"Teori dan Amalan Perniagaan Islam",en:"Theory and Practice of Islamic Business",cr:3,cat:"F",field:"MUA",pre:[]},
    {code:"BIMCK2033",ms:"Etika Perniagaan Islam",en:"Islamic Business Ethics",cr:3,cat:"F",field:"MUA",pre:[]},
    {code:"BIMCK2083",ms:"Pengurusan Baitulmal, Wakaf & Zakat",en:"Baitul Mal, Waqf and Zakat Management",cr:3,cat:"F",field:"MUA",pre:[]},
    {code:"BIMCK1043",ms:"Prinsip Pengurusan dalam Islam",en:"Principles of Management in Islam",cr:3,cat:"F",field:"MUA",pre:[]},
    {code:"BIMCK3063",ms:"Pengurusan Sumber Manusia utk Perniagaan Islam",en:"Human Resource Management for Islamic Business",cr:3,cat:"F",field:"MUA",pre:["BIMCK1043"]},
    {code:"BIMEK3023",ms:"Pengurusan Takaful",en:"Takaful Management",cr:3,cat:"F",field:"MUA",pre:[]},
    {code:"BIMEK3123",ms:"Kepimpinan dalam Islam",en:"Leadership in Islam",cr:3,cat:"F",field:"MUA",pre:[]},
    /* 6. Public Management */
    {code:"GMGAK2013",ms:"Perlembagaan Malaysia",en:"Malaysian Constitution",cr:3,cat:"F",field:"PM",pre:[]},
    {code:"GMGAK2023",ms:"Dasar Awam",en:"Public Policy",cr:3,cat:"F",field:"PM",pre:[]},
    {code:"GMGAK2033",ms:"Etika untuk Pentadbir Awam",en:"Ethics for Public Administrator",cr:3,cat:"F",field:"PM",pre:[]},
    {code:"GMGAK2053",ms:"Kerajaan Tempatan",en:"Local Government",cr:3,cat:"F",field:"PM",pre:[]},
    {code:"GMGFK2023",ms:"Pentadbiran Kewangan",en:"Financial Administration",cr:3,cat:"F",field:"PM",pre:[]},
    {code:"GMGMK3023",ms:"Kepimpinan dalam Pengurusan Awam",en:"Leadership in Public Management",cr:3,cat:"F",field:"PM",pre:[]},
    {code:"GMGMK3123",ms:"Pengurusan Sumber Manusia dalam Perkhidmatan Awam",en:"Human Resource Management in the Public Service",cr:3,cat:"F",field:"PM",pre:[]},
    /* G — Free Elective */
    {code:"FREE3013",ms:"Elektif Bebas",en:"Free Elective",cr:3,cat:"G",pre:[],ph:true},
    /* H — Industrial Training */
    {code:"BEEXK4948",ms:"Latihan Industri",en:"Industrial Training",cr:8,cat:"H",pre:[],all:true}
  ],
  recommended:{
    "":{
      1:["BEEBK1013","BEEQK1013","BEEDK1013","MPB2013","BPMNK1013","BKANK1013","VKKK1011"],
      2:["BEEQK1023","BEEBK2013","BEEQK2013","MPB3013","SBLFK1053","MPU1012","MPU1022","VKKK1021"],
      3:["BEEBK2023","BEEQK2023","SBLEK3063","SBLFK2053","MPU1042","GMGAK2013","GMGAK2023"],
      4:["BEEBK3013","BEESK3033","SBLFK3053","MPU1052","BEEMK2033","BEEMK3043","GMGAK2033"],
      5:["BEEBK3023","BEERK3043","BPMNK3123","MPU1062","BEEEK3073","BEEPK3083","GMGAK2053"],
      6:["BEESK3053","BEEZK3996","FREE3013","GMGFK2023","GMGMK3023"],
      7:["BEEXK4948"]
    }
  }
};

/* ─────────── BRMI — 120 cr, 7 semesters, 7 components ─────────── */
PROGRAMS.BRMI = {
  id:"BRMI", short:"BRMI (Hons)",
  fullName:"SARJANA MUDA PENGURUSAN RISIKO DAN INSURANS DENGAN KEPUJIAN [BRMI (HONS)]",
  nameEn:"Bachelor of Risk Management & Insurance with Honours",
  total:120, semCount:7,
  components:[
    {l:"A",ms:"Teras Universiti",en:"University Core",req:12},
    {l:"B",ms:"Teras Bahasa Inggeris",en:"English Core",req:6},
    {l:"C",ms:"Teras Program",en:"Program Core",req:63},
    {l:"D",ms:"Elektif Bidang",en:"Field Elective",req:18},
    {l:"E",ms:"Elektif Program",en:"Program Elective",req:12},
    {l:"F",ms:"Elektif Bebas",en:"Free Elective",req:3},
    {l:"G",ms:"Latihan Industri",en:"Industrial Training",req:6}
  ],
  tracks:[
    {id:"PK",ms:"Perancangan Kewangan",en:"Financial Planning"},
    {id:"PB",ms:"Pengurusan Bank",en:"Bank Management"},
    {id:"DM",ms:"Matematik Pemutusan",en:"Decision Mathematics"},
    {id:"HRM",ms:"Pengurusan Sumber Manusia",en:"Human Resource Management"}
  ],
  shortSems:[7],
  courses:[
    /* A */
    {code:"MPU1012",ms:"Falsafah dan Isu Semasa",en:"Philosophy & Current Issues",cr:2,cat:"A",pre:[]},
    {code:"MPU1022",ms:"Penghayatan Etika dan Peradaban",en:"Ethics & Civilizations",cr:2,cat:"A",pre:[]},
    {code:"MPU1042",ms:"Kenegaraan Malaysia",en:"Malaysian Studies",cr:2,cat:"A",pre:[]},
    {code:"MPU1052",ms:"Prinsip Keusahawanan",en:"Entrepreneurship Principles",cr:2,cat:"A",pre:[]},
    {code:"MPU1062",ms:"Integriti dan Antirasuah",en:"Integrity & Anti-Corruption",cr:2,cat:"A",pre:[]},
    {code:"VKKK1011",ms:"Ko-Kurikulum I",en:"Co-Curriculum I",cr:1,cat:"A",pre:[]},
    {code:"VKKK1021",ms:"Ko-Kurikulum II",en:"Co-Curriculum II",cr:1,cat:"A",pre:[]},
    /* B — English Core: pathway-aware */
    {code:"MPB1013",ms:"Penguasaan Asas Bahasa Inggeris",en:"Basic English Proficiency",cr:3,cat:"B",pre:[],pathway:"L1"},
    {code:"MPB2013",ms:"Pengayaan Bahasa Inggeris I",en:"English Language Enrichment I",cr:3,cat:"B",pre:["MPB1013"],pathway:"L1L2"},
    {code:"MPB3013",ms:"Pengayaan Bahasa Inggeris II",en:"English Language Enrichment II",cr:3,cat:"B",pre:["MPB2013"],pathway:"L1L2L3"},
    {code:"SBLEK3023",ms:"English for Small Group Communication",en:"English for Small Group Communication",cr:3,cat:"B",pre:["MPB3013"],pathway:"ESP"},
    {code:"SBLEK3033",ms:"Report Writing",en:"Report Writing",cr:3,cat:"B",pre:["MPB3013"],pathway:"ESP"},
    {code:"SBLEK3043",ms:"Hospitality English",en:"Hospitality English",cr:3,cat:"B",pre:["MPB3013"],pathway:"ESP"},
    {code:"SBLEK3053",ms:"Public Speaking Skills",en:"Public Speaking Skills",cr:3,cat:"B",pre:["MPB3013"],pathway:"ESP"},
    {code:"SBLEK3063",ms:"English for Professional Communication",en:"English for Professional Communication",cr:3,cat:"B",pre:["MPB3013"],pathway:"ESP"},
    /* C — Program Core (63 cr) */
    {code:"BKAFK1023",ms:"Pengantar Perakaunan Kewangan",en:"Introduction to Financial Accounting",cr:3,cat:"C",pre:[]},
    {code:"BWRRK1013",ms:"Risiko dan Insurans",en:"Risk & Insurance",cr:3,cat:"C",pre:[]},
    {code:"BPMNK1013",ms:"Pengantar Pengurusan",en:"Introduction to Management",cr:3,cat:"C",pre:[]},
    {code:"SQQSK1013",ms:"Pengantar Statistik",en:"Introduction to Statistics",cr:3,cat:"C",pre:[]},
    {code:"BWFFK2033",ms:"Pengurusan Kewangan",en:"Financial Management",cr:3,cat:"C",pre:["BKAFK1023"]},
    {code:"BWFFK2043",ms:"Pengurusan Kewangan Lanjutan",en:"Advanced Financial Management",cr:3,cat:"C",pre:["BWFFK2033"]},
    {code:"GLULK2013",ms:"Undang-Undang Perniagaan",en:"Business Law",cr:3,cat:"C",pre:[]},
    {code:"SQQSK2013",ms:"Statistik Gunaan",en:"Applied Statistics",cr:3,cat:"C",pre:["SQQSK1013"]},
    {code:"BEEBK1013",ms:"Prinsip Ekonomi",en:"Principles of Economics",cr:3,cat:"C",pre:[]},
    {code:"BWRRK3033",ms:"Pengurusan Risiko",en:"Risk Management",cr:3,cat:"C",pre:["BWFFK2033"]},
    {code:"BWRRK3123",ms:"Urus Tadbir Korporat",en:"Corporate Governance",cr:3,cat:"C",pre:[]},
    {code:"BWRRK3043",ms:"Pengurusan Manfaat Pekerja",en:"Employee Benefits Management",cr:3,cat:"C",pre:["BWRRK1013","BWFFK2033"]},
    {code:"BWRRK3143",ms:"Pengurusan Risiko Harta & Liabiliti",en:"Property & Liability Risk Management",cr:3,cat:"C",pre:["BWRRK1013"]},
    {code:"BWRRK3153",ms:"Pembiayaan Risiko",en:"Risk Financing",cr:3,cat:"C",pre:["BWRRK1013","BWFFK2043"]},
    {code:"BWBBK3053",ms:"Pemasaran Servis Kewangan",en:"Marketing of Financial Services",cr:3,cat:"C",pre:[]},
    {code:"BWRRK3133",ms:"Analisis Risiko & Pembuatan Keputusan",en:"Risk Analysis & Decision Making",cr:3,cat:"C",pre:["BWRRK1013","BWFFK2043"],offer:"odd"},
    {code:"BWRRK3163",ms:"Pengurusan Kesinambungan Perniagaan",en:"Business Continuity Management",cr:3,cat:"C",pre:["BWRRK1013"],offer:"odd"},
    {code:"BPMNK3123",ms:"Etika Pengurusan",en:"Management Ethics",cr:3,cat:"C",pre:[],minCr:70},
    {code:"BPMNK3143",ms:"Kaedah Penyelidikan",en:"Research Methodology",cr:3,cat:"C",pre:["SQQSK1013"],minCr:70},
    {code:"BPMNK3023",ms:"Pengurusan Strategik",en:"Strategic Management",cr:3,cat:"C",pre:[],minCr:90},
    {code:"BWRRK3093",ms:"Seminar Pengurusan Risiko & Insurans",en:"Risk Management & Insurance Seminar",cr:3,cat:"C",pre:[],minCr:90},
    /* D — Field Electives: choose ONE specialization (18 cr), take ALL courses in that track */
    /* Track 1: Perancangan Kewangan (Financial Planning) — 6 courses × 3 cr = 18 cr */
    {code:"BWRRK3103",ms:"Perancangan Estet",en:"Estate Planning",cr:3,cat:"D",pre:["BWFFK2033"],track:"PK"},
    {code:"BWRRK3113",ms:"Perancangan Persaraan",en:"Retirement Planning",cr:3,cat:"D",pre:["BWFFK2033"],track:"PK",offer:"even"},
    {code:"BKATK2013",ms:"Pengantar Percukaian",en:"Principle of Taxation",cr:3,cat:"D",pre:["BKAFK1023"],track:"PK"},
    {code:"BWFNK3013",ms:"Analisis Pelaburan",en:"Investment Analysis",cr:3,cat:"D",pre:["BWFFK2043"],track:"PK"},
    {code:"BWFNK3033",ms:"Pengurusan Portfolio",en:"Portfolio Management",cr:3,cat:"D",pre:["BWFFK2043"],track:"PK"},
    {code:"BWFFK3073",ms:"Kewangan Peribadi",en:"Personal Finance",cr:3,cat:"D",pre:["BWFFK2043"],track:"PK"},
    /* Track 2: Pengurusan Bank (Bank Management) — 7 courses; choose 6 = 18 cr */
    {code:"BWBBK1013",ms:"Asas Perbankan",en:"Foundations of Banking",cr:3,cat:"D",pre:[],track:"PB"},
    {code:"BWBBK2013",ms:"Pengurusan Bank",en:"Bank Management",cr:3,cat:"D",pre:[],track:"PB"},
    {code:"BWBBK3013",ms:"Operasi Bank Perdagangan",en:"Commercial Bank Operations",cr:3,cat:"D",pre:["BWBBK2013"],track:"PB"},
    {code:"BWBBK3023",ms:"Pengurusan Pinjaman",en:"Lending Management",cr:3,cat:"D",pre:["BWBBK2013"],track:"PB"},
    {code:"BWBBK3043",ms:"Sekuriti Perbankan",en:"Banking Securities",cr:3,cat:"D",pre:["BWBBK2013"],track:"PB"},
    {code:"BWBBK3063",ms:"Pembiayaan dan Perdagangan Antarabangsa",en:"International Trade and Finance",cr:3,cat:"D",pre:["BWBBK2013"],track:"PB"},
    {code:"BWBBK3083",ms:"Perbankan Korporat",en:"Corporate Banking",cr:3,cat:"D",pre:["BWBBK2013"],track:"PB"},
    /* Track 3: Matematik Pemutusan (Decision Mathematics) — 7 courses */
    {code:"SQQMK1034",ms:"Kalkulus I",en:"Calculus I",cr:4,cat:"D",pre:[],track:"DM"},
    {code:"SQQMK1063",ms:"Matematik Diskret",en:"Discrete Mathematics",cr:3,cat:"D",pre:[],track:"DM"},
    {code:"SQQMK1073",ms:"Matematik Perniagaan",en:"Business Mathematics",cr:3,cat:"D",pre:["SQQMK1034"],track:"DM"},
    {code:"SQITK1013",ms:"Pengaturcaraan dalam Aplikasi Perniagaan",en:"Programming in Business Applications",cr:3,cat:"D",pre:[],track:"DM"},
    {code:"SQITK3053",ms:"Pembuatan Keputusan Berbantu Komputer",en:"Computer Aided Decision Making",cr:3,cat:"D",pre:["SQITK1013"],track:"DM"},
    {code:"SQITK3063",ms:"Perlombongan Data",en:"Data Mining",cr:3,cat:"D",pre:[],track:"DM"},
    {code:"SQITK3083",ms:"Visualisasi Data",en:"Data Visualization",cr:3,cat:"D",pre:[],track:"DM"},
    /* Track 4: Pengurusan Sumber Manusia (Human Resource Management) — 6 courses × 3 cr = 18 cr */
    {code:"BPMHK2013",ms:"Pengurusan Sumber Manusia",en:"Human Resources Management",cr:3,cat:"D",pre:["BPMNK1013"],track:"HRM"},
    {code:"BPMHK3033",ms:"Latihan dan Pembangunan",en:"Training and Development",cr:3,cat:"D",pre:["BPMHK2013"],track:"HRM"},
    {code:"BPMHK3053",ms:"Pengurusan Prestasi Pekerja",en:"Employee Performance Management",cr:3,cat:"D",pre:["BPMHK2013"],track:"HRM"},
    {code:"BPMHK3023",ms:"Penstafan",en:"Staffing",cr:3,cat:"D",pre:["BPMHK2013"],track:"HRM"},
    {code:"BPMHK3063",ms:"Pengurusan Perubahan",en:"Change Management",cr:3,cat:"D",pre:["BPMHK2013"],track:"HRM"},
    {code:"BPMHK3083",ms:"Pengenalan Keselamatan dan Kesihatan Pekerjaan",en:"Introduction to Occupational Safety and Health",cr:3,cat:"D",pre:["BPMHK2013"],track:"HRM"},
    /* E — Program Electives (12 cr): choose any 4 of 12 courses */
    {code:"BWFFK3013",ms:"Kewangan Korporat",en:"Corporate Finance",cr:3,cat:"E",pre:["BWFFK2043"]},
    {code:"BWRRK2033",ms:"Insurans Hayat dan Kesihatan",en:"Life and Health Insurance",cr:3,cat:"E",pre:["BWRRK1013","BWFFK2033"],offer:"even"},
    {code:"BWRRK2043",ms:"Operasi Syarikat Insurans",en:"Insurance Company Operations",cr:3,cat:"E",pre:["BWRRK1013"]},
    {code:"BWRRK3023",ms:"Sains Aktuari",en:"Actuarial Science",cr:3,cat:"E",pre:["BWFFK2033"],offer:"even"},
    {code:"BWRRK3053",ms:"Reinsurans",en:"Reinsurance",cr:3,cat:"E",pre:["BWRRK1013"]},
    {code:"BWRRK3063",ms:"Pengurusan Risiko Kewangan",en:"Financial Risk Management",cr:3,cat:"E",pre:["BWFFK2043"],offer:"even"},
    {code:"BWRRK3073",ms:"Pengurusan Risiko Kredit",en:"Credit Risk Management",cr:3,cat:"E",pre:["BWFFK2033"],offer:"even"},
    {code:"BWRRK3083",ms:"Insurans Marin dan Penerbangan",en:"Marine and Aviation Insurance",cr:3,cat:"E",pre:["BWRRK1013"],offer:"even"},
    {code:"BWRRK3173",ms:"Insurans Peribadi",en:"Personal Insurance",cr:3,cat:"E",pre:["BWRRK1013"]},
    {code:"BWRSK2013",ms:"Takaful",en:"Takaful",cr:3,cat:"E",pre:[]},
    {code:"BWRZK3993",ms:"Projek Ilmiah",en:"Project Paper",cr:3,cat:"E",pre:["BPMNK3143"],minCr:100},
    {code:"GLUEK3013",ms:"Undang-undang Insurans",en:"Insurance Law",cr:3,cat:"E",pre:[]},
    {code:"SBLEK3163",ms:"Kemahiran Berucap di Hadapan Awam",en:"Public Speaking Skills",cr:3,cat:"E",pre:["MPB3013"]},
    /* F */
    {code:"FREE3013",ms:"Elektif Bebas",en:"Free Elective",cr:3,cat:"F",pre:[],ph:true},
    /* G */
    {code:"BWRXK4976",ms:"Latihan Industri",en:"Industrial Training",cr:6,cat:"G",pre:[],all:true}
  ],
  recommended:{
    /* Sem 1–2: core courses same for all tracks (19 cr each)
       Sem 3: core + FE1 + PE1 = 20 cr
       Sem 4: core + FE2 + FE3 + Ko-Kur I = 19 cr
       Sem 5: core + FE4 + FE5 + Free Elec + Ko-Kur II = 19 cr
       Sem 6: core + PE4 + FE6 = 18 cr
       Sem 7: Industrial Training = 6 cr  →  Total = 120 cr */
    "PK":{
      1:["BKAFK1023","BWRRK1013","BPMNK1013","SQQSK1013","MPU1042","MPU1052","MPB2013"],
      2:["BWFFK2033","GLULK2013","SQQSK2013","BEEBK1013","MPU1022","MPU1012","MPB3013"],
      3:["BWFFK2043","BWRRK3033","BWRRK3123","BWRRK3043","MPU1062","BWRRK3103","BWRRK2043"],
      4:["BWRRK3153","BWRRK3143","BWBBK3053","BWRSK2013","BWRRK3113","BKATK2013","VKKK1011"],
      5:["BWRRK3133","BWRRK3163","GLUEK3013","BWFNK3013","BWFNK3033","FREE3013","VKKK1021"],
      6:["BPMNK3123","BPMNK3143","BPMNK3023","BWRRK3093","BWRRK2033","BWFFK3073"],
      7:["BWRXK4976"]
    },
    "PB":{
      1:["BKAFK1023","BWRRK1013","BPMNK1013","SQQSK1013","MPU1042","MPU1052","MPB2013"],
      2:["BWFFK2033","GLULK2013","SQQSK2013","BEEBK1013","MPU1022","MPU1012","MPB3013"],
      3:["BWFFK2043","BWRRK3033","BWRRK3123","BWRRK3043","MPU1062","BWBBK2013","BWRRK2043"],
      4:["BWRRK3153","BWRRK3143","BWBBK3053","BWRSK2013","BWBBK1013","BWBBK3013","VKKK1011"],
      5:["BWRRK3133","BWRRK3163","GLUEK3013","BWBBK3023","BWBBK3043","FREE3013","VKKK1021"],
      6:["BPMNK3123","BPMNK3143","BPMNK3023","BWRRK3093","BWRRK2033","BWBBK3063"],
      7:["BWRXK4976"]
    },
    "DM":{
      1:["BKAFK1023","BWRRK1013","BPMNK1013","SQQSK1013","MPU1042","MPU1052","MPB2013"],
      2:["BWFFK2033","GLULK2013","SQQSK2013","BEEBK1013","MPU1022","MPU1012","MPB3013"],
      3:["BWFFK2043","BWRRK3033","BWRRK3123","BWRRK3043","MPU1062","SQQMK1063","BWRRK2043"],
      4:["BWRRK3153","BWRRK3143","BWBBK3053","BWRSK2013","SQQMK1034","SQITK1013","VKKK1011"],
      5:["BWRRK3133","BWRRK3163","GLUEK3013","SQITK3053","SQITK3063","FREE3013","VKKK1021"],
      6:["BPMNK3123","BPMNK3143","BPMNK3023","BWRRK3093","BWRRK2033","SQITK3083"],
      7:["BWRXK4976"]
    },
    "HRM":{
      1:["BKAFK1023","BWRRK1013","BPMNK1013","SQQSK1013","MPU1042","MPU1052","MPB2013"],
      2:["BWFFK2033","GLULK2013","SQQSK2013","BEEBK1013","MPU1022","MPU1012","MPB3013"],
      3:["BWFFK2043","BWRRK3033","BWRRK3123","BWRRK3043","MPU1062","BPMHK2013","BWRRK2043"],
      4:["BWRRK3153","BWRRK3143","BWBBK3053","BWRSK2013","BPMHK3033","BPMHK3023","VKKK1011"],
      5:["BWRRK3133","BWRRK3163","GLUEK3013","BPMHK3053","BPMHK3063","FREE3013","VKKK1021"],
      6:["BPMNK3123","BPMNK3143","BPMNK3023","BWRRK3093","BWRRK2033","BPMHK3083"],
      7:["BWRXK4976"]
    }
  }
};

/* ─────────── BSc. Agribus. Mgmt. — 125 cr, 7 semesters, 6 components ─────────── */
PROGRAMS.BAGRO = {
  id:"BAGRO", short:"BSc. Agribus. (Hons)",
  fullName:"SARJANA MUDA SAINS PENGURUSAN PERNIAGAANTANI DENGAN KEPUJIAN [BSc. Agribus. Mgmt. (Hons)]",
  nameEn:"Bachelor of Agribusiness Management Science with Honours",
  total:125, semCount:7,
  components:[
    {l:"A",ms:"Teras Universiti",en:"University Core",req:12},
    {l:"B",ms:"Teras Bahasa Inggeris",en:"English Core",req:6},
    {l:"C",ms:"Teras Program",en:"Program Core",req:87},
    {l:"D",ms:"Keperluan Bahasa Asing",en:"Foreign Language Requirement",req:9},
    {l:"E",ms:"Elektif Bebas",en:"Free Elective",req:3},
    {l:"F",ms:"Latihan Industri",en:"Industrial Training",req:8}
  ],
  tracks:[],
  shortSems:[7],
  courses:[
    /* A */
    {code:"MPU1012",ms:"Falsafah dan Isu Semasa",en:"Philosophy & Current Issues",cr:2,cat:"A",pre:[]},
    {code:"MPU1022",ms:"Penghayatan Etika dan Peradaban",en:"Ethics & Civilizations",cr:2,cat:"A",pre:[]},
    {code:"MPU1042",ms:"Kenegaraan Malaysia",en:"Malaysian Studies",cr:2,cat:"A",pre:[]},
    {code:"MPU1052",ms:"Prinsip Keusahawanan",en:"Entrepreneurship Principles",cr:2,cat:"A",pre:[]},
    {code:"MPU1062",ms:"Integriti dan Antirasuah",en:"Integrity & Anti-Corruption",cr:2,cat:"A",pre:[]},
    {code:"VKKK1011",ms:"Ko-Kurikulum I",en:"Co-Curriculum I",cr:1,cat:"A",pre:[]},
    {code:"VKKK1021",ms:"Ko-Kurikulum II",en:"Co-Curriculum II",cr:1,cat:"A",pre:[]},
    /* B — English Core: pathway-aware. SBLEK3033/3063 are mandatory C-cat courses in BAGRO; Path 3 ESP picks from 3023/3043/3053 */
    {code:"MPB1013",ms:"Penguasaan Asas Bahasa Inggeris",en:"Basic English Proficiency",cr:3,cat:"B",pre:[],pathway:"L1"},
    {code:"MPB2013",ms:"Pengayaan Bahasa Inggeris I",en:"English Language Enrichment I",cr:3,cat:"B",pre:["MPB1013"],pathway:"L1L2"},
    {code:"MPB3013",ms:"Pengayaan Bahasa Inggeris II",en:"English Language Enrichment II",cr:3,cat:"B",pre:["MPB2013"],pathway:"L1L2L3"},
    {code:"SBLEK3023",ms:"English for Small Group Communication",en:"English for Small Group Communication",cr:3,cat:"B",pre:["MPB3013"],pathway:"ESP"},
    {code:"SBLEK3043",ms:"Hospitality English",en:"Hospitality English",cr:3,cat:"B",pre:["MPB3013"],pathway:"ESP"},
    {code:"SBLEK3053",ms:"Public Speaking Skills",en:"Public Speaking Skills",cr:3,cat:"B",pre:["MPB3013"],pathway:"ESP"},
    /* C — Program Core (29 courses, 87 cr) */
    {code:"BEEBK1013",ms:"Prinsip Ekonomi",en:"Principles of Economics",cr:3,cat:"C",pre:[]},
    {code:"BEEBK2013",ms:"Mikroekonomi",en:"Microeconomics",cr:3,cat:"C",pre:["BEEBK1013"]},
    {code:"BEEBK2023",ms:"Makroekonomi",en:"Macroeconomics",cr:3,cat:"C",pre:["BEEBK1013"]},
    {code:"BKANK1013",ms:"Perakaunan Asas",en:"Basic Accounting",cr:3,cat:"C",pre:[]},
    {code:"BPMNK1013",ms:"Prinsip Pengurusan",en:"Principles of Management",cr:3,cat:"C",pre:[]},
    {code:"BPMNK3023",ms:"Pengurusan Strategik",en:"Strategic Management",cr:3,cat:"C",pre:[],minCr:90},
    {code:"BPMNK3123",ms:"Etika Pengurusan",en:"Management Ethics",cr:3,cat:"C",pre:[],minCr:70},
    {code:"SQQSK1013",ms:"Pengantar Statistik",en:"Elementary Statistics",cr:3,cat:"C",pre:[]},
    {code:"SQQMK1023",ms:"Matematik Untuk Pengurusan",en:"Managerial Mathematics",cr:3,cat:"C",pre:[]},
    {code:"BWFFK1013",ms:"Asas Kewangan",en:"Basic Finance",cr:3,cat:"C",pre:[]},
    {code:"BETAK1013",ms:"Biologi",en:"Biology",cr:3,cat:"C",pre:[]},
    {code:"BETAK1023",ms:"Kimia",en:"Chemistry",cr:3,cat:"C",pre:[]},
    {code:"BETAK2013",ms:"Sains Ternakan",en:"Animal Husbandry",cr:3,cat:"C",pre:["BETAK1013","BETAK1023"]},
    {code:"BETAK2023",ms:"Sains Makanan",en:"Food Science",cr:3,cat:"C",pre:["BETAK1013","BETAK1023"]},
    {code:"BETAK2033",ms:"Sains Tanah",en:"Soil Science",cr:3,cat:"C",pre:["BETAK1013","BETAK1023"]},
    {code:"BETAK2043",ms:"Agronomi",en:"Agronomy",cr:3,cat:"C",pre:["BETAK1013","BETAK1023"]},
    {code:"BETAK2053",ms:"Akuakultur",en:"Aquaculture Management",cr:3,cat:"C",pre:["BETAK1013","BETAK1023"]},
    {code:"BEEAK3033",ms:"Kewangan Perniagaantani",en:"Agribusiness Finance",cr:3,cat:"C",pre:["BEEBK2013","BEEBK2023"]},
    {code:"BEEAK3113",ms:"Ekonomi Pengeluaran Pertanian",en:"Agricultural Production Economics",cr:3,cat:"C",pre:["BEEBK2013","BEEBK2023"]},
    {code:"BEEAK3123",ms:"Pengurusan Perniagaan-tani",en:"Agribusiness Management",cr:3,cat:"C",pre:["BEEBK2013","BEEBK2023"]},
    {code:"BEEAK3133",ms:"Ekonomi Pembangunan Pertanian",en:"Agricultural Development Economics",cr:3,cat:"C",pre:["BEEBK2013","BEEBK2023"]},
    {code:"BEEAK3153",ms:"Pemasaran Pertanian",en:"Agricultural Marketing",cr:3,cat:"C",pre:["BEEBK2013","BEEBK2023"]},
    {code:"BEEAK3163",ms:"Perdagangan Pertanian Antarabangsa",en:"International Agricultural Trade",cr:3,cat:"C",pre:["BEEBK2013","BEEBK2023"]},
    {code:"BJTNK2033",ms:"Pengurusan Pengeluaran & Operasi",en:"Production & Operations Mgmt",cr:3,cat:"C",pre:["SQQSK1013"]},
    {code:"BJTNK3073",ms:"Pengurusan Pembelian & Rangkaian Pembekal",en:"Procurement & Supply Chain Mgmt",cr:3,cat:"C",pre:["BJTNK2033"]},
    {code:"BEERK3043",ms:"Kaedah Penyelidikan",en:"Research Methods",cr:3,cat:"C",pre:["BEEBK2013","BEEBK2023"]},
    {code:"GLULK3043",ms:"Undang-Undang Perniagaan Tani",en:"Agribusiness Law",cr:3,cat:"C",pre:[]},
    {code:"SBLEK3033",ms:"Report Writing",en:"Report Writing",cr:3,cat:"C",pre:["MPB3013"]},
    {code:"SBLEK3063",ms:"English for Professional Communication",en:"English for Professional Communication",cr:3,cat:"C",pre:["MPB3013"]},
    /* D — Foreign Language: 3 sequential courses, pick ONE language */
    {code:"SBLFK1053",ms:"Bahasa Mandarin I",en:"Mandarin Language I",cr:3,cat:"D",pre:[],lang:"MAN"},
    {code:"SBLFK2053",ms:"Bahasa Mandarin II",en:"Mandarin Language II",cr:3,cat:"D",pre:["SBLFK1053"],lang:"MAN"},
    {code:"SBLFK3053",ms:"Bahasa Mandarin III",en:"Mandarin Language III",cr:3,cat:"D",pre:["SBLFK2053"],lang:"MAN"},
    {code:"SBLFK1023",ms:"Bahasa Arab I",en:"Arabic Language I",cr:3,cat:"D",pre:[],lang:"ARA"},
    {code:"SBLFK2023",ms:"Bahasa Arab II",en:"Arabic Language II",cr:3,cat:"D",pre:["SBLFK1023"],lang:"ARA"},
    {code:"SBLFK3023",ms:"Bahasa Arab III",en:"Arabic Language III",cr:3,cat:"D",pre:["SBLFK2023"],lang:"ARA"},
    {code:"SBLFK1033",ms:"Bahasa Jepun I",en:"Japanese Language I",cr:3,cat:"D",pre:[],lang:"JPN"},
    {code:"SBLFK2033",ms:"Bahasa Jepun II",en:"Japanese Language II",cr:3,cat:"D",pre:["SBLFK1033"],lang:"JPN"},
    {code:"SBLFK3033",ms:"Bahasa Jepun III",en:"Japanese Language III",cr:3,cat:"D",pre:["SBLFK2033"],lang:"JPN"},
    {code:"SBLFK1043",ms:"Bahasa Perancis I",en:"French Language I",cr:3,cat:"D",pre:[],lang:"FRA"},
    {code:"SBLFK2043",ms:"Bahasa Perancis II",en:"French Language II",cr:3,cat:"D",pre:["SBLFK1043"],lang:"FRA"},
    {code:"SBLFK3043",ms:"Bahasa Perancis III",en:"French Language III",cr:3,cat:"D",pre:["SBLFK2043"],lang:"FRA"},
    {code:"SBLFK1063",ms:"Bahasa Korea I",en:"Korean Language I",cr:3,cat:"D",pre:[],lang:"KOR"},
    {code:"SBLFK2063",ms:"Bahasa Korea II",en:"Korean Language II",cr:3,cat:"D",pre:["SBLFK1063"],lang:"KOR"},
    {code:"SBLFK3063",ms:"Bahasa Korea III",en:"Korean Language III",cr:3,cat:"D",pre:["SBLFK2063"],lang:"KOR"},
    {code:"FOREIGN1013",ms:"Bahasa Asing I",en:"Foreign Language I",cr:3,cat:"D",pre:[],lang:"OTH",ph:true},
    {code:"FOREIGN2013",ms:"Bahasa Asing II",en:"Foreign Language II",cr:3,cat:"D",pre:["FOREIGN1013"],lang:"OTH",ph:true},
    {code:"FOREIGN3013",ms:"Bahasa Asing III",en:"Foreign Language III",cr:3,cat:"D",pre:["FOREIGN2013"],lang:"OTH",ph:true},
    /* E */
    {code:"FREE3013",ms:"Elektif Bebas",en:"Free Elective",cr:3,cat:"E",pre:[],ph:true},
    /* F */
    {code:"BETXK4988",ms:"Latihan Industri",en:"Industrial Training",cr:8,cat:"F",pre:[],all:true}
  ],
  recommended:{
    "":{
      1:["MPU1042","MPB2013","BETAK1013","BEEBK1013","BKANK1013","BPMNK1013","SQQSK1013"],
      2:["MPU1012","MPB3013","BETAK1023","BEEBK2013","BWFFK1013","SQQMK1023","SBLFK1053"],
      3:["MPU1062","BETAK2023","BETAK2053","BEEBK2023","SBLFK2053","FREE3013","VKKK1011"],
      4:["BETAK2013","BETAK2043","BEEAK3033","BEEAK3153","BEEAK3133","SBLFK3053","VKKK1021"],
      5:["MPU1052","BETAK2033","BEEAK3163","BEEAK3123","BJTNK2033","BPMNK3123","SBLEK3033"],
      6:["MPU1022","BEEAK3113","BEERK3043","GLULK3043","BJTNK3073","SBLEK3063","BPMNK3023"],
      7:["BETXK4988"]
    }
  }
};

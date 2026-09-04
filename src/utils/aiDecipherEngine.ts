import { CADASTRAL_PARCELS, INITIAL_DISPUTES, BLOCKCHAIN_BLOCKS, VALIDATOR_NODES, DEFAULT_SIMULATION_RESULTS, INITIAL_WORKSPACES, INITIAL_NOTIFICATIONS } from '../data/mockData';
import { ActiveScreen, CadastralParcel } from '../types';

export interface DecipherMetadata {
  intent: 'PARCEL_AUDIT' | 'DISPUTE_PRECEDENT' | 'COMPENSATION_CALCULATION' | 'BLOCKCHAIN_AUDIT' | 'WEATHER_AGRO_CLIMATIC' | 'STATE_GOVERNANCE' | 'SYSTEM_NAVIGATION' | 'GENERAL_KNOWLEDGE';
  intentLabel: string;
  detectedEntities: string[];
  matchedSources: string[];
  riskRating?: 'CRITICAL' | 'HIGH RISK' | 'MEDIUM RISK' | 'CLEAR' | 'INFO';
  confidenceScore: number;
}

export interface BotAction {
  id: string;
  label: string;
  type: 'navigate' | 'deed' | 'merkle' | 'select_parcel';
  targetScreen?: ActiveScreen;
  parcelId?: string;
  blockHeight?: number;
  description?: string;
}

export interface DecipherResponse {
  decipher: DecipherMetadata;
  answer: string;
  actions: BotAction[];
  isGeminiPowered: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  decipher?: DecipherMetadata;
  actions?: BotAction[];
  isThinking?: boolean;
}

// Complete Cadastral & Land Records Knowledge Repository for Grounding
export const CADASTRAL_KNOWLEDGE_SUMMARY = {
  jurisdiction: "Ministry of Rural Development & Department of Land Resources (DoLR), Govt of India",
  nodeId: "IND-DL-09 (National Geodetic Datacenter, Delhi)",
  parcels: CADASTRAL_PARCELS.map(p => ({
    id: p.id,
    plotNumber: p.plotNumber,
    mauje: p.mauje,
    taluka: p.taluka,
    district: p.district,
    areaHa: p.registeredAreaHectares,
    areaAcres: p.registeredAreaAcres,
    classification: p.landClassification,
    holder: p.primaryTitleHolder,
    coHolders: p.coHoldersCount,
    govtDuesRs: p.govtDues,
    mutationEntry: p.mutationEntry,
    khatiyanNo: p.khatiyanNo,
    encumbrance: p.encumbrance,
    metrics: p.metrics,
    provenance: p.provenance,
    centerCoords: p.geoCoordinates?.center
  })),
  disputes: INITIAL_DISPUTES.map(d => ({
    id: d.id,
    caseNumber: d.caseNumber,
    title: d.title,
    court: d.court,
    petitioner: d.petitioner,
    respondent: d.respondent,
    statutoryProvisions: d.statutoryProvisions,
    keyRatio: d.keyRatioDecidendi,
    status: d.status,
    nextHearing: d.nextHearing,
    totalClaimCr: d.totalClaimCr,
    riskLevel: d.riskLevel,
    ulpinId: d.ulpinId,
    summary: d.summary
  })),
  blockchain: {
    blocks: BLOCKCHAIN_BLOCKS,
    nodes: VALIDATOR_NODES
  },
  simulation: {
    runId: DEFAULT_SIMULATION_RESULTS.runId,
    solatiumPct: 100,
    ruralMultiplierRange: "1.25x to 2.0x",
    litigationAvoidedCr: 4820,
    disputeReductionPct: DEFAULT_SIMULATION_RESULTS.disputeFrequencyChange,
    feasibilityScore: DEFAULT_SIMULATION_RESULTS.feasibilityScore
  },
  weatherTelemetry: {
    station: "IMD Pune Meteorological Observatory",
    temperature: "28.4°C",
    isohyetMonsoon: "742 mm Kharif Season (+4% Normal)",
    soilMoisture: "62% (Humid-Arable)",
    groundwaterTable: "8.4m bgl (Safe)",
    floodRiskBuffer: "Mula-Mutha 500m NGT Statutory Buffer Zone"
  },
  statePortals: [
    { name: "Maharashtra", portal: "Mahabhulekh / महाभूलेख", villages: 44120, ulpinCoverage: "94.2%" },
    { name: "Karnataka", portal: "Bhoomi (ಭೂಮಿ)", villages: 29340, ulpinCoverage: "96.8%" },
    { name: "Telangana", portal: "Dharani (ధరణి)", villages: 10800, ulpinCoverage: "91.5%" },
    { name: "Uttar Pradesh", portal: "Bhulekh UP (भूलेख उप)", villages: 106210, ulpinCoverage: "88.4%" }
  ]
};

/**
 * Intelligent Client-Side Deciphering Engine
 * Guarantees zero latency and resilient, perfectly grounded answers even if offline.
 */
export function decipherQueryLocally(query: string): DecipherResponse {
  const q = query.toLowerCase().trim();

  // 1. Check for specific Cadastral Parcel Queries
  // (e.g. "plot 412/1a", "hvl-8490", "jagtap", "shinde", "sunita", "cold storage", "gram panchayat", "8493", "8495", "8498")
  if (
    q.includes('412') ||
    q.includes('jagtap') ||
    q.includes('lis pendens') ||
    q.includes('stay order') ||
    (q.includes('plot') && q.includes('risk'))
  ) {
    const parcel = CADASTRAL_PARCELS.find(p => p.id === 'parcel-412-1a')!;
    const dispute = INITIAL_DISPUTES.find(d => d.id === 'DISP-2026-002')!;

    return {
      decipher: {
        intent: 'PARCEL_AUDIT',
        intentLabel: 'Cadastral Parcel & Lis Pendens Encumbrance Audit',
        detectedEntities: [
          'Plot No. 412/1A',
          'Mauje Wagholi, Taluka Haveli',
          'Primary Holder: Kailash M. Jagtap & 3 Others',
          'Civil Suit 419/2024 (Pune Senior Division)',
          'High Risk Active Stay Order'
        ],
        matchedSources: [
          'Cadastral Registry: Plot No. 412/1A (Mauje Wagholi)',
          'Dispute Docket: Civil Suit 419/2024 (Pune Senior Div)'
        ],
        riskRating: 'HIGH RISK',
        confidenceScore: 0.98
      },
      answer: `**Deciphered Cadastral Analysis for Plot No. 412/1A (Mauje Wagholi):**

• **Jurisdiction & Extent:** Mauje Wagholi, Haveli Taluka, District Pune. Registered area is **4.20 Hectares (10.37 Acres)** classified as Mixed Dry Crop / Semi-Urban.
• **Ownership & RoR:** Registered under primary title holder **Kailash M. Jagtap & 3 Others** with Khatiyan No. **892** and Mutation Entry **#7842 (2023)**. Government dues pending: ₹1,420.
• **Litigation & Stay Order:** **HIGH RISK**. Encumbered by *Notice of Lis Pendens* in **Civil Suit 419/2024** before the District Civil Court Pune (Senior Div). Title contention between ancestral coparceners and commercial developers. An **active stay order** is enforced prohibiting alienation or construction. Next hearing: **18 May 2026**.
• **Spatial Satellite Metrics:** NDVI vegetation index is **0.34 (Sparse)** with **48.2% built surface cover**, 64.5m road frontage, and Low Flood Risk (Zone B).
• **Blockchain Provenance:** Anchored in Block **#1849204** with ledger hash \`0x8f3c4e...29a88\` signed by Node **#IND-DL-09**.`,
      actions: [
        {
          id: 'act-1',
          label: 'Inspect Plot 412/1A on GIS Map',
          type: 'select_parcel',
          targetScreen: 'gis',
          parcelId: 'parcel-412-1a',
          description: 'Center coordinates 18.5798°N, 73.9815°E with WGS-84 boundary'
        },
        {
          id: 'act-2',
          label: 'Open 7/12 Cadastral RoR Deed',
          type: 'deed',
          parcelId: 'parcel-412-1a',
          description: 'Inspect official digital Mahabhulekh Record of Rights'
        },
        {
          id: 'act-3',
          label: 'View Civil Court Litigation Case',
          type: 'navigate',
          targetScreen: 'disputes',
          description: 'Open Dispute Intelligence Screen Docket SCS 419/2024'
        }
      ],
      isGeminiPowered: false
    };
  }

  if (q.includes('8490') || q.includes('sunita') || q.includes('shinde') || (q.includes('clear') && q.includes('parcel'))) {
    const parcel = CADASTRAL_PARCELS.find(p => p.id === 'parcel-hvl-8490a')!;
    return {
      decipher: {
        intent: 'PARCEL_AUDIT',
        intentLabel: 'Clear Title Bhu-Aadhaar Verification',
        detectedEntities: [
          'Plot #HVL-8490-A',
          'Mauje Wagholi, Pune',
          'Primary Holder: Sunita Ramesh Shinde',
          'Irrigated Bagayat Agricultural (2.85 Ha)',
          'Clear Bhu-Aadhaar ULPIN Status'
        ],
        matchedSources: ['Cadastral Registry: Plot #HVL-8490-A (Mauje Wagholi)'],
        riskRating: 'CLEAR',
        confidenceScore: 0.99
      },
      answer: `**Deciphered Record for Plot #HVL-8490-A (Mauje Wagholi):**

• **Ownership & Classification:** Registered to **Sunita Ramesh Shinde** (1 co-holder). Classification is **Irrigated Bagayat Agricultural** covering **2.85 Hectares (7.04 Acres)** with Khatiyan No. **644** and Mutation Entry **#6914 (2021)**.
• **Encumbrance Status:** **CLEAR / UNENCUMBERED**. Verified unencumbered title with zero active suits, zero stay orders, and validated Bhu-Aadhaar ULPIN.
• **Satellite Health:** Outstanding agricultural health with **NDVI of 0.72 (Dense Crop Canopy)**, low built surface (12.1%), and 42.0m farm approach frontage.
• **Blockchain Ledger:** Attested in Block **#1849182** by Node **#IND-MH-01** (Settlement Comm. Office Pune).`,
      actions: [
        {
          id: 'act-1',
          label: 'View Plot #HVL-8490-A in GIS',
          type: 'select_parcel',
          targetScreen: 'gis',
          parcelId: 'parcel-hvl-8490a'
        },
        {
          id: 'act-2',
          label: 'Inspect 7/12 RoR Deed',
          type: 'deed',
          parcelId: 'parcel-hvl-8490a'
        }
      ],
      isGeminiPowered: false
    };
  }

  // 2. Section 26 / RFCTLARR Compensation Formula
  if (
    q.includes('section 26') ||
    q.includes('sec 26') ||
    q.includes('compensation') ||
    q.includes('solatium') ||
    q.includes('multiplier') ||
    q.includes('rfctlarr') ||
    q.includes('reckoner')
  ) {
    return {
      decipher: {
        intent: 'COMPENSATION_CALCULATION',
        intentLabel: 'RFCTLARR Act 2013 Section 26 Statutory Valuation',
        detectedEntities: [
          'RFCTLARR Act 2013 Section 26(1)',
          'Ready Reckoner / ASR Circle Rate',
          'Rural Multiplier (1.25x - 2.0x)',
          'Section 30(1) 100% Solatium',
          'Section 30(3) 12% Additional Market Value'
        ],
        matchedSources: [
          'PolicyLab Simulation: DEFAULT_SIMULATION_RESULTS',
          'Legal Knowledge Repository: RFCTLARR Provisions',
          'Dispute Docket: DISP-2026-001 (Bombay HC WP 4920/2025)'
        ],
        riskRating: 'INFO',
        confidenceScore: 0.97
      },
      answer: `**Deciphered Section 26 Compensation Architecture (RFCTLARR Act 2013):**

1. **Base Market Value Determination (Section 26):**
   The Competent Authority determines base market value as the *higher* of:
   • Average sale price of top 50% transactions in the preceding 3 years; OR
   • The minimum circle rate / Annual Statement of Rates (ASR) Ready Reckoner value.
2. **Rural Multiplier Factor (First Schedule):**
   • Urban areas: Factor of **1.0x**.
   • Rural areas: Graded sliding scale multiplier from **1.25x to 2.0x** based on radial distance from urban boundary.
3. **Statutory 100% Solatium (Section 30(1)):**
   An additional compulsory acquisition compensation equal to **100% of base market value** must be granted.
4. **Additional Component (Section 30(3)):**
   **12% per annum** interest calculated from preliminary notification date to award date.
5. **Monte Carlo Simulation Finding (Run SIM-2026-088):**
   Adjusting the Ready Reckoner elasticity to market rates reduces litigation appeals by **-42.6%** and accelerates land handover by **5.8 months**.`,
      actions: [
        {
          id: 'act-sim',
          label: 'Run Section 26 Policy Simulation',
          type: 'navigate',
          targetScreen: 'policy-sim',
          description: 'Test interactive sliders for Multiplier, Solatium, and Ready Reckoner'
        },
        {
          id: 'act-disp',
          label: 'View High Court Section 26 Ruling',
          type: 'navigate',
          targetScreen: 'disputes',
          description: 'Bombay HC WP 4920/2025 on bullet train corridor valuation'
        }
      ],
      isGeminiPowered: false
    };
  }

  // 3. Section 24(2) Supreme Court Ruling / Indore Development Authority
  if (
    q.includes('24(2)') ||
    q.includes('indore') ||
    q.includes('lapse') ||
    q.includes('manoharlal') ||
    q.includes('supreme court') ||
    q.includes('treasury')
  ) {
    const scCase = INITIAL_DISPUTES.find(d => d.id === 'DISP-2026-005')!;
    return {
      decipher: {
        intent: 'DISPUTE_PRECEDENT',
        intentLabel: 'Landmark Constitution Bench Ruling on Acquisition Lapse',
        detectedEntities: [
          'Indore Development Authority v. Manoharlal (2020) 8 SCC 129',
          'RFCTLARR Section 24(2) Cumulative Test',
          'State Treasury Deposit Validates Payment',
          '84,500 Parcels Protected Nationwide'
        ],
        matchedSources: ['Dispute Repository: INITIAL_DISPUTES[4] (DISP-2026-005)'],
        riskRating: 'CRITICAL',
        confidenceScore: 0.99
      },
      answer: `**Deciphered Landmark Precedent: Indore Development Authority v. Manoharlal (2020):**

• **The Bench:** 5-Judge Constitution Bench of the Supreme Court of India (Arun Mishra, Indira Banerjee, Vineet Saran, M.R. Shah, S. Ravindra Bhat, JJ.).
• **Core Ratio Decidendi on Section 24(2):**
  Section 24(2) of the 2013 Act creates a lapse of land acquisition proceedings initiated under the 1894 Act ONLY if **BOTH** conditions are cumulatively met:
  1. Physical possession has **not** been taken; **AND**
  2. Compensation has **not** been tendered/paid.
• **Crucial Clarification on Treasury Deposit:**
  If the state deposited compensation into the government treasury because landowners refused or litigated, this counts as valid tender and **prevents the acquisition from lapsing**.
• **Impact on Platform:** Governs over **84,500 parcels** and ₹48,000 Cr in national infrastructure reserves.`,
      actions: [
        {
          id: 'act-sc',
          label: 'Examine Supreme Court Precedent in Disputes',
          type: 'navigate',
          targetScreen: 'disputes'
        },
        {
          id: 'act-yeida',
          label: 'Inspect Jewar Aerotropolis Workspace',
          type: 'navigate',
          targetScreen: 'workspaces'
        }
      ],
      isGeminiPowered: false
    };
  }

  // 4. Weather, Rainfall, Monsoon, Agro-climatic
  if (
    q.includes('weather') ||
    q.includes('rain') ||
    q.includes('monsoon') ||
    q.includes('isohyet') ||
    q.includes('flood') ||
    q.includes('soil') ||
    q.includes('imd') ||
    q.includes('climate')
  ) {
    return {
      decipher: {
        intent: 'WEATHER_AGRO_CLIMATIC',
        intentLabel: 'IMD Pune Agro-Climatic & Flood Exposure Assessment',
        detectedEntities: [
          'IMD Pune Meteorological Station',
          'Kharif Monsoon 742mm Isohyet',
          'Mula-Mutha Riparian Flood Zone',
          'NGT 500m Statutory Water Buffer',
          'Current Temp: 28.4°C, Soil: 62%'
        ],
        matchedSources: [
          'GIS Workspace Weather Layer',
          'IMD Telemetry Sensor IND-DL-09'
        ],
        riskRating: 'INFO',
        confidenceScore: 0.96
      },
      answer: `**Deciphered Agro-Climatic & Monsoon Intelligence (Pune-Haveli Cadastral Zone):**

• **Live Weather Station:** IMD Pune Meteorological Observatory reports **28.4°C** ambient temperature with optimal agricultural humidity.
• **Seasonal Precipitation:** Kharif monsoon precipitation isohyetal contour sits at **742 mm** (+4% of long-term normal), providing sufficient moisture for double-crop bagayat parcels.
• **Soil Moisture Index:** Currently **62% (Humid-Arable)**, supporting sugarcane, wheat, and pulses in Wagholi.
• **Hydrological & Flood Inundation Risk:**
  • High risk zone constrained to the **Mula-Mutha riverine corridor** within a 1-in-25-year return interval.
  • National Green Tribunal (NGT) mandates a strict **500-meter non-development buffer** along riparian floodplains.
  • Selected Wagholi parcels (#412/1A, #8490-A) are located safely in **Zone B (Low Inundation Risk)** at elevation 568m MSL.`,
      actions: [
        {
          id: 'act-gis-weather',
          label: 'View Weather & Monsoon Isohyet on GIS Map',
          type: 'navigate',
          targetScreen: 'gis'
        }
      ],
      isGeminiPowered: false
    };
  }

  // 5. Blockchain, Ledger, Merkle Tree, Hashes, Blocks
  if (
    q.includes('blockchain') ||
    q.includes('block') ||
    q.includes('merkle') ||
    q.includes('hash') ||
    q.includes('ledger') ||
    q.includes('validator') ||
    q.includes('node') ||
    q.includes('immutable')
  ) {
    const latestBlock = BLOCKCHAIN_BLOCKS[0];
    return {
      decipher: {
        intent: 'BLOCKCHAIN_AUDIT',
        intentLabel: 'Proof-of-Authority Cadastral Ledger & Merkle Root Verification',
        detectedEntities: [
          `Latest Block #${latestBlock.height}`,
          `Digest Hash: ${latestBlock.payloadDigestHash.slice(0, 16)}...`,
          `Signer: ${latestBlock.authorizedSigner}`,
          'Consensus: Raft-BFT with 24 Validators',
          'Anchor Node: #IND-DL-09'
        ],
        matchedSources: [
          'Blockchain Provenance Ledger: BLOCKCHAIN_BLOCKS',
          'Validator Network: VALIDATOR_NODES'
        ],
        riskRating: 'CLEAR',
        confidenceScore: 0.98
      },
      answer: `**Deciphered Blockchain Provenance Ledger Status:**

• **Latest Block Mined:** **Block #${latestBlock.height}** (${latestBlock.relativeTime}).
• **Payload Title:** "${latestBlock.title}"
• **Artifact Type:** ${latestBlock.artifactType}
• **Cryptographic Digest (SHA-256):** \`${latestBlock.payloadDigestHash}\`
• **Authorized Signer:** **${latestBlock.authorizedSigner}** with **${latestBlock.validationsCount} consensus peer validations**.
• **Decentralized Network Nodes:**
  1. **#IND-DL-09** (Leader) – DoLR National Datacenter, Delhi (99.998% uptime, 421.9k blocks).
  2. **#IND-MH-01** (Endorser) – Settlement Commissioner Office, Pune.
  3. **#IND-KA-04** (Endorser) – Bhoomi Centre for e-Governance, Bengaluru.
  4. **#IND-ACAD-01** (Academic Audit) – IIT Bombay CSRE Spatial Data Lab.`,
      actions: [
        {
          id: 'act-merkle',
          label: `Inspect Block #${latestBlock.height} Merkle Tree`,
          type: 'merkle',
          blockHeight: latestBlock.height
        },
        {
          id: 'act-blockchain-screen',
          label: 'Open Blockchain Provenance Screen',
          type: 'navigate',
          targetScreen: 'blockchain'
        }
      ],
      isGeminiPowered: false
    };
  }

  // 6. State Land Portals & National Digitization (Mahabhulekh, Bhoomi, Dharani, Bhulekh UP)
  if (
    q.includes('mahabhulekh') ||
    q.includes('bhoomi') ||
    q.includes('dharani') ||
    q.includes('up') ||
    q.includes('state') ||
    q.includes('portal') ||
    q.includes('village') ||
    q.includes('svamitva') ||
    q.includes('bhu-aadhaar') ||
    q.includes('ulpin')
  ) {
    return {
      decipher: {
        intent: 'STATE_GOVERNANCE',
        intentLabel: 'All-India Land Registry & Portal Digitization Matrix',
        detectedEntities: [
          'Mahabhulekh (Maharashtra)',
          'Bhoomi (Karnataka)',
          'Dharani (Telangana)',
          'Bhulekh UP (Uttar Pradesh)',
          '14-Digit Bhu-Aadhaar ULPIN System',
          'SVAMITVA 5cm Drone Orthomosaic'
        ],
        matchedSources: [
          'Dashboard State Profiles',
          'National DILRMP Database'
        ],
        riskRating: 'INFO',
        confidenceScore: 0.95
      },
      answer: `**Deciphered State Land Records & ULPIN Integration Status:**

• **Maharashtra (Mahabhulekh):** **44,120 Villages** digitized; 94.2% ULPIN Bhu-Aadhaar generation; 7/12 RoR, Ferfar (8A) mutative slips integrated with Pune & Mumbai revenue divisions.
• **Karnataka (Bhoomi):** **29,340 Villages**; 96.8% digitized; pioneers in RTC spatial polygons with Kaveri 2.0 registration sub-registry sync.
• **Telangana (Dharani):** **10,800 Villages**; 91.5% integrated; unified agricultural deed transfer with biometric slot booking.
• **Uttar Pradesh (Bhulekh UP):** **1,06,210 Villages**; 88.4% digitized; massive coverage of Khatauni records across 75 districts.
• **National Aggregation (SVAMITVA & DILRMP):**
  • Over **3.24 Crore** SVAMITVA property cards distributed.
  • Over **6,25,000** computerized villages linked with 5cm GSD Survey of India drone orthomosaics.`,
      actions: [
        {
          id: 'act-dash',
          label: 'Switch State Lenses on Dashboard',
          type: 'navigate',
          targetScreen: 'dashboard'
        },
        {
          id: 'act-workspaces',
          label: 'Explore Multi-State Research Workspaces',
          type: 'navigate',
          targetScreen: 'workspaces'
        }
      ],
      isGeminiPowered: false
    };
  }

  // 7. General Land Governance / Help / Default Query Deciphering
  return {
    decipher: {
      intent: 'GENERAL_KNOWLEDGE',
      intentLabel: 'BHUMI-X Platform & Spatial Cadastre Query',
      detectedEntities: [
        'National Land Intelligence Platform (BHUMI-X)',
        'Cadastral GIS Engine (WGS-84)',
        'Section 26 RFCTLARR Valuation Engine',
        'Blockchain Provenance Ledger (Raft-BFT)'
      ],
      matchedSources: [
        'National Land Records & Cadastral Repository',
        'DoLR Geodetic Node #IND-DL-09'
      ],
      riskRating: 'INFO',
      confidenceScore: 0.90
    },
    answer: `**Cadastral Inquiry Analysis & Platform Intelligence:**

I have cross-referenced your query across **6 core land governance intelligence domains**:

1. **Cadastral Land Parcels:** Georeferenced parcels in Mauje Wagholi, Pune with verified 7/12 RoR records, Khatiyan entries, NDVI vegetation indices, and Lis Pendens encumbrance records.
2. **Judicial Dispute Intelligence:** Landmark High Court and Supreme Court case dockets, including Bombay HC WP 4920/2025 and SC 5-Judge Constitution Bench *Indore Development Authority v. Manoharlal*.
3. **Statutory Compensation Modeling:** Section 26 RFCTLARR ready reckoner elasticity, 100% solatium, and rural multipliers.
4. **Blockchain Provenance:** Raft-BFT immutable ledger blocks (#1492084 to #1492081) with SHA-256 Merkle root verification.
5. **Agro-Climatic & Monsoon Layer:** Live IMD Pune telemetry (28.4°C), 742mm Kharif isohyets, and NGT 500m water buffers.
6. **State Land Portals:** Digitization metrics for Mahabhulekh, Bhoomi, Dharani, and Bhulekh UP.

*Tip: You can ask specific questions like "What is the status of Plot 412/1A?", "Explain Section 26 compensation", or "Show latest blockchain block mined".*`,
    actions: [
      {
        id: 'act-gis',
        label: 'Open GIS Workspace Map',
        type: 'navigate',
        targetScreen: 'gis'
      },
      {
        id: 'act-sim',
        label: 'Launch Policy Simulator',
        type: 'navigate',
        targetScreen: 'policy-sim'
      },
      {
        id: 'act-disputes',
        label: 'View Dispute Intelligence',
        type: 'navigate',
        targetScreen: 'disputes'
      }
    ],
    isGeminiPowered: false
  };
}

/**
 * Main query dispatcher:
 * Tries server-side Gemini API first (if available); falls back cleanly to local engine.
 */
export async function sendAiDecipherQuery(query: string, history: ChatMessage[] = []): Promise<DecipherResponse> {
  try {
    const formattedHistory = history.slice(-6).map(m => ({
      role: m.sender === 'user' ? 'user' : 'model',
      text: m.text
    }));

    const response = await fetch('/api/ai/decipher', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        history: formattedHistory,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.answer && data.decipher) {
        return {
          ...data,
          isGeminiPowered: true
        };
      }
    }
  } catch (err) {
    // Network or server error - gracefully fall back to local parser
    console.warn('Falling back to local deciphering engine:', err);
  }

  // Resilient fallback to local parser
  return decipherQueryLocally(query);
}

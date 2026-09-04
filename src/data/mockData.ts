import { CadastralParcel, BlockchainBlock, ValidatorNode, PushNotification, ResearchWorkspace, DisputeRecord } from '../types';

export const INITIAL_NOTIFICATIONS: PushNotification[] = [
  {
    id: 'notif-1',
    title: 'High-Density Acquisition Surge in Thane District',
    description: '31 new writ petitions filed across 4 talukas regarding Section 26 valuation disputes on Bullet Train alignment.',
    category: 'dispute',
    severity: 'critical',
    timestamp: '2026-10-14T10:14:00Z',
    relativeTime: '18m ago',
    read: false,
    targetScreen: 'disputes',
    location: 'Kalyan-Bhiwandi Belt, Thane'
  },
  {
    id: 'notif-2',
    title: 'Polygon Boundary Contradiction Identified',
    description: '14.8 Ha overlapping revenue polygon identified between KIADB Gazette and Karnataka Forest Dept spatial ledger.',
    category: 'cadastre',
    severity: 'alert',
    timestamp: '2026-10-14T08:32:00Z',
    relativeTime: '2h ago',
    read: false,
    targetScreen: 'gis',
    location: 'Sarjapur Hobli #402, Bengaluru'
  },
  {
    id: 'notif-3',
    title: 'Immutable Ledger Block #1,492,084 Mined',
    description: 'Cadastral Polygon Layer (Haveli Taluka v3.1) successfully attested with 24 consensus validations.',
    category: 'ledger',
    severity: 'info',
    timestamp: '2026-10-14T10:28:00Z',
    relativeTime: '2m ago',
    read: true,
    targetScreen: 'blockchain',
    location: 'DoLR Mainnet #IND-DL-09'
  },
  {
    id: 'notif-4',
    title: 'Policy Scenario Simulation Complete',
    description: 'Run #SIM-2026-088 converged in 4.2s with 95% Confidence Interval across 10,000 spatial Monte Carlo iterations.',
    category: 'simulation',
    severity: 'success',
    timestamp: '2026-10-14T09:45:00Z',
    relativeTime: '45m ago',
    read: true,
    targetScreen: 'policy-sim',
    location: 'Param-Shakti HPC Node'
  },
  {
    id: 'notif-5',
    title: 'Succession Claim Cluster Spike Detected',
    description: '112 delayed succession mutative filings clustered in non-notified agricultural plots in Jaipur Tehsil North.',
    category: 'dispute',
    severity: 'alert',
    timestamp: '2026-10-14T06:15:00Z',
    relativeTime: '4h ago',
    read: true,
    targetScreen: 'disputes',
    location: 'RJ-JPR-T01, Jaipur'
  }
];

export const CADASTRAL_PARCELS: CadastralParcel[] = [
  {
    id: 'parcel-412-1a',
    plotNumber: 'Plot No. 412/1A',
    mauje: 'Mauje Wagholi',
    taluka: 'Taluka Haveli',
    district: 'Pune',
    registeredAreaHectares: 4.20,
    registeredAreaAcres: 10.37,
    landClassification: 'Mixed Dry Crop / Semi-Urban',
    primaryTitleHolder: 'Kailash M. Jagtap & 3 Others',
    coHoldersCount: 3,
    govtDues: 1420,
    mutationEntry: 'Entry #7842',
    mutationYear: 2023,
    khatiyanNo: '892',
    encumbrance: {
      hasActiveEncumbrance: true,
      level: 'HIGH RISK',
      suitType: 'Notice of Lis Pendens Registered',
      suitNumber: 'Civil Suit 419/2024',
      court: 'District Civil Court Pune (Senior Div)',
      summary: 'Title contention between ancestral coparceners and commercial developer.',
      nextHearing: '18 May 2026',
      hasStayOrder: true
    },
    metrics: {
      ndviVegetation: 0.34,
      ndviStatus: 'Sparse',
      builtSurfaceCover: 48.2,
      roadFrontageMeters: 64.5,
      floodRiskZone: 'Low (Zone B)'
    },
    provenance: {
      blockIndex: 1849204,
      stateLedgerHash: '0x8f3c4e792ab8d19e51c889f0e142ab912e84c9fb29a88',
      timestamp: '2026-03-24 14:12 UTC',
      anchorNode: '#IND-DL-09'
    },
    svgCoords: {
      polygon: 'M 210,130 L 370,165 L 340,365 L 180,310 Z',
      center: [275, 240],
      label: 'Plot No. 412/1A',
      status: 'disputed'
    },
    geoCoordinates: {
      center: { lat: 18.5798, lng: 73.9815 },
      polygon: [
        { lat: 18.5812, lng: 73.9798 },
        { lat: 18.5818, lng: 73.9832 },
        { lat: 18.5786, lng: 73.9828 },
        { lat: 18.5780, lng: 73.9794 }
      ]
    }
  },
  {
    id: 'parcel-hvl-8490a',
    plotNumber: '#HVL-8490-A',
    mauje: 'Mauje Wagholi',
    taluka: 'Taluka Haveli',
    district: 'Pune',
    registeredAreaHectares: 2.85,
    registeredAreaAcres: 7.04,
    landClassification: 'Irrigated Bagayat Agricultural',
    primaryTitleHolder: 'Sunita Ramesh Shinde',
    coHoldersCount: 1,
    govtDues: 840,
    mutationEntry: 'Entry #6914',
    mutationYear: 2021,
    khatiyanNo: '644',
    encumbrance: {
      hasActiveEncumbrance: false,
      level: 'CLEAR',
      suitType: 'None',
      suitNumber: '-',
      court: '-',
      summary: 'Clear title, unencumbered status verified via Bhu-Aadhaar ULPIN.',
      nextHearing: '-',
      hasStayOrder: false
    },
    metrics: {
      ndviVegetation: 0.72,
      ndviStatus: 'Dense Vegetation',
      builtSurfaceCover: 12.1,
      roadFrontageMeters: 42.0,
      floodRiskZone: 'Low (Zone B)'
    },
    provenance: {
      blockIndex: 1849182,
      stateLedgerHash: '0x3ba99f2c810d7a049184ac91837ef81640192ea140b91',
      timestamp: '2026-03-21 09:40 UTC',
      anchorNode: '#IND-MH-01'
    },
    svgCoords: {
      polygon: 'M 195,115 L 350,150 L 320,80 L 160,55 Z',
      center: [255, 100],
      label: '#HVL-8490-A',
      status: 'agriculture'
    },
    geoCoordinates: {
      center: { lat: 18.5835, lng: 73.9785 },
      polygon: [
        { lat: 18.5845, lng: 73.9772 },
        { lat: 18.5850, lng: 73.9802 },
        { lat: 18.5822, lng: 73.9806 },
        { lat: 18.5818, lng: 73.9775 }
      ]
    }
  },
  {
    id: 'parcel-hvl-8493a',
    plotNumber: '#HVL-8493-A',
    mauje: 'Mauje Wagholi',
    taluka: 'Taluka Haveli',
    district: 'Pune',
    registeredAreaHectares: 5.60,
    registeredAreaAcres: 13.83,
    landClassification: 'Non-Agricultural Commercial (IT-SEZ)',
    primaryTitleHolder: 'Maharashtra Agro-Logistics Infra Ltd',
    coHoldersCount: 0,
    govtDues: 18450,
    mutationEntry: 'Entry #8102',
    mutationYear: 2024,
    khatiyanNo: '1105',
    encumbrance: {
      hasActiveEncumbrance: true,
      level: 'MEDIUM RISK',
      suitType: 'Revenue Appeal for Compensation Enhancement',
      suitNumber: 'LAC 142/2025',
      court: 'Collectorate Tribunal Haveli',
      summary: 'Enhancement request regarding highway widening buffer strip acquisition.',
      nextHearing: '24 Nov 2026',
      hasStayOrder: false
    },
    metrics: {
      ndviVegetation: 0.18,
      ndviStatus: 'Paved / Built',
      builtSurfaceCover: 76.4,
      roadFrontageMeters: 118.0,
      floodRiskZone: 'Low (Zone A)'
    },
    provenance: {
      blockIndex: 1849221,
      stateLedgerHash: '0x992cf01da483e091837ffac8102938174aa091483bf91',
      timestamp: '2026-03-27 16:04 UTC',
      anchorNode: '#IND-DL-09'
    },
    svgCoords: {
      polygon: 'M 345,370 L 490,400 L 460,560 L 310,520 Z',
      center: [400, 460],
      label: '#HVL-8493-A',
      status: 'commercial'
    },
    geoCoordinates: {
      center: { lat: 18.5765, lng: 73.9845 },
      polygon: [
        { lat: 18.5778, lng: 73.9828 },
        { lat: 18.5786, lng: 73.9870 },
        { lat: 18.5750, lng: 73.9862 },
        { lat: 18.5744, lng: 73.9822 }
      ]
    }
  },
  {
    id: 'parcel-hvl-8495c',
    plotNumber: '#HVL-8495-C',
    mauje: 'Mauje Wagholi',
    taluka: 'Taluka Haveli',
    district: 'Pune',
    registeredAreaHectares: 3.40,
    registeredAreaAcres: 8.40,
    landClassification: 'Warehouse & Cold Storage Zone',
    primaryTitleHolder: 'Deccan Agri-Coldchain Terminals LLP',
    coHoldersCount: 2,
    govtDues: 3200,
    mutationEntry: 'Entry #8310',
    mutationYear: 2025,
    khatiyanNo: '1240',
    encumbrance: {
      hasActiveEncumbrance: false,
      level: 'CLEAR',
      suitType: 'None',
      suitNumber: '-',
      court: '-',
      summary: 'Verified clear title with NOC from State Highway Authority.',
      nextHearing: '-',
      hasStayOrder: false
    },
    metrics: {
      ndviVegetation: 0.45,
      ndviStatus: 'Mixed Cover',
      builtSurfaceCover: 34.0,
      roadFrontageMeters: 82.0,
      floodRiskZone: 'Low (Zone B)'
    },
    provenance: {
      blockIndex: 1849240,
      stateLedgerHash: '0x71a2d5910c2837f819034aa109b823e410b2984cf1829',
      timestamp: '2026-04-02 11:20 UTC',
      anchorNode: '#IND-MH-01'
    },
    svgCoords: {
      polygon: 'M 380,165 L 520,195 L 490,340 L 350,310 Z',
      center: [435, 250],
      label: '#HVL-8495-C',
      status: 'active'
    },
    geoCoordinates: {
      center: { lat: 18.5818, lng: 73.9858 },
      polygon: [
        { lat: 18.5828, lng: 73.9840 },
        { lat: 18.5835, lng: 73.9875 },
        { lat: 18.5804, lng: 73.9872 },
        { lat: 18.5798, lng: 73.9838 }
      ]
    }
  },
  {
    id: 'parcel-hvl-8498f',
    plotNumber: '#HVL-8498-F',
    mauje: 'Mauje Wagholi',
    taluka: 'Taluka Haveli',
    district: 'Pune',
    registeredAreaHectares: 1.95,
    registeredAreaAcres: 4.82,
    landClassification: 'Gaothan Fringe Residential',
    primaryTitleHolder: 'Gram Panchayat Common Land Trust',
    coHoldersCount: 5,
    govtDues: 0,
    mutationEntry: 'Entry #6510',
    mutationYear: 2019,
    khatiyanNo: '302',
    encumbrance: {
      hasActiveEncumbrance: true,
      level: 'MEDIUM RISK',
      suitType: 'Encroachment Regularization Notice',
      suitNumber: 'REV-ENC/2024/77',
      court: 'Tehsildar Haveli Revenue Court',
      summary: 'Regularization application pending under State Gaothan Extension Scheme.',
      nextHearing: '10 Aug 2026',
      hasStayOrder: false
    },
    metrics: {
      ndviVegetation: 0.52,
      ndviStatus: 'Semi-Dense',
      builtSurfaceCover: 22.8,
      roadFrontageMeters: 36.5,
      floodRiskZone: 'Low (Zone B)'
    },
    provenance: {
      blockIndex: 1849150,
      stateLedgerHash: '0x10f82847a912e734bc10948bf81726a91823ef9810a92',
      timestamp: '2026-02-14 08:15 UTC',
      anchorNode: '#IND-DL-09'
    },
    svgCoords: {
      polygon: 'M 170,320 L 320,350 L 290,480 L 140,440 Z',
      center: [230, 400],
      label: '#HVL-8498-F',
      status: 'disputed'
    },
    geoCoordinates: {
      center: { lat: 18.5768, lng: 73.9805 },
      polygon: [
        { lat: 18.5778, lng: 73.9790 },
        { lat: 18.5784, lng: 73.9820 },
        { lat: 18.5755, lng: 73.9818 },
        { lat: 18.5750, lng: 73.9788 }
      ]
    }
  }
];

export const BLOCKCHAIN_BLOCKS: BlockchainBlock[] = [
  {
    height: 1492084,
    timestamp: '2026-10-14T10:28:12Z',
    relativeTime: '2 mins ago',
    title: 'Cadastral Polygon Layer (Haveli Taluka v3.1)',
    payloadDigestHash: '0x4a91e84029bc8110df66b1a208c2d91024bc01f8e6c739d201948ba5e29810a9',
    authorizedSigner: 'DoLR-Node-MH01 (Maharashtra Hub)',
    artifactType: 'ESRI Shapefile Geodatabase',
    validationsCount: 24
  },
  {
    height: 1492083,
    timestamp: '2026-10-14T10:16:04Z',
    relativeTime: '14 mins ago',
    title: 'Policy Simulation Output (SIM-2026-088 Baseline)',
    payloadDigestHash: '0x9b21cc3944a9810efaa5101033f401948ba5e29810a991024bc01f8e6c739d20',
    authorizedSigner: 'PolicyLab-Engine-Worker-04',
    artifactType: 'Monte Carlo Parameter Matrix',
    validationsCount: 18
  },
  {
    height: 1492082,
    timestamp: '2026-10-14T09:58:32Z',
    relativeTime: '32 mins ago',
    title: 'Drone Survey Orthomosaic (Solapur East)',
    payloadDigestHash: '0x11e47da830113f99aa129038aa9091024bc01f8e6c739d201948ba5e29810a9',
    authorizedSigner: 'SurveyOfIndia-MH-West02',
    artifactType: 'Cloud Optimized GeoTIFF (COG 4.8GB)',
    validationsCount: 32
  },
  {
    height: 1492081,
    timestamp: '2026-10-14T09:36:19Z',
    relativeTime: '54 mins ago',
    title: 'Tribal Land Rights Act Title Registry (FRA-2006 Deeds)',
    payloadDigestHash: '0x88f2190bb47c8402a1ef209848ab91024bc01f8e6c739d201948ba5e29810a9',
    authorizedSigner: 'MoTA-FRA-AnchorNode-01',
    artifactType: 'Encrypted PDF Batch + Signatures',
    validationsCount: 30
  }
];

export const VALIDATOR_NODES: ValidatorNode[] = [
  {
    id: 'IND-DL-09',
    nodeName: 'Node #IND-DL-09',
    role: 'Leader',
    organization: 'Dept. of Land Resources - New Delhi',
    location: 'National Datacenter, Delhi',
    uptime: '99.998%',
    blocksValidated: '421.9k',
    status: 'Online'
  },
  {
    id: 'IND-MH-01',
    nodeName: 'Node #IND-MH-01',
    role: 'Endorser',
    organization: 'Settlement Comm. Office - Pune',
    location: 'State Data Center, Maharashtra',
    uptime: '99.991%',
    blocksValidated: '388.1k',
    status: 'Online'
  },
  {
    id: 'IND-KA-04',
    nodeName: 'Node #IND-KA-04',
    role: 'Endorser',
    organization: 'Bhoomi Data Center - Bengaluru',
    location: 'Centre for e-Governance, Karnataka',
    uptime: '99.995%',
    blocksValidated: '394.0k',
    status: 'Online'
  },
  {
    id: 'IND-ACAD-01',
    nodeName: 'Node #IND-ACAD-01',
    role: 'Academic Audit',
    organization: 'IIT Bombay Spatial Data Lab',
    location: 'Centre of Studies in Resources Engineering, Mumbai',
    uptime: '99.980%',
    blocksValidated: '287.4k',
    status: 'Online'
  }
];

export const DEFAULT_SIMULATION_RESULTS = {
  runId: 'SIM-2026-088',
  executionTimeSec: 4.2,
  confidenceInterval: 95,
  iterations: 10000,
  acquisitionCostChange: 18.4,
  fiscalDeltaCr: 2140,
  disputeFrequencyChange: -42.6,
  consentVelocityMonths: 8.4,
  baselineConsentMonths: 14.2,
  feasibilityScore: 78,
  tradeoffBand: 'Mod-High Tradeoff Band',
  fiveYearProjection: [
    { year: '2026', label: 'Year 0 (2026)', statusQuo: 48, proposed: 48 },
    { year: '2027', label: 'Year 1', statusQuo: 55, proposed: 41 },
    { year: '2028', label: 'Year 2', statusQuo: 68, proposed: 35 },
    { year: '2029', label: 'Year 3 (Inflection)', statusQuo: 78, proposed: 31 },
    { year: '2030', label: 'Year 4', statusQuo: 92, proposed: 26 },
    { year: '2031', label: 'Year 5 (2031)', statusQuo: 106, proposed: 22 }
  ],
  litigationAvoided: 4820,
  accelerationMonths: 5.8,
  spatialRiskZones: [
    { zone: 'Zone A', name: 'Haveli Tehsil', delta: '-64% Disputed Area', color: '#2E7D32' },
    { zone: 'Zone B', name: 'Khed Corridor', delta: '-22% Disputed Area', color: '#ED8B00' }
  ]
};

export const INITIAL_WORKSPACES: ResearchWorkspace[] = [
  {
    id: 'WS-MH-PUN-094',
    title: 'Peri-Urban Agricultural Land Conversion & Compensation Elasticity',
    lead: 'Dr. Arishta Sen & IIT Bombay Cadre',
    collaborators: ['NITI Aayog', 'Town Planning Dept. Maharashtra', 'Survey of India'],
    status: 'Active Fieldwork & GIS Modeling',
    parcelsCount: 14820,
    litigationCr: 1240,
    stateName: 'Maharashtra',
    district: 'Pune (Haveli Taluka)',
    lastUpdated: '14 mins ago',
    tags: ['GIS Layer: Cadastre v3.1', 'Section 26 RFCTLARR', '5cm Drone Orthomosaic', 'Raft-BFT Sealed'],
    targetScreen: 'gis',
  },
  {
    id: 'WS-OR-KOR-012',
    title: 'Forest Rights Act (FRA) Communal Titling Claims & Border Boundary Conflicts',
    lead: 'Prof. Debashish Patra (MoTA Senior Fellow)',
    collaborators: ['Ministry of Tribal Affairs', 'Survey of India', 'Koraput District Collectorate'],
    status: 'Field Survey Complete',
    parcelsCount: 8940,
    litigationCr: 45,
    stateName: 'Odisha',
    district: 'Koraput (Lakhpadar)',
    lastUpdated: '2 hours ago',
    tags: ['FRA 2006 Deeds', 'Gram Sabha Vetted', 'Community Forest Rights (CFR)', 'Fifth Schedule'],
    targetScreen: 'policy-sim',
  },
  {
    id: 'WS-TS-HYD-041',
    title: 'Telangana Outer Ring Road Phase 2 Masterplan Spatial Contradiction Audit',
    lead: 'Er. S. Venkatraman (Geodetic Expert)',
    collaborators: ['HMDA Hyderabad', 'Bhoomi Centre for e-Governance', 'Survey of India'],
    status: 'Consensus Phase',
    parcelsCount: 22400,
    litigationCr: 3180,
    stateName: 'Telangana',
    district: 'Rangareddy',
    lastUpdated: '5 hours ago',
    tags: ['14-digit ULPIN Linked', 'Dharani Portal Sync', 'Drone Orthomosaic 5cm', 'WGS-84 Georeferenced'],
    targetScreen: 'gis',
  },
  {
    id: 'WS-UP-YEIDA-019',
    title: 'Jewar Aerotropolis & Yamuna Expressway Section 24(2) Lapse Due Diligence',
    lead: 'Dr. Radhika Sharma & UP Land Records Directorate',
    collaborators: ['YEIDA', 'DoLR New Delhi', 'National Informatics Centre'],
    status: 'Active Fieldwork & GIS Modeling',
    parcelsCount: 19650,
    litigationCr: 4120,
    stateName: 'Uttar Pradesh',
    district: 'Gautam Buddha Nagar',
    lastUpdated: '1 day ago',
    tags: ['Indore Dev Authority SC Ratio', 'Section 24(2) Audit', 'Treasury Panchnama Vetted'],
    targetScreen: 'disputes',
  },
];

export const INITIAL_DISPUTES: DisputeRecord[] = [
  {
    id: 'DISP-2026-001',
    court: 'Bombay High Court (Appellate & Writ Jurisdiction)',
    bench: 'Division Bench of Justice G.S. Kulkarni & Justice F.P. Pooniwalla',
    caseNumber: 'WP No. 4920/2025 (Decided Oct 2025 / Ref 2026)',
    neutralCitation: '2025:BHC-AS:4920-DB',
    dateOfJudgment: '18 October 2025',
    title: 'High-Density Section 26 Valuation Dispute (Bullet Train Alignment)',
    petitioner: 'Bhiwandi-Kalyan Landholders Welfare Association',
    respondent: 'National High Speed Rail Corp (NHSRCL) & Competent Authority (SLAO)',
    taluka: 'Kalyan & Bhiwandi Belt',
    district: 'Thane, Maharashtra',
    statutoryProvisions: ['RFCTLARR Act 2013, Section 26(1)(b)', 'Section 30(1) (100% Solatium)', 'Ready Reckoner ASR 2024'],
    keyRatioDecidendi: 'Competent Authority under Railways Act read with RFCTLARR Section 26 cannot mechanically adopt agricultural Ready Reckoner rates when Metropolitan Masterplan notified land as Logistics Corridor. Directed reassessment based on top 50% sales deeds.',
    status: 'Active High Court Writ Order',
    nextHearing: '22 Oct 2026',
    parcelsAffected: 31,
    totalClaimCr: 840,
    riskLevel: 'CRITICAL',
    summary: 'Writ challenge alleging circle rates used for compensation determination failed to account for 2024 commercial masterplan indexation.',
    ulpinId: 'MH-THN-BHW-00918',
  },
  {
    id: 'DISP-2026-002',
    court: 'Court of Civil Judge Senior Division, Pune',
    bench: 'Civil Judge Senior Division, Court Room 4, Shivajinagar Pune',
    caseNumber: 'Special Civil Suit 419/2024 (Pending Oct 2026 hearing)',
    neutralCitation: 'Pune Civil Court Reg: SCS-419-2024',
    dateOfJudgment: '12 January 2024',
    title: 'Ancestral Coparcenary Lis Pendens (Plot 412/1A & Adjacent Sector)',
    petitioner: 'Kailash Mohanrao Jagtap (Coparcener Branch 2)',
    respondent: 'Agro-Logistics Infra Pvt Ltd, Sub-Registrar & Revenue Tahsildar',
    taluka: 'Haveli Taluka',
    district: 'Pune, Maharashtra',
    statutoryProvisions: ['Transfer of Property Act 1882, Section 52 (Lis Pendens)', 'MLRC 1966 Section 148 & 150', 'Hindu Succession Act 2005 Sec 6'],
    keyRatioDecidendi: 'Interim injunction restraining defendants from creating third-party rights, alienating, or converting Mauje Wagholi Plot #412/1A (Area 4.20 Ha). Mutation Entry #7842 passed without mandatory Section 150(2) notice.',
    status: 'Stay Order Enforced',
    nextHearing: '18 May 2026',
    parcelsAffected: 3,
    totalClaimCr: 64,
    riskLevel: 'HIGH RISK',
    summary: 'Ancestral succession claim disputing 2023 mutation entry #7842 following non-notified commercial sale on 4.20 Ha agricultural land.',
    ulpinId: 'MH-PUN-HAV-4121A',
  },
  {
    id: 'DISP-2026-003',
    court: 'High Court of Karnataka (Principal Bench, Bengaluru)',
    bench: 'Hon’ble Justice B. Veerappa & Hon’ble Justice K.S. Hemalekha',
    caseNumber: 'Writ Appeal No. 1042 of 2024 (Decided March 2025)',
    neutralCitation: '2025:KHC:1042-DB',
    dateOfJudgment: '14 March 2025',
    title: 'Revenue Polygon Boundary Contradiction vs State Forest Gazette',
    petitioner: 'Karnataka Industrial Areas Development Board (KIADB)',
    respondent: 'Sri R. Govindappa & Karnataka Forest Department',
    taluka: 'Sarjapur Hobli & Devanahalli Taluk',
    district: 'Bengaluru Urban / Rural, Karnataka',
    statutoryProvisions: ['Karnataka Land Revenue Act 1964, Section 128', 'RFCTLARR Act 2013, Section 26 & 28', 'Bhoomi Cadastral Rules'],
    keyRatioDecidendi: 'Where preliminary acquisition notification occurred in 2011 and final declaration delayed until 2023 without physical possession, compensation must be updated as per 2013 Act Section 26 market valuation.',
    status: 'Joint Drone Survey & Settlement',
    nextHearing: '05 Nov 2026',
    parcelsAffected: 14,
    totalClaimCr: 120,
    riskLevel: 'MEDIUM RISK',
    summary: 'Overlapping 14.8 Ha polygon boundary discrepancy between 1978 Forest Department survey and 2019 digital Bhoomi cadastre.',
    ulpinId: 'KA-BLR-DEV-08812',
  },
  {
    id: 'DISP-2026-004',
    court: 'Sub-Divisional Level Committee (SDLC) & High Court of Orissa',
    bench: 'SDLC Koraput presided by Sub-Collector with MoTA District Officer',
    caseNumber: 'FRA-SDLC-Case 88/2025-26',
    neutralCitation: '2025:ORI:FRA-SDLC-88',
    dateOfJudgment: '24 September 2025',
    title: 'Scheduled Tribe Land Alienation Prohibition Claim (FRA 2006)',
    petitioner: 'Kutia Kondh Tribal Gram Sabha (Village Lakhpadar)',
    respondent: 'District Mineral Foundation, OMC & Mining Lessee',
    taluka: 'Koraput Tehsil North',
    district: 'Koraput, Odisha',
    statutoryProvisions: ['Forest Rights Act (FRA) 2006, Section 3(1) & 4(5)', 'PESA Act 1996, Section 4(i)', 'Forest Rights Rules Rule 12A'],
    keyRatioDecidendi: 'Section 4(5) statutory injunction bars any eviction or tree cutting on 180 Ha community forest rights land until Gram Sabha title recognition is officially completed.',
    status: 'Gram Sabha Inquiry & Stay',
    nextHearing: '12 Nov 2026',
    parcelsAffected: 28,
    totalClaimCr: 45,
    riskLevel: 'CRITICAL',
    summary: 'Forest Rights Act (FRA 2006) communal rights claim overriding commercial mining buffer boundary without prior Gram Sabha assent.',
    ulpinId: 'OR-KOR-LAK-00341',
  },
  {
    id: 'DISP-2026-005',
    court: 'Supreme Court of India (5-Judge Constitution Bench)',
    bench: 'Arun Mishra, Indira Banerjee, Vineet Saran, M.R. Shah, S. Ravindra Bhat, JJ.',
    caseNumber: 'Civil Appeal No. 20982/2017 with C.A. No. 20985/2017',
    neutralCitation: 'Indore Development Authority v. Manoharlal, (2020) 8 SCC 129',
    dateOfJudgment: '06 March 2020',
    title: 'Constitution Bench Landmark Ruling on Section 24(2) RFCTLARR Act',
    petitioner: 'Indore Development Authority (State Instrumentality)',
    respondent: 'Manoharlal & Ors. (Landowners Nationwide)',
    taluka: 'National Jurisdiction',
    district: 'Indore / All Indian States',
    statutoryProvisions: ['RFCTLARR Act 2013, Section 24(2)', 'Land Acquisition Act 1894, Section 11 & 31(1)', 'General Clauses Act 1897'],
    keyRatioDecidendi: 'Lapse under Section 24(2) requires BOTH conditions: possession not taken AND compensation not paid. Deposit in treasury satisfies "payment". Overruled Pune Municipal Corp (2014).',
    status: 'Binding Constitution Bench Precedent',
    nextHearing: 'Concluded & Settled Law',
    parcelsAffected: 84500,
    totalClaimCr: 48000,
    riskLevel: 'CRITICAL',
    summary: 'Definitive national constitutional ruling establishing that deposit in state treasury prevents acquisition lapse under Section 24(2).',
    ulpinId: 'MP-IND-S24-00001',
  },
];

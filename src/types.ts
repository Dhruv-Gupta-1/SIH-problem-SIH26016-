export type ActiveScreen =
  | 'dashboard'
  | 'workspaces'
  | 'gis'
  | 'policy-sim'
  | 'disputes'
  | 'legal'
  | 'blockchain'
  | 'profile';

export interface PushNotification {
  id: string;
  title: string;
  description: string;
  category: 'dispute' | 'cadastre' | 'ledger' | 'simulation' | 'system';
  severity: 'critical' | 'alert' | 'info' | 'success';
  timestamp: string;
  relativeTime: string;
  read: boolean;
  targetScreen?: ActiveScreen;
  targetId?: string;
  location?: string;
}

export interface CadastralParcel {
  id: string;
  plotNumber: string;
  mauje: string;
  taluka: string;
  district: string;
  registeredAreaHectares: number;
  registeredAreaAcres: number;
  landClassification: string;
  primaryTitleHolder: string;
  coHoldersCount: number;
  govtDues: number;
  mutationEntry: string;
  mutationYear: number;
  khatiyanNo: string;
  encumbrance: {
    hasActiveEncumbrance: boolean;
    level: 'HIGH RISK' | 'MEDIUM RISK' | 'CLEAR';
    suitType: string;
    suitNumber: string;
    court: string;
    summary: string;
    nextHearing: string;
    hasStayOrder: boolean;
  };
  metrics: {
    ndviVegetation: number;
    ndviStatus: string;
    builtSurfaceCover: number;
    roadFrontageMeters: number;
    floodRiskZone: string;
  };
  provenance: {
    blockIndex: number;
    stateLedgerHash: string;
    timestamp: string;
    anchorNode: string;
  };
  svgCoords: {
    polygon: string;
    center: [number, number];
    label: string;
    status: 'disputed' | 'active' | 'agriculture' | 'commercial';
  };
  geoCoordinates?: {
    center: { lat: number; lng: number };
    polygon: Array<{ lat: number; lng: number }>;
  };
}

export interface SimulationParams {
  solatiumMultiplier: number; // 1.0 to 3.5
  conversionTax: number; // 2.0 to 15.0%
  consentThreshold: number; // 50 to 95%
  rrFamilyBenefitFloor: number; // in INR
  connectedLayers: {
    stateLandRecords: boolean;
    tribunalRegistry: boolean;
    urbanFringeExpansion: boolean;
  };
}

export interface SimulationResults {
  runId: string;
  executionTimeSec: number;
  confidenceInterval: number;
  iterations: number;
  acquisitionCostChange: number; // %
  fiscalDeltaCr: number; // Cr INR
  disputeFrequencyChange: number; // %
  consentVelocityMonths: number;
  baselineConsentMonths: number;
  feasibilityScore: number;
  tradeoffBand: string;
  fiveYearProjection: Array<{
    year: string;
    label: string;
    statusQuo: number;
    proposed: number;
  }>;
  litigationAvoided: number;
  accelerationMonths: number;
  spatialRiskZones: Array<{
    zone: string;
    name: string;
    delta: string;
    color: string;
  }>;
}

export interface ResearchWorkspace {
  id: string;
  title: string;
  lead: string;
  collaborators: string[];
  status: 'Active Fieldwork & GIS Modeling' | 'Consensus Phase' | 'Field Survey Complete' | 'Archived';
  parcelsCount: number;
  litigationCr: number;
  stateName: string;
  district: string;
  lastUpdated: string;
  tags: string[];
  targetScreen: ActiveScreen;
}

export interface DisputeRecord {
  id: string;
  court: string;
  bench: string;
  caseNumber: string;
  neutralCitation: string;
  dateOfJudgment: string;
  title: string;
  petitioner: string;
  respondent: string;
  taluka: string;
  district: string;
  statutoryProvisions: string[];
  keyRatioDecidendi: string;
  status: string;
  nextHearing?: string;
  parcelsAffected: number;
  totalClaimCr: number;
  riskLevel: 'CRITICAL' | 'HIGH RISK' | 'MEDIUM RISK';
  summary: string;
  ulpinId?: string;
}

export interface BlockchainBlock {
  height: number;
  timestamp: string;
  relativeTime: string;
  title: string;
  payloadDigestHash: string;
  authorizedSigner: string;
  artifactType: string;
  validationsCount: number;
  gasOrWeight?: string;
}

export interface ValidatorNode {
  id: string;
  nodeName: string;
  role: 'Leader' | 'Endorser' | 'Academic Audit';
  organization: string;
  location: string;
  uptime: string;
  blocksValidated: string;
  status: 'Online' | 'Synchronizing' | 'Standby';
}

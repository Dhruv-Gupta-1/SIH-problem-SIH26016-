import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Plus,
  Search,
  Filter,
  ArrowRight,
  ExternalLink,
  Layers,
  Sparkles,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Scale,
  Activity,
  Cpu,
  Database,
  FileCheck2,
  FileText,
  RefreshCw,
  CheckCircle2,
  MapPin,
  Building,
  Check,
  ChevronRight,
  Calculator
} from 'lucide-react';
import { ActiveScreen } from '../../types';
import { REAL_NATIONAL_STATS, REAL_STATE_PROFILES, StateCadastralProfile } from '../../data/realLandData';

interface DashboardScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  onOpenNewWorkspaceModal: () => void;
  isDarkMode: boolean;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onNavigate,
  onOpenNewWorkspaceModal,
  isDarkMode,
}) => {
  const [activeSearchQuery, setActiveSearchQuery] = useState('');
  const [selectedStateKey, setSelectedStateKey] = useState<string>('national');
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('2 mins ago');
  const [syncStatusSuccess, setSyncStatusSuccess] = useState(false);

  const selectedStateProfile: StateCadastralProfile | null =
    selectedStateKey !== 'national' && REAL_STATE_PROFILES[selectedStateKey]
      ? REAL_STATE_PROFILES[selectedStateKey]
      : null;

  const handleSyncData = () => {
    setIsSyncing(true);
    setSyncStatusSuccess(false);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncStatusSuccess(true);
      setLastSyncTime('Just now');
      setTimeout(() => setSyncStatusSuccess(false), 3000);
    }, 1200);
  };

  const hotlistChips = [
    'Thane Bullet Train Section 26 Hotspot',
    'Haveli Pune Plot 412/1A Dispute',
    'Koraput Odisha FRA Gram Sabha',
    'Bengaluru KIADB Sarjapur Contradiction',
    'YEIDA Jewar Section 24(2) Audit',
  ];

  const stateOptions = [
    { key: 'national', label: 'All-India National Desk' },
    { key: 'maharashtra', label: 'Maharashtra (Mahabhulekh)' },
    { key: 'karnataka', label: 'Karnataka (Bhoomi)' },
    { key: 'telangana', label: 'Telangana (Dharani)' },
    { key: 'uttar_pradesh', label: 'Uttar Pradesh (Bhulekh UP)' },
    { key: 'odisha', label: 'Odisha (Bhulekh Odisha)' },
    { key: 'gujarat', label: 'Gujarat (AnyROR)' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Geodetic Node Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 dark:text-slate-300">
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              DOLR GEODETIC NODE #IND-DL-09
            </span>
            <span>/</span>
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              DoLR &amp; SVAMITVA Synced
            </span>
            <span>/</span>
            <span>Epoch #89,204</span>
          </div>

          <h1 className="mt-1 text-2xl md:text-3xl font-bold tracking-tight text-[#002945] dark:text-white font-sans">
            National Land Governance &amp; Cadastral Intelligence Desk
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-200">
            Authoritative spatial records, Bhu-Aadhaar ULPIN verification, and Section 26 dispute mitigation
          </p>
        </div>

        {/* Header Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleSyncData}
            disabled={isSyncing}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium cursor-pointer transition-colors ${
              isDarkMode
                ? 'bg-[#17232E] border-[#293846] text-slate-200 hover:bg-[#1f2e3d]'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 shadow-xs'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 text-teal-600 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>
              {isSyncing ? 'Syncing DoLR APIs...' : syncStatusSuccess ? 'Verified Fresh' : `Sync Data (${lastSyncTime})`}
            </span>
          </button>

          <button
            onClick={onOpenNewWorkspaceModal}
            id="create-new-workspace-btn"
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#173F5F] hover:bg-[#20639B] text-white shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Workspace</span>
          </button>
        </div>
      </div>

      {/* State Cadastral Jurisdiction Switcher */}
      <div
        className={`p-3 rounded-xl border shadow-xs transition-colors ${
          isDarkMode
            ? 'bg-[#111A23] border-[#293846]'
            : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Jurisdictional Lens:
            </span>
            <span className="text-xs text-slate-600 dark:text-slate-300">
              {selectedStateProfile
                ? `${selectedStateProfile.name} (${selectedStateProfile.portalName})`
                : 'All-India National Aggregation (DILRMP & SVAMITVA)'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {stateOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setSelectedStateKey(opt.key)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedStateKey === opt.key
                    ? 'bg-[#173F5F] text-white'
                    : isDarkMode
                    ? 'bg-[#17232E] text-slate-200 hover:bg-[#1f2e3d]'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* State details badge if a state is selected */}
        {selectedStateProfile && (
          <div className="mt-2.5 pt-2.5 border-t border-slate-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <span className="text-slate-600 dark:text-slate-300">
                Official Revenue Portal:{' '}
                <a
                  href={selectedStateProfile.portalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono font-semibold text-teal-600 hover:underline inline-flex items-center gap-1"
                >
                  {selectedStateProfile.portalName}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </span>
              <span>•</span>
              <span className="text-slate-600 dark:text-slate-300">
                Jurisdiction Code: <strong className="text-slate-800 dark:text-slate-200">{selectedStateProfile.code}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">
                {((selectedStateProfile.villagesDigitized / selectedStateProfile.totalVillages) * 100).toFixed(1)}% Digitized Villages
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-bold">
                {selectedStateProfile.georeferencingPct}% Georeferenced
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Omnibox Search Field with Hotlist */}
      <div
        className={`p-3 rounded-xl border shadow-xs transition-colors ${
          isDarkMode
            ? 'bg-[#111A23] border-[#293846]'
            : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0 ml-1" />
          <input
            type="text"
            value={activeSearchQuery}
            onChange={(e) => setActiveSearchQuery(e.target.value)}
            placeholder="Search verified 14-digit ULPIN, Mauje revenue village, High Court writ, or Section 26 multiplier..."
            className="w-full text-xs md:text-sm bg-transparent border-none outline-none focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
          {activeSearchQuery && (
            <button
              onClick={() => setActiveSearchQuery('')}
              className="text-slate-400 hover:text-slate-600 text-xs shrink-0"
            >
              Clear
            </button>
          )}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigate('gis')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium border cursor-pointer ${
                isDarkMode
                  ? 'bg-[#17232E] border-[#293846] text-slate-300 hover:bg-[#1f2e3d]'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-teal-600" />
              <span>Spatial Bounds</span>
            </button>
          </div>
        </div>

        {/* Active Query Hotlist */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-gray-800/80 flex items-center gap-2 text-xs overflow-x-auto">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider shrink-0">
            Active Query Hotlist:
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {hotlistChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveSearchQuery(chip);
                  if (chip.includes('Haveli') || chip.includes('Sarjapur')) {
                    onNavigate('gis');
                  } else {
                    onNavigate('disputes');
                  }
                }}
                className="px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors whitespace-nowrap bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-[#17232E] dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4 Core KPI Aggregate Bento Cards (dynamically reflecting real data or selected state) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div
          onClick={() => onNavigate('gis')}
          className={`p-4 rounded-xl border transition-all hover:shadow-md cursor-pointer ${
            isDarkMode
              ? 'bg-[#111A23] border-[#293846]'
              : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-300 uppercase tracking-wider font-semibold">
            <span>BHU-AADHAAR ULPIN GENERATED</span>
            <span className="p-1.5 rounded-md bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-sans text-slate-900 dark:text-white">
              {selectedStateProfile
                ? `${(selectedStateProfile.parcelsWithUlpinLakhs / 10).toFixed(1)}M`
                : '405.8M'}
            </span>
            <span className="text-xs text-emerald-600 font-semibold font-mono">
              {selectedStateProfile ? selectedStateProfile.name : 'All-India'}
            </span>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-gray-800 flex items-center justify-between text-[11px]">
            <span className="text-slate-500 dark:text-slate-300">Computerized RoRs</span>
            <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
              {selectedStateProfile
                ? `${((selectedStateProfile.villagesDigitized / selectedStateProfile.totalVillages) * 100).toFixed(1)}%`
                : '97.43%'}
            </span>
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-300 mt-0.5 truncate">
            {selectedStateProfile
              ? `Integrated with ${selectedStateProfile.portalName}`
              : '6,25,000+ Digitized Revenue Villages'}
          </div>
        </div>

        {/* Metric 2 */}
        <div
          onClick={() => onNavigate('blockchain')}
          className={`p-4 rounded-xl border transition-all hover:shadow-md cursor-pointer ${
            isDarkMode
              ? 'bg-[#111A23] border-[#293846]'
              : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-300 uppercase tracking-wider font-semibold">
            <span>SVAMITVA DRONE VILLAGES</span>
            <span className="p-1.5 rounded-md bg-sky-50 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400">
              <Database className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-sans text-slate-900 dark:text-white">
              {selectedStateProfile
                ? `${(selectedStateProfile.totalVillages * 0.52).toFixed(0)}`
                : '3,30,420'}
            </span>
            <span className="text-xs text-sky-600 font-semibold font-mono">5cm GSD</span>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-gray-800 flex items-center justify-between text-[11px]">
            <span className="text-slate-500 dark:text-slate-300">Property Cards Distributed</span>
            <span className="font-mono font-semibold text-sky-600 dark:text-sky-400">
              {selectedStateProfile ? `${selectedStateProfile.svamitvaCardsDistributedLakhs} Lakhs` : '3.24 Crore'}
            </span>
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-300 mt-0.5 truncate">
            Survey of India Drone Orthomosaics
          </div>
        </div>

        {/* Metric 3 */}
        <div
          onClick={() => onNavigate('disputes')}
          className={`p-4 rounded-xl border transition-all hover:shadow-md cursor-pointer ${
            isDarkMode
              ? 'bg-[#111A23] border-[#293846]'
              : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-300 uppercase tracking-wider font-semibold">
            <span>LITIGATION AT RISK</span>
            <span className="p-1.5 rounded-md bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400">
              <Scale className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-sans text-rose-600 dark:text-rose-400">
              ₹{selectedStateProfile ? selectedStateProfile.litigationCr : '8,580'} Cr
            </span>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-gray-800 flex items-center justify-between text-[11px]">
            <span className="text-slate-500 dark:text-slate-300">Active High Court Writs</span>
            <span className="font-mono font-semibold text-rose-600 dark:text-rose-400">
              {selectedStateProfile ? `${selectedStateProfile.disputeClusters} Clusters` : '48 Dockets'}
            </span>
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-300 mt-0.5 truncate">
            Section 26 ready reckoner appeals
          </div>
        </div>

        {/* Metric 4 */}
        <div
          onClick={() => onNavigate('policy-sim')}
          className={`p-4 rounded-xl border transition-all hover:shadow-md cursor-pointer ${
            isDarkMode
              ? 'bg-[#111A23] border-[#293846]'
              : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-300 uppercase tracking-wider font-semibold">
            <span>INSTITUTIONAL WORKSPACES</span>
            <span className="p-1.5 rounded-md bg-teal-50 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400">
              <Activity className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-sans text-slate-900 dark:text-white">
              {selectedStateProfile ? '04' : '14'}
            </span>
            <span className="text-xs text-teal-600 font-semibold font-mono">Active</span>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-gray-800 flex items-center justify-between text-[11px]">
            <span className="text-slate-500 dark:text-slate-300">Lead Institutions</span>
            <span className="font-mono font-semibold text-teal-600 dark:text-teal-400">
              NITI • DoLR • IIT
            </span>
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-300 mt-0.5 truncate">
            Monte Carlo valuation models running
          </div>
        </div>
      </div>

      {/* Main Grid: Left Column (Priority Research + State Corridors) | Right Column (Disputes + Datasets + Ledger) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Priority Research Workspaces Section */}
          <div
            className={`p-5 rounded-xl border transition-colors ${
              isDarkMode
                ? 'bg-[#111A23] border-[#293846]'
                : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-gray-800">
              <div>
                <h2 className="text-base font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                  <span>Priority Research Workspaces &amp; Active Field Corridors</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {selectedStateProfile
                    ? `Focal acquisition corridors in ${selectedStateProfile.name}`
                    : 'Pan-India empirical cohorts with active GIS overlays and statutory citations'}
                </p>
              </div>
              <button
                onClick={() => onNavigate('workspaces')}
                className="text-xs font-semibold text-[#173F5F] dark:text-teal-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View All Workspaces</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Workspaces List */}
            <div className="mt-4 space-y-4">
              {/* Project Card 1 */}
              <div
                className={`p-4 rounded-xl border transition-all hover:border-teal-500/60 ${
                  isDarkMode
                    ? 'bg-[#17232E]/70 border-[#293846]'
                    : 'bg-slate-50/70 border-slate-200'
                }`}
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                    GIS Layer: Cadastre v3.1
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                    Section 26 RFCTLARR
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                    5cm Drone Orthomosaic
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    WS-MH-PUN-094
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                  Peri-Urban Agricultural Land Conversion &amp; Compensation Elasticity (Pune-PCMC)
                </h3>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Spatial assessment along Pune-PCMC industrial growth corridor measuring Ready Reckoner rate escalation, fragmentation patterns, and court-mandated land acquisition awards under Section 26.
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">Updated 14m ago</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onNavigate('gis')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#173F5F] hover:bg-[#20639B] text-white transition-colors cursor-pointer"
                    >
                      <span>Open Cadastre GIS</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Meta stats bar */}
                <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-gray-800 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Polygon Overlay: </span>
                    <strong className="font-semibold text-slate-800 dark:text-slate-200">
                      84,120 Ha Mapped
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Litigation Exposure: </span>
                    <strong className="font-semibold text-rose-600 dark:text-rose-400">
                      ₹1,240 Cr Contested
                    </strong>
                  </div>
                  <div className="truncate">
                    <span className="text-slate-500 dark:text-slate-400">Lead Investigator: </span>
                    <strong className="font-semibold text-teal-700 dark:text-teal-400">
                      Dr. Arishta Sen &amp; IITB Cadre
                    </strong>
                  </div>
                </div>
              </div>

              {/* Project Card 2 */}
              <div
                className={`p-4 rounded-xl border transition-all hover:border-teal-500/60 ${
                  isDarkMode
                    ? 'bg-[#17232E]/70 border-[#293846]'
                    : 'bg-slate-50/70 border-slate-200'
                }`}
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    Forest Rights Act (FRA 2006)
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                    Tribal Land Titling
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    WS-OR-KOR-012
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                  Forest Rights Act (FRA) Communal Titling Claims &amp; Border Conflicts (Koraput)
                </h3>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Koraput District communal tenure validation against Survey of India ortho-imagery and state forest department demarcations with multi-village Gram Sabha resolutions.
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">Updated 2h ago</span>
                  <button
                    onClick={() => onNavigate('policy-sim')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
                  >
                    <span>Run Policy Simulation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-gray-800 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Gram Sabha Claims: </span>
                    <strong className="font-semibold text-slate-800 dark:text-slate-200">
                      312 Villages Vetted
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Drone Resolution: </span>
                    <strong className="font-semibold text-emerald-600 dark:text-emerald-400">
                      5cm GSD Verified
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Consensus Index: </span>
                    <strong className="font-semibold text-slate-800 dark:text-slate-200">
                      88.7% Boundary Match
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Statutory Calculation Banner */}
          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
              isDarkMode
                ? 'bg-gradient-to-r from-[#17232E] to-[#111A23] border-[#293846]'
                : 'bg-gradient-to-r from-teal-50 to-sky-50 border-teal-200 shadow-xs'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-teal-600 text-white shrink-0">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Section 26 Statutory Land Compensation &amp; Solatium Calculator
                </h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  Instant calculation of 1.00x–2.00x MoRD rural multipliers and 100% Section 30 Solatium
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('legal')}
              className="px-3 py-1.5 rounded-lg bg-[#173F5F] hover:bg-[#20639B] text-white text-xs font-semibold shrink-0 cursor-pointer"
            >
              Open Workbench
            </button>
          </div>
        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Dispute Intelligence Feed */}
          <div
            className={`p-4 rounded-xl border transition-colors ${
              isDarkMode
                ? 'bg-[#111A23] border-[#293846]'
                : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-rose-500" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Live Litigation Feed
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 animate-pulse">
                eCourts Live
              </span>
            </div>

            <div className="mt-3 divide-y divide-slate-100 dark:divide-gray-800/80 space-y-3 pt-1">
              {/* Alert 1 */}
              <div className="pt-2 text-xs">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    High-Density Section 26 Surge
                  </span>
                  <span className="text-slate-400 font-mono">18m ago</span>
                </div>
                <p className="mt-1 text-slate-600 dark:text-slate-300 leading-snug">
                  Thane District: 31 new writ petitions filed across 4 talukas regarding Ready Reckoner undervaluation on Bullet Train alignment.
                </p>
                <div className="mt-2 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-mono">WP No. 4920/2025</span>
                  <button
                    onClick={() => onNavigate('disputes')}
                    className="text-teal-600 dark:text-teal-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Inspect Docket</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Alert 2 */}
              <div className="pt-3 text-xs">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Polygon Boundary Contradiction
                  </span>
                  <span className="text-slate-400 font-mono">2h ago</span>
                </div>
                <p className="mt-1 text-slate-600 dark:text-slate-300 leading-snug">
                  Bengaluru Outer Ring: 14.8 Ha overlapping revenue polygon identified between KIADB Gazette and Karnataka Forest Dept spatial ledger.
                </p>
                <div className="mt-2 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-mono">Sarjapur Hobli #402</span>
                  <button
                    onClick={() => onNavigate('gis')}
                    className="text-teal-600 dark:text-teal-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View in GIS</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Alert 3 */}
              <div className="pt-3 text-xs">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                    Ancestral Succession Lis Pendens
                  </span>
                  <span className="text-slate-400 font-mono">4h ago</span>
                </div>
                <p className="mt-1 text-slate-600 dark:text-slate-300 leading-snug">
                  Pune Haveli: Stay injunction enforced on Plot #412/1A following non-notified commercial sale without coparcenary consent.
                </p>
                <div className="mt-2 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-mono">SCS 419/2024</span>
                  <button
                    onClick={() => onNavigate('disputes')}
                    className="text-teal-600 dark:text-teal-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Triage</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Verified Datasets Section */}
          <div
            className={`p-4 rounded-xl border transition-colors ${
              isDarkMode
                ? 'bg-[#111A23] border-[#293846]'
                : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-500" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Authoritative Datasets
                </h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">GovNet Grid</span>
            </div>

            <div className="mt-3 space-y-2.5">
              <div
                className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${
                  isDarkMode
                    ? 'bg-[#17232E]/60 border-[#293846]'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1 font-semibold text-slate-900 dark:text-white">
                    <FileCheck2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>SoI Drone Orthomosaics</span>
                    <span className="text-[9px] px-1 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-mono">
                      5cm GSD
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    SVAMITVA Phase 1-3 (3.30 Lakh Villages)
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('gis')}
                  className="px-2 py-1 rounded text-[11px] font-semibold bg-[#173F5F] hover:bg-[#20639B] text-white transition-colors cursor-pointer"
                >
                  Mount Layer
                </button>
              </div>

              <div
                className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${
                  isDarkMode
                    ? 'bg-[#17232E]/60 border-[#293846]'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1 font-semibold text-slate-900 dark:text-white">
                    <FileText className="w-3.5 h-3.5 text-blue-500" />
                    <span>DoLR Bhu-Aadhaar ULPIN Registry</span>
                    <span className="text-[9px] px-1 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-mono">
                      405.8M
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    14-Digit Standardized Spatial IDs
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('blockchain')}
                  className="px-2 py-1 rounded text-[11px] font-semibold bg-[#173F5F] hover:bg-[#20639B] text-white transition-colors cursor-pointer"
                >
                  Verify Hash
                </button>
              </div>
            </div>
          </div>

          {/* Ledger Integrity Card */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#0F283E] to-[#081827] text-white shadow-md border border-teal-900/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider font-mono">
                  Ledger Provenance
                </h3>
              </div>
              <span className="font-mono text-[10px] text-teal-300">
                Block #9,481,200
              </span>
            </div>

            <div className="mt-3">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-300">Tamper-Proof Audit State</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-900/80 text-emerald-300 border border-emerald-500/40">
                  IMMUTABLE
                </span>
              </div>

              <div className="mt-2 text-2xl font-bold font-mono text-white flex items-baseline gap-2">
                <span>0</span>
                <span className="text-xs font-normal text-emerald-400">
                  discrepancy hashes
                </span>
              </div>
              <p className="mt-1 text-[10px] text-slate-300 leading-relaxed">
                Audited 42,910 blocks across 14 state-level revenue storage nodes during the last 24-hour verification pass.
              </p>
            </div>

            <button
              onClick={() => onNavigate('blockchain')}
              className="mt-3 w-full py-2 rounded-lg text-xs font-semibold bg-teal-500/20 hover:bg-teal-500/30 text-teal-200 border border-teal-500/40 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Inspect Cryptographic Merkle Tree</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

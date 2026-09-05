import React, { useState } from 'react';
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
  Calculator,
  ChevronDown,
  ChevronUp,
  Minimize2,
  Maximize2,
  SlidersHorizontal,
  Flame,
  LayoutGrid,
  Eye,
  EyeOff
} from 'lucide-react';
import { ActiveScreen } from '../../types';
import { REAL_STATE_PROFILES, StateCadastralProfile } from '../../data/realLandData';

interface DashboardScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  onOpenNewWorkspaceModal: () => void;
  isDarkMode: boolean;
}

type DashboardTab = 'all' | 'workspaces' | 'litigation' | 'ledger';

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

  // View Filtering & Collapsing States
  const [activeTab, setActiveTab] = useState<DashboardTab>('all');
  const [isCompactMode, setIsCompactMode] = useState(false);
  const [isHotlistExpanded, setIsHotlistExpanded] = useState(false);
  
  // Section Collapse States
  const [collapsedSections, setCollapsedSections] = useState({
    kpis: false,
    workspaces: false,
    calculator: false,
    litigation: false,
    datasets: false,
    ledger: false,
  });

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

  const toggleSection = (key: keyof typeof collapsedSections) => {
    setCollapsedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const areAllSectionsCollapsed =
    collapsedSections.workspaces &&
    collapsedSections.litigation &&
    collapsedSections.datasets &&
    collapsedSections.ledger;

  const toggleCollapseAll = () => {
    const nextState = !areAllSectionsCollapsed;
    setCollapsedSections({
      kpis: nextState,
      workspaces: nextState,
      calculator: nextState,
      litigation: nextState,
      datasets: nextState,
      ledger: nextState,
    });
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
    <div className="space-y-4 max-w-7xl mx-auto pb-12">
      {/* Geodetic Node Header Banner - Streamlined */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              DOLR GEODETIC NODE #IND-DL-09
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              DoLR &amp; SVAMITVA Synced
            </span>
            <span>•</span>
            <span>Epoch #89,204</span>
          </div>

          <h1 className="mt-0.5 text-xl md:text-2xl font-bold tracking-tight text-[#002945] dark:text-white font-sans">
            National Land Governance &amp; Cadastral Intelligence Desk
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Authoritative spatial records, Bhu-Aadhaar ULPIN verification, and Section 26 dispute mitigation
          </p>
        </div>

        {/* Header Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSyncData}
            disabled={isSyncing}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-colors ${
              isDarkMode
                ? 'bg-[#17232E] border-[#293846] text-slate-200 hover:bg-[#1f2e3d]'
                : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 shadow-xs'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 text-teal-600 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>
              {isSyncing ? 'Syncing...' : syncStatusSuccess ? 'Verified Fresh' : `Sync (${lastSyncTime})`}
            </span>
          </button>

          <button
            onClick={onOpenNewWorkspaceModal}
            id="create-new-workspace-btn"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#173F5F] hover:bg-[#20639B] text-white shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Workspace</span>
          </button>
        </div>
      </div>

      {/* Unified Search & Jurisdiction Bar (Combined into 1 sleek card instead of 2 crowded boxes) */}
      <div
        className={`p-2.5 sm:p-3 rounded-xl border shadow-xs transition-colors ${
          isDarkMode
            ? 'bg-[#111A23] border-[#293846]'
            : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2">
          {/* Search Input */}
          <div className="flex-1 flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-[#17232E]/70 border border-slate-200 dark:border-[#293846]">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
            <input
              type="text"
              value={activeSearchQuery}
              onChange={(e) => setActiveSearchQuery(e.target.value)}
              placeholder="Search 14-digit ULPIN, Mauje village, High Court writ, or Section 26 multiplier..."
              className="w-full text-xs bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
            {activeSearchQuery && (
              <button
                onClick={() => setActiveSearchQuery('')}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs px-1 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Controls: Jurisdiction Selector, Hotlist Toggle & Spatial Bounds */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            {/* Jurisdiction Dropdown */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-[#17232E]/70 border border-slate-200 dark:border-[#293846] text-xs">
              <Building className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
              <select
                value={selectedStateKey}
                onChange={(e) => setSelectedStateKey(e.target.value)}
                className="bg-transparent border-none text-xs font-semibold text-slate-800 dark:text-slate-200 outline-none cursor-pointer pr-1"
              >
                {stateOptions.map((opt) => (
                  <option key={opt.key} value={opt.key} className="dark:bg-[#17232E] text-slate-800 dark:text-slate-200">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Hotlist Toggle Button (collapsible to eliminate permanent clutter) */}
            <button
              onClick={() => setIsHotlistExpanded(!isHotlistExpanded)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border cursor-pointer transition-colors ${
                isHotlistExpanded
                  ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-700/60 text-amber-800 dark:text-amber-300'
                  : isDarkMode
                  ? 'bg-[#17232E] border-[#293846] text-slate-300 hover:bg-[#1f2e3d]'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
              title="Toggle Quick Query Hotlist"
            >
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Hotlist</span>
              <span className="text-[10px] px-1 py-0.2 rounded bg-amber-500/20 font-mono">5</span>
              {isHotlistExpanded ? (
                <ChevronUp className="w-3 h-3 text-slate-400 ml-0.5" />
              ) : (
                <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
              )}
            </button>

            {/* Spatial Bounds Quick Button */}
            <button
              onClick={() => onNavigate('gis')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border cursor-pointer ${
                isDarkMode
                  ? 'bg-[#17232E] border-[#293846] text-slate-300 hover:bg-[#1f2e3d]'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-teal-600" />
              <span>GIS Bounds</span>
            </button>
          </div>
        </div>

        {/* Collapsible Hotlist Chips Tray */}
        {isHotlistExpanded && (
          <div className="mt-2.5 pt-2.5 border-t border-slate-100 dark:border-gray-800/80 flex items-center gap-2 text-xs overflow-x-auto">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider shrink-0">
              Suggested:
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
                  className="px-2 py-0.5 rounded-full text-[11px] font-medium transition-colors whitespace-nowrap bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-[#17232E] dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* State details badge if a state is selected */}
        {selectedStateProfile && (
          <div className="mt-2 pt-2 border-t border-slate-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-600 dark:text-slate-300">
                Portal:{' '}
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
                Code: <strong className="text-slate-800 dark:text-slate-200">{selectedStateProfile.code}</strong>
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-semibold">
                {((selectedStateProfile.villagesDigitized / selectedStateProfile.totalVillages) * 100).toFixed(1)}% Digitized
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 font-semibold">
                {selectedStateProfile.georeferencingPct}% Georeferenced
              </span>
            </div>
          </div>
        )}
      </div>

      {/* KPI Section with Collapse Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <span>Key Performance Indicators</span>
            {collapsedSections.kpis && (
              <span className="font-mono text-[11px] font-normal text-slate-400">
                (405.8M ULPINs • 3.30L Villages • ₹8,580 Cr at Risk • 14 Workspaces)
              </span>
            )}
          </span>
          <button
            onClick={() => toggleSection('kpis')}
            className="text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer"
          >
            <span>{collapsedSections.kpis ? 'Show KPI Cards' : 'Collapse KPIs'}</span>
            {collapsedSections.kpis ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronUp className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {!collapsedSections.kpis && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Metric 1 */}
            <div
              onClick={() => onNavigate('gis')}
              className={`p-3.5 rounded-xl border transition-all hover:shadow-md cursor-pointer ${
                isDarkMode
                  ? 'bg-[#111A23] border-[#293846]'
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-300 uppercase tracking-wider font-semibold">
                <span>BHU-AADHAAR ULPIN</span>
                <span className="p-1 rounded bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold font-sans text-slate-900 dark:text-white">
                  {selectedStateProfile
                    ? `${(selectedStateProfile.parcelsWithUlpinLakhs / 10).toFixed(1)}M`
                    : '405.8M'}
                </span>
                <span className="text-[11px] text-emerald-600 font-semibold font-mono">
                  {selectedStateProfile ? selectedStateProfile.name : 'All-India'}
                </span>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-100 dark:border-gray-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 dark:text-slate-300">Computerized RoRs</span>
                <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                  {selectedStateProfile
                    ? `${((selectedStateProfile.villagesDigitized / selectedStateProfile.totalVillages) * 100).toFixed(1)}%`
                    : '97.43%'}
                </span>
              </div>
            </div>

            {/* Metric 2 */}
            <div
              onClick={() => onNavigate('blockchain')}
              className={`p-3.5 rounded-xl border transition-all hover:shadow-md cursor-pointer ${
                isDarkMode
                  ? 'bg-[#111A23] border-[#293846]'
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-300 uppercase tracking-wider font-semibold">
                <span>SVAMITVA DRONE VILLAGES</span>
                <span className="p-1 rounded bg-sky-50 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400">
                  <Database className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold font-sans text-slate-900 dark:text-white">
                  {selectedStateProfile
                    ? `${(selectedStateProfile.totalVillages * 0.52).toFixed(0)}`
                    : '3,30,420'}
                </span>
                <span className="text-[11px] text-sky-600 font-semibold font-mono">5cm GSD</span>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-100 dark:border-gray-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 dark:text-slate-300">Property Cards</span>
                <span className="font-mono font-semibold text-sky-600 dark:text-sky-400">
                  {selectedStateProfile ? `${selectedStateProfile.svamitvaCardsDistributedLakhs} Lakhs` : '3.24 Crore'}
                </span>
              </div>
            </div>

            {/* Metric 3 */}
            <div
              onClick={() => onNavigate('disputes')}
              className={`p-3.5 rounded-xl border transition-all hover:shadow-md cursor-pointer ${
                isDarkMode
                  ? 'bg-[#111A23] border-[#293846]'
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-300 uppercase tracking-wider font-semibold">
                <span>LITIGATION AT RISK</span>
                <span className="p-1 rounded bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400">
                  <Scale className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold font-sans text-rose-600 dark:text-rose-400">
                  ₹{selectedStateProfile ? selectedStateProfile.litigationCr : '8,580'} Cr
                </span>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-100 dark:border-gray-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 dark:text-slate-300">High Court Writs</span>
                <span className="font-mono font-semibold text-rose-600 dark:text-rose-400">
                  {selectedStateProfile ? `${selectedStateProfile.disputeClusters} Clusters` : '48 Dockets'}
                </span>
              </div>
            </div>

            {/* Metric 4 */}
            <div
              onClick={() => onNavigate('policy-sim')}
              className={`p-3.5 rounded-xl border transition-all hover:shadow-md cursor-pointer ${
                isDarkMode
                  ? 'bg-[#111A23] border-[#293846]'
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-300 uppercase tracking-wider font-semibold">
                <span>INSTITUTIONAL WORKSPACES</span>
                <span className="p-1 rounded bg-teal-50 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400">
                  <Activity className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-2xl font-bold font-sans text-slate-900 dark:text-white">
                  {selectedStateProfile ? '04' : '14'}
                </span>
                <span className="text-[11px] text-teal-600 font-semibold font-mono">Active</span>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-100 dark:border-gray-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 dark:text-slate-300">Lead Groups</span>
                <span className="font-mono font-semibold text-teal-600 dark:text-teal-400">
                  NITI • DoLR • IIT
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dashboard Section Filter & Collapse Toolbar */}
      <div
        className={`px-3 py-2 rounded-xl border flex flex-wrap items-center justify-between gap-2.5 transition-colors ${
          isDarkMode
            ? 'bg-[#111A23] border-[#293846]'
            : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        {/* Module Focus Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#173F5F] text-white shadow-xs'
                : isDarkMode
                ? 'text-slate-300 hover:bg-[#17232E]'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Modules
          </button>
          <button
            onClick={() => setActiveTab('workspaces')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'workspaces'
                ? 'bg-[#173F5F] text-white shadow-xs'
                : isDarkMode
                ? 'text-slate-300 hover:bg-[#17232E]'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Field Corridors (2)
          </button>
          <button
            onClick={() => setActiveTab('litigation')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'litigation'
                ? 'bg-[#173F5F] text-white shadow-xs'
                : isDarkMode
                ? 'text-slate-300 hover:bg-[#17232E]'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Litigation Feed (3)
          </button>
          <button
            onClick={() => setActiveTab('ledger')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'ledger'
                ? 'bg-[#173F5F] text-white shadow-xs'
                : isDarkMode
                ? 'text-slate-300 hover:bg-[#17232E]'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Datasets &amp; Ledger (3)
          </button>
        </div>

        {/* Global Controls: Compact Mode & Collapse/Expand All */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCompactMode(!isCompactMode)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border cursor-pointer transition-colors ${
              isCompactMode
                ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-300 dark:border-teal-700/60 text-teal-800 dark:text-teal-300'
                : isDarkMode
                ? 'bg-[#17232E] border-[#293846] text-slate-300 hover:bg-[#1f2e3d]'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
            title="Toggle compact display density"
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span>{isCompactMode ? 'Compact Density' : 'Standard'}</span>
          </button>

          <button
            onClick={toggleCollapseAll}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border cursor-pointer transition-colors ${
              isDarkMode
                ? 'bg-[#17232E] border-[#293846] text-slate-300 hover:bg-[#1f2e3d]'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {areAllSectionsCollapsed ? (
              <>
                <Maximize2 className="w-3 h-3 text-teal-600" />
                <span>Expand All</span>
              </>
            ) : (
              <>
                <Minimize2 className="w-3 h-3 text-slate-500" />
                <span>Collapse All</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid: Left Column (Workspaces) | Right Column (Litigation & Datasets) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column (Workspaces & Corridors) */}
        {(activeTab === 'all' || activeTab === 'workspaces') && (
          <div className={`${activeTab === 'workspaces' ? 'lg:col-span-12' : 'lg:col-span-7 xl:col-span-8'} space-y-4`}>
            {/* Priority Research Workspaces Section with Collapsible Header */}
            <div
              className={`rounded-xl border transition-colors overflow-hidden ${
                isDarkMode
                  ? 'bg-[#111A23] border-[#293846]'
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              {/* Interactive Collapsible Header */}
              <div
                onClick={() => toggleSection('workspaces')}
                className="p-3.5 flex items-center justify-between cursor-pointer select-none hover:bg-slate-50/50 dark:hover:bg-[#17232E]/40 transition-colors border-b border-slate-100 dark:border-gray-800"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1 rounded-md bg-teal-50 dark:bg-teal-950/80 text-teal-600 dark:text-teal-400">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                      <span>Priority Research Workspaces &amp; Active Field Corridors</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded font-mono font-bold bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
                        2 Corridors
                      </span>
                    </h2>
                    {collapsedSections.workspaces ? (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                        84,120 Ha Mapped • ₹1,240 Cr Contested • 312 Gram Sabha Claims
                      </p>
                    ) : (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Empirical cohorts with active GIS overlays and statutory citations
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('workspaces');
                    }}
                    className="text-xs font-semibold text-[#173F5F] dark:text-teal-400 hover:underline flex items-center gap-0.5 cursor-pointer mr-1"
                  >
                    <span>All</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <div className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                    {collapsedSections.workspaces ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronUp className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </div>

              {/* Workspaces List (Collapsible) */}
              {!collapsedSections.workspaces && (
                <div className="p-3.5 space-y-3">
                  {/* Project Card 1 */}
                  <div
                    className={`p-3 rounded-xl border transition-all hover:border-teal-500/60 ${
                      isDarkMode
                        ? 'bg-[#17232E]/60 border-[#293846]'
                        : 'bg-slate-50/70 border-slate-200'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                          GIS Layer: Cadastre v3.1
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                          Section 26 RFCTLARR
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          WS-MH-PUN-094
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">Updated 14m ago</span>
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                      Peri-Urban Agricultural Land Conversion &amp; Compensation Elasticity (Pune-PCMC)
                    </h3>
                    
                    {!isCompactMode && (
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        Spatial assessment along Pune-PCMC industrial growth corridor measuring Ready Reckoner rate escalation, fragmentation patterns, and court-mandated land acquisition awards under Section 26.
                      </p>
                    )}

                    <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                      <div className="flex items-center gap-3">
                        <div>
                          <span className="text-slate-500 dark:text-slate-400">Polygon: </span>
                          <strong className="font-semibold text-slate-800 dark:text-slate-200">
                            84,120 Ha
                          </strong>
                        </div>
                        <div>
                          <span className="text-slate-500 dark:text-slate-400">Litigation: </span>
                          <strong className="font-semibold text-rose-600 dark:text-rose-400">
                            ₹1,240 Cr
                          </strong>
                        </div>
                      </div>

                      <button
                        onClick={() => onNavigate('gis')}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#173F5F] hover:bg-[#20639B] text-white transition-colors cursor-pointer"
                      >
                        <span>Open GIS</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Project Card 2 */}
                  <div
                    className={`p-3 rounded-xl border transition-all hover:border-teal-500/60 ${
                      isDarkMode
                        ? 'bg-[#17232E]/60 border-[#293846]'
                        : 'bg-slate-50/70 border-slate-200'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <div className="flex flex-wrap items-center gap-1.5">
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
                      <span className="text-[10px] text-slate-400 font-mono">Updated 2h ago</span>
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                      Forest Rights Act (FRA) Communal Titling Claims &amp; Border Conflicts (Koraput)
                    </h3>

                    {!isCompactMode && (
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        Koraput District communal tenure validation against Survey of India ortho-imagery and state forest department demarcations with multi-village Gram Sabha resolutions.
                      </p>
                    )}

                    <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                      <div className="flex items-center gap-3">
                        <div>
                          <span className="text-slate-500 dark:text-slate-400">Gram Sabha: </span>
                          <strong className="font-semibold text-slate-800 dark:text-slate-200">
                            312 Villages
                          </strong>
                        </div>
                        <div>
                          <span className="text-slate-500 dark:text-slate-400">Consensus: </span>
                          <strong className="font-semibold text-emerald-600 dark:text-emerald-400">
                            88.7%
                          </strong>
                        </div>
                      </div>

                      <button
                        onClick={() => onNavigate('policy-sim')}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
                      >
                        <span>Policy Simulation</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Statutory Calculation Banner (Compact & Collapsible) */}
            <div
              className={`p-3 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 transition-colors ${
                isDarkMode
                  ? 'bg-gradient-to-r from-[#17232E] to-[#111A23] border-[#293846]'
                  : 'bg-gradient-to-r from-teal-50 to-sky-50 border-teal-200 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-teal-600 text-white shrink-0">
                  <Calculator className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Section 26 Land Compensation &amp; 100% Solatium Calculator
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300">
                    Instant calculation of 1.00x–2.00x MoRD rural multipliers and Section 30 awards
                  </p>
                </div>
              </div>

              <button
                onClick={() => onNavigate('legal')}
                className="px-3 py-1 rounded-lg bg-[#173F5F] hover:bg-[#20639B] text-white text-xs font-semibold shrink-0 cursor-pointer"
              >
                Open Calculator
              </button>
            </div>
          </div>
        )}

        {/* Right Column (Litigation Feed, Datasets & Ledger) */}
        {(activeTab === 'all' || activeTab === 'litigation' || activeTab === 'ledger') && (
          <div className={`${activeTab === 'all' ? 'lg:col-span-5 xl:col-span-4' : 'lg:col-span-12'} space-y-3`}>
            {/* Live Litigation Feed with Collapsible Header */}
            {(activeTab === 'all' || activeTab === 'litigation') && (
              <div
                className={`rounded-xl border transition-colors overflow-hidden ${
                  isDarkMode
                    ? 'bg-[#111A23] border-[#293846]'
                    : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div
                  onClick={() => toggleSection('litigation')}
                  className="p-3 flex items-center justify-between cursor-pointer select-none hover:bg-slate-50/50 dark:hover:bg-[#17232E]/40 transition-colors border-b border-slate-100 dark:border-gray-800"
                >
                  <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-rose-500" />
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      Live Litigation Feed
                    </h3>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                      3 Dockets
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                      eCourts
                    </span>
                    <div className="p-0.5 rounded text-slate-400">
                      {collapsedSections.litigation ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronUp className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </div>

                {!collapsedSections.litigation && (
                  <div className="p-3 divide-y divide-slate-100 dark:divide-gray-800/80 space-y-2.5">
                    {/* Alert 1 */}
                    <div className="pt-1 text-xs">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          Section 26 Undervaluation Surge
                        </span>
                        <span className="text-slate-400 font-mono text-[10px]">18m ago</span>
                      </div>
                      <p className="mt-1 text-slate-600 dark:text-slate-300 text-[11px] leading-snug">
                        Thane District: 31 new writ petitions filed across 4 talukas regarding Ready Reckoner undervaluation on Bullet Train corridor.
                      </p>
                      <div className="mt-1.5 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 font-mono text-[10px]">WP No. 4920/2025</span>
                        <button
                          onClick={() => onNavigate('disputes')}
                          className="text-teal-600 dark:text-teal-400 font-semibold hover:underline flex items-center gap-0.5 cursor-pointer text-[11px]"
                        >
                          <span>Inspect</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>

                    {/* Alert 2 */}
                    <div className="pt-2 text-xs">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          Polygon Boundary Contradiction
                        </span>
                        <span className="text-slate-400 font-mono text-[10px]">2h ago</span>
                      </div>
                      <p className="mt-1 text-slate-600 dark:text-slate-300 text-[11px] leading-snug">
                        Bengaluru Outer Ring: 14.8 Ha overlapping revenue polygon identified between KIADB Gazette and Forest Dept spatial ledger.
                      </p>
                      <div className="mt-1.5 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 font-mono text-[10px]">Sarjapur #402</span>
                        <button
                          onClick={() => onNavigate('gis')}
                          className="text-teal-600 dark:text-teal-400 font-semibold hover:underline flex items-center gap-0.5 cursor-pointer text-[11px]"
                        >
                          <span>View GIS</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>

                    {/* Alert 3 */}
                    <div className="pt-2 text-xs">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                          Ancestral Succession Lis Pendens
                        </span>
                        <span className="text-slate-400 font-mono text-[10px]">4h ago</span>
                      </div>
                      <p className="mt-1 text-slate-600 dark:text-slate-300 text-[11px] leading-snug">
                        Pune Haveli: Stay injunction enforced on Plot #412/1A following non-notified sale without coparcenary consent.
                      </p>
                      <div className="mt-1.5 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 font-mono text-[10px]">SCS 419/2024</span>
                        <button
                          onClick={() => onNavigate('disputes')}
                          className="text-teal-600 dark:text-teal-400 font-semibold hover:underline flex items-center gap-0.5 cursor-pointer text-[11px]"
                        >
                          <span>Triage</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Authoritative Datasets (Collapsible) */}
            {(activeTab === 'all' || activeTab === 'ledger') && (
              <div
                className={`rounded-xl border transition-colors overflow-hidden ${
                  isDarkMode
                    ? 'bg-[#111A23] border-[#293846]'
                    : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div
                  onClick={() => toggleSection('datasets')}
                  className="p-3 flex items-center justify-between cursor-pointer select-none hover:bg-slate-50/50 dark:hover:bg-[#17232E]/40 transition-colors border-b border-slate-100 dark:border-gray-800"
                >
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-emerald-500" />
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      Authoritative Datasets
                    </h3>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
                      2 Sources
                    </span>
                  </div>

                  <div className="p-0.5 rounded text-slate-400">
                    {collapsedSections.datasets ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronUp className="w-4 h-4" />
                    )}
                  </div>
                </div>

                {!collapsedSections.datasets && (
                  <div className="p-3 space-y-2">
                    <div
                      className={`p-2 rounded-lg border text-xs flex items-center justify-between gap-2 ${
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
                          3.30 Lakh Villages (SVAMITVA)
                        </div>
                      </div>
                      <button
                        onClick={() => onNavigate('gis')}
                        className="px-2 py-1 rounded text-[11px] font-semibold bg-[#173F5F] hover:bg-[#20639B] text-white transition-colors cursor-pointer shrink-0"
                      >
                        Layer
                      </button>
                    </div>

                    <div
                      className={`p-2 rounded-lg border text-xs flex items-center justify-between gap-2 ${
                        isDarkMode
                          ? 'bg-[#17232E]/60 border-[#293846]'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-1 font-semibold text-slate-900 dark:text-white">
                          <FileText className="w-3.5 h-3.5 text-blue-500" />
                          <span>DoLR Bhu-Aadhaar Registry</span>
                          <span className="text-[9px] px-1 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-mono">
                            405.8M
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          Standardized 14-Digit Spatial IDs
                        </div>
                      </div>
                      <button
                        onClick={() => onNavigate('blockchain')}
                        className="px-2 py-1 rounded text-[11px] font-semibold bg-[#173F5F] hover:bg-[#20639B] text-white transition-colors cursor-pointer shrink-0"
                      >
                        Verify
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Ledger Provenance Card (Collapsible) */}
            {(activeTab === 'all' || activeTab === 'ledger') && (
              <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#0F283E] to-[#081827] text-white shadow-md border border-teal-900/40">
                <div
                  onClick={() => toggleSection('ledger')}
                  className="flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <h3 className="text-xs font-bold uppercase tracking-wider font-mono">
                      Ledger Provenance
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-emerald-900/80 text-emerald-300 border border-emerald-500/40">
                      IMMUTABLE
                    </span>
                    <div className="text-teal-300">
                      {collapsedSections.ledger ? (
                        <ChevronDown className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronUp className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </div>
                </div>

                {!collapsedSections.ledger && (
                  <div className="mt-2.5 pt-2 border-t border-teal-800/50">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-300">Block #9,481,200</span>
                      <span className="font-mono text-emerald-400 text-xs font-bold">
                        0 Discrepancy Hashes
                      </span>
                    </div>
                    <p className="mt-1 text-[10px] text-slate-300 leading-relaxed">
                      Audited 42,910 blocks across 14 state revenue storage nodes during the last 24h pass.
                    </p>
                    <button
                      onClick={() => onNavigate('blockchain')}
                      className="mt-2.5 w-full py-1.5 rounded-lg text-xs font-semibold bg-teal-500/20 hover:bg-teal-500/30 text-teal-200 border border-teal-500/40 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Inspect Cryptographic Merkle Root</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

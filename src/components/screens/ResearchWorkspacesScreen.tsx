import React, { useState, useMemo } from 'react';
import {
  FolderGit2,
  Plus,
  Search,
  ChevronRight,
  Database,
  Users,
  Calendar,
  Layers,
  ExternalLink,
  ArrowRight,
  Sparkles,
  MapPin,
  Filter,
  CheckCircle2,
  FileSpreadsheet,
  X,
  Share2,
  Copy,
  Check,
  ShieldAlert,
  BarChart3,
  Cpu
} from 'lucide-react';
import { ActiveScreen, ResearchWorkspace } from '../../types';
import { INITIAL_WORKSPACES } from '../../data/mockData';

interface ResearchWorkspacesScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  onOpenNewWorkspaceModal: () => void;
  isDarkMode: boolean;
  workspaces?: ResearchWorkspace[];
}

export const ResearchWorkspacesScreen: React.FC<ResearchWorkspacesScreenProps> = ({
  onNavigate,
  onOpenNewWorkspaceModal,
  isDarkMode,
  workspaces: propWorkspaces,
}) => {
  const [workspaceList, setWorkspaceList] = useState<ResearchWorkspace[]>(
    propWorkspaces || INITIAL_WORKSPACES
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [stateFilter, setStateFilter] = useState<string>('all');
  const [selectedWorkspace, setSelectedWorkspace] = useState<ResearchWorkspace | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showQuickCreateModal, setShowQuickCreateModal] = useState(false);

  // Quick form state
  const [newTitle, setNewTitle] = useState('');
  const [newState, setNewState] = useState('Maharashtra');
  const [newDistrict, setNewDistrict] = useState('Pune');
  const [newLead, setNewLead] = useState('Dr. Arishta Sen & Team');
  const [newCollaborator, setNewCollaborator] = useState('NITI Aayog, DoLR New Delhi');
  const [newParcels, setNewParcels] = useState('12500');

  const filteredWorkspaces = useMemo(() => {
    return workspaceList.filter((ws) => {
      const matchesSearch =
        ws.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ws.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ws.lead.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ws.stateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ws.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ws.collaborators.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus =
        statusFilter === 'all' ||
        ws.status.toLowerCase().includes(statusFilter.toLowerCase());

      const matchesState =
        stateFilter === 'all' ||
        ws.stateName.toLowerCase() === stateFilter.toLowerCase();

      return matchesSearch && matchesStatus && matchesState;
    });
  }, [workspaceList, searchQuery, statusFilter, stateFilter]);

  const handleCopyCitation = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreateNewWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newWs: ResearchWorkspace = {
      id: `WS-${newState.slice(0, 2).toUpperCase()}-${newDistrict.slice(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      title: newTitle,
      lead: newLead,
      collaborators: newCollaborator.split(',').map((s) => s.trim()).filter(Boolean),
      status: 'Active Fieldwork & GIS Modeling',
      parcelsCount: parseInt(newParcels) || 10000,
      litigationCr: Math.floor(Math.random() * 800) + 150,
      stateName: newState,
      district: newDistrict,
      lastUpdated: 'Just now',
      tags: ['14-digit ULPIN Synced', 'Drone 5cm GSD', 'Sec 26 Valuation', 'Consensus Attested'],
      targetScreen: 'gis',
    };

    setWorkspaceList([newWs, ...workspaceList]);
    setShowQuickCreateModal(false);
    setNewTitle('');
    setSelectedWorkspace(newWs);
  };

  const availableStates = ['all', 'Maharashtra', 'Karnataka', 'Telangana', 'Uttar Pradesh', 'Odisha'];

  return (
    <div className="space-y-4 max-w-[1600px] mx-auto pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <span>Collaboration</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            Institutional Research Workspaces
          </span>
        </div>

        <div className="mt-1 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#002945] dark:text-white">
              Institutional Research Workspaces
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Active federated research cohorts correlating cadastral polygons, Section 26 statutory valuations, and judicial stay orders
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowQuickCreateModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#173F5F] hover:bg-[#20639B] text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Research Workspace</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        className={`p-3.5 rounded-xl border flex flex-col gap-3 text-xs ${
          isDarkMode
            ? 'bg-[#111A23] border-[#293846]'
            : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by workspace title, ID, district, or collaborating institution..."
              className="w-full bg-transparent border-none outline-none focus:ring-0 text-xs text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-slate-400 hover:text-slate-600 text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Status filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'All Statuses' },
              { id: 'active', label: 'Active Fieldwork' },
              { id: 'consensus', label: 'Consensus Phase' },
              { id: 'complete', label: 'Survey Complete' },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setStatusFilter(st.id)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  statusFilter === st.id
                    ? 'bg-[#173F5F] text-white'
                    : isDarkMode
                    ? 'bg-[#17232E] text-slate-300 hover:bg-[#1f2e3d]'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* State Filter bar */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-gray-800 overflow-x-auto text-[11px]">
          <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider shrink-0">
            Filter by State:
          </span>
          {availableStates.map((st) => (
            <button
              key={st}
              onClick={() => setStateFilter(st)}
              className={`px-2 py-0.5 rounded text-[11px] font-medium capitalize cursor-pointer transition-colors ${
                stateFilter === st
                  ? 'bg-teal-600 text-white font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
          <span className="ml-auto text-[11px] text-slate-400 font-mono">
            Showing {filteredWorkspaces.length} of {workspaceList.length} cohorts
          </span>
        </div>
      </div>

      {/* Workspaces List */}
      <div className="space-y-4">
        {filteredWorkspaces.length === 0 ? (
          <div
            className={`p-10 rounded-xl border text-center ${
              isDarkMode ? 'bg-[#111A23] border-[#293846]' : 'bg-white border-slate-200'
            }`}
          >
            <FolderGit2 className="w-10 h-10 mx-auto text-slate-400 mb-2 opacity-60" />
            <h3 className="text-sm font-bold text-slate-800 dark:text-white">No research workspaces matched your query</h3>
            <p className="text-xs text-slate-500 mt-1">Try relaxing your search terms or state filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setStateFilter('all');
              }}
              className="mt-3 px-3 py-1.5 rounded-lg bg-teal-600 text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredWorkspaces.map((ws) => (
            <div
              key={ws.id}
              className={`p-5 rounded-xl border transition-all hover:shadow-md ${
                isDarkMode
                  ? 'bg-[#111A23] border-[#293846]'
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#173F5F] dark:text-teal-400">
                    {ws.id}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                      ws.status.includes('Active')
                        ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                        : ws.status.includes('Consensus')
                        ? 'bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800'
                        : 'bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                    }`}
                  >
                    {ws.status}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {ws.stateName} • {ws.district}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                    Updated {ws.lastUpdated}
                  </span>
                  <button
                    onClick={() => handleCopyCitation(ws.id, `${ws.id} - ${ws.title} (${ws.lead})`)}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                    title="Copy citation"
                  >
                    {copiedId === ws.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <h3 className="mt-2 text-base font-bold text-slate-900 dark:text-white">
                {ws.title}
              </h3>

              {/* Tags */}
              <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
                {ws.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-slate-100 dark:bg-[#17232E] text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-gray-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Meta Grid */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-gray-800 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase block">
                    LEAD INVESTIGATOR
                  </span>
                  <span className="font-medium text-slate-800 dark:text-slate-200 mt-0.5 block">
                    {ws.lead}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase block">
                    COLLABORATING BODIES
                  </span>
                  <span className="font-medium text-slate-800 dark:text-slate-200 mt-0.5 block truncate" title={ws.collaborators.join(', ')}>
                    {ws.collaborators.join(', ')}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase block">
                    PARCEL CADASTRE VOLUME
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">
                    {ws.parcelsCount.toLocaleString()} Verified Parcels
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase block">
                    MONETARY EXPOSURE AT RISK
                  </span>
                  <span className="font-bold text-rose-600 dark:text-rose-400 mt-0.5 block">
                    ₹{ws.litigationCr.toLocaleString()} Cr in Litigation
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-gray-800 flex items-center justify-between flex-wrap gap-2">
                <button
                  onClick={() => setSelectedWorkspace(ws)}
                  className="flex items-center gap-1 text-xs font-semibold text-teal-700 dark:text-teal-400 hover:underline cursor-pointer"
                >
                  <span>Inspect Cohort Telemetry & Geospatial Layers</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate(ws.targetScreen)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#173F5F] hover:bg-[#20639B] text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <span>Launch in {ws.targetScreen === 'gis' ? 'GIS Workspace' : ws.targetScreen === 'policy-sim' ? 'Policy Simulator' : 'Dispute Intelligence'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Workspace Detail Modal */}
      {selectedWorkspace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div
            className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border shadow-2xl p-6 transition-colors ${
              isDarkMode
                ? 'bg-[#111A23] border-[#293846] text-[#F3F6F8]'
                : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-teal-600 dark:text-teal-400">
                  {selectedWorkspace.id}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold">
                  {selectedWorkspace.status}
                </span>
              </div>
              <button
                onClick={() => setSelectedWorkspace(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="text-lg font-bold mt-3 text-slate-900 dark:text-white">
              {selectedWorkspace.title}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Geodetic district: <span className="font-semibold text-slate-700 dark:text-slate-300">{selectedWorkspace.district}, {selectedWorkspace.stateName}</span>
            </p>

            {/* Stats Bento */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#17232E] border border-slate-200 dark:border-gray-800">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Parcels Mapped</span>
                <span className="text-base font-bold text-slate-900 dark:text-white mt-0.5 block">
                  {selectedWorkspace.parcelsCount.toLocaleString()}
                </span>
                <span className="text-[10px] text-emerald-600 font-mono">100% Georeferenced</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#17232E] border border-slate-200 dark:border-gray-800">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Disputed Value</span>
                <span className="text-base font-bold text-rose-600 dark:text-rose-400 mt-0.5 block">
                  ₹{selectedWorkspace.litigationCr} Cr
                </span>
                <span className="text-[10px] text-rose-500 font-mono">Sec 26 Appeals</span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#17232E] border border-slate-200 dark:border-gray-800">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Lead Authority</span>
                <span className="text-xs font-semibold text-slate-900 dark:text-white mt-1 block truncate">
                  {selectedWorkspace.lead}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Principal Invest.</span>
              </div>
            </div>

            {/* Participating Institutions */}
            <div className="mt-4">
              <span className="text-[11px] font-mono font-bold uppercase text-slate-400 block">
                PARTICIPATING STATUTORY & RESEARCH INSTITUTIONS
              </span>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedWorkspace.collaborators.map((c, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded bg-slate-100 dark:bg-[#17232E] border border-slate-200 dark:border-gray-800 text-xs font-medium text-slate-700 dark:text-slate-300"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-gray-800 flex items-center justify-between flex-wrap gap-3">
              <button
                onClick={() => {
                  const payload = JSON.stringify(selectedWorkspace, null, 2);
                  navigator.clipboard.writeText(payload);
                  alert(`Copied workspace dossier for ${selectedWorkspace.id} to clipboard!`);
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 dark:border-gray-700 text-xs font-medium hover:bg-slate-50 dark:hover:bg-[#17232E]"
              >
                <Share2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Export Dossier (JSON)</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedWorkspace(null);
                    onNavigate('gis');
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Inspect in GIS</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedWorkspace(null);
                    onNavigate('policy-sim');
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#173F5F] hover:bg-[#20639B] text-white text-xs font-semibold"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Simulate Policy</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Create Workspace Modal */}
      {showQuickCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div
            className={`w-full max-w-lg rounded-xl border shadow-2xl p-6 transition-colors ${
              isDarkMode
                ? 'bg-[#111A23] border-[#293846] text-[#F3F6F8]'
                : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-gray-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Create Institutional Research Workspace
              </h3>
              <button
                onClick={() => setShowQuickCreateModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewWorkspace} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="font-semibold block text-slate-700 dark:text-slate-300">
                  Workspace Title / Policy Scope *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Nashik Industrial Agro-Park Cadastral Verification & Section 26 Multiplier"
                  className="mt-1 w-full p-2.5 rounded-lg border border-slate-300 dark:border-gray-700 bg-transparent text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block text-slate-700 dark:text-slate-300">
                    State Jurisdiction *
                  </label>
                  <select
                    value={newState}
                    onChange={(e) => setNewState(e.target.value)}
                    className="mt-1 w-full p-2.5 rounded-lg border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#17232E] text-slate-900 dark:text-white outline-none"
                  >
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Gujarat">Gujarat</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block text-slate-700 dark:text-slate-300">
                    District / Tehsil *
                  </label>
                  <input
                    type="text"
                    required
                    value={newDistrict}
                    onChange={(e) => setNewDistrict(e.target.value)}
                    placeholder="e.g. Haveli, Pune"
                    className="mt-1 w-full p-2.5 rounded-lg border border-slate-300 dark:border-gray-700 bg-transparent text-slate-900 dark:text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block text-slate-700 dark:text-slate-300">
                    Lead Principal Investigator
                  </label>
                  <input
                    type="text"
                    value={newLead}
                    onChange={(e) => setNewLead(e.target.value)}
                    placeholder="e.g. Dr. Arishta Sen"
                    className="mt-1 w-full p-2.5 rounded-lg border border-slate-300 dark:border-gray-700 bg-transparent text-slate-900 dark:text-white outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold block text-slate-700 dark:text-slate-300">
                    Estimated Cadastral Parcels
                  </label>
                  <input
                    type="number"
                    value={newParcels}
                    onChange={(e) => setNewParcels(e.target.value)}
                    placeholder="12000"
                    className="mt-1 w-full p-2.5 rounded-lg border border-slate-300 dark:border-gray-700 bg-transparent text-slate-900 dark:text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block text-slate-700 dark:text-slate-300">
                  Collaborating Institutions (comma-separated)
                </label>
                <input
                  type="text"
                  value={newCollaborator}
                  onChange={(e) => setNewCollaborator(e.target.value)}
                  placeholder="e.g. NITI Aayog, DoLR New Delhi, Survey of India"
                  className="mt-1 w-full p-2.5 rounded-lg border border-slate-300 dark:border-gray-700 bg-transparent text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-gray-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowQuickCreateModal(false)}
                  className="px-3.5 py-2 rounded-lg border border-slate-300 dark:border-gray-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#173F5F] hover:bg-[#20639B] text-white text-xs font-semibold shadow-xs"
                >
                  Instantiate Workspace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

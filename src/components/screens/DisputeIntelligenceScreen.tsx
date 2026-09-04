import React, { useState, useMemo } from 'react';
import {
  Scale,
  AlertTriangle,
  FileText,
  Search,
  Filter,
  ExternalLink,
  ChevronRight,
  TrendingDown,
  Building,
  MapPin,
  Calendar,
  Layers,
  ArrowRight,
  Plus,
  X,
  Share2,
  Copy,
  Check,
  Calculator,
  Gavel,
  ShieldAlert,
  Info
} from 'lucide-react';
import { ActiveScreen, DisputeRecord } from '../../types';
import { INITIAL_DISPUTES } from '../../data/mockData';
import { calculateSection26Award } from '../../data/realLandData';

interface DisputeIntelligenceScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  isDarkMode: boolean;
  disputes?: DisputeRecord[];
}

export const DisputeIntelligenceScreen: React.FC<DisputeIntelligenceScreenProps> = ({
  onNavigate,
  isDarkMode,
  disputes: propDisputes,
}) => {
  const [disputeList, setDisputeList] = useState<DisputeRecord[]>(
    propDisputes || INITIAL_DISPUTES
  );
  const [selectedDisputeCategory, setSelectedDisputeCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDispute, setSelectedDispute] = useState<DisputeRecord | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showAddDisputeModal, setShowAddDisputeModal] = useState(false);
  const [showCalculatorModal, setShowCalculatorModal] = useState(false);

  // Quick Calculator State
  const [calcCircleRate, setCalcCircleRate] = useState<number>(3500); // ₹/sq.m
  const [calcAreaHa, setCalcAreaHa] = useState<number>(4.2); // Hectares
  const [calcDistanceKm, setCalcDistanceKm] = useState<number>(18); // km from urban fringe
  const [calcMonths, setCalcMonths] = useState<number>(18); // months since notification

  // New Dispute Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCourt, setNewCourt] = useState('High Court of Judicature at Bombay');
  const [newCaseNumber, setNewCaseNumber] = useState('');
  const [newPetitioner, setNewPetitioner] = useState('');
  const [newRespondent, setNewRespondent] = useState('');
  const [newTaluka, setNewTaluka] = useState('Haveli');
  const [newDistrict, setNewDistrict] = useState('Pune, Maharashtra');
  const [newClaimCr, setNewClaimCr] = useState('45');
  const [newRisk, setNewRisk] = useState<'CRITICAL' | 'HIGH RISK' | 'MEDIUM RISK'>('HIGH RISK');
  const [newSummary, setNewSummary] = useState('');

  const filteredDisputes = useMemo(() => {
    return disputeList.filter((d) => {
      const matchesSearch =
        d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.taluka.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.caseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.court.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.petitioner.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.statutoryProvisions.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchesCat = true;
      if (selectedDisputeCategory === 'critical') {
        matchesCat = d.riskLevel === 'CRITICAL';
      } else if (selectedDisputeCategory === 'high risk') {
        matchesCat = d.riskLevel === 'HIGH RISK';
      } else if (selectedDisputeCategory === 'medium risk') {
        matchesCat = d.riskLevel === 'MEDIUM RISK';
      } else if (selectedDisputeCategory === 'supreme court') {
        matchesCat = d.court.toLowerCase().includes('supreme court');
      } else if (selectedDisputeCategory === 'stay order') {
        matchesCat = d.status.toLowerCase().includes('stay') || d.status.toLowerCase().includes('injunction');
      }

      return matchesSearch && matchesCat;
    });
  }, [disputeList, searchQuery, selectedDisputeCategory]);

  const handleCopyCitation = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddNewDispute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCaseNumber.trim()) return;

    const record: DisputeRecord = {
      id: `DISP-2026-${Math.floor(100 + Math.random() * 900)}`,
      court: newCourt,
      bench: 'Single Judge / Division Bench Registry',
      caseNumber: newCaseNumber,
      neutralCitation: `2026:IND:${newCaseNumber.replace(/\s+/g, '-')}`,
      dateOfJudgment: 'Pending Active Adjudication',
      title: newTitle,
      petitioner: newPetitioner || 'Aggrieved Landholders Forum',
      respondent: newRespondent || 'State Revenue Competent Authority',
      taluka: newTaluka,
      district: newDistrict,
      statutoryProvisions: ['RFCTLARR Act 2013, Section 26', 'Section 30(1) Solatium'],
      keyRatioDecidendi: newSummary || 'Pending final framing of issues under RFCTLARR Act 2013 compensation schedule.',
      status: 'Active Hearing Listed',
      nextHearing: '15 Nov 2026',
      parcelsAffected: 12,
      totalClaimCr: parseFloat(newClaimCr) || 30,
      riskLevel: newRisk,
      summary: newSummary || 'Statutory dispute challenging circle rate multipliers and spatial bounds alignment.',
    };

    setDisputeList([record, ...disputeList]);
    setShowAddDisputeModal(false);
    setNewTitle('');
    setNewCaseNumber('');
    setSelectedDispute(record);
  };

  const awardCalculation = useMemo(() => {
    return calculateSection26Award(calcCircleRate, calcAreaHa, calcDistanceKm, calcMonths);
  }, [calcCircleRate, calcAreaHa, calcDistanceKm, calcMonths]);

  return (
    <div className="space-y-4 max-w-[1600px] mx-auto pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <span>Intelligence</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            Dispute & Litigation Hotspots
          </span>
        </div>

        <div className="mt-1 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#002945] dark:text-white">
              National Land Dispute & Litigation Intelligence Desk
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Correlating eCourts dockets, Section 26 valuation challenges, High Court stay orders, and spatial boundary contradictions
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setShowCalculatorModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-teal-600 dark:border-teal-500 text-teal-700 dark:text-teal-300 font-semibold hover:bg-teal-50 dark:hover:bg-teal-950/40 transition-colors cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Section 26 Award Calculator</span>
            </button>

            <button
              onClick={() => setShowAddDisputeModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#173F5F] hover:bg-[#20639B] text-white font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Litigative Notice</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div
        className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
          isDarkMode
            ? 'bg-[#111A23] border-[#293846]'
            : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by case number, court, section, petitioner, or taluka..."
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

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Cases' },
            { id: 'critical', label: 'Critical Risk' },
            { id: 'high risk', label: 'High Risk' },
            { id: 'stay order', label: 'Stay Orders Active' },
            { id: 'supreme court', label: 'Supreme Court Rulings' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedDisputeCategory(cat.id)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer capitalize ${
                selectedDisputeCategory === cat.id
                  ? 'bg-[#173F5F] text-white'
                  : isDarkMode
                  ? 'bg-[#17232E] text-slate-300 hover:bg-[#1f2e3d]'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Disputes Cards */}
      <div className="space-y-4">
        {filteredDisputes.length === 0 ? (
          <div
            className={`p-10 rounded-xl border text-center ${
              isDarkMode ? 'bg-[#111A23] border-[#293846]' : 'bg-white border-slate-200'
            }`}
          >
            <Scale className="w-10 h-10 mx-auto text-slate-400 mb-2 opacity-60" />
            <h3 className="text-sm font-bold text-slate-800 dark:text-white">No litigation dockets matched your criteria</h3>
            <p className="text-xs text-slate-500 mt-1">Try clearing your search query or selecting &quot;All Cases&quot;.</p>
          </div>
        ) : (
          filteredDisputes.map((d) => (
            <div
              key={d.id}
              className={`p-5 rounded-xl border transition-all hover:shadow-md ${
                isDarkMode
                  ? 'bg-[#111A23] border-[#293846]'
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#173F5F] dark:text-teal-400">
                    {d.id}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                      d.riskLevel === 'CRITICAL'
                        ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-200 border border-rose-300 dark:border-rose-900'
                        : d.riskLevel === 'HIGH RISK'
                        ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-900'
                        : 'bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-200 border border-blue-300 dark:border-blue-900'
                    }`}
                  >
                    {d.riskLevel}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {d.status}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                    Next Hearing: {d.nextHearing || 'Listed'}
                  </span>
                  <button
                    onClick={() => handleCopyCitation(d.id, `${d.title} [${d.caseNumber}] - ${d.court}`)}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                    title="Copy case citation"
                  >
                    {copiedId === d.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <h3 className="mt-2 text-base font-bold text-slate-900 dark:text-white">
                {d.title}
              </h3>

              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-700 dark:text-slate-300">{d.court}</span>
                <span>•</span>
                <span className="font-mono text-teal-700 dark:text-teal-400">{d.caseNumber}</span>
                <span>•</span>
                <span>{d.taluka}, {d.district}</span>
              </div>

              <p className="mt-2.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {d.summary}
              </p>

              {/* Statutory Provisions tags */}
              <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
                {d.statutoryProvisions.map((prov, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-slate-100 dark:bg-[#17232E] text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-gray-800"
                  >
                    {prov}
                  </span>
                ))}
              </div>

              {/* Grid stats */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-gray-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase block">
                    PETITIONER / CLAIMANT
                  </span>
                  <span className="font-medium text-slate-800 dark:text-slate-200 mt-0.5 block truncate" title={d.petitioner}>
                    {d.petitioner}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase block">
                    RESPONDENT AUTHORITY
                  </span>
                  <span className="font-medium text-slate-800 dark:text-slate-200 mt-0.5 block truncate" title={d.respondent}>
                    {d.respondent}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase block">
                    PARCELS IMPLICATED
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white mt-0.5 block">
                    {d.parcelsAffected} Land Parcels
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase block">
                    COMPENSATION CLAIM
                  </span>
                  <span className="font-bold text-rose-600 dark:text-rose-400 mt-0.5 block">
                    ₹{d.totalClaimCr} Crore
                  </span>
                </div>
              </div>

              {/* Footer actions */}
              <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-gray-800 flex items-center justify-between flex-wrap gap-2">
                <button
                  onClick={() => setSelectedDispute(d)}
                  className="flex items-center gap-1 text-xs font-semibold text-teal-700 dark:text-teal-400 hover:underline cursor-pointer"
                >
                  <Gavel className="w-3.5 h-3.5" />
                  <span>Inspect Full Legal Ratio & Order Docket</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate('gis')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold cursor-pointer"
                  >
                    <MapPin className="w-3 h-3" />
                    <span>View in GIS</span>
                  </button>
                  <button
                    onClick={() => {
                      setCalcAreaHa(d.parcelsAffected * 1.5);
                      setShowCalculatorModal(true);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-semibold cursor-pointer"
                  >
                    <Calculator className="w-3 h-3" />
                    <span>Model Section 26</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Dispute Detail Modal */}
      {selectedDispute && (
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
                  {selectedDispute.id}
                </span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                    selectedDispute.riskLevel === 'CRITICAL'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {selectedDispute.riskLevel}
                </span>
              </div>
              <button
                onClick={() => setSelectedDispute(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="text-lg font-bold mt-3 text-slate-900 dark:text-white">
              {selectedDispute.title}
            </h2>
            <div className="mt-1 text-xs text-slate-500 font-mono">
              {selectedDispute.court} • {selectedDispute.caseNumber}
            </div>

            {/* Bench & Neutral Citation */}
            <div className="mt-3 p-3 rounded-lg bg-slate-50 dark:bg-[#17232E] border border-slate-200 dark:border-gray-800 text-xs space-y-1.5">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">
                  JUDICIAL BENCH COMPOSITION
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {selectedDispute.bench}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">
                  NEUTRAL CITATION & DOCKET ID
                </span>
                <span className="font-mono text-teal-700 dark:text-teal-300">
                  {selectedDispute.neutralCitation}
                </span>
              </div>
            </div>

            {/* Ratio Decidendi */}
            <div className="mt-4">
              <span className="text-[11px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400 block">
                RATIO DECIDENDI & OPERATIVE DIRECTIVES
              </span>
              <div className="mt-1.5 p-3 rounded-lg bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900 text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-sans">
                {selectedDispute.keyRatioDecidendi}
              </div>
            </div>

            {/* Statutory Articles */}
            <div className="mt-4">
              <span className="text-[11px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400 block">
                STATUTORY PROVISIONS INTERPRETED
              </span>
              <ul className="mt-2 space-y-1 text-xs text-slate-700 dark:text-slate-300 list-disc list-inside">
                {selectedDispute.statutoryProvisions.map((prov, i) => (
                  <li key={i}>{prov}</li>
                ))}
              </ul>
            </div>

            {/* Action Bar */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-gray-800 flex items-center justify-between flex-wrap gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(selectedDispute, null, 2));
                  alert(`Copied legal brief for ${selectedDispute.caseNumber} to clipboard!`);
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 dark:border-gray-700 text-xs font-medium hover:bg-slate-50"
              >
                <Share2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Export Legal Brief</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedDispute(null);
                    onNavigate('gis');
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Locate in GIS</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedDispute(null);
                    setShowCalculatorModal(true);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#173F5F] hover:bg-[#20639B] text-white text-xs font-semibold"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Compute Section 26 Award</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section 26 Calculator Modal */}
      {showCalculatorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div
            className={`w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-xl border shadow-2xl p-6 transition-colors ${
              isDarkMode
                ? 'bg-[#111A23] border-[#293846] text-[#F3F6F8]'
                : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-teal-600" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Section 26 Statutory Land Compensation Award Engine
                </h3>
              </div>
              <button
                onClick={() => setShowCalculatorModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <p className="text-slate-500 dark:text-slate-400">
                Official computation formula compliant with RFCTLARR Act 2013 (First Schedule rural multiplier factor &amp; Section 30 100% Solatium):
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                    Base Circle Rate / Stamp Value (₹/sq.m)
                  </label>
                  <input
                    type="number"
                    value={calcCircleRate}
                    onChange={(e) => setCalcCircleRate(Number(e.target.value) || 0)}
                    className="mt-1 w-full p-2 rounded-lg border border-slate-300 dark:border-gray-700 bg-transparent text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                    Acquisition Area (Hectares)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={calcAreaHa}
                    onChange={(e) => setCalcAreaHa(Number(e.target.value) || 0)}
                    className="mt-1 w-full p-2 rounded-lg border border-slate-300 dark:border-gray-700 bg-transparent text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                    Distance to Urban Agglomeration (km)
                  </label>
                  <input
                    type="number"
                    value={calcDistanceKm}
                    onChange={(e) => setCalcDistanceKm(Number(e.target.value) || 0)}
                    className="mt-1 w-full p-2 rounded-lg border border-slate-300 dark:border-gray-700 bg-transparent text-slate-900 dark:text-white"
                  />
                  <span className="text-[10px] text-slate-400">
                    Determines Rural Multiplier (1.00x - 2.00x)
                  </span>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                    Months Elapsed from Sec 11 Notice
                  </label>
                  <input
                    type="number"
                    value={calcMonths}
                    onChange={(e) => setCalcMonths(Number(e.target.value) || 0)}
                    className="mt-1 w-full p-2 rounded-lg border border-slate-300 dark:border-gray-700 bg-transparent text-slate-900 dark:text-white"
                  />
                  <span className="text-[10px] text-slate-400">
                    12% p.a. statutory interest (Sec 30(3))
                  </span>
                </div>
              </div>

              {/* Award Breakdown Box */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#17232E] border border-slate-200 dark:border-gray-800 space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Base Land Market Valuation:</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                    ₹{awardCalculation.baseValueCrore.toFixed(2)} Cr
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">
                    MoRD Rural Multiplier Factor ({awardCalculation.multiplier}x):
                  </span>
                  <span className="font-mono font-bold text-teal-700 dark:text-teal-400">
                    ₹{(awardCalculation.marketValueWithMultiplier / 10000000).toFixed(2)} Cr
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Mandatory Section 30(1) Solatium (100%):</span>
                  <span className="font-mono font-bold text-sky-700 dark:text-sky-400">
                    + ₹{(awardCalculation.solatium100Pct / 10000000).toFixed(2)} Cr
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">
                    Section 30(3) 12% p.a. Additional Compensation:
                  </span>
                  <span className="font-mono font-bold text-amber-700 dark:text-amber-400">
                    + ₹{(awardCalculation.additionalInterest / 10000000).toFixed(2)} Cr
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-gray-700 flex justify-between items-center text-sm">
                  <span className="font-bold text-slate-900 dark:text-white">
                    Total Defensible Statutory Award:
                  </span>
                  <span className="font-mono font-black text-emerald-600 dark:text-emerald-400 text-base">
                    ₹{awardCalculation.totalAwardCrore.toFixed(2)} Crore
                  </span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setShowCalculatorModal(false)}
                  className="px-4 py-2 rounded-lg bg-[#173F5F] hover:bg-[#20639B] text-white text-xs font-semibold"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Log Litigative Notice Modal */}
      {showAddDisputeModal && (
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
                Log New Litigative Dispute Notice
              </h3>
              <button
                onClick={() => setShowAddDisputeModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNewDispute} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                  Litigation Title / Cause of Action *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Samruddhi Expressway Corridor Section 26 Solatium Injunction"
                  className="mt-1 w-full p-2 rounded-lg border border-slate-300 dark:border-gray-700 bg-transparent text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                    Judicial Forum / Court *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCourt}
                    onChange={(e) => setNewCourt(e.target.value)}
                    placeholder="e.g. Bombay High Court"
                    className="mt-1 w-full p-2 rounded-lg border border-slate-300 dark:border-gray-700 bg-transparent text-slate-900 dark:text-white outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                    Case / Writ Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={newCaseNumber}
                    onChange={(e) => setNewCaseNumber(e.target.value)}
                    placeholder="e.g. WP No. 1824/2026"
                    className="mt-1 w-full p-2 rounded-lg border border-slate-300 dark:border-gray-700 bg-transparent text-slate-900 dark:text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                    Petitioner
                  </label>
                  <input
                    type="text"
                    value={newPetitioner}
                    onChange={(e) => setNewPetitioner(e.target.value)}
                    placeholder="Landowners Welfare Society"
                    className="mt-1 w-full p-2 rounded-lg border border-slate-300 dark:border-gray-700 bg-transparent text-slate-900 dark:text-white outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                    Respondent
                  </label>
                  <input
                    type="text"
                    value={newRespondent}
                    onChange={(e) => setNewRespondent(e.target.value)}
                    placeholder="MSRDC / Collector Pune"
                    className="mt-1 w-full p-2 rounded-lg border border-slate-300 dark:border-gray-700 bg-transparent text-slate-900 dark:text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                    Taluka / Tehsil
                  </label>
                  <input
                    type="text"
                    value={newTaluka}
                    onChange={(e) => setNewTaluka(e.target.value)}
                    placeholder="Haveli"
                    className="mt-1 w-full p-2 rounded-lg border border-slate-300 dark:border-gray-700 bg-transparent text-slate-900 dark:text-white outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                    Claim Amount (₹ Cr)
                  </label>
                  <input
                    type="number"
                    value={newClaimCr}
                    onChange={(e) => setNewClaimCr(e.target.value)}
                    placeholder="45"
                    className="mt-1 w-full p-2 rounded-lg border border-slate-300 dark:border-gray-700 bg-transparent text-slate-900 dark:text-white outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                    Risk Assessment
                  </label>
                  <select
                    value={newRisk}
                    onChange={(e) => setNewRisk(e.target.value as any)}
                    className="mt-1 w-full p-2 rounded-lg border border-slate-300 dark:border-gray-700 bg-white dark:bg-[#17232E] text-slate-900 dark:text-white outline-none"
                  >
                    <option value="CRITICAL">Critical Risk</option>
                    <option value="HIGH RISK">High Risk</option>
                    <option value="MEDIUM RISK">Medium Risk</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                  Grounds of Challenge & Summary
                </label>
                <textarea
                  rows={2}
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder="Summary of legal claim, e.g. non-application of Section 26 multiplier..."
                  className="mt-1 w-full p-2 rounded-lg border border-slate-300 dark:border-gray-700 bg-transparent text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-gray-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddDisputeModal(false)}
                  className="px-3.5 py-2 rounded-lg border border-slate-300 dark:border-gray-700 text-xs font-semibold text-slate-600 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#173F5F] hover:bg-[#20639B] text-white text-xs font-semibold"
                >
                  Save to Registry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

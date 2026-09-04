import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Scale,
  Search,
  ExternalLink,
  ChevronRight,
  Filter,
  Copy,
  Check,
  Calculator,
  Gavel,
  FileCheck2,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Info,
  X
} from 'lucide-react';
import { REAL_STATUTES, REAL_JUDICIAL_PRECEDENTS, calculateSection26Award, StatutoryAct, RealJudicialPrecedent } from '../../data/realLandData';
import { ActiveScreen } from '../../types';

interface LegalKnowledgeScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  isDarkMode: boolean;
}

export const LegalKnowledgeScreen: React.FC<LegalKnowledgeScreenProps> = ({
  onNavigate,
  isDarkMode,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatute, setSelectedStatute] = useState<StatutoryAct | null>(null);
  const [selectedPrecedent, setSelectedPrecedent] = useState<RealJudicialPrecedent | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'statutes' | 'precedents' | 'calc'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Section 26 Calculator State
  const [calcCircleRate, setCalcCircleRate] = useState<number>(2450);
  const [calcAreaHa, setCalcAreaHa] = useState<number>(4.2);
  const [calcDistanceKm, setCalcDistanceKm] = useState<number>(18);
  const [calcMonths, setCalcMonths] = useState<number>(14);

  const awardResult = useMemo(() => {
    return calculateSection26Award(calcCircleRate, calcAreaHa, calcDistanceKm, calcMonths);
  }, [calcCircleRate, calcAreaHa, calcDistanceKm, calcMonths]);

  const handleCopyCitation = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredStatutes = useMemo(() => {
    return REAL_STATUTES.filter((st) => {
      const q = searchQuery.toLowerCase();
      return (
        st.actTitle.toLowerCase().includes(q) ||
        st.ministry.toLowerCase().includes(q) ||
        st.citation.toLowerCase().includes(q) ||
        st.id.toLowerCase().includes(q) ||
        st.sections.some(
          (s) =>
            s.sectionNumber.toLowerCase().includes(q) ||
            s.heading.toLowerCase().includes(q) ||
            s.fullTextSummary.toLowerCase().includes(q)
        )
      );
    });
  }, [searchQuery]);

  const filteredPrecedents = useMemo(() => {
    return REAL_JUDICIAL_PRECEDENTS.filter((p) => {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.neutralCitation.toLowerCase().includes(q) ||
        p.court.toLowerCase().includes(q) ||
        p.bench.toLowerCase().includes(q) ||
        p.statutoryProvisions.some((s) => s.toLowerCase().includes(q)) ||
        p.keyRatioDecidendi.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  return (
    <div className="space-y-4 max-w-[1600px] mx-auto pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <span>Governance</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            Statutory Lexicon &amp; Precedents
          </span>
        </div>

        <div className="mt-1 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#002945] dark:text-white">
              Authoritative Land Governance Jurisprudence &amp; Statutory Engine
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              RFCTLARR 2013, Forest Rights Act 2006, State Revenue Codes, and Supreme Court Landmark Judgments
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-[#17232E] p-1 rounded-lg border border-slate-200 dark:border-gray-800 text-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              All Jurisprudence
            </button>
            <button
              onClick={() => setActiveTab('statutes')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
                activeTab === 'statutes'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              Statutes ({REAL_STATUTES.length})
            </button>
            <button
              onClick={() => setActiveTab('precedents')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
                activeTab === 'precedents'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              Precedents ({REAL_JUDICIAL_PRECEDENTS.length})
            </button>
            <button
              onClick={() => setActiveTab('calc')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                activeTab === 'calc'
                  ? 'bg-[#173F5F] text-white shadow-xs'
                  : 'text-teal-700 dark:text-teal-400 hover:text-teal-900'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Section 26 Workbench</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div
        className={`p-3 rounded-xl border transition-colors ${
          isDarkMode
            ? 'bg-[#111A23] border-[#293846]'
            : 'bg-white border-slate-200 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Section 24(2) lapse doctrine, Section 26 valuation formula, FRA Gram Sabha powers, or Bombay HC writs..."
            className="w-full text-xs md:text-sm bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Interactive Section 26 Award Calculator Workbench */}
      {(activeTab === 'calc' || activeTab === 'all') && (
        <div
          className={`p-5 rounded-xl border transition-colors ${
            isDarkMode
              ? 'bg-[#111A23] border-[#293846]'
              : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-400">
                <Calculator className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Section 26 RFCTLARR 2013 Statutory Compensation &amp; Solatium Calculator
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Defensible legal valuation applying statutory rural distance multiplier and 100% Section 30(1) Solatium
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-bold self-start sm:self-auto">
              Statutory Formula Active
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Form Inputs */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                  Base Circle Rate / ASR (₹ per sq. meter)
                </label>
                <input
                  type="number"
                  value={calcCircleRate}
                  onChange={(e) => setCalcCircleRate(Number(e.target.value) || 0)}
                  className="mt-1 w-full p-2.5 rounded-lg border border-slate-300 dark:border-gray-700 bg-transparent text-slate-900 dark:text-white"
                />
                <span className="text-[10px] text-slate-400">
                  Ready Reckoner ASR 2024 / Circle Value
                </span>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                  Land Area in Acquisition (Hectares)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={calcAreaHa}
                  onChange={(e) => setCalcAreaHa(Number(e.target.value) || 0)}
                  className="mt-1 w-full p-2.5 rounded-lg border border-slate-300 dark:border-gray-700 bg-transparent text-slate-900 dark:text-white"
                />
                <span className="text-[10px] text-slate-400">
                  1 Hectare = 10,000 sq. meters
                </span>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                  Radial Distance from Urban Boundary: {calcDistanceKm} km
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={calcDistanceKm}
                  onChange={(e) => setCalcDistanceKm(Number(e.target.value))}
                  className="mt-2 w-full accent-teal-600"
                />
                <span className="text-[10px] text-teal-600 font-mono block">
                  MoRD Notification Multiplier: {awardResult.multiplier.toFixed(2)}x
                </span>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                  Months from Section 11 Notification: {calcMonths} mos
                </label>
                <input
                  type="range"
                  min="1"
                  max="60"
                  value={calcMonths}
                  onChange={(e) => setCalcMonths(Number(e.target.value))}
                  className="mt-2 w-full accent-amber-600"
                />
                <span className="text-[10px] text-amber-600 font-mono block">
                  Section 30(3) 12% p.a. Additional Interest
                </span>
              </div>
            </div>

            {/* Statutory Calculation Result Card */}
            <div className="lg:col-span-2 p-4 rounded-xl bg-slate-50 dark:bg-[#17232E] border border-slate-200 dark:border-gray-800 flex flex-col justify-between">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Base Stamp Valuation ({calcAreaHa} Ha):</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                    ₹{awardResult.baseValueCrore.toFixed(2)} Cr
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">
                    Rural Distance Multiplier ({awardResult.multiplier.toFixed(2)}x):
                  </span>
                  <span className="font-mono font-bold text-teal-600 dark:text-teal-400">
                    ₹{(awardResult.marketValueWithMultiplier / 10000000).toFixed(2)} Cr
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">
                    Mandatory 100% Solatium (Sec 30(1)):
                  </span>
                  <span className="font-mono font-bold text-sky-600 dark:text-sky-400">
                    + ₹{(awardResult.solatium100Pct / 10000000).toFixed(2)} Cr
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">
                    12% p.a. Additional Interest (Sec 30(3)):
                  </span>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                    + ₹{(awardResult.additionalInterest / 10000000).toFixed(2)} Cr
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-200 dark:border-gray-700 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block font-bold">
                    TOTAL DEFENSIBLE STATUTORY AWARD
                  </span>
                  <span className="text-xl font-mono font-black text-emerald-600 dark:text-emerald-400">
                    ₹{awardResult.totalAwardCrore.toFixed(2)} Crore
                  </span>
                </div>

                <button
                  onClick={() => {
                    const text = `Section 26 Award Computation: Area: ${calcAreaHa} Ha | Circle Rate: ₹${calcCircleRate}/sq.m | Multiplier: ${awardResult.multiplier}x | Solatium: 100% | Total Award: ₹${awardResult.totalAwardCrore.toFixed(2)} Cr`;
                    navigator.clipboard.writeText(text);
                    alert('Copied statutory award computation to clipboard!');
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Award Formula</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Statutes Section */}
      {(activeTab === 'statutes' || activeTab === 'all') && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#173F5F] dark:text-teal-400" />
              <span>Statutory Corpus &amp; Land Revenue Codes</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              {filteredStatutes.length} Acts in Corpus
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredStatutes.map((st) => (
              <div
                key={st.id}
                className={`p-5 rounded-xl border flex flex-col justify-between transition-all hover:shadow-md ${
                  isDarkMode
                    ? 'bg-[#111A23] border-[#293846]'
                    : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[#173F5F] dark:text-teal-400">
                      {st.id}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {st.enactedYear} • {st.precedentsCount} Precedents
                    </span>
                  </div>

                  <h3 className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                    {st.actTitle}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    {st.citation}
                  </p>
                  <div className="text-[11px] text-slate-500 mt-1">
                    {st.ministry}
                  </div>

                  {/* Key Sections */}
                  <div className="mt-3 space-y-2">
                    {st.sections.map((sec, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#17232E] border border-slate-100 dark:border-gray-800 text-xs"
                      >
                        <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                          <span>{sec.sectionNumber}: {sec.heading}</span>
                          <button
                            onClick={() => handleCopyCitation(sec.sectionNumber, `${st.actTitle} - ${sec.sectionNumber}: ${sec.fullTextSummary}`)}
                            className="text-slate-400 hover:text-slate-600 cursor-pointer"
                            title="Copy Section"
                          >
                            {copiedId === sec.sectionNumber ? (
                              <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 mt-1 leading-relaxed text-[11px]">
                          {sec.fullTextSummary}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-gray-800 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedStatute(st)}
                    className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read Full Legislative Sections</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => onNavigate('disputes')}
                    className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Litigated Cases</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Precedents Section */}
      {(activeTab === 'precedents' || activeTab === 'all') && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#173F5F] dark:text-teal-400" />
              <span>Supreme Court Landmark Land Precedents</span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              {filteredPrecedents.length} Binding Judgments
            </span>
          </div>

          <div className="space-y-3">
            {filteredPrecedents.map((p) => (
              <div
                key={p.id}
                className={`p-5 rounded-xl border transition-all hover:shadow-md ${
                  isDarkMode
                    ? 'bg-[#111A23] border-[#293846]'
                    : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-teal-700 dark:text-teal-400">
                      {p.neutralCitation}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">
                      {p.status}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    Decided {p.dateOfJudgment}
                  </span>
                </div>

                <h3 className="mt-2 text-base font-bold text-slate-900 dark:text-white">
                  {p.title}
                </h3>
                <div className="text-xs text-slate-500 font-mono mt-0.5">
                  {p.court} • Bench: {p.bench}
                </div>

                {/* Ratio Decidendi Box */}
                <div className="mt-3 p-3 rounded-lg bg-teal-50/40 dark:bg-teal-950/20 border border-teal-200/60 dark:border-teal-900/60 text-xs leading-relaxed text-slate-700 dark:text-slate-300 font-sans">
                  <span className="font-bold text-teal-900 dark:text-teal-300 block mb-1">
                    BINDING RATIO DECIDENDI:
                  </span>
                  {p.keyRatioDecidendi}
                </div>

                {/* Statutory Sections tags */}
                <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                  {p.statutoryProvisions.map((sec, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-[#17232E] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-gray-800"
                    >
                      {sec}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-gray-800 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedPrecedent(p)}
                    className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Gavel className="w-3.5 h-3.5" />
                    <span>Inspect Precedent Dossier</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyCitation(p.id, `${p.title}, ${p.neutralCitation}`)}
                      className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
                    >
                      {copiedId === p.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>Copy Citation</span>
                    </button>
                    <button
                      onClick={() => onNavigate('disputes')}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#173F5F] hover:bg-[#20639B] text-white text-xs font-semibold cursor-pointer"
                    >
                      <span>Find Similar Dockets</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Statute Inspection Modal */}
      {selectedStatute && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div
            className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border shadow-2xl p-6 transition-colors ${
              isDarkMode
                ? 'bg-[#111A23] border-[#293846] text-[#F3F6F8]'
                : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-gray-800">
              <span className="font-mono text-xs font-bold text-teal-600">
                {selectedStatute.id} • Enacted {selectedStatute.enactedYear}
              </span>
              <button
                onClick={() => setSelectedStatute(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="text-lg font-bold mt-3 text-slate-900 dark:text-white">
              {selectedStatute.actTitle}
            </h2>
            <div className="text-xs text-slate-500 font-mono mt-0.5">
              {selectedStatute.citation}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              {selectedStatute.ministry}
            </div>

            <div className="mt-4 space-y-3">
              {selectedStatute.sections.map((sec, i) => (
                <div key={i} className="p-3 rounded-lg bg-slate-50 dark:bg-[#17232E] border border-slate-200 dark:border-gray-800">
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                    {sec.sectionNumber}: {sec.heading}
                  </h4>
                  <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-serif">
                    {sec.fullTextSummary}
                  </p>
                  {sec.statutoryFormula && (
                    <div className="mt-2 p-2 rounded bg-teal-50/60 dark:bg-teal-950/40 text-[11px] font-mono text-teal-800 dark:text-teal-300">
                      Formula: {sec.statutoryFormula}
                    </div>
                  )}
                  {sec.landmarkCases && sec.landmarkCases.length > 0 && (
                    <div className="mt-2 text-[10px] text-slate-500">
                      Landmark Cases: {sec.landmarkCases.join(' • ')}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-gray-800 flex justify-end">
              <button
                onClick={() => setSelectedStatute(null)}
                className="px-4 py-2 rounded-lg bg-[#173F5F] text-white text-xs font-semibold cursor-pointer"
              >
                Close Statute Reader
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Precedent Inspection Modal */}
      {selectedPrecedent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div
            className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border shadow-2xl p-6 transition-colors ${
              isDarkMode
                ? 'bg-[#111A23] border-[#293846] text-[#F3F6F8]'
                : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-gray-800">
              <span className="font-mono text-xs font-bold text-teal-600">
                {selectedPrecedent.neutralCitation}
              </span>
              <button
                onClick={() => setSelectedPrecedent(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="text-lg font-bold mt-3 text-slate-900 dark:text-white">
              {selectedPrecedent.title}
            </h2>
            <div className="text-xs text-slate-500 font-mono mt-0.5">
              {selectedPrecedent.court} • Decided: {selectedPrecedent.dateOfJudgment}
            </div>

            <div className="mt-3 p-3 rounded-lg bg-slate-50 dark:bg-[#17232E] border border-slate-200 dark:border-gray-800 text-xs">
              <span className="font-bold text-[10px] font-mono text-slate-400 uppercase block">
                BENCH CONSTITUTION
              </span>
              <span className="font-medium text-slate-800 dark:text-slate-200 mt-0.5 block">
                {selectedPrecedent.bench}
              </span>
            </div>

            <div className="mt-3">
              <span className="font-bold text-[10px] font-mono text-slate-400 uppercase block">
                RATIO DECIDENDI
              </span>
              <p className="mt-1 p-3 rounded-lg bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900 text-xs text-slate-700 dark:text-slate-200 leading-relaxed font-sans">
                {selectedPrecedent.keyRatioDecidendi}
              </p>
            </div>

            <div className="mt-3">
              <span className="font-bold text-[10px] font-mono text-slate-400 uppercase block">
                IMPACT ANALYSIS
              </span>
              <p className="mt-1 p-3 rounded-lg bg-slate-50 dark:bg-[#17232E] border border-slate-200 dark:border-gray-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                {selectedPrecedent.impactAnalysis}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block">Affected Parcels:</span>
                <strong className="text-slate-800 dark:text-slate-200">{selectedPrecedent.affectedParcelsEstimate.toLocaleString()} Parcels</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Monetary Value:</span>
                <strong className="text-rose-600 dark:text-rose-400">₹{selectedPrecedent.monetaryExposureCr} Cr</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Risk Category:</span>
                <strong className="text-amber-600 font-bold">{selectedPrecedent.riskCategory}</strong>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-gray-800 flex justify-end">
              <button
                onClick={() => setSelectedPrecedent(null)}
                className="px-4 py-2 rounded-lg bg-[#173F5F] text-white text-xs font-semibold cursor-pointer"
              >
                Close Precedent Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

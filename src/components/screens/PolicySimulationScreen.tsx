import React, { useState } from 'react';
import {
  FlaskConical,
  Play,
  RotateCcw,
  Download,
  Share2,
  ChevronRight,
  Sparkles,
  TrendingDown,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Sliders,
  FileSpreadsheet,
  Link2,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { DEFAULT_SIMULATION_RESULTS } from '../../data/mockData';
import { SimulationParams, ActiveScreen } from '../../types';

interface PolicySimulationScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  onAttestBlock: (title: string, details: string) => void;
  isDarkMode: boolean;
}

export const PolicySimulationScreen: React.FC<PolicySimulationScreenProps> = ({
  onNavigate,
  onAttestBlock,
  isDarkMode,
}) => {
  const [params, setParams] = useState<SimulationParams>({
    ruralMultiplier: 1.85,
    mandatorySolatium: 100,
    consentThreshold: 70,
    rrGrantLakhs: 5.5,
    agriProtectionCap: 15,
    geographicScope: 'Pune-PCMC Industrial Growth Corridor',
    affectedParcelsCount: 14820,
  });

  const [activeTab, setActiveTab] = useState<'statutory' | 'spatial' | 'fiscal'>('statutory');
  const [isSimulating, setIsSimulating] = useState(false);
  const [lastAttested, setLastAttested] = useState(false);

  // Dynamic calculations based on sliders
  const dynamicCostDelta = (
    18.4 +
    (params.ruralMultiplier - 1.85) * 22 +
    (params.mandatorySolatium - 100) * 0.18 +
    (params.rrGrantLakhs - 5.5) * 1.5
  ).toFixed(1);

  const dynamicFiscalCr = Math.round(
    2140 +
    (params.ruralMultiplier - 1.85) * 1800 +
    (params.mandatorySolatium - 100) * 24 +
    (params.rrGrantLakhs - 5.5) * 140
  );

  const dynamicDisputeDelta = (
    -42.6 +
    (params.consentThreshold - 70) * -0.6 -
    (params.ruralMultiplier - 1.85) * 12
  ).toFixed(1);

  const dynamicConsentVelocity = (
    8.4 +
    (params.consentThreshold - 70) * 0.15 -
    (params.ruralMultiplier - 1.85) * 1.2
  ).toFixed(1);

  const dynamicFeasibility = Math.min(
    96,
    Math.max(
      45,
      Math.round(
        78 -
        (Number(dynamicCostDelta) - 18.4) * 0.4 -
        (params.consentThreshold - 70) * 0.3
      )
    )
  );

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 900);
  };

  const handleAttestToBlockchain = () => {
    onAttestBlock(
      `Policy Simulation Output (SIM-2026-088 Multiplier ${params.ruralMultiplier}x)`,
      `Rural Multiplier: ${params.ruralMultiplier}x, Solatium: ${params.mandatorySolatium}%, Consent: ${params.consentThreshold}%, Feasibility: ${dynamicFeasibility}/100`
    );
    setLastAttested(true);
  };

  return (
    <div className="space-y-4 max-w-[1600px] mx-auto pb-12">
      {/* Top Breadcrumb & Header */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 font-medium">
          <span>Policy Lab</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span>Simulations</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            Run #{DEFAULT_SIMULATION_RESULTS.runId}
          </span>
        </div>

        <div className="mt-1 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#002945] dark:text-white">
              Policy Scenario Simulation Engine
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Model: RFCTLARR Act (2013) Sec 26 vs Market Value Indexation (v2.4 Engine)
            </p>
          </div>

          {/* Action Header Buttons */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <button
              onClick={() => {
                setParams({
                  ruralMultiplier: 1.5,
                  mandatorySolatium: 100,
                  consentThreshold: 80,
                  rrGrantLakhs: 5.0,
                  agriProtectionCap: 20,
                  geographicScope: 'High Industrial Growth Corridor',
                  affectedParcelsCount: 18400,
                });
              }}
              className={`px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                isDarkMode
                  ? 'bg-[#17232E] border-[#293846] text-gray-300 hover:bg-[#1f2e3d]'
                  : 'bg-white border-[#D9E0E6] text-gray-700 hover:bg-gray-50'
              }`}
            >
              Load Preset: Industrial
            </button>

            <button
              onClick={() => {
                setParams({
                  ruralMultiplier: 2.0,
                  mandatorySolatium: 100,
                  consentThreshold: 70,
                  rrGrantLakhs: 8.0,
                  agriProtectionCap: 10,
                  geographicScope: 'Pune-PCMC Corridor',
                  affectedParcelsCount: 14820,
                });
              }}
              className={`px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                isDarkMode
                  ? 'bg-[#17232E] border-[#293846] text-gray-300 hover:bg-[#1f2e3d]'
                  : 'bg-white border-[#D9E0E6] text-gray-700 hover:bg-gray-50'
              }`}
            >
              Compare Baseline
            </button>

            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg font-semibold bg-[#173F5F] hover:bg-[#20639B] text-white shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              <Play className={`w-3.5 h-3.5 fill-current ${isSimulating ? 'animate-spin' : ''}`} />
              <span>{isSimulating ? 'Computing 10k Monte Carlo...' : 'Execute Simulation'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Controls (4 cols) | Right Output & Chart (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Parameter Panel (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div
            className={`p-4 rounded-xl border text-xs transition-colors ${
              isDarkMode
                ? 'bg-[#111A23] border-[#293846]'
                : 'bg-white border-[#D9E0E6]'
            }`}
          >
            {/* Header & Tabs */}
            <div className="pb-3 border-b border-gray-100 dark:border-gray-800">
              <span className="text-[10px] uppercase font-bold text-gray-400 font-mono block">
                SIMULATION PARAMETERS
              </span>
              <div className="mt-2 flex items-center gap-1 bg-gray-100 dark:bg-[#17232E] p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('statutory')}
                  className={`flex-1 py-1 text-center font-medium rounded text-[11px] transition-colors ${
                    activeTab === 'statutory'
                      ? 'bg-white dark:bg-[#111A23] text-gray-900 dark:text-white shadow-xs'
                      : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}
                >
                  Statutory Multipliers
                </button>
                <button
                  onClick={() => setActiveTab('spatial')}
                  className={`flex-1 py-1 text-center font-medium rounded text-[11px] transition-colors ${
                    activeTab === 'spatial'
                      ? 'bg-white dark:bg-[#111A23] text-gray-900 dark:text-white shadow-xs'
                      : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}
                >
                  Spatial Constraints
                </button>
                <button
                  onClick={() => setActiveTab('fiscal')}
                  className={`flex-1 py-1 text-center font-medium rounded text-[11px] transition-colors ${
                    activeTab === 'fiscal'
                      ? 'bg-white dark:bg-[#111A23] text-gray-900 dark:text-white shadow-xs'
                      : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}
                >
                  Fiscal & Solatium
                </button>
              </div>
            </div>

            {/* Sliders Form */}
            <div className="mt-4 space-y-4">
              {/* Slider 1: Rural Multiplier Factor */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-gray-800 dark:text-gray-200">
                    Rural Multiplier Factor
                  </label>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
                    {params.ruralMultiplier.toFixed(2)}x
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Range [1.0x - 2.0x] applied on baseline circle rates under RFCTLARR First Schedule.
                </p>
                <input
                  type="range"
                  min="1.0"
                  max="2.0"
                  step="0.05"
                  value={params.ruralMultiplier}
                  onChange={(e) =>
                    setParams({ ...params, ruralMultiplier: parseFloat(e.target.value) })
                  }
                  className="w-full h-1.5 accent-[#173F5F] bg-gray-200 dark:bg-gray-700 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-gray-400">
                  <span>1.00x (Urban)</span>
                  <span>1.50x</span>
                  <span>2.00x (Deep Rural)</span>
                </div>
              </div>

              {/* Slider 2: Mandatory Solatium */}
              <div className="space-y-1.5 pt-2 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-gray-800 dark:text-gray-200">
                    Mandatory Solatium Percentage
                  </label>
                  <span className="font-mono font-bold text-[#20639B] dark:text-sky-400 px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800">
                    {params.mandatorySolatium}%
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Statutory solatium compensation over market value determination under Sec 30(1).
                </p>
                <input
                  type="range"
                  min="50"
                  max="150"
                  step="5"
                  value={params.mandatorySolatium}
                  onChange={(e) =>
                    setParams({ ...params, mandatorySolatium: parseInt(e.target.value) })
                  }
                  className="w-full h-1.5 accent-[#173F5F] bg-gray-200 dark:bg-gray-700 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-gray-400">
                  <span>50%</span>
                  <span>100% (Standard)</span>
                  <span>150%</span>
                </div>
              </div>

              {/* Slider 3: Consent Threshold */}
              <div className="space-y-1.5 pt-2 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-gray-800 dark:text-gray-200">
                    Consent Threshold (Private / PPP)
                  </label>
                  <span className="font-mono font-bold text-teal-600 dark:text-teal-400 px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800">
                    {params.consentThreshold}%
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Percentage of prior written consent required from land losers under Sec 2(2).
                </p>
                <input
                  type="range"
                  min="50"
                  max="90"
                  step="5"
                  value={params.consentThreshold}
                  onChange={(e) =>
                    setParams({ ...params, consentThreshold: parseInt(e.target.value) })
                  }
                  className="w-full h-1.5 accent-[#173F5F] bg-gray-200 dark:bg-gray-700 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-gray-400">
                  <span>50% (Expedited)</span>
                  <span>70% (PPP)</span>
                  <span>80% (Private)</span>
                </div>
              </div>

              {/* Slider 4: R&R Grant */}
              <div className="space-y-1.5 pt-2 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-gray-800 dark:text-gray-200">
                    Resettlement & Rehab (R&R) Grant
                  </label>
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800">
                    ₹ {params.rrGrantLakhs.toFixed(1)} Lakhs
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Lumpsum resettlement entitlement per displaced agricultural family.
                </p>
                <input
                  type="range"
                  min="2.0"
                  max="15.0"
                  step="0.5"
                  value={params.rrGrantLakhs}
                  onChange={(e) =>
                    setParams({ ...params, rrGrantLakhs: parseFloat(e.target.value) })
                  }
                  className="w-full h-1.5 accent-[#173F5F] bg-gray-200 dark:bg-gray-700 rounded-lg cursor-pointer"
                />
              </div>

              {/* Slider 5: High-Value Agri Protection Cap */}
              <div className="space-y-1.5 pt-2 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-gray-800 dark:text-gray-200">
                    Multi-Crop Agricultural Ceiling Cap
                  </label>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800">
                    {params.agriProtectionCap}% Cap
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Maximum allowable acquisition of irrigated multi-cropped agricultural land per taluka.
                </p>
                <input
                  type="range"
                  min="5"
                  max="35"
                  step="5"
                  value={params.agriProtectionCap}
                  onChange={(e) =>
                    setParams({ ...params, agriProtectionCap: parseInt(e.target.value) })
                  }
                  className="w-full h-1.5 accent-[#173F5F] bg-gray-200 dark:bg-gray-700 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Geographic Scope Box */}
            <div className="mt-4 p-3 rounded-lg bg-gray-50 dark:bg-[#17232E]/60 border border-gray-200 dark:border-gray-800 space-y-1.5">
              <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase font-mono block">
                GEOGRAPHIC SCOPE & REACH
              </span>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">Target Region:</span>
                <span className="font-semibold text-right text-gray-900 dark:text-white">{params.geographicScope}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">Affected Parcels:</span>
                <span className="font-mono font-bold text-teal-600 dark:text-teal-400">
                  {params.affectedParcelsCount.toLocaleString()} Identified
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Dashboard & Projection Chart (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Convergence Status Banner */}
          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
              isDarkMode
                ? 'bg-[#111A23] border-[#293846]'
                : 'bg-white border-[#D9E0E6]'
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900 dark:text-white">
                    Convergence Achieved (4.2s)
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    95% CI (10k Runs)
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Run #{DEFAULT_SIMULATION_RESULTS.runId} • Calibrated with 14,820 historical Haveli land compensation awards
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px]">
              <span className="text-gray-500 dark:text-gray-400">Status:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Valid Solution Matrix
              </span>
            </div>
          </div>

          {/* 4 Key Projection Bento Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Cost Delta */}
            <div
              className={`p-4 rounded-xl border ${
                isDarkMode
                  ? 'bg-[#111A23] border-[#293846]'
                  : 'bg-white border-[#D9E0E6]'
              }`}
            >
              <span className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 block font-mono">
                TOTAL ACQUISITION COST DELTA
              </span>
              <div className="mt-2 text-2xl font-bold font-sans text-rose-600 dark:text-rose-400 flex items-baseline gap-1">
                <span>+{dynamicCostDelta}%</span>
              </div>
              <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
                + ₹{dynamicFiscalCr.toLocaleString()} Cr fiscal impact
              </p>
            </div>

            {/* Card 2: Dispute Frequency */}
            <div
              className={`p-4 rounded-xl border ${
                isDarkMode
                  ? 'bg-[#111A23] border-[#293846]'
                  : 'bg-white border-[#D9E0E6]'
              }`}
            >
              <span className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 block font-mono">
                DISPUTE FREQUENCY (5-YR)
              </span>
              <div className="mt-2 text-2xl font-bold font-sans text-emerald-600 dark:text-emerald-400 flex items-baseline gap-1">
                <span>{dynamicDisputeDelta}%</span>
              </div>
              <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
                Litigation probability reduction
              </p>
            </div>

            {/* Card 3: Consent Velocity */}
            <div
              className={`p-4 rounded-xl border ${
                isDarkMode
                  ? 'bg-[#111A23] border-[#293846]'
                  : 'bg-white border-[#D9E0E6]'
              }`}
            >
              <span className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 block font-mono">
                CONSENT VELOCITY
              </span>
              <div className="mt-2 text-2xl font-bold font-sans text-teal-600 dark:text-teal-400 flex items-baseline gap-1">
                <span>{dynamicConsentVelocity} Mos</span>
              </div>
              <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
                Baseline: 14.2 Mos (-5.8 mos)
              </p>
            </div>

            {/* Card 4: Feasibility Score */}
            <div
              className={`p-4 rounded-xl border ${
                isDarkMode
                  ? 'bg-[#111A23] border-[#293846]'
                  : 'bg-white border-[#D9E0E6]'
              }`}
            >
              <span className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 block font-mono">
                POLICY FEASIBILITY SCORE
              </span>
              <div className="mt-2 text-2xl font-bold font-sans text-blue-600 dark:text-blue-400 flex items-baseline gap-1">
                <span>{dynamicFeasibility} / 100</span>
              </div>
              <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
                Mod-High Tradeoff Band
              </p>
            </div>
          </div>

          {/* Middle Visualizer: 5-Year Projected Cumulative Litigation Cases */}
          <div
            className={`p-5 rounded-xl border transition-colors ${
              isDarkMode
                ? 'bg-[#111A23] border-[#293846]'
                : 'bg-white border-[#D9E0E6]'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100 dark:border-gray-800">
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  5-Year Projected Cumulative Litigation Cases (x1,000)
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Comparison between Status Quo (RFCTLARR Baseline) and Proposed Scenario Model (v2.4)
                </p>
              </div>

              {/* Chart Legend */}
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-[#173F5F] inline-block" />
                  <span className="text-gray-600 dark:text-gray-300">Status Quo</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-[#2E7D32] inline-block" />
                  <span className="text-gray-600 dark:text-gray-300">Proposed (v2.4)</span>
                </div>
              </div>
            </div>

            {/* Custom SVG Bar Chart */}
            <div className="mt-6 h-56 w-full relative">
              <div className="h-full flex items-end justify-between gap-4 px-4 pb-6 pt-2">
                {DEFAULT_SIMULATION_RESULTS.fiveYearProjection.map((item, idx) => {
                  const statusQuoHeight = (item.statusQuo / 110) * 100;
                  // Dynamic proposed reduction based on slider
                  const proposedReductionFactor = Math.max(0.4, 1 + Number(dynamicDisputeDelta) / 100);
                  const dynamicProposed = idx === 0 ? item.proposed : Math.round(item.proposed * proposedReductionFactor);
                  const proposedHeight = (dynamicProposed / 110) * 100;

                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                      {/* Bars Pair */}
                      <div className="w-full max-w-[56px] flex items-end justify-center gap-1.5 h-full">
                        {/* Status Quo Bar */}
                        <div
                          style={{ height: `${statusQuoHeight}%` }}
                          className="w-1/2 bg-[#173F5F] hover:bg-[#20639B] rounded-t transition-all duration-300 relative group/bar"
                        >
                          <span className="opacity-0 group-hover/bar:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded text-[10px] font-mono bg-black text-white whitespace-nowrap z-20 transition-opacity">
                            {item.statusQuo}k
                          </span>
                        </div>

                        {/* Proposed Bar */}
                        <div
                          style={{ height: `${proposedHeight}%` }}
                          className="w-1/2 bg-[#2E7D32] hover:bg-[#388E3C] rounded-t transition-all duration-300 relative group/bar"
                        >
                          <span className="opacity-0 group-hover/bar:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded text-[10px] font-mono bg-black text-white whitespace-nowrap z-20 transition-opacity">
                            {dynamicProposed}k
                          </span>
                        </div>
                      </div>

                      {/* Year Label */}
                      <div className="mt-2 text-center">
                        <span className="text-[11px] font-mono text-gray-500 dark:text-gray-400 block whitespace-nowrap">
                          {item.year}
                        </span>
                        {item.year === '2029' && (
                          <span className="text-[9px] font-bold text-amber-600 dark:text-amber-400 block">
                            Inflection
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Baseline Axis */}
              <div className="absolute bottom-6 left-0 right-0 h-px bg-gray-200 dark:bg-gray-800" />
            </div>

            {/* Chart Summary Footnote Callouts */}
            <div className="mt-2 pt-3 border-t border-gray-100 dark:border-gray-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-mono font-bold text-[10px]">
                  +4,820
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  Estimated Litigation Avoided over 5-year pipeline
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 font-mono font-bold text-[10px]">
                  +5.8 Mos
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  Execution Acceleration vs statutory standard acquisition
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Spatial Risk Zones & Blockchain Attestation Action Bar */}
          <div
            className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs ${
              isDarkMode
                ? 'bg-[#111A23] border-[#293846]'
                : 'bg-white border-[#D9E0E6]'
            }`}
          >
            {/* Spatial Risk Zones */}
            <div className="flex items-center gap-3">
              <span className="text-gray-500 dark:text-gray-400 uppercase font-mono font-bold text-[10px]">
                SPATIAL IMPACT ZONES:
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  Zone A (Haveli): -64% Disputed Area
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  Zone B (Khed Corridor): -22% Disputed Area
                </span>
              </div>
            </div>

            {/* Attestation and Export Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleAttestToBlockchain}
                disabled={lastAttested}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-semibold transition-colors ${
                  lastAttested
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#173F5F] hover:bg-[#20639B] text-white'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{lastAttested ? '✓ Attested to Ledger' : 'Attest to Blockchain'}</span>
              </button>

              <button
                onClick={() => {
                  const content = `CABINET NOTE ON LAND REFORMS SIMULATION\nRun ID: SIM-2026-088\nModel: RFCTLARR Act 2013 Sec 26 vs Market Value Indexation\n\nKey Findings:\n- Total Acquisition Cost Delta: +${dynamicCostDelta}%\n- Dispute Frequency Reduction: ${dynamicDisputeDelta}%\n- Consent Velocity: ${dynamicConsentVelocity} Months\n- Feasibility Score: ${dynamicFeasibility}/100\n\nAttested via DoLR GovNet Node #IND-DL-09`;
                  const blob = new Blob([content], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `Cabinet_Note_SIM-2026-088.txt`;
                  a.click();
                }}
                className="flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Cabinet Note</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

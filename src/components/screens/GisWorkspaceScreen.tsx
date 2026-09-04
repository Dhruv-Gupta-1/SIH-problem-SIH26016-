import React, { useState } from 'react';
import {
  Layers,
  Ruler,
  Search,
  Columns2,
  Download,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Compass,
  Plus,
  Minus,
  Box,
  Maximize2,
  ChevronRight,
  ExternalLink,
  Play,
  RotateCcw,
  CheckCircle2,
  Calendar,
  Eye,
  Sliders,
  CloudRain,
  Droplets,
  Wind
} from 'lucide-react';
import { CADASTRAL_PARCELS } from '../../data/mockData';
import { CadastralParcel, ActiveScreen } from '../../types';
import { GoogleCadastreMap } from '../gis/GoogleCadastreMap';
import { LeafletCadastreMap } from '../gis/LeafletCadastreMap';

interface GisWorkspaceScreenProps {
  onNavigate: (screen: ActiveScreen) => void;
  onOpenDeedModal: (parcel: CadastralParcel) => void;
  isDarkMode: boolean;
}

export const GisWorkspaceScreen: React.FC<GisWorkspaceScreenProps> = ({
  onNavigate,
  onOpenDeedModal,
  isDarkMode,
}) => {
  const [selectedParcel, setSelectedParcel] = useState<CadastralParcel>(CADASTRAL_PARCELS[0]);
  const [selectedYear, setSelectedYear] = useState('2026');
  const [mapEngine, setMapEngine] = useState<'satellite' | 'google'>('satellite');
  const [showWeatherLayer, setShowWeatherLayer] = useState<boolean>(true);

  // Layer state
  const [layers, setLayers] = useState({
    cadastralParcels: true,
    cadastralOpacity: 90,
    lulcClassification: true,
    lulcOpacity: 65,
    disputeGlow: true,
    disputeRadius: 80,
    droneOrthomosaic: false,
    waterBuffers: false,
  });

  const activeLayersCount = [
    layers.cadastralParcels,
    layers.lulcClassification,
    layers.disputeGlow,
    layers.droneOrthomosaic,
    layers.waterBuffers,
  ].filter(Boolean).length;

  return (
    <div className="space-y-4 max-w-[1600px] mx-auto pb-10">
      {/* Top Breadcrumb & Title Bar */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 font-medium">
          <span>Land Data</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span>Maharashtra</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span>Pune Metropolitan Region</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            Haveli Taluka (Zone 4)
          </span>
        </div>

        <div className="mt-1 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#002945] dark:text-white">
              National Geospatial Land Records & Satellite Imagery Workspace
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              WGS-84 / UTM 43N
            </span>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <button
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                isDarkMode
                  ? 'bg-[#17232E] border-[#293846] text-teal-300'
                  : 'bg-white border-[#D9E0E6] text-teal-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Layers ({activeLayersCount} Active)</span>
            </button>

            <button
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                isDarkMode
                  ? 'bg-[#17232E] border-[#293846] text-gray-300 hover:bg-[#1f2e3d]'
                  : 'bg-white border-[#D9E0E6] text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Ruler className="w-3.5 h-3.5 text-gray-400" />
              <span>Measure</span>
            </button>

            <button
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                isDarkMode
                  ? 'bg-[#17232E] border-[#293846] text-gray-300 hover:bg-[#1f2e3d]'
                  : 'bg-white border-[#D9E0E6] text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-gray-400" />
              <span>Cadastral Query</span>
            </button>

            <button
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                isDarkMode
                  ? 'bg-[#17232E] border-[#293846] text-gray-300 hover:bg-[#1f2e3d]'
                  : 'bg-white border-[#D9E0E6] text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Columns2 className="w-3.5 h-3.5 text-gray-400" />
              <span>Split View</span>
            </button>

            <button
              onClick={() => {
                const blob = new Blob([JSON.stringify(selectedParcel, null, 2)], {
                  type: 'application/geo+json',
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${selectedParcel.plotNumber.replace(/\s+/g, '_')}_geojson.json`;
                a.click();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold bg-[#173F5F] hover:bg-[#20639B] text-white shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export GeoJSON</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main 3-Column Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column: Geographic Frame & Thematic Layers (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          {/* Geographic Frame Card */}
          <div
            className={`p-4 rounded-xl border text-xs transition-colors ${
              isDarkMode
                ? 'bg-[#111A23] border-[#293846]'
                : 'bg-white border-[#D9E0E6]'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
              <span className="font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 text-[11px]">
                GEOGRAPHIC FRAME
              </span>
              <span className="font-mono text-[10px] text-gray-400">CRS EPSG:32643</span>
            </div>

            <div className="mt-3 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">Administrative Unit:</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  Haveli / Wagholi
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 dark:text-gray-400">Conversion Filter:</span>
                <span className="px-2 py-0.5 rounded font-mono font-semibold text-[10px] bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  Agri → Industrial
                </span>
              </div>
            </div>
          </div>

          {/* Thematic Layers Stack */}
          <div
            className={`p-4 rounded-xl border text-xs transition-colors ${
              isDarkMode
                ? 'bg-[#111A23] border-[#293846]'
                : 'bg-white border-[#D9E0E6]'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
              <span className="font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 text-[11px]">
                THEMATIC LAYERS
              </span>
              <button
                onClick={() =>
                  setLayers({
                    cadastralParcels: true,
                    cadastralOpacity: 90,
                    lulcClassification: true,
                    lulcOpacity: 65,
                    disputeGlow: true,
                    disputeRadius: 80,
                    droneOrthomosaic: false,
                    waterBuffers: false,
                  })
                }
                className="text-[10px] font-semibold text-teal-600 dark:text-teal-400 hover:underline"
              >
                Reset Stack
              </button>
            </div>

            <div className="mt-3 space-y-4">
              {/* Layer 1 */}
              <div className="space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      checked={layers.cadastralParcels}
                      onChange={(e) =>
                        setLayers({ ...layers, cadastralParcels: e.target.checked })
                      }
                      className="mt-0.5 rounded text-teal-600 focus:ring-0"
                    />
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-xs bg-sky-500 inline-block" />
                        <span>Cadastral Parcels (RoR Linked)</span>
                      </div>
                      <span className="text-[10px] text-gray-400 block">
                        DoLR Survey Vectors v3.4
                      </span>
                    </div>
                  </div>
                </div>
                {layers.cadastralParcels && (
                  <div className="pl-6 flex items-center justify-between gap-2 text-[10px] text-gray-400">
                    <span>Stroke Opacity</span>
                    <input
                      type="range"
                      min="20"
                      max="100"
                      value={layers.cadastralOpacity}
                      onChange={(e) =>
                        setLayers({ ...layers, cadastralOpacity: Number(e.target.value) })
                      }
                      className="w-28 h-1 accent-teal-600"
                    />
                    <span className="font-mono">{layers.cadastralOpacity}%</span>
                  </div>
                )}
              </div>

              {/* Layer 2 */}
              <div className="space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      checked={layers.lulcClassification}
                      onChange={(e) =>
                        setLayers({ ...layers, lulcClassification: e.target.checked })
                      }
                      className="mt-0.5 rounded text-teal-600 focus:ring-0"
                    />
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-xs bg-amber-500 inline-block" />
                        <span>LULC Classification 2025</span>
                      </div>
                      <span className="text-[10px] text-gray-500 dark:text-gray-400 block">
                        ISRO Bhuvan High-Res
                      </span>
                    </div>
                  </div>
                </div>
                {layers.lulcClassification && (
                  <div className="pl-6 space-y-1.5">
                    <div className="flex items-center gap-2 text-[10px]">
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Agri Zone
                      </span>
                      <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        Built-Up
                      </span>
                      <span className="flex items-center gap-1 text-sky-600 dark:text-sky-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                        Riparian
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2 text-[10px] text-gray-500 dark:text-gray-400">
                      <span>Layer Opacity</span>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={layers.lulcOpacity}
                        onChange={(e) =>
                          setLayers({ ...layers, lulcOpacity: Number(e.target.value) })
                        }
                        className="w-28 h-1 accent-teal-600"
                      />
                      <span className="font-mono">{layers.lulcOpacity}%</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Layer 3 */}
              <div className="space-y-1.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      checked={layers.disputeGlow}
                      onChange={(e) =>
                        setLayers({ ...layers, disputeGlow: e.target.checked })
                      }
                      className="mt-0.5 rounded text-teal-600 focus:ring-0"
                    />
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-xs bg-rose-500 inline-block animate-pulse" />
                        <span>Dispute & Injunction Glow</span>
                      </div>
                      <span className="text-[10px] text-rose-500 font-medium block">
                        14 Active Lis Pendens
                      </span>
                    </div>
                  </div>
                </div>
                {layers.disputeGlow && (
                  <div className="pl-6 flex items-center justify-between gap-2 text-[10px] text-gray-500 dark:text-gray-400">
                    <span>Intensity Radius</span>
                    <input
                      type="range"
                      min="20"
                      max="100"
                      value={layers.disputeRadius}
                      onChange={(e) =>
                        setLayers({ ...layers, disputeRadius: Number(e.target.value) })
                      }
                      className="w-28 h-1 accent-rose-500"
                    />
                    <span className="font-mono">{layers.disputeRadius}%</span>
                  </div>
                )}
              </div>

              {/* Layer 4 */}
              <div className="flex items-center justify-between pt-1 border-t border-gray-100 dark:border-gray-800">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={layers.droneOrthomosaic}
                    onChange={(e) =>
                      setLayers({ ...layers, droneOrthomosaic: e.target.checked })
                    }
                    className="rounded text-teal-600 focus:ring-0"
                  />
                  <div>
                    <span className="font-medium text-gray-800 dark:text-gray-200 block">
                      Drone Orthomosaic 5cm
                    </span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">
                      Survey of India (Nov 2025)
                    </span>
                  </div>
                </label>
              </div>

              {/* Layer 5 */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={layers.waterBuffers}
                    onChange={(e) =>
                      setLayers({ ...layers, waterBuffers: e.target.checked })
                    }
                    className="rounded text-teal-600 focus:ring-0"
                  />
                  <div>
                    <span className="font-medium text-slate-100 block">
                      Wetland & Water Buffers
                    </span>
                    <span className="text-[10px] text-slate-300">
                      NGT 500m Mandated Buffer
                    </span>
                  </div>
                </label>
              </div>

              {/* Layer 6: Agro-Climatic & Monsoon Weather Layer */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showWeatherLayer}
                    onChange={(e) => setShowWeatherLayer(e.target.checked)}
                    className="rounded text-sky-500 focus:ring-0"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <CloudRain className="w-3.5 h-3.5 text-sky-400" />
                      <span className="font-semibold text-sky-300 block">
                        Weather & Monsoon Isohyet
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-300">
                      IMD 742mm Rainfall & Riparian Risk
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Live Weather Telemetry Snippet */}
            <div className="mt-3 p-2.5 rounded-lg bg-sky-950/40 border border-sky-800/50 text-[11px] space-y-1 font-sans">
              <div className="flex items-center justify-between text-sky-300 font-semibold font-mono text-[10px]">
                <span>IMD PUNE METEOROLOGICAL</span>
                <span className="text-emerald-400">● Live 28.4°C</span>
              </div>
              <div className="flex items-center justify-between text-slate-200">
                <span className="text-slate-300">Monsoon Prcp:</span>
                <span className="font-mono text-sky-200">742 mm (+4% Nml)</span>
              </div>
              <div className="flex items-center justify-between text-slate-200">
                <span className="text-slate-300">Soil Moisture:</span>
                <span className="font-mono text-emerald-300">62% (Optimal)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column: Interactive GIS Map Viewport (6 cols) */}
        <div className="lg:col-span-6 relative rounded-xl overflow-hidden border border-gray-800 bg-[#050B12] shadow-xl min-h-[640px] flex flex-col justify-between">
          {/* Top Map Engine & Layer Selector Bar */}
          <div className="flex items-center justify-between px-3 py-2 bg-slate-900/95 border-b border-slate-800 z-10 text-xs">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setMapEngine('satellite')}
                className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  mapEngine === 'satellite'
                    ? 'bg-teal-600 text-white shadow-sm ring-1 ring-teal-400/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span>🛰️ Live Satellite GIS</span>
                <span className="text-[10px] px-1 py-0.2 rounded bg-emerald-500/30 text-emerald-300 font-mono font-bold">
                  Live
                </span>
              </button>
              <button
                onClick={() => setMapEngine('google')}
                className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  mapEngine === 'google'
                    ? 'bg-teal-600 text-white shadow-sm ring-1 ring-teal-400/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span>🗺️ Google Maps Platform</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowWeatherLayer(!showWeatherLayer)}
                className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 border transition-colors ${
                  showWeatherLayer
                    ? 'bg-sky-500/20 border-sky-400/60 text-sky-200'
                    : 'border-slate-700 text-slate-400 hover:text-white'
                }`}
                title="Toggle Monsoon & Weather Overlay on Map"
              >
                <CloudRain className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden sm:inline">Weather Overlay</span>
              </button>
            </div>
          </div>

          {/* Active Map Engine Component */}
          {mapEngine === 'satellite' ? (
            <LeafletCadastreMap
              parcels={CADASTRAL_PARCELS}
              selectedParcel={selectedParcel}
              onSelectParcel={setSelectedParcel}
              onOpenDeedModal={onOpenDeedModal}
              layers={layers}
              isDarkMode={isDarkMode}
              showWeatherLayer={showWeatherLayer}
              onToggleWeatherLayer={() => setShowWeatherLayer(!showWeatherLayer)}
            />
          ) : (
            <GoogleCadastreMap
              parcels={CADASTRAL_PARCELS}
              selectedParcel={selectedParcel}
              onSelectParcel={setSelectedParcel}
              onOpenDeedModal={onOpenDeedModal}
              layers={layers}
              isDarkMode={isDarkMode}
            />
          )}

          {/* Bottom Historical Transition Timeline & Satellite Health Bar */}
          <div className="z-20 p-3 bg-black/85 backdrop-blur-md border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-white text-xs">
            {/* Timeline Selector matching Image 5 */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
              <span className="text-[10px] uppercase font-bold text-amber-400 font-mono flex items-center gap-1 shrink-0">
                <Calendar className="w-3.5 h-3.5" />
                HISTORICAL TRANSITION TIMELINE
              </span>

              <div className="flex items-center gap-1 bg-white/10 p-1 rounded-lg">
                {[
                  { year: '2015', label: '2015 [Pre-Periurban]' },
                  { year: '2018', label: '2018 [Ring Road Dev]' },
                  { year: '2022', label: '2022 [Zoning Masterplan]' },
                  { year: '2026', label: '2026 [Current Live Cadastre]' },
                ].map((item) => (
                  <button
                    key={item.year}
                    onClick={() => setSelectedYear(item.year)}
                    className={`px-2 py-1 rounded text-[11px] font-mono transition-colors ${
                      selectedYear === item.year
                        ? 'bg-teal-500 text-white font-bold shadow-xs'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div className="flex items-center gap-4 text-[11px] font-mono shrink-0">
              <div>
                <span className="text-gray-400">Urban Sprawl Rate: </span>
                <span className="text-emerald-400 font-bold">+28.4%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-teal-300">Sentinel-2 MSI (Cloud: 0.8%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Selected Cadastral Parcel Inspector (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div
            className={`p-4 rounded-xl border text-xs transition-colors shadow-sm ${
              isDarkMode
                ? 'bg-[#111A23] border-[#293846]'
                : 'bg-white border-[#D9E0E6]'
            }`}
          >
            {/* Parcel Header */}
            <div className="pb-3 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-500 dark:text-gray-400 font-mono block">
                  SELECTED CADASTRAL PARCEL
                </span>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  {selectedParcel.plotNumber}
                </h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  {selectedParcel.mauje}, {selectedParcel.taluka}, {selectedParcel.district}
                </p>
              </div>
            </div>

            {/* Verified Provenance Integrity Card */}
            <div className="mt-3 p-2.5 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80">
              <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Verified Provenance Integrity</span>
              </div>
              <p className="mt-1 text-[11px] text-gray-600 dark:text-gray-300 leading-snug">
                Immutably anchored on Institutional Rail {selectedParcel.provenance.anchorNode} with cryptographic boundary validation.
              </p>
              <div className="mt-2 pt-2 border-t border-emerald-200/60 dark:border-emerald-800/60 space-y-1 font-mono text-[10px]">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Block Index:</span>
                  <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                    #{selectedParcel.provenance.blockIndex.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">State Ledger Hash:</span>
                  <span className="truncate max-w-[130px] text-gray-700 dark:text-gray-300">
                    {selectedParcel.provenance.stateLedgerHash.slice(0, 10)}...{selectedParcel.provenance.stateLedgerHash.slice(-6)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Timestamp:</span>
                  <span>{selectedParcel.provenance.timestamp}</span>
                </div>
              </div>
            </div>

            {/* Encumbrance Notice */}
            {selectedParcel.encumbrance.hasActiveEncumbrance ? (
              <div className="mt-3 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-rose-800 dark:text-rose-300">
                    <AlertTriangle className="w-4 h-4" />
                    <span>ACTIVE ENCUMBRANCE</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-600 text-white font-mono">
                    {selectedParcel.encumbrance.level}
                  </span>
                </div>
                <div className="mt-1.5 font-semibold text-gray-900 dark:text-white">
                  {selectedParcel.encumbrance.suitType}
                </div>
                <p className="mt-1 text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed">
                  {selectedParcel.encumbrance.suitNumber} at {selectedParcel.encumbrance.court}. {selectedParcel.encumbrance.summary}
                </p>
                <div className="mt-2 pt-2 border-t border-rose-200/60 dark:border-rose-800/60 flex items-center justify-between text-[11px]">
                  <span>Next Hearing: <strong>{selectedParcel.encumbrance.nextHearing}</strong></span>
                  <button
                    onClick={() => onOpenDeedModal(selectedParcel)}
                    className="font-bold text-rose-700 dark:text-rose-400 hover:underline flex items-center gap-0.5"
                  >
                    <span>View Stay Order</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-3 p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span className="font-semibold">Unencumbered Clear Title</span>
              </div>
            )}

            {/* RoR 7/12 Extract Snapshot */}
            <div className="mt-3 p-3 rounded-lg bg-gray-50 dark:bg-[#17232E]/60 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between pb-1.5 border-b border-gray-200 dark:border-gray-800">
                <span className="font-bold text-[11px] text-gray-900 dark:text-white">RoR 7/12 EXTRACT SNAPSHOT</span>
                <span className="text-[10px] font-mono text-gray-500 dark:text-gray-400">
                  Khatiyan No. {selectedParcel.khatiyanNo}
                </span>
              </div>

              <div className="mt-2 space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Registered Area:</span>
                  <strong className="font-semibold text-gray-900 dark:text-white">
                    {selectedParcel.registeredAreaHectares.toFixed(2)} Hectares ({selectedParcel.registeredAreaAcres} Acres)
                  </strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Land Classification:</span>
                  <span className="font-medium text-right text-gray-800 dark:text-gray-200">{selectedParcel.landClassification}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Primary Title Holder:</span>
                  <strong className="font-semibold truncate max-w-[140px] text-gray-900 dark:text-white">
                    {selectedParcel.primaryTitleHolder}
                  </strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Govt Assessment Dues:</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                    ₹ {selectedParcel.govtDues.toLocaleString()} (Settled)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Mutation (Ferfar) Entry:</span>
                  <span className="font-mono text-gray-800 dark:text-gray-200">{selectedParcel.mutationEntry} ({selectedParcel.mutationYear})</span>
                </div>
              </div>
            </div>

            {/* Spatial Satellite Metrics */}
            <div className="mt-3 p-3 rounded-lg bg-gray-50 dark:bg-[#17232E]/60 border border-gray-200 dark:border-gray-800">
              <div className="text-[10px] uppercase font-bold text-slate-400 font-mono pb-1 border-b border-gray-200 dark:border-gray-800">
                SPATIAL SATELLITE METRICS
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-300 block text-[10px]">NDVI Vegetation:</span>
                  <strong className="text-emerald-500 dark:text-emerald-400 font-mono">
                    {selectedParcel.metrics.ndviVegetation} ({selectedParcel.metrics.ndviStatus})
                  </strong>
                </div>
                <div>
                  <span className="text-slate-300 block text-[10px]">Built Surface:</span>
                  <strong className="font-mono text-slate-100">{selectedParcel.metrics.builtSurfaceCover}% Cover</strong>
                </div>
                <div>
                  <span className="text-slate-300 block text-[10px]">Road Frontage:</span>
                  <strong className="font-mono text-slate-100">{selectedParcel.metrics.roadFrontageMeters} Meters</strong>
                </div>
                <div>
                  <span className="text-slate-300 block text-[10px]">Flood Risk Zone:</span>
                  <strong className="font-mono text-slate-100">{selectedParcel.metrics.floodRiskZone}</strong>
                </div>
              </div>
            </div>

            {/* Agro-Climatic & Weather Exposure Card */}
            <div className="mt-3 p-3 rounded-lg bg-sky-950/20 border border-sky-800/40">
              <div className="flex items-center justify-between pb-1 border-b border-sky-800/30">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-sky-300 uppercase font-mono">
                  <CloudRain className="w-3 h-3 text-sky-400" />
                  <span>AGRO-CLIMATIC & WEATHER EXPOSURE</span>
                </div>
                <span className="text-[9px] font-mono text-emerald-300 font-bold">IMD Station</span>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-slate-300 block text-[10px]">Monsoon Isohyet:</span>
                  <strong className="text-sky-200 font-mono">742 mm / Kharif</strong>
                </div>
                <div>
                  <span className="text-slate-300 block text-[10px]">Groundwater Table:</span>
                  <strong className="font-mono text-slate-100">8.4m bgl (Safe)</strong>
                </div>
                <div>
                  <span className="text-slate-300 block text-[10px]">Flood Inundation:</span>
                  <strong className="font-mono text-emerald-300">Protected (Zone C)</strong>
                </div>
                <div>
                  <span className="text-slate-300 block text-[10px]">Soil Moisture Index:</span>
                  <strong className="font-mono text-slate-100">62% (Humid-Arable)</strong>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 space-y-2">
              <button
                onClick={() => onNavigate('policy-sim')}
                className="w-full py-2 px-3 rounded-lg text-xs font-semibold bg-[#173F5F] hover:bg-[#20639B] text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Scenario on Parcel</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onOpenDeedModal(selectedParcel)}
                  className="py-1.5 px-2 rounded-lg text-xs font-medium border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                >
                  View Full Legal Deed
                </button>
                <button
                  onClick={() => {
                    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(selectedParcel, null, 2));
                    const downloadAnchor = document.createElement('a');
                    downloadAnchor.setAttribute('href', dataStr);
                    downloadAnchor.setAttribute('download', `metadata_${selectedParcel.id}.json`);
                    document.body.appendChild(downloadAnchor);
                    downloadAnchor.click();
                    downloadAnchor.remove();
                  }}
                  className="py-1.5 px-2 rounded-lg text-xs font-medium border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                >
                  Export Metadata
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

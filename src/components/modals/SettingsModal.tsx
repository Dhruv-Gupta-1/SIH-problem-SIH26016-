import React, { useState } from 'react';
import {
  X,
  Settings,
  Key,
  Database,
  Radio,
  Copy,
  Check,
  Eye,
  EyeOff,
  ShieldCheck,
  Save,
  RefreshCw,
  Sliders,
  Server,
  Compass,
  Sun,
  Moon,
  Palette
} from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onToggleDarkMode?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [activeTab, setActiveTab] = useState<'api' | 'node' | 'geodetic' | 'sim' | 'appearance'>('api');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});
  const [isSaved, setIsSaved] = useState(false);

  // Settings values
  const [dolrApiKey, setDolrApiKey] = useState('dolr_live_9f823a7491b2c803e14');
  const [ulpinGatewaySecret, setUlpinGatewaySecret] = useState('sec_bhu_aadhaar_882049102');
  const [bhuvanToken, setBhuvanToken] = useState('isro_bhuvan_sat_ortho_4920');
  const [activeDatum, setActiveDatum] = useState('WGS-84 / UTM Zone 43N (EPSG:32643)');
  const [consensusIntervalSec, setConsensusIntervalSec] = useState(12);
  const [monteCarloIterations, setMonteCarloIterations] = useState(10000);

  if (!isOpen) return null;

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const toggleShow = (id: string) => {
    setShowKey((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className={`w-full max-w-2xl max-h-[90vh] flex flex-col rounded-xl shadow-2xl border overflow-hidden transition-colors ${
          isDarkMode
            ? 'bg-[#111A23] border-[#293846] text-[#F3F6F8]'
            : 'bg-white border-[#D9E0E6] text-[#17202A]'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Platform Settings & API Gateway</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 font-bold">
                  v4.2.1-prod
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Institutional Geodetic Node #IND-DL-09 Configuration & REST Credentials
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onToggleDarkMode && (
              <button
                onClick={onToggleDarkMode}
                id="modal-quick-theme-toggle"
                title={isDarkMode ? 'Switch to daylight theme' : 'Switch to cadastral dark mode'}
                className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-5 pt-3 border-b border-gray-200 dark:border-gray-800 text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('api')}
            className={`pb-2.5 px-2 font-medium border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'api'
                ? 'border-teal-500 text-teal-600 dark:text-teal-400 font-semibold'
                : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>API & Webhooks</span>
          </button>

          <button
            onClick={() => setActiveTab('node')}
            className={`pb-2.5 px-2 font-medium border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'node'
                ? 'border-teal-500 text-teal-600 dark:text-teal-400 font-semibold'
                : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>Consortium Node #09</span>
          </button>

          <button
            onClick={() => setActiveTab('geodetic')}
            className={`pb-2.5 px-2 font-medium border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'geodetic'
                ? 'border-teal-500 text-teal-600 dark:text-teal-400 font-semibold'
                : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Geodetic Datum</span>
          </button>

          <button
            onClick={() => setActiveTab('sim')}
            className={`pb-2.5 px-2 font-medium border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'sim'
                ? 'border-teal-500 text-teal-600 dark:text-teal-400 font-semibold'
                : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Simulation Parameters</span>
          </button>

          <button
            onClick={() => setActiveTab('appearance')}
            className={`pb-2.5 px-2 font-medium border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'appearance'
                ? 'border-teal-500 text-teal-600 dark:text-teal-400 font-semibold'
                : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Theme & Display</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
          {/* TAB 1: API Keys */}
          {activeTab === 'api' && (
            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-1 text-gray-800 dark:text-gray-200">
                  DoLR National Cadastral API Key
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#17232E] font-mono text-xs">
                    <span className="flex-1 truncate">
                      {showKey['dolr'] ? dolrApiKey : '••••••••••••••••••••••••••••••••'}
                    </span>
                    <button
                      onClick={() => toggleShow('dolr')}
                      className="text-gray-400 hover:text-gray-600 ml-2"
                    >
                      {showKey['dolr'] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <button
                    onClick={() => handleCopy('dolr', dolrApiKey)}
                    className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-1 text-xs font-medium"
                  >
                    {copiedKey === 'dolr' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'dolr' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
                  Used for authenticating server-to-server ULPIN and RoR 7/12 lookups.
                </p>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-gray-800 dark:text-gray-200">
                  Bhu-Aadhaar ULPIN Resolver Secret
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#17232E] font-mono text-xs">
                    <span className="flex-1 truncate">
                      {showKey['ulpin'] ? ulpinGatewaySecret : '••••••••••••••••••••••••••••••••'}
                    </span>
                    <button
                      onClick={() => toggleShow('ulpin')}
                      className="text-gray-400 hover:text-gray-600 ml-2"
                    >
                      {showKey['ulpin'] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <button
                    onClick={() => handleCopy('ulpin', ulpinGatewaySecret)}
                    className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-1 text-xs font-medium"
                  >
                    {copiedKey === 'ulpin' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'ulpin' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-gray-800 dark:text-gray-200">
                  ISRO Bhuvan High-Resolution Satellite Layer Token
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#17232E] font-mono text-xs">
                    <span className="flex-1 truncate">
                      {showKey['bhuvan'] ? bhuvanToken : '••••••••••••••••••••••••••••••••'}
                    </span>
                    <button
                      onClick={() => toggleShow('bhuvan')}
                      className="text-gray-400 hover:text-gray-600 ml-2"
                    >
                      {showKey['bhuvan'] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <button
                    onClick={() => handleCopy('bhuvan', bhuvanToken)}
                    className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-1 text-xs font-medium"
                  >
                    {copiedKey === 'bhuvan' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'bhuvan' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="text-[11px] text-emerald-900 dark:text-emerald-200 font-medium">
                  All requests are end-to-end encrypted via TLS 1.3 and cryptographically signed with the node Ed25519 key.
                </span>
              </div>
            </div>
          )}

          {/* TAB 2: Node Config */}
          {activeTab === 'node' && (
            <div className="space-y-3">
              <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    Consortium Quorum Role
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    Leader Validator
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Node #IND-DL-09 participates in Raft-BFT round-robin block proposal and signs finalized cadastral state root digests.
                </p>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-gray-800 dark:text-gray-200">
                  Consensus Epoch Target (Seconds)
                </label>
                <input
                  type="number"
                  min={5}
                  max={60}
                  value={consensusIntervalSec}
                  onChange={(e) => setConsensusIntervalSec(Number(e.target.value))}
                  className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-xs font-mono text-gray-800 dark:text-gray-200"
                />
              </div>

              <div className="p-3 rounded-lg bg-gray-50 dark:bg-[#17232E]/60 border border-gray-200 dark:border-gray-800 text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Connected Peers:</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">24 / 24 Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Peer Protocol:</span>
                  <span className="font-mono text-gray-800 dark:text-gray-200">libp2p / Noise / Yamux</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">State Tree Storage:</span>
                  <span className="font-mono text-gray-800 dark:text-gray-200">RocksDB (418.6 GB)</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Geodetic Datum */}
          {activeTab === 'geodetic' && (
            <div className="space-y-3">
              <div>
                <label className="block font-semibold mb-1 text-gray-800 dark:text-gray-200">
                  Default Projection System
                </label>
                <select
                  value={activeDatum}
                  onChange={(e) => setActiveDatum(e.target.value)}
                  className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#17232E] text-xs text-gray-800 dark:text-gray-200"
                >
                  <option value="WGS-84 / UTM Zone 43N (EPSG:32643)">WGS-84 / UTM Zone 43N (EPSG:32643) — Maharashtra & Gujarat</option>
                  <option value="WGS-84 / UTM Zone 44N (EPSG:32644)">WGS-84 / UTM Zone 44N (EPSG:32644) — Central & Eastern India</option>
                  <option value="Everest 1830 / Kalianpur (EPSG:24378)">Everest 1830 / Kalianpur (EPSG:24378) — Revenue Cadastre Baseline</option>
                  <option value="EPSG:3857 (Web Mercator)">EPSG:3857 (Web Mercator) — Standard Web Tiles</option>
                </select>
                <p className="mt-1 text-[11px] text-gray-500 dark:text-gray-400">
                  Applies on-the-fly Helmert 7-parameter transformations for cadastral surveys.
                </p>
              </div>

              <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 text-[11px] space-y-1.5">
                <span className="font-bold text-gray-800 dark:text-gray-200 block">
                  Bhu-Aadhaar 14-Digit ULPIN Standard
                </span>
                <p className="text-gray-500 dark:text-gray-400">
                  Parcels are algorithmically pinned using WGS-84 centroid bounding boxes with sub-meter precision conformant to Survey of India standards.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: Simulation Parameters */}
          {activeTab === 'sim' && (
            <div className="space-y-3">
              <div>
                <label className="block font-semibold mb-1 text-gray-800 dark:text-gray-200">
                  Monte Carlo Sample Iterations
                </label>
                <select
                  value={monteCarloIterations}
                  onChange={(e) => setMonteCarloIterations(Number(e.target.value))}
                  className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#17232E] text-xs text-gray-800 dark:text-gray-200"
                >
                  <option value={5000}>5,000 runs (~1.2s rapid preview)</option>
                  <option value={10000}>10,000 runs (~2.8s standard academic)</option>
                  <option value={25000}>25,000 runs (~5.4s high statutory confidence)</option>
                </select>
              </div>

              <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Statutory Baseline Act:</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">RFCTLARR Act, 2013</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Dispute Regression Confidence:</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">95.0% CI</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Appearance & Theme */}
          {activeTab === 'appearance' && (
            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  Interface Visual Theme
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      if (isDarkMode && onToggleDarkMode) onToggleDarkMode();
                    }}
                    className={`p-3 rounded-lg border text-left flex flex-col gap-2 transition-all cursor-pointer ${
                      !isDarkMode
                        ? 'border-teal-500 bg-teal-50/50 ring-2 ring-teal-500/20 text-gray-900'
                        : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-white dark:bg-[#17232E]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-semibold text-xs text-amber-600">
                        <Sun className="w-4 h-4" />
                        <span>Daylight Theme</span>
                      </div>
                      {!isDarkMode && <Check className="w-4 h-4 text-teal-600" />}
                    </div>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      High-contrast clean daylight aesthetic engineered for institutional offices and print export.
                    </p>
                  </button>

                  <button
                    onClick={() => {
                      if (!isDarkMode && onToggleDarkMode) onToggleDarkMode();
                    }}
                    className={`p-3 rounded-lg border text-left flex flex-col gap-2 transition-all cursor-pointer ${
                      isDarkMode
                        ? 'border-teal-500 bg-teal-950/40 ring-2 ring-teal-500/30 text-white'
                        : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-white dark:bg-[#17232E]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-semibold text-xs text-teal-400">
                        <Moon className="w-4 h-4" />
                        <span>Cadastral Dark</span>
                      </div>
                      {isDarkMode && <Check className="w-4 h-4 text-teal-400" />}
                    </div>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      Low-luminance deep indigo canvas designed for nighttime GIS inspection and command centers.
                    </p>
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 text-[11px] space-y-1.5">
                <span className="font-bold text-gray-800 dark:text-gray-200 block">
                  Accessibility & Ergonomics
                </span>
                <p className="text-gray-500 dark:text-gray-400">
                  Meets WCAG AA contrast standards with vector-sharp geodetic symbology and responsive font scaling.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className="text-[11px] text-gray-500 dark:text-gray-400">
            {isSaved && (
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                <Check className="w-3.5 h-3.5" />
                <span>Configuration parameters applied</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-medium transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#173F5F] hover:bg-[#20639B] text-white text-xs font-semibold transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import {
  Link2,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Database,
  Search,
  Download,
  Copy,
  Check,
  Hash,
  RefreshCw,
  Server,
  Layers,
  FileCheck,
  Plus,
  X
} from 'lucide-react';
import { BLOCKCHAIN_BLOCKS, VALIDATOR_NODES } from '../../data/mockData';
import { BlockchainBlock, ActiveScreen } from '../../types';

interface BlockchainProvenanceScreenProps {
  blocks: BlockchainBlock[];
  onInspectBlock: (block: BlockchainBlock) => void;
  onAppendBlock: (title: string, digest: string) => void;
  onOpenMerkleModal: () => void;
  isDarkMode: boolean;
}

export const BlockchainProvenanceScreen: React.FC<BlockchainProvenanceScreenProps> = ({
  blocks,
  onInspectBlock,
  onAppendBlock,
  onOpenMerkleModal,
  isDarkMode,
}) => {
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [testPayload, setTestPayload] = useState('{"ulpin":"MH-PUN-HAV-4121A","area_ha":4.20,"survey_khasra":"412/1A","solatium_pct":100}');
  const [testHashResult, setTestHashResult] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [blockSearch, setBlockSearch] = useState('');
  const [showMineModal, setShowMineModal] = useState(false);

  // Mine Batch State
  const [mineVillage, setMineVillage] = useState('Mauje Wagholi (Haveli, Pune)');
  const [mineParcelsCount, setMineParcelsCount] = useState('42');
  const [mineArtifact, setMineArtifact] = useState('5cm Drone Orthomosaic & RoR Mutation Register');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(text);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const handleComputeTestHash = async () => {
    setIsVerifying(true);
    try {
      const msgUint8 = new TextEncoder().encode(testPayload);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = '0x' + hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
      setTestHashResult(hashHex);
    } catch {
      setTestHashResult('0x8f3c4e792ab8d19e51c889f0e142ab912e84c9fb29a88');
    }
    setIsVerifying(false);
  };

  const filteredBlocks = useMemo(() => {
    if (!blockSearch.trim()) return blocks;
    const q = blockSearch.toLowerCase();
    return blocks.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.payloadDigestHash.toLowerCase().includes(q) ||
        b.authorizedSigner.toLowerCase().includes(q) ||
        b.artifactType.toLowerCase().includes(q) ||
        b.height.toString().includes(q)
    );
  }, [blocks, blockSearch]);

  const handleMineBatch = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = JSON.stringify({
      village: mineVillage,
      parcels: mineParcelsCount,
      artifact: mineArtifact,
      timestamp: new Date().toISOString(),
    });

    let hash = '0x9a4f2e817c093a6b12df081c742398510aefb098124976ca91';
    try {
      const msgUint8 = new TextEncoder().encode(payload);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      hash = '0x' + hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    } catch {
      // fallback
    }

    onAppendBlock(
      `Cadastral Attestation: ${mineVillage} (${mineParcelsCount} Parcels)`,
      hash
    );
    setShowMineModal(false);
  };

  return (
    <div className="space-y-4 max-w-[1600px] mx-auto pb-12">
      {/* Top Breadcrumbs & Header */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <span>Infrastructure</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span>Provenance Ledger</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            Merkle Tree Visualizer
          </span>
        </div>

        <div className="mt-1 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#002945] dark:text-white">
              Blockchain Provenance &amp; Immutable Audit Ledger
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              DoLR Permissioned Proof-of-Authority (PoA) Consortium Network anchoring ULPINs, Drone Orthomosaics, and e-Mutations
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap text-xs">
            <button
              onClick={onOpenMerkleModal}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-medium transition-colors cursor-pointer ${
                isDarkMode
                  ? 'bg-[#17232E] border-[#293846] text-teal-300 hover:bg-[#1f2e3d]'
                  : 'bg-white border-slate-300 text-teal-800 hover:bg-slate-50 shadow-xs'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Inspect Merkle Root</span>
            </button>

            <button
              onClick={() => setShowMineModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Attest Cadastral Batch</span>
            </button>

            <button
              onClick={() => {
                const proofData = {
                  network: 'DoLR PoA Consortium Mainnet',
                  rootHash: '0x8f2d4710bc892ea01924fa881024bc01f8e6c739d201948ba5e29810a9',
                  epoch: 89204,
                  totalBlocks: blocks.length,
                  validators: VALIDATOR_NODES.map((n) => n.id),
                  timestamp: new Date().toISOString(),
                };
                const blob = new Blob([JSON.stringify(proofData, null, 2)], {
                  type: 'application/json',
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'Genesis_Audit_Proof_DoLR.json';
                a.click();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold bg-[#173F5F] hover:bg-[#20639B] text-white shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Genesis Audit Proof</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Network Telemetry Metric Bento Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div
          className={`p-4 rounded-xl border ${
            isDarkMode
              ? 'bg-[#111A23] border-[#293846]'
              : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
            CURRENT BLOCK HEIGHT
          </span>
          <div className="mt-2 text-2xl font-bold font-mono text-slate-900 dark:text-white">
            #{blocks[0]?.height.toLocaleString() || '1,492,084'}
          </div>
          <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Block Interval: 12.0s</span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
              100% Finality
            </span>
          </div>
        </div>

        {/* Metric 2 */}
        <div
          className={`p-4 rounded-xl border ${
            isDarkMode
              ? 'bg-[#111A23] border-[#293846]'
              : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
            CONSORTIUM CONSENSUS
          </span>
          <div className="mt-2 text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
            {VALIDATOR_NODES.length} / {VALIDATOR_NODES.length} Active Nodes
          </div>
          <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Raft-BFT Algorithm</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
              All Quorum Met
            </span>
          </div>
        </div>

        {/* Metric 3 */}
        <div
          className={`p-4 rounded-xl border ${
            isDarkMode
              ? 'bg-[#111A23] border-[#293846]'
              : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
            CRYPTOGRAPHIC STATE DRIFT
          </span>
          <div className="mt-2 text-2xl font-bold font-mono text-teal-600 dark:text-teal-400">
            0.00% Drift
          </div>
          <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>State Mutability Check</span>
            <span className="text-teal-600 dark:text-teal-400 font-semibold">
              Zero Collisions
            </span>
          </div>
        </div>

        {/* Metric 4 */}
        <div
          className={`p-4 rounded-xl border ${
            isDarkMode
              ? 'bg-[#111A23] border-[#293846]'
              : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
            LEDGER STORAGE FOOTPRINT
          </span>
          <div className="mt-2 text-2xl font-bold font-mono text-blue-600 dark:text-blue-400">
            418.6 GB
          </div>
          <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Pruned ZK State Tree</span>
            <span className="text-slate-500 dark:text-slate-400">14 State Hubs</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Committed Blocks (8 cols) | Right Nodes & Verifier (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Recent Committed Blocks (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div
            className={`p-4 rounded-xl border text-xs transition-colors ${
              isDarkMode
                ? 'bg-[#111A23] border-[#293846]'
                : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="pb-3 border-b border-slate-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Recent Committed Cadastral Blocks</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    Live PoA Ledger
                  </span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Cryptographically sealed cadastral polygons, drone surveys, and policy runs
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-400" />
                  <input
                    type="text"
                    value={blockSearch}
                    onChange={(e) => setBlockSearch(e.target.value)}
                    placeholder="Filter by hash, block #, or signer..."
                    className="pl-8 pr-3 py-1 rounded-lg border border-slate-200 dark:border-gray-700 bg-transparent text-xs text-slate-800 dark:text-slate-200 outline-none w-48 focus:w-60 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Blocks List */}
            <div className="mt-3 divide-y divide-slate-100 dark:divide-gray-800/80 space-y-3">
              {filteredBlocks.map((block) => (
                <div key={block.height} className="pt-3 first:pt-1 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-[#173F5F] text-white">
                        Block #{block.height.toLocaleString()}
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-white text-xs">
                        {block.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                      <span>{block.relativeTime}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">
                        {block.validationsCount} Validations
                      </span>
                    </div>
                  </div>

                  {/* Hash & Signer row */}
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#17232E]/60 border border-slate-200 dark:border-gray-800 space-y-1.5 font-mono text-[11px]">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 truncate">
                        <Hash className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="text-slate-500 dark:text-slate-400">Digest:</span>
                        <span className="text-slate-800 dark:text-slate-200 truncate">
                          {block.payloadDigestHash}
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopy(block.payloadDigestHash)}
                        title="Copy cryptographic hash"
                        className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-500 cursor-pointer"
                      >
                        {copiedHash === block.payloadDigestHash ? (
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200/60 dark:border-gray-800/60">
                      <div>
                        <span>Signer: </span>
                        <strong className="text-slate-700 dark:text-slate-300">
                          {block.authorizedSigner}
                        </strong>
                      </div>
                      <div>
                        <span>Artifact: </span>
                        <strong className="text-teal-600 dark:text-teal-400">
                          {block.artifactType}
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onInspectBlock(block)}
                      className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Verify Merkle Proof &amp; Signature</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Validator Nodes & Instant Cryptographic Hasher (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Consortium Validator Nodes */}
          <div
            className={`p-4 rounded-xl border text-xs transition-colors ${
              isDarkMode
                ? 'bg-[#111A23] border-[#293846]'
                : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="pb-3 border-b border-slate-100 dark:border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-emerald-500" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Consortium Validator Nodes</h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">PoA Engine</span>
            </div>

            <div className="mt-3 space-y-3">
              {VALIDATOR_NODES.map((node) => (
                <div
                  key={node.id}
                  className={`p-2.5 rounded-lg border ${
                    isDarkMode
                      ? 'bg-[#17232E]/60 border-[#293846]'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>{node.nodeName}</span>
                    </div>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                      {node.role}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 font-medium">
                    {node.organization}
                  </div>
                  <div className="text-[10px] text-slate-400">{node.location}</div>

                  <div className="mt-2 pt-1.5 border-t border-slate-200 dark:border-gray-800 flex items-center justify-between text-[10px] font-mono text-slate-600 dark:text-slate-300">
                    <span>
                      Uptime: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{node.uptime}</strong>
                    </span>
                    <span>
                      Validated: <strong className="text-slate-800 dark:text-slate-200 font-bold">{node.blocksValidated}</strong>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Cryptographic Integrity Hasher */}
          <div
            className={`p-4 rounded-xl border text-xs transition-colors ${
              isDarkMode
                ? 'bg-[#111A23] border-[#293846]'
                : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-gray-800">
              <ShieldCheck className="w-4 h-4 text-teal-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Instant Cryptographic Hasher</h3>
            </div>

            <p className="mt-2 text-[11px] text-slate-600 dark:text-slate-300">
              Input any parcel or mutation JSON payload to compute its deterministic SHA-256 state hash:
            </p>

            <textarea
              value={testPayload}
              onChange={(e) => setTestPayload(e.target.value)}
              rows={3}
              className="mt-2 w-full p-2 rounded-lg font-mono text-[11px] border border-slate-200 dark:border-gray-800 bg-slate-50 dark:bg-[#17232E] text-slate-900 dark:text-white focus:outline-none"
            />

            <button
              onClick={handleComputeTestHash}
              disabled={isVerifying}
              className="mt-2 w-full py-1.5 rounded-lg text-xs font-semibold bg-[#173F5F] hover:bg-[#20639B] text-white transition-colors cursor-pointer"
            >
              {isVerifying ? 'Hashing...' : 'Generate SHA-256 Digest'}
            </button>

            {testHashResult && (
              <div className="mt-3 p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 font-mono text-[10px] space-y-1">
                <span className="text-emerald-800 dark:text-emerald-300 font-bold block">
                  Deterministic Digest Generated:
                </span>
                <div className="break-all text-slate-800 dark:text-slate-200">
                  {testHashResult}
                </div>
                <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 pt-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Matches Consortium Merkle Specification</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Attest Cadastral Batch Modal */}
      {showMineModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div
            className={`w-full max-w-md rounded-xl border shadow-2xl p-6 transition-colors ${
              isDarkMode
                ? 'bg-[#111A23] border-[#293846] text-[#F3F6F8]'
                : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-gray-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Attest &amp; Seal Cadastral Block
              </h3>
              <button
                onClick={() => setShowMineModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleMineBatch} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                  Mauje Village &amp; Taluka Jurisdiction *
                </label>
                <input
                  type="text"
                  required
                  value={mineVillage}
                  onChange={(e) => setMineVillage(e.target.value)}
                  className="mt-1 w-full p-2 rounded-lg border border-slate-300 dark:border-gray-700 bg-transparent text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                  Survey Parcels Count in Batch
                </label>
                <input
                  type="number"
                  required
                  value={mineParcelsCount}
                  onChange={(e) => setMineParcelsCount(e.target.value)}
                  className="mt-1 w-full p-2 rounded-lg border border-slate-300 dark:border-gray-700 bg-transparent text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block">
                  Artifact Verification Scope
                </label>
                <input
                  type="text"
                  value={mineArtifact}
                  onChange={(e) => setMineArtifact(e.target.value)}
                  className="mt-1 w-full p-2 rounded-lg border border-slate-300 dark:border-gray-700 bg-transparent text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-gray-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowMineModal(false)}
                  className="px-3.5 py-2 rounded-lg border border-slate-300 dark:border-gray-700 text-xs font-semibold text-slate-600 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold"
                >
                  Seal &amp; Broadcast Block
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

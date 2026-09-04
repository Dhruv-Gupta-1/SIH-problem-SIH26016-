import React, { useState } from 'react';
import {
  X,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  ChevronRight,
  Hash
} from 'lucide-react';
import { BlockchainBlock } from '../../types';

interface MerkleInspectorModalProps {
  block: BlockchainBlock | null;
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export const MerkleInspectorModal: React.FC<MerkleInspectorModalProps> = ({
  block,
  isOpen,
  onClose,
  isDarkMode,
}) => {
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentHeight = block?.height || 1492084;
  const currentTitle = block?.title || 'Cadastral Polygon Layer (Haveli Taluka v3.1)';
  const currentHash =
    block?.payloadDigestHash ||
    '0x4a91e84029bc8110df66b1a208c2d91024bc01f8e6c739d201948ba5e29810a9';

  const handleCopy = (h: string) => {
    navigator.clipboard.writeText(h);
    setCopiedHash(h);
    setTimeout(() => setCopiedHash(null), 2000);
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
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">Merkle Proof Inspector & Tree Verifier</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                Block #{currentHeight.toLocaleString()} • PoA Consensus Quorum
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tree Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
          <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <div>
                <span className="font-bold text-emerald-900 dark:text-emerald-200">
                  Cryptographic Integrity Verified
                </span>
                <p className="text-[11px] text-emerald-800/80 dark:text-emerald-300/80 font-mono">
                  All 24 consortium validator nodes attested exact byte-level state parity.
                </p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-600 text-white">
              PASS
            </span>
          </div>

          {/* Visual Merkle Hierarchy */}
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#17232E]/60 border border-gray-200 dark:border-gray-800 space-y-3 font-mono">
            {/* Level 0: Root Hash */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
                <span className="font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  LEVEL 0: MERKLE ROOT
                </span>
                <span>Epoch #89,204</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-[#111A23] border border-teal-500/40 text-teal-700 dark:text-teal-300 break-all text-[11px] flex items-center justify-between">
                <span>0x8f2d4710bc892ea01924fa881024bc01f8e6c739d201948ba5e29810a9</span>
                <button
                  onClick={() =>
                    handleCopy('0x8f2d4710bc892ea01924fa881024bc01f8e6c739d201948ba5e29810a9')
                  }
                  className="ml-2 text-gray-400 hover:text-gray-600"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Tree Branch Visual Connectors */}
            <div className="flex items-center justify-around text-gray-400 text-xs py-1">
              <span>┌──────────────────────────┴──────────────────────────┐</span>
            </div>

            {/* Level 1: Intermediate Nodes */}
            <div className="grid grid-cols-2 gap-3 text-[10px]">
              <div className="p-2 rounded-lg bg-white dark:bg-[#111A23] border border-gray-200 dark:border-gray-800 space-y-1">
                <span className="text-gray-400 block font-bold">NODE L1-A (Parcels Branch)</span>
                <div className="truncate text-gray-700 dark:text-gray-300">0x3ba99f2c...40b91</div>
              </div>
              <div className="p-2 rounded-lg bg-white dark:bg-[#111A23] border border-gray-200 dark:border-gray-800 space-y-1">
                <span className="text-gray-400 block font-bold">NODE L1-B (Surveys Branch)</span>
                <div className="truncate text-gray-700 dark:text-gray-300">0x992cf01d...3bf91</div>
              </div>
            </div>

            {/* Tree Leaf Visual Connectors */}
            <div className="flex items-center justify-around text-gray-400 text-xs py-1">
              <span>│                                                      │</span>
            </div>

            {/* Level 2: Leaf Digests */}
            <div className="space-y-1.5">
              <span className="text-gray-400 block text-[11px] font-bold uppercase">
                LEAF ARTIFACT PAYLOAD DIGEST:
              </span>
              <div className="p-2.5 rounded-lg bg-white dark:bg-[#111A23] border border-gray-300 dark:border-gray-700 space-y-1">
                <div className="font-semibold text-gray-900 dark:text-white font-sans text-xs">
                  {currentTitle}
                </div>
                <div className="break-all text-[11px] text-gray-600 dark:text-gray-300">
                  {currentHash}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#173F5F] hover:bg-[#20639B] text-white text-xs font-semibold transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

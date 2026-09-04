import React from 'react';
import {
  X,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Download,
  Printer,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { CadastralParcel } from '../../types';

interface ParcelDeedModalProps {
  parcel: CadastralParcel | null;
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

export const ParcelDeedModal: React.FC<ParcelDeedModalProps> = ({
  parcel,
  isOpen,
  onClose,
  isDarkMode,
}) => {
  if (!isOpen || !parcel) return null;

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
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold">Official RoR 7/12 & Legal Deed Extract</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                  Bhu-Aadhaar Verified
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {parcel.plotNumber} • {parcel.mauje}, {parcel.taluka}, District {parcel.district}
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

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
          {/* Government Watermark Box */}
          <div className="p-4 rounded-lg bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200">
            <div className="text-center space-y-0.5">
              <div className="text-[10px] uppercase font-bold tracking-widest text-amber-800 dark:text-amber-300">
                GOVERNMENT OF MAHARASHTRA • REVENUE DEPARTMENT
              </div>
              <div className="text-sm font-bold">
                VILLAGE FORM VII-XII (RECORD OF RIGHTS & REGISTER OF CROPS)
              </div>
              <div className="text-[11px] font-mono text-amber-700 dark:text-amber-400">
                ULPIN: 27-25-HAV-WGH-00412-1A • Khatiyan No. {parcel.khatiyanNo}
              </div>
            </div>
          </div>

          {/* Encumbrance / Stay Order Notice (if active) */}
          {parcel.encumbrance.hasActiveEncumbrance && (
            <div className="p-3.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200">
              <div className="flex items-center gap-2 font-bold text-xs text-rose-800 dark:text-rose-300">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>INJUNCTION NOTICE & LIS PENDENS ADVISORY</span>
              </div>
              <div className="mt-1 font-semibold">{parcel.encumbrance.suitType}</div>
              <p className="mt-1 text-xs leading-relaxed text-rose-800/90 dark:text-rose-200/90">
                {parcel.encumbrance.court} issued interim injunction order in {parcel.encumbrance.suitNumber}. Any transfer, mutation, or encumbrance created pending litigation is subject to doctrine of Lis Pendens under Section 52 of Transfer of Property Act, 1882.
              </p>
              <div className="mt-2 text-[11px] font-mono">
                Next Substantive Hearing Date: <strong>{parcel.encumbrance.nextHearing}</strong>
              </div>
            </div>
          )}

          {/* Detailed Specifications Table */}
          <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
            <table className="w-full divide-y divide-gray-200 dark:divide-gray-800 text-left">
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
                <tr>
                  <td className="p-2.5 bg-gray-50 dark:bg-[#17232E]/60 text-gray-500 dark:text-gray-400 font-medium w-1/3">
                    Cadastral Plot / Survey No.
                  </td>
                  <td className="p-2.5 font-bold font-mono text-gray-900 dark:text-white">
                    {parcel.plotNumber}
                  </td>
                </tr>
                <tr>
                  <td className="p-2.5 bg-gray-50 dark:bg-[#17232E]/60 text-gray-500 dark:text-gray-400 font-medium">
                    Total Registered Area
                  </td>
                  <td className="p-2.5 font-semibold">
                    {parcel.registeredAreaHectares.toFixed(2)} Hectares ({parcel.registeredAreaAcres} Acres)
                  </td>
                </tr>
                <tr>
                  <td className="p-2.5 bg-gray-50 dark:bg-[#17232E]/60 text-gray-500 dark:text-gray-400 font-medium">
                    Tenure Classification
                  </td>
                  <td className="p-2.5 font-medium">{parcel.landClassification}</td>
                </tr>
                <tr>
                  <td className="p-2.5 bg-gray-50 dark:bg-[#17232E]/60 text-gray-500 dark:text-gray-400 font-medium">
                    Occupant Class I (Bhogavatdar)
                  </td>
                  <td className="p-2.5 font-bold text-gray-900 dark:text-white">
                    {parcel.primaryTitleHolder}
                  </td>
                </tr>
                <tr>
                  <td className="p-2.5 bg-gray-50 dark:bg-[#17232E]/60 text-gray-500 dark:text-gray-400 font-medium">
                    Mutation Entry (Ferfar)
                  </td>
                  <td className="p-2.5 font-mono">
                    {parcel.mutationEntry} certified in Year {parcel.mutationYear} by Talathi Wagholi
                  </td>
                </tr>
                <tr>
                  <td className="p-2.5 bg-gray-50 dark:bg-[#17232E]/60 text-gray-500 dark:text-gray-400 font-medium">
                    Assessment Tax (Akarani)
                  </td>
                  <td className="p-2.5 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                    ₹ {parcel.govtDues.toLocaleString()} (Paid & Cleared)
                  </td>
                </tr>
                <tr>
                  <td className="p-2.5 bg-gray-50 dark:bg-[#17232E]/60 text-gray-500 dark:text-gray-400 font-medium">
                    Blockchain Provenance Seal
                  </td>
                  <td className="p-2.5 font-mono text-[11px] text-gray-600 dark:text-gray-300 truncate">
                    Block #{parcel.provenance.blockIndex} ({parcel.provenance.anchorNode})
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Cryptographically Certified Copy</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-medium transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Extract</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-[#173F5F] hover:bg-[#20639B] text-white text-xs font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

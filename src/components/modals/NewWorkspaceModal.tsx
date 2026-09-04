import React, { useState } from 'react';
import {
  X,
  FolderPlus,
  Layers,
  MapPin,
  Users,
  CheckCircle2
} from 'lucide-react';
import { ActiveScreen } from '../../types';

interface NewWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (title: string, stateName: string, district: string) => void;
  isDarkMode: boolean;
}

export const NewWorkspaceModal: React.FC<NewWorkspaceModalProps> = ({
  isOpen,
  onClose,
  onCreate,
  isDarkMode,
}) => {
  const [title, setTitle] = useState('');
  const [stateName, setStateName] = useState('Maharashtra');
  const [district, setDistrict] = useState('Pune');
  const [cohort, setCohort] = useState('IIT Bombay Spatial Data Lab');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onCreate(title, stateName, district);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className={`w-full max-w-lg rounded-xl shadow-2xl border overflow-hidden transition-colors ${
          isDarkMode
            ? 'bg-[#111A23] border-[#293846] text-[#F3F6F8]'
            : 'bg-white border-[#D9E0E6] text-[#17202A]'
        }`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <FolderPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold">New Research Workspace</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Instantiate an empirical policy cohort with geodetic boundaries
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

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-gray-800 dark:text-gray-200 mb-1">
              Workspace Project Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Highway Corridor Land Valuation Indexation (NH-48)"
              className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white focus:outline-teal-500 text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-gray-800 dark:text-gray-200 mb-1">
                State Jurisdiction
              </label>
              <select
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#17232E] text-gray-900 dark:text-white focus:outline-teal-500 text-xs"
              >
                <option value="Maharashtra">Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Telangana">Telangana</option>
                <option value="Odisha">Odisha</option>
                <option value="Rajasthan">Rajasthan</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-800 dark:text-gray-200 mb-1">
                District / Taluka
              </label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="e.g. Pune, Haveli"
                className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white focus:outline-teal-500 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-800 dark:text-gray-200 mb-1">
              Collaborating Federated Cohort
            </label>
            <select
              value={cohort}
              onChange={(e) => setCohort(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#17232E] text-gray-900 dark:text-white focus:outline-teal-500 text-xs"
            >
              <option value="IIT Bombay Spatial Data Lab">IIT Bombay Spatial Data Lab</option>
              <option value="NITI Aayog Policy Division">NITI Aayog Policy Division</option>
              <option value="Survey of India Geodetic Wing">Survey of India Geodetic Wing</option>
              <option value="Ministry of Tribal Affairs Research Cell">Ministry of Tribal Affairs Research Cell</option>
            </select>
          </div>

          <div className="p-3 rounded-lg bg-gray-50 dark:bg-[#17232E]/60 border border-gray-200 dark:border-gray-800 text-[11px] text-gray-500 dark:text-gray-400 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-gray-700 dark:text-gray-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Automatic Institutional Mounts:</span>
            </div>
            <p>• ULPIN Bhu-Aadhaar Cadastral Polygon Layer v3.4</p>
            <p>• RFCTLARR 2013 Statutory Monte Carlo Baseline Matrix</p>
            <p>• Immutable PoA Blockchain Audit Node Channel #IND-DL-09</p>
          </div>

          <div className="pt-3 border-t border-gray-200 dark:border-gray-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#173F5F] hover:bg-[#20639B] text-white text-xs font-semibold transition-colors"
            >
              Instantiate Workspace
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

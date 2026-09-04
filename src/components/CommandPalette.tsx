import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  X,
  MapPin,
  FlaskConical,
  Scale,
  Link2,
  FolderGit2,
  ArrowRight,
  User,
  Bot,
  Sparkles
} from 'lucide-react';
import { ActiveScreen } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: ActiveScreen) => void;
  onOpenAiBot?: () => void;
  isDarkMode: boolean;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenAiBot,
  isDarkMode,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent will handle toggle
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickItems = [
    {
      type: 'AI Copilot',
      title: 'Ask BHUMI-AI Land Intelligence Copilot',
      screen: 'dashboard' as ActiveScreen,
      isAi: true,
      icon: <Bot className="w-4 h-4 text-teal-400" />,
      sub: 'Decipher any query regarding 7/12 RoR, Section 26, disputes, or blockchain',
    },
    {
      type: 'Cadastral Parcel',
      title: 'Plot No. 412/1A (Mauje Wagholi, Pune)',
      screen: 'gis' as ActiveScreen,
      icon: <MapPin className="w-4 h-4 text-emerald-500" />,
      sub: '4.20 Ha • Notice of Lis Pendens Registered',
    },
    {
      type: 'Policy Run',
      title: 'Fair Compensation & Ag. Land Buffer Regulation (v2.4)',
      screen: 'policy-sim' as ActiveScreen,
      icon: <FlaskConical className="w-4 h-4 text-teal-500" />,
      sub: 'Pune & Thane Perimeter • +18.4% Cost Delta',
    },
    {
      type: 'Litigation Dispute',
      title: 'Thane District Bullet Train Section 26 Valuation Surge',
      screen: 'disputes' as ActiveScreen,
      icon: <Scale className="w-4 h-4 text-rose-500" />,
      sub: '31 new writ petitions filed across 4 talukas',
    },
    {
      type: 'Blockchain Ledger',
      title: 'Block #1,492,084 Cadastral Polygon Layer Attestation',
      screen: 'blockchain' as ActiveScreen,
      icon: <Link2 className="w-4 h-4 text-blue-500" />,
      sub: '24 PoA signatures • Zero State Drift',
    },
    {
      type: 'Research Workspace',
      title: 'Peri-Urban Agricultural Land Conversion & Compensation Elasticity',
      screen: 'workspaces' as ActiveScreen,
      icon: <FolderGit2 className="w-4 h-4 text-indigo-500" />,
      sub: 'WS-MH-PUN-094 • Dr. Sen & IITB Cadre',
    },
    {
      type: 'User Profile & Personnel',
      title: 'Dr. Arishta Sen (Principal Policy Fellow & Geospatial Lead)',
      screen: 'profile' as ActiveScreen,
      icon: <User className="w-4 h-4 text-teal-500" />,
      sub: 'Officer PIN #DOLR-RES-2021-0498 • DoLR & IIT Bombay Cadre',
    },
  ];

  const filteredItems = quickItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.sub.toLowerCase().includes(query.toLowerCase()) ||
      item.type.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/50 backdrop-blur-xs p-4 animate-fade-in">
      <div
        id="command-palette-modal"
        className={`w-full max-w-xl rounded-xl shadow-2xl border overflow-hidden transition-colors ${
          isDarkMode
            ? 'bg-[#111A23] border-[#293846] text-[#F3F6F8]'
            : 'bg-white border-[#D9E0E6] text-[#17202A]'
        }`}
      >
        {/* Search Header */}
        <div className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-gray-800">
          <Search className="w-4 h-4 text-gray-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search RoR khatiyans, parcels, simulations, litigation clusters..."
            className="w-full text-sm bg-transparent border-none outline-none focus:ring-0 placeholder:text-gray-400"
          />
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-gray-100 dark:divide-gray-800/60">
          {filteredItems.length === 0 ? (
            <div className="py-10 text-center text-xs text-gray-400">
              No matching records found for "{query}"
            </div>
          ) : (
            filteredItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (item.isAi && onOpenAiBot) {
                    onOpenAiBot();
                  } else {
                    onNavigate(item.screen);
                  }
                  onClose();
                }}
                className={`w-full text-left p-2.5 rounded-lg flex items-center justify-between transition-colors ${
                  isDarkMode
                    ? 'hover:bg-[#17232E] text-gray-200'
                    : 'hover:bg-gray-50 text-gray-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-gray-100 dark:bg-[#17232E]">
                    {item.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold">{item.title}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                        {item.type}
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                      {item.sub}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-gray-50 dark:bg-[#17232E]/60 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-3">
            <span>
              Navigate with <kbd className="font-mono">↑</kbd> <kbd className="font-mono">↓</kbd>
            </span>
            <span>
              Select with <kbd className="font-mono">↵</kbd>
            </span>
          </div>
          <span>Esc to exit</span>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import {
  LayoutDashboard,
  FolderGit2,
  MapPin,
  FlaskConical,
  Scale,
  BookOpen,
  Link2,
  Settings,
  Radio,
  CheckCircle2,
  ExternalLink,
  Menu
} from 'lucide-react';
import { ActiveScreen } from '../types';

interface SidebarProps {
  activeScreen: ActiveScreen;
  onSelectScreen: (screen: ActiveScreen) => void;
  onOpenSettings?: () => void;
  isDarkMode: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeScreen,
  onSelectScreen,
  onOpenSettings,
  isDarkMode,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  const navItems: Array<{
    id: ActiveScreen;
    label: string;
    icon: React.ReactNode;
    badge?: string;
  }> = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'workspaces',
      label: 'Research Workspaces',
      icon: <FolderGit2 className="w-4 h-4 shrink-0" />,
      badge: '14',
    },
    {
      id: 'gis',
      label: 'Land Data & GIS',
      icon: <MapPin className="w-4 h-4 shrink-0" />,
      badge: '3 Active',
    },
    {
      id: 'policy-sim',
      label: 'Policy Simulation Lab',
      icon: <FlaskConical className="w-4 h-4 shrink-0" />,
      badge: 'v2.4',
    },
    {
      id: 'disputes',
      label: 'Dispute Intelligence',
      icon: <Scale className="w-4 h-4 shrink-0" />,
      badge: 'LIVE',
    },
    {
      id: 'legal',
      label: 'Legal & Knowledge',
      icon: <BookOpen className="w-4 h-4 shrink-0" />,
    },
    {
      id: 'blockchain',
      label: 'Blockchain Provenance',
      icon: <Link2 className="w-4 h-4 shrink-0" />,
      badge: 'PoA',
    },
  ];

  return (
    <aside
      id="institutional-left-rail"
      className={`${
        isCollapsed ? 'w-16' : 'w-64'
      } shrink-0 border-r h-full flex flex-col justify-between select-none transition-all duration-300 ease-in-out z-30 ${
        isDarkMode
          ? 'bg-[#0B1117] border-[#293846] text-[#F3F6F8]'
          : 'bg-[#F6F8FA] border-[#D9E0E6] text-[#17202A]'
      }`}
    >
      {/* Top Header & Suites Nav with internal scroll if viewport is short */}
      <div className={`flex-1 min-h-0 overflow-y-auto ${isCollapsed ? 'p-2' : 'p-3'}`}>
        {/* Rail Subtitle / Collapse Toggle */}
        {isCollapsed ? (
          <div className="flex flex-col items-center justify-center py-2 mb-2 border-b border-gray-200 dark:border-gray-800 gap-2">
            <button
              onClick={onToggleCollapse}
              id="sidebar-toggle-decollapse-btn"
              title="Expand Analytical Suites (3 stacked '-' sign)"
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 text-teal-600 dark:text-teal-400 transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="DoLR Node Active" />
          </div>
        ) : (
          <div className="px-3 py-2 text-[11px] font-mono uppercase tracking-wider text-gray-400 dark:text-gray-500 font-semibold border-b border-gray-200 dark:border-gray-800 mb-2">
            <div className="flex items-center justify-between">
              <span>DOLR GEONODE</span>
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-sans normal-case text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Institutional Rail
              </span>
            </div>
          </div>
        )}

        {/* Section Title with 3 stacked '-' sign collapse toggle */}
        {!isCollapsed && (
          <div className="flex items-center justify-between px-3 pt-1 pb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
              ANALYTICAL SUITES
            </span>
            <button
              onClick={onToggleCollapse}
              id="sidebar-collapse-analytical-suites-btn"
              title="Collapse Analytical Suites (3 stacked '-' sign)"
              className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors cursor-pointer"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Navigation List */}
        <nav className="space-y-1 mt-1">
          {navItems.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectScreen(item.id)}
                id={`nav-item-${item.id}`}
                title={isCollapsed ? `${item.label}${item.badge ? ` (${item.badge})` : ''}` : undefined}
                className={`w-full flex items-center ${
                  isCollapsed ? 'justify-center px-0 py-2.5 relative' : 'justify-between px-3 py-2.5'
                } rounded-md text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? isDarkMode
                      ? 'bg-[#17232E] text-teal-300 font-semibold shadow-sm border border-teal-500/30'
                      : 'bg-[#173F5F] text-white font-semibold shadow-sm'
                    : isDarkMode
                    ? 'text-gray-300 hover:bg-[#111A23] hover:text-white'
                    : 'text-gray-700 hover:bg-[#E8EEF5] hover:text-[#17202A]'
                }`}
              >
                <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-2.5'}`}>
                  <span className={isActive ? (isDarkMode ? 'text-teal-400' : 'text-teal-300') : 'text-gray-400'}>
                    {item.icon}
                  </span>
                  {!isCollapsed && <span>{item.label}</span>}
                </div>

                {/* Badge rendering */}
                {item.badge && !isCollapsed && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold ${
                      isActive
                        ? isDarkMode
                          ? 'bg-teal-950 text-teal-300 border border-teal-800'
                          : 'bg-white/20 text-white'
                        : item.badge === 'LIVE'
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-400 font-sans'
                        : isDarkMode
                        ? 'bg-gray-800 text-gray-400'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Collapsed dot badge */}
                {item.badge && isCollapsed && (
                  <span
                    className={`absolute top-1 right-1 w-2 h-2 rounded-full ${
                      item.badge === 'LIVE'
                        ? 'bg-rose-500'
                        : isActive
                        ? 'bg-teal-400'
                        : 'bg-sky-500'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Permanently Fixed Bottom Left Corner: Node Sync & Settings & API */}
      <div
        id="bottom-left-settings-rail"
        className={`shrink-0 mt-auto ${isCollapsed ? 'p-2' : 'p-3'} border-t space-y-3 ${
          isDarkMode
            ? 'border-gray-800 bg-[#0B1117]'
            : 'border-gray-200 bg-[#F6F8FA]'
        }`}
      >
        {isCollapsed ? (
          <div className="flex flex-col items-center justify-center gap-2 py-1">
            <button
              onClick={() => (onOpenSettings ? onOpenSettings() : onSelectScreen('blockchain'))}
              id="sidebar-settings-collapsed-btn"
              title="Open Platform Settings, Geodetic Datum & API Credentials"
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-400 hover:text-teal-500 transition-colors cursor-pointer group"
            >
              <Settings className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
            </button>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="100% Audit Node Sync" />
          </div>
        ) : (
          <>
            {/* Node Sync Meter */}
            <div className="p-2.5 rounded-md bg-white dark:bg-[#111A23] border border-gray-200 dark:border-gray-800 text-xs shadow-2xs">
              <div className="flex items-center justify-between text-[11px] mb-1.5">
                <span className="text-gray-500 dark:text-gray-400 font-medium">
                  Audit Node Sync
                </span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  100%
                </span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-500 h-1.5 rounded-full w-full" />
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-[10px] font-mono text-gray-500 dark:text-gray-400">
                <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                <span className="truncate">#IND-DL-09 Mainnet</span>
              </div>
            </div>

            {/* Settings & Version */}
            <div className="flex items-center justify-between px-1 text-[11px] text-gray-500 dark:text-gray-400">
              <button
                onClick={() => (onOpenSettings ? onOpenSettings() : onSelectScreen('blockchain'))}
                id="sidebar-settings-api-button"
                className="flex items-center gap-1.5 font-medium hover:text-[#173F5F] dark:hover:text-teal-300 transition-colors cursor-pointer group"
                title="Open Platform Settings, Geodetic Datum & API Credentials"
              >
                <Settings className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-300 text-gray-400 group-hover:text-teal-500" />
                <span className="font-semibold">SETTINGS & API</span>
              </button>
              <span className="font-mono text-[10px] text-gray-400">v4.2.1-prod</span>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};

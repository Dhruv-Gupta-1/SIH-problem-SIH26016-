import React from 'react';
import {
  Search,
  ShieldCheck,
  Bell,
  Sun,
  Moon,
  Sparkles,
  RefreshCw,
  SlidersHorizontal,
  Bot
} from 'lucide-react';
import { BhumiLogo } from './BhumiLogo';
import { ActiveScreen } from '../types';

interface NavbarProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenCommandPalette: () => void;
  onToggleNotificationDrawer: () => void;
  unreadNotificationsCount: number;
  onReopenSplash: () => void;
  onTriggerTestPush: () => void;
  onOpenProfile?: () => void;
  onOpenAiBot?: () => void;
  activeScreen?: ActiveScreen;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDarkMode,
  onToggleDarkMode,
  onOpenCommandPalette,
  onToggleNotificationDrawer,
  unreadNotificationsCount,
  onReopenSplash,
  onTriggerTestPush,
  onOpenProfile,
  onOpenAiBot,
  activeScreen,
}) => {
  return (
    <header
      id="platform-navbar"
      className={`h-16 px-4 md:px-6 border-b sticky top-0 z-40 flex items-center justify-between transition-colors ${
        isDarkMode
          ? 'bg-[#111A23] border-[#293846] text-[#F3F6F8]'
          : 'bg-white border-[#D9E0E6] text-[#17202A]'
      }`}
    >
      {/* Left Branding Group */}
      <div className="flex items-center gap-3 md:gap-4 shrink-0">
        <button
          onClick={onReopenSplash}
          title="Click to view Secure Institutional Rail Boot Sequence"
          className="flex items-center gap-2 group cursor-pointer text-left"
        >
          <BhumiLogo size="sm" showWordmark={false} isDark={isDarkMode} />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm md:text-base tracking-wider text-[#002945] dark:text-white uppercase font-sans">
                BHUMI-X
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 dark:bg-sky-950/70 dark:text-sky-300 border border-sky-300 dark:border-sky-800">
                Govt. of India
              </span>
            </div>
            <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium hidden sm:inline-block">
              National Land Intelligence & Policy Platform | Ministry of Rural Development
            </span>
          </div>
        </button>
      </div>

      {/* Center Search & Context Quick Tools */}
      <div className="hidden lg:flex items-center gap-3 max-w-md w-full mx-4">
        <button
          onClick={onOpenCommandPalette}
          id="global-omni-search"
          className={`w-full flex items-center justify-between px-3.5 py-1.5 rounded-md text-xs border transition-all ${
            isDarkMode
              ? 'bg-[#17232E] border-[#293846] text-gray-300 hover:border-gray-500'
              : 'bg-[#F6F8FA] border-[#D9E0E6] text-gray-600 hover:border-gray-400'
          }`}
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-gray-400" />
            <span className="truncate">Quick search parcels, RoRs, litigations...</span>
          </div>
          <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Controls & Node State */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Node Verification Status Badge */}
        <div
          id="node-status-badge"
          className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
            isDarkMode
              ? 'bg-[#17232E] border-emerald-800/60 text-emerald-400'
              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <ShieldCheck className="w-3.5 h-3.5" />
          <span className="text-[11px] font-mono tracking-tight font-semibold">
            #IND-DL-09
          </span>
        </div>

        {/* BHUMI-AI Copilot Trigger Button */}
        <button
          onClick={onOpenAiBot}
          title="Open BHUMI-AI Cadastral Intelligence Copilot"
          id="navbar-ai-bot-button"
          className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold border transition-all cursor-pointer ${
            isDarkMode
              ? 'bg-[#172E3B] border-teal-500/50 text-teal-300 hover:bg-[#1f3f52] shadow-xs'
              : 'bg-teal-50 border-teal-300 text-teal-900 hover:bg-teal-100 shadow-xs'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-teal-400 opacity-75"></span>
            <Bot className="w-3.5 h-3.5 text-teal-500" />
          </div>
          <span>BHUMI-AI</span>
          <span className="text-[9px] px-1 py-0.2 rounded bg-teal-500/20 text-teal-400 font-mono uppercase">
            Bot
          </span>
        </button>

        {/* Real-time Push Notification Trigger Shortcut (for instant user testing) */}
        <button
          onClick={onTriggerTestPush}
          title="Simulate real-time push update (dispute / GIS / block)"
          id="test-push-trigger-button"
          className={`hidden xl:flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
            isDarkMode
              ? 'bg-[#17232E] border-[#293846] text-teal-300 hover:bg-[#1f2f3d]'
              : 'bg-teal-50 border-teal-200 text-teal-800 hover:bg-teal-100'
          }`}
        >
          <Sparkles className="w-3 h-3 text-teal-500" />
          <span>Simulate Push</span>
        </button>

        {/* Real-time Push Notification Bell with live unread badge */}
        <button
          onClick={onToggleNotificationDrawer}
          id="notification-bell-button"
          title="Real-time push notifications feed"
          className={`relative p-2 rounded-md transition-colors ${
            isDarkMode
              ? 'text-gray-300 hover:bg-[#17232E] hover:text-white'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }`}
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-[#111A23]">
              {unreadNotificationsCount}
            </span>
          )}
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={onToggleDarkMode}
          id="dark-mode-toggle"
          title={isDarkMode ? 'Switch to daylight theme' : 'Switch to dark mode'}
          className={`p-2 rounded-md transition-colors ${
            isDarkMode
              ? 'text-amber-300 hover:bg-[#17232E] hover:text-amber-200'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }`}
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Divider */}
        <div className={`h-6 w-px ${isDarkMode ? 'bg-[#293846]' : 'bg-[#D9E0E6]'}`} />

        {/* User Identity Profile (Clickable to visit Dr. Arishta Sen's profile page) */}
        <button
          onClick={onOpenProfile}
          id="user-profile-widget"
          title="Click to view Dr. Arishta Sen's Institutional Profile & Dossier"
          className={`flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-lg transition-all cursor-pointer border text-left group ${
            activeScreen === 'profile'
              ? isDarkMode
                ? 'bg-[#17232E] border-teal-400 ring-2 ring-teal-500/30'
                : 'bg-teal-50 border-teal-500 ring-2 ring-teal-500/20'
              : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-100 dark:hover:bg-[#17232E]'
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-[#173F5F] text-white flex items-center justify-center text-xs font-black ring-2 ring-teal-500/30 shadow-xs shrink-0 group-hover:scale-105 transition-transform">
            AS
          </div>
          <div className="hidden md:flex flex-col text-left leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors">
                Dr. Arishta Sen
              </span>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-teal-100 text-teal-900 dark:bg-teal-900/80 dark:text-teal-200 border border-teal-300 dark:border-teal-700">
                L3
              </span>
            </div>
            <span className="text-[10px] text-gray-700 dark:text-gray-300 font-medium">
              Principal Policy Fellow
            </span>
          </div>
        </button>
      </div>
    </header>
  );
};

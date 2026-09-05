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
  Bot,
  Settings,
  Menu
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
  onOpenSettings?: () => void;
  onToggleSidebar?: () => void;
  isSidebarCollapsed?: boolean;
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
  onOpenSettings,
  onToggleSidebar,
  isSidebarCollapsed = false,
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
      {/* Left Branding & Analytical Suites Collapse Group */}
      <div className="flex items-center gap-2.5 md:gap-3 shrink-0">
        {/* 3 stacked '-' sign Menu toggle for Analytical Suites */}
        <button
          onClick={onToggleSidebar}
          id="navbar-toggle-sidebar-button"
          title={isSidebarCollapsed ? "Expand Analytical Suites (3 stacked '-' sign)" : "Collapse Analytical Suites (3 stacked '-' sign)"}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#17232E] text-gray-600 hover:text-teal-700 dark:text-gray-300 dark:hover:text-teal-300 transition-colors cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

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

        {/* Platform Settings Button (replacing theme toggle) */}
        <button
          onClick={onOpenSettings}
          id="navbar-settings-button"
          title="Open Platform Settings, Geodetic Datum & System Preferences"
          className={`p-2 rounded-md transition-colors cursor-pointer ${
            isDarkMode
              ? 'text-gray-300 hover:bg-[#17232E] hover:text-white'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }`}
        >
          <Settings className="w-4 h-4 hover:rotate-45 transition-transform duration-300 text-teal-600 dark:text-teal-400" />
        </button>

        {/* Divider */}
        <div className={`h-6 w-px ${isDarkMode ? 'bg-[#293846]' : 'bg-[#D9E0E6]'}`} />

        {/* User Identity Profile (Avatar Only - Name Hidden) */}
        <button
          onClick={onOpenProfile}
          id="user-profile-widget"
          title="View Dr. Arishta Sen's Institutional Profile & Dossier (Principal Policy Fellow L3)"
          className={`p-1 rounded-full transition-all cursor-pointer border group ${
            activeScreen === 'profile'
              ? isDarkMode
                ? 'bg-[#17232E] border-teal-400 ring-2 ring-teal-500/40'
                : 'bg-teal-50 border-teal-500 ring-2 ring-teal-500/30'
              : 'border-gray-200 dark:border-gray-800 hover:border-teal-400 dark:hover:border-teal-500 hover:bg-gray-100 dark:hover:bg-[#17232E]'
          }`}
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-[#173F5F] text-white flex items-center justify-center text-xs font-black ring-2 ring-teal-500/30 shadow-xs shrink-0 group-hover:scale-105 transition-transform">
              AS
            </div>
            <span
              className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-[#111A23] rounded-full"
              title="Verified Principal Fellow"
            />
          </div>
        </button>
      </div>
    </header>
  );
};

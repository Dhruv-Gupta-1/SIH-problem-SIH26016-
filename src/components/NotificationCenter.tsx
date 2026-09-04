import React, { useState } from 'react';
import {
  Bell,
  X,
  CheckCheck,
  ExternalLink,
  Volume2,
  VolumeX,
  Radio,
  AlertTriangle,
  Scale,
  MapPin,
  Link2,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { PushNotification, ActiveScreen } from '../types';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: PushNotification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  onNavigateToScreen: (screen: ActiveScreen) => void;
  activeToast: PushNotification | null;
  onDismissToast: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onSimulatePush: () => void;
  isDarkMode: boolean;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearAll,
  onNavigateToScreen,
  activeToast,
  onDismissToast,
  soundEnabled,
  onToggleSound,
  onSimulatePush,
  isDarkMode,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'dispute' | 'cadastre' | 'ledger' | 'simulation'>('all');
  const [permissionState, setPermissionState] = useState<string>(
    typeof window !== 'undefined' && 'Notification' in window
      ? Notification.permission
      : 'default'
  );

  const handleRequestPushPermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const perm = await Notification.requestPermission();
        setPermissionState(perm);
        if (perm === 'granted') {
          new Notification('BHUMI-X Institutional Rail', {
            body: 'Real-time push notifications enabled for high-priority land governance alerts.',
            icon: '/favicon.ico'
          });
        }
      } catch (err) {
        console.error('Push notification request error:', err);
      }
    }
  };

  const filteredNotifications = notifications.filter(
    (n) => selectedFilter === 'all' || n.category === selectedFilter
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getCategoryIcon = (category: PushNotification['category']) => {
    switch (category) {
      case 'dispute':
        return <Scale className="w-3.5 h-3.5 text-rose-500" />;
      case 'cadastre':
        return <MapPin className="w-3.5 h-3.5 text-amber-500" />;
      case 'ledger':
        return <Link2 className="w-3.5 h-3.5 text-blue-500" />;
      case 'simulation':
        return <Sparkles className="w-3.5 h-3.5 text-teal-500" />;
      default:
        return <Bell className="w-3.5 h-3.5 text-gray-500" />;
    }
  };

  const getSeverityBadge = (severity: PushNotification['severity']) => {
    switch (severity) {
      case 'critical':
        return (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
            CRITICAL
          </span>
        );
      case 'alert':
        return (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
            ALERT
          </span>
        );
      case 'success':
        return (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            RESOLVED
          </span>
        );
      default:
        return (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
            INFO
          </span>
        );
    }
  };

  return (
    <>
      {/* Real-time Floating Push Toast Banner (Top Right) */}
      {activeToast && (
        <div
          id="realtime-push-toast"
          className={`fixed top-20 right-4 z-50 max-w-sm w-full p-4 rounded-xl shadow-2xl border transition-all animate-bounce-in ${
            isDarkMode
              ? 'bg-[#17232E] border-teal-500/40 text-white'
              : 'bg-white border-teal-600/30 text-gray-900'
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400">
                <Radio className="w-4 h-4 animate-pulse text-teal-500" />
              </span>
              <div>
                <span className="text-[10px] font-bold tracking-wider uppercase text-teal-600 dark:text-teal-400 font-mono">
                  PUSH NOTIFICATION
                </span>
                <div className="text-xs font-bold leading-snug">
                  {activeToast.title}
                </div>
              </div>
            </div>
            <button
              onClick={onDismissToast}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="mt-2 text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
            {activeToast.description}
          </p>

          {activeToast.location && (
            <div className="mt-2 flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400 font-mono">
              <MapPin className="w-3 h-3 text-gray-400" />
              <span>{activeToast.location}</span>
            </div>
          )}

          <div className="mt-3 flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-2 text-xs">
            <span className="text-[11px] text-gray-500 dark:text-gray-400">Just now</span>
            {activeToast.targetScreen && (
              <button
                onClick={() => {
                  onNavigateToScreen(activeToast.targetScreen!);
                  onDismissToast();
                }}
                className="flex items-center gap-1 font-semibold text-teal-600 dark:text-teal-400 hover:underline"
              >
                <span>Inspect in Suite</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Notification Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-fade-in">
          <div
            id="notification-center-drawer"
            className={`w-full max-w-md h-full flex flex-col shadow-2xl border-l transition-colors ${
              isDarkMode
                ? 'bg-[#111A23] border-[#293846] text-[#F3F6F8]'
                : 'bg-white border-[#D9E0E6] text-[#17202A]'
            }`}
          >
            {/* Drawer Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">Push Notifications & Stream</h3>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">
                    Real-time national land governance event bus
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {/* Audio Sound Chime Toggle */}
                <button
                  onClick={onToggleSound}
                  title={soundEnabled ? 'Mute notification sound' : 'Unmute notification chime'}
                  className="p-1.5 rounded text-gray-500 hover:text-gray-900 dark:hover:text-white"
                >
                  {soundEnabled ? (
                    <Volume2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  ) : (
                    <VolumeX className="w-4 h-4" />
                  )}
                </button>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Browser Push Permission Alert Card */}
            <div className="p-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#17232E]/60 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-emerald-500" />
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">Web Push Integration</span>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      Status:{' '}
                      <span className="font-mono font-bold capitalize">
                        {permissionState}
                      </span>
                    </p>
                  </div>
                </div>

                {permissionState !== 'granted' ? (
                  <button
                    onClick={handleRequestPushPermission}
                    className="px-2.5 py-1 rounded text-xs font-semibold bg-[#173F5F] text-white hover:bg-[#20639B] transition-colors"
                  >
                    Enable Push
                  </button>
                ) : (
                  <span className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Active
                  </span>
                )}
              </div>
            </div>

            {/* Filter Tabs & Quick Action Bar */}
            <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-[260px]">
                {(['all', 'dispute', 'cadastre', 'ledger', 'simulation'] as const).map(
                  (cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedFilter(cat)}
                      className={`px-2 py-0.5 rounded capitalize whitespace-nowrap text-[11px] font-medium transition-colors ${
                        selectedFilter === cat
                          ? 'bg-[#173F5F] text-white'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {cat}
                    </button>
                  )
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={onSimulatePush}
                  title="Generate live simulated event update"
                  className="p-1 rounded text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950 text-[11px] font-semibold flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Simulate</span>
                </button>
                {unreadCount > 0 && (
                  <button
                    onClick={onMarkAllAsRead}
                    title="Mark all as read"
                    className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  >
                    <CheckCheck className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Notification List Body */}
            <div className="flex-1 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800 p-2">
              {filteredNotifications.length === 0 ? (
                <div className="py-16 text-center text-gray-500 dark:text-gray-400 text-xs">
                  No notifications in this category
                </div>
              ) : (
                filteredNotifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => onMarkAsRead(n.id)}
                    className={`p-3 rounded-lg my-1 transition-all cursor-pointer ${
                      n.read
                        ? isDarkMode
                          ? 'opacity-70 hover:opacity-100 hover:bg-[#17232E]/40'
                          : 'opacity-70 hover:opacity-100 hover:bg-gray-50'
                        : isDarkMode
                        ? 'bg-[#17232E] border-l-2 border-teal-500'
                        : 'bg-teal-50/60 border-l-2 border-teal-600'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(n.category)}
                        <span className="text-xs font-semibold leading-tight text-gray-900 dark:text-white">
                          {n.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {getSeverityBadge(n.severity)}
                      </div>
                    </div>

                    <p className="mt-1.5 text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                      {n.description}
                    </p>

                    {n.location && (
                      <div className="mt-2 flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400 font-mono">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span>{n.location}</span>
                      </div>
                    )}

                    <div className="mt-2.5 flex items-center justify-between text-[11px]">
                      <span className="text-gray-500 dark:text-gray-400">{n.relativeTime}</span>
                      {n.targetScreen && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigateToScreen(n.targetScreen!);
                            onClose();
                          }}
                          className="flex items-center gap-1 text-teal-600 dark:text-teal-400 font-semibold hover:underline"
                        >
                          <span>Inspect</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <button
                onClick={onClearAll}
                className="text-xs text-gray-600 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
              >
                Clear all records
              </button>
              <div className="font-mono text-[10px]">
                Active Listeners: WebSocket / Fabric-PoA
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

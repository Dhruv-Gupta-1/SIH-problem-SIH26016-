/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { ActiveScreen, CadastralParcel, BlockchainBlock, PushNotification } from './types';
import { INITIAL_NOTIFICATIONS, BLOCKCHAIN_BLOCKS, CADASTRAL_PARCELS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { NotificationCenter } from './components/NotificationCenter';
import { SplashScreen } from './components/SplashScreen';
import { CommandPalette } from './components/CommandPalette';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { GisWorkspaceScreen } from './components/screens/GisWorkspaceScreen';
import { PolicySimulationScreen } from './components/screens/PolicySimulationScreen';
import { BlockchainProvenanceScreen } from './components/screens/BlockchainProvenanceScreen';
import { DisputeIntelligenceScreen } from './components/screens/DisputeIntelligenceScreen';
import { ResearchWorkspacesScreen } from './components/screens/ResearchWorkspacesScreen';
import { LegalKnowledgeScreen } from './components/screens/LegalKnowledgeScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { ParcelDeedModal } from './components/modals/ParcelDeedModal';
import { MerkleInspectorModal } from './components/modals/MerkleInspectorModal';
import { NewWorkspaceModal } from './components/modals/NewWorkspaceModal';
import { SettingsModal } from './components/modals/SettingsModal';
import { BhumixAiBot } from './components/ai/BhumixAiBot';
import { playNotificationChime } from './utils/audio';

export default function App() {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('bhumix_theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Active Screen
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('dashboard');

  // Splash Screen
  const [showSplash, setShowSplash] = useState<boolean>(true);

  // Command Palette
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // AI Copilot Bot State
  const [isAiBotOpen, setIsAiBotOpen] = useState(false);

  // Push Notifications state
  const [notifications, setNotifications] = useState<PushNotification[]>(INITIAL_NOTIFICATIONS);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [activeToast, setActiveToast] = useState<PushNotification | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Blockchain Ledger state
  const [blocks, setBlocks] = useState<BlockchainBlock[]>(BLOCKCHAIN_BLOCKS);

  // Modals state
  const [selectedDeedParcel, setSelectedDeedParcel] = useState<CadastralParcel | null>(null);
  const [isDeedModalOpen, setIsDeedModalOpen] = useState(false);
  const [selectedMerkleBlock, setSelectedMerkleBlock] = useState<BlockchainBlock | null>(null);
  const [isMerkleModalOpen, setIsMerkleModalOpen] = useState(false);
  const [isNewWorkspaceModalOpen, setIsNewWorkspaceModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Sync Dark Mode class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('bhumix_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('bhumix_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Push notification triggers
  const triggerPushNotification = useCallback(
    (newNotif: Omit<PushNotification, 'id' | 'timestamp' | 'relativeTime' | 'read'>) => {
      const notif: PushNotification = {
        ...newNotif,
        id: `notif-${Date.now()}`,
        timestamp: new Date().toISOString(),
        relativeTime: 'Just now',
        read: false,
      };

      setNotifications((prev) => [notif, ...prev]);
      setActiveToast(notif);

      if (soundEnabled) {
        playNotificationChime();
      }

      // Browser Push API integration if granted
      if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
        try {
          new Notification(notif.title, {
            body: notif.description,
            icon: '/favicon.ico',
          });
        } catch {
          // ignore
        }
      }

      // Auto dismiss toast after 6s
      setTimeout(() => {
        setActiveToast((current) => (current?.id === notif.id ? null : current));
      }, 6500);
    },
    [soundEnabled]
  );

  // Realistic Push Simulator
  const handleSimulatePush = useCallback(() => {
    const simulationPool = [
      {
        title: 'New Section 26 Litigation Injunction in Nashik',
        description: 'District Civil Court issued interim stay on 18 Ha industrial cluster acquisition parcel #NSK-4902.',
        category: 'dispute' as const,
        severity: 'critical' as const,
        targetScreen: 'disputes' as const,
        location: 'Nashik Tehsil West',
      },
      {
        title: 'Block #1,492,085 Successfully Mined on Mainnet',
        description: 'SVAMITVA Phase 3 Orthomosaic Layer (Solapur East) cryptographically sealed with 24 consensus node endorsements.',
        category: 'ledger' as const,
        severity: 'info' as const,
        targetScreen: 'blockchain' as const,
        location: 'DoLR PoA Node #IND-DL-09',
      },
      {
        title: 'Cadastral Overlap Alert in Haveli Taluka',
        description: 'Automated geometric auditor detected 3.4m boundary discrepancy between revenue survey and drone orthomosaic.',
        category: 'cadastre' as const,
        severity: 'alert' as const,
        targetScreen: 'gis' as const,
        location: 'Mauje Wagholi Plot #412/1A',
      },
      {
        title: 'Policy Scenario Simulation #SIM-2026-089 Converged',
        description: '15% Agricultural ceiling run finished with 95% Confidence Interval in 3.8s across 10,000 iterations.',
        category: 'simulation' as const,
        severity: 'success' as const,
        targetScreen: 'policy-sim' as const,
        location: 'Param-Shakti Compute Node',
      },
    ];

    const randomChoice = simulationPool[Math.floor(Math.random() * simulationPool.length)];
    triggerPushNotification(randomChoice);
  }, [triggerPushNotification]);

  // Periodic heartbeat push event (every 75 seconds) to simulate live national data stream
  useEffect(() => {
    const interval = setInterval(() => {
      // 50% chance to simulate a realistic push update
      if (Math.random() > 0.5) {
        handleSimulatePush();
      }
    }, 75000);
    return () => clearInterval(interval);
  }, [handleSimulatePush]);

  // Append new block to ledger
  const handleAppendBlock = (title: string, details: string) => {
    const newHeight = (blocks[0]?.height || 1492084) + 1;
    const randomHex = Array.from({ length: 64 }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
    const newBlock: BlockchainBlock = {
      height: newHeight,
      timestamp: new Date().toISOString(),
      relativeTime: 'Just now',
      title,
      payloadDigestHash: `0x${randomHex}`,
      authorizedSigner: 'DoLR-Node-IND-DL-09 (Leader)',
      artifactType: 'State Consensus Digest',
      validationsCount: 24,
    };

    setBlocks((prev) => [newBlock, ...prev]);

    triggerPushNotification({
      title: `Block #${newHeight.toLocaleString()} Committed to Ledger`,
      description: `${title}. ${details}`,
      category: 'ledger',
      severity: 'info',
      targetScreen: 'blockchain',
      location: 'Mainnet #IND-DL-09',
    });
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleOpenDeedModal = (parcel: CadastralParcel) => {
    setSelectedDeedParcel(parcel);
    setIsDeedModalOpen(true);
  };

  const handleOpenMerkleModal = (block?: BlockchainBlock) => {
    setSelectedMerkleBlock(block || blocks[0] || null);
    setIsMerkleModalOpen(true);
  };

  const handleCreateWorkspace = (title: string, stateName: string, district: string) => {
    triggerPushNotification({
      title: `Research Workspace Created: ${title}`,
      description: `Targeting ${district}, ${stateName} with automated cadastral ULPIN and PoA consensus mounts.`,
      category: 'simulation',
      severity: 'success',
      targetScreen: 'workspaces',
      location: `${district}, ${stateName}`,
    });
    setActiveScreen('workspaces');
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div
      className={`h-screen max-h-screen overflow-hidden flex flex-col font-sans transition-colors selection:bg-teal-500 selection:text-white ${
        isDarkMode
          ? 'bg-[#0A1017] text-[#F3F6F8]'
          : 'bg-[#F8FAFC] text-slate-800'
      }`}
    >
      {/* Institutional Boot Splash Screen */}
      {showSplash && (
        <SplashScreen onComplete={() => setShowSplash(false)} autoDismissTime={2200} />
      )}

      {/* Top Navbar */}
      <Navbar
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onToggleNotificationDrawer={() => setIsNotificationDrawerOpen(!isNotificationDrawerOpen)}
        unreadNotificationsCount={unreadCount}
        onReopenSplash={() => setShowSplash(true)}
        onTriggerTestPush={handleSimulatePush}
        onOpenProfile={() => setActiveScreen('profile')}
        onOpenAiBot={() => setIsAiBotOpen(true)}
        activeScreen={activeScreen}
      />

      {/* Main Workspace Frame: Left Rail + Active Analytical Suite */}
      <div className="flex-1 min-h-0 flex overflow-hidden">
        {/* Left Navigation Rail (Settings & API fixed at bottom-left corner) */}
        <Sidebar
          activeScreen={activeScreen}
          onSelectScreen={setActiveScreen}
          onOpenSettings={() => setIsSettingsModalOpen(true)}
          isDarkMode={isDarkMode}
        />

        {/* Center Content Canvas (Only this right-side content scrolls) */}
        <main
          id="main-analytical-canvas"
          className="flex-1 min-h-0 overflow-y-auto p-4 md:p-6 lg:p-8 transition-colors"
        >
          {activeScreen === 'dashboard' && (
            <DashboardScreen
              onNavigate={setActiveScreen}
              onOpenNewWorkspaceModal={() => setIsNewWorkspaceModalOpen(true)}
              isDarkMode={isDarkMode}
            />
          )}

          {activeScreen === 'gis' && (
            <GisWorkspaceScreen
              onNavigate={setActiveScreen}
              onOpenDeedModal={handleOpenDeedModal}
              isDarkMode={isDarkMode}
            />
          )}

          {activeScreen === 'policy-sim' && (
            <PolicySimulationScreen
              onNavigate={setActiveScreen}
              onAttestBlock={handleAppendBlock}
              isDarkMode={isDarkMode}
            />
          )}

          {activeScreen === 'blockchain' && (
            <BlockchainProvenanceScreen
              blocks={blocks}
              onInspectBlock={(b) => handleOpenMerkleModal(b)}
              onAppendBlock={handleAppendBlock}
              onOpenMerkleModal={() => handleOpenMerkleModal()}
              isDarkMode={isDarkMode}
            />
          )}

          {activeScreen === 'disputes' && (
            <DisputeIntelligenceScreen
              onNavigate={setActiveScreen}
              isDarkMode={isDarkMode}
            />
          )}

          {activeScreen === 'workspaces' && (
            <ResearchWorkspacesScreen
              onNavigate={setActiveScreen}
              onOpenNewWorkspaceModal={() => setIsNewWorkspaceModalOpen(true)}
              isDarkMode={isDarkMode}
            />
          )}

          {activeScreen === 'legal' && (
            <LegalKnowledgeScreen
              onNavigate={setActiveScreen}
              isDarkMode={isDarkMode}
            />
          )}

          {activeScreen === 'profile' && (
            <ProfileScreen
              onNavigate={setActiveScreen}
              isDarkMode={isDarkMode}
            />
          )}
        </main>
      </div>

      {/* Real-Time Push Notification Center & Live Toast */}
      <NotificationCenter
        isOpen={isNotificationDrawerOpen}
        onClose={() => setIsNotificationDrawerOpen(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onClearAll={handleClearAll}
        onNavigateToScreen={(screen) => {
          setActiveScreen(screen);
          setIsNotificationDrawerOpen(false);
        }}
        activeToast={activeToast}
        onDismissToast={() => setActiveToast(null)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        onSimulatePush={handleSimulatePush}
        isDarkMode={isDarkMode}
      />

      {/* Global Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={setActiveScreen}
        onOpenAiBot={() => setIsAiBotOpen(true)}
        isDarkMode={isDarkMode}
      />

      {/* BHUMI-AI Cadastral Intelligence Copilot */}
      <BhumixAiBot
        isOpen={isAiBotOpen}
        onClose={() => setIsAiBotOpen(false)}
        onToggle={() => setIsAiBotOpen(!isAiBotOpen)}
        onNavigate={setActiveScreen}
        onOpenDeedModal={handleOpenDeedModal}
        onOpenMerkleModal={(block) => handleOpenMerkleModal(block)}
        isDarkMode={isDarkMode}
      />

      {/* Modals */}
      <ParcelDeedModal
        parcel={selectedDeedParcel}
        isOpen={isDeedModalOpen}
        onClose={() => setIsDeedModalOpen(false)}
        isDarkMode={isDarkMode}
      />

      <MerkleInspectorModal
        block={selectedMerkleBlock}
        isOpen={isMerkleModalOpen}
        onClose={() => setIsMerkleModalOpen(false)}
        isDarkMode={isDarkMode}
      />

      <NewWorkspaceModal
        isOpen={isNewWorkspaceModalOpen}
        onClose={() => setIsNewWorkspaceModalOpen(false)}
        onCreate={handleCreateWorkspace}
        isDarkMode={isDarkMode}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

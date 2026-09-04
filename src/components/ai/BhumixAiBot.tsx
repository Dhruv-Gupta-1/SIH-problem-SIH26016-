import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  X,
  Bot,
  Maximize2,
  Minimize2,
  Trash2,
  ExternalLink,
  ShieldAlert,
  ShieldCheck,
  MapPin,
  FileText,
  Scale,
  Sliders,
  Database,
  CloudRain,
  ChevronDown,
  Copy,
  Check,
  CornerDownLeft,
  Volume2,
  VolumeX,
  Layers,
  HelpCircle
} from 'lucide-react';
import { ActiveScreen, CadastralParcel } from '../../types';
import { CADASTRAL_PARCELS } from '../../data/mockData';
import {
  ChatMessage,
  BotAction,
  sendAiDecipherQuery,
  decipherQueryLocally
} from '../../utils/aiDecipherEngine';

interface BhumixAiBotProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
  onNavigate: (screen: ActiveScreen) => void;
  onOpenDeedModal: (parcel: CadastralParcel) => void;
  onOpenMerkleModal: (block?: any) => void;
  isDarkMode: boolean;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-1',
    sender: 'bot',
    text: `**Namaste! I am BHUMI-AI**, the official Cadastral & Land Governance Intelligence Copilot.

I can assist you in analyzing land records, resolving title encumbrances, and reviewing statutory precedents across:
• **Cadastral Land Parcels** (Mauje Wagholi 7/12 RoRs, title encumbrances, NDVI health)
• **Section 26 RFCTLARR Valuation** (Ready Reckoner circle rates, 100% solatium, rural multipliers)
• **Judicial & Statutory Precedents** (Bombay HC WP 4920/2025, Supreme Court Constitution Bench)
• **Blockchain Provenance** (Raft-BFT blocks, tamper-evident Merkle tree roots)
• **Agro-Climatic & Flood Exposure** (IMD Pune rainfall contours, NGT 500m riparian zones)

Select a topic or type your query below to begin.`,
    timestamp: 'Just now',
    actions: [
      {
        id: 'act-start-1',
        label: 'Status of Disputed Plot 412/1A',
        type: 'select_parcel',
        targetScreen: 'gis',
        parcelId: 'parcel-412-1a'
      },
      {
        id: 'act-start-2',
        label: 'How is Section 26 calculated?',
        type: 'navigate',
        targetScreen: 'policy-sim'
      },
      {
        id: 'act-start-3',
        label: 'Inspect Latest Blockchain Block',
        type: 'merkle',
        blockHeight: 1492084
      }
    ]
  }
];

const SUGGESTED_PROMPTS = [
  'What is the status and encumbrance of Plot 412/1A in Wagholi?',
  'How does Section 26 RFCTLARR calculate Solatium and Multiplier?',
  'Which parcels have active court stay orders?',
  'Show details of the latest blockchain block mined',
  'What is the IMD rainfall and flood risk in Wagholi?',
  'Summarize the Supreme Court Constitution Bench ruling on Section 24(2)'
];

export const BhumixAiBot: React.FC<BhumixAiBotProps> = ({
  isOpen,
  onClose,
  onToggle,
  onNavigate,
  onOpenDeedModal,
  onOpenMerkleModal,
  isDarkMode
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [ttsEnabled, setTtsEnabled] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, messages, isThinking]);

  // Handle Action Button click
  const handleExecuteAction = (action: BotAction) => {
    if (action.type === 'select_parcel' && action.parcelId) {
      const parcel = CADASTRAL_PARCELS.find(p => p.id === action.parcelId);
      if (parcel) {
        if (action.targetScreen) onNavigate(action.targetScreen);
      }
    } else if (action.type === 'deed' && action.parcelId) {
      const parcel = CADASTRAL_PARCELS.find(p => p.id === action.parcelId);
      if (parcel) {
        onOpenDeedModal(parcel);
      }
    } else if (action.type === 'merkle') {
      onOpenMerkleModal();
    } else if (action.targetScreen) {
      onNavigate(action.targetScreen);
    }
  };

  // Submit Query
  const handleSubmitQuery = async (queryText?: string) => {
    const queryToSubmit = (queryText || inputQuery).trim();
    if (!queryToSubmit || isThinking) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: queryToSubmit,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsThinking(true);

    try {
      const decipherResult = await sendAiDecipherQuery(queryToSubmit, messages);

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: decipherResult.answer,
        decipher: decipherResult.decipher,
        actions: decipherResult.actions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);

      // Web Speech synthesis if enabled
      if (ttsEnabled && typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          const cleanText = decipherResult.answer.replace(/[*#•`_]/g, '');
          const utterance = new SpeechSynthesisUtterance(cleanText.slice(0, 300));
          window.speechSynthesis.speak(utterance);
        } catch {
          // ignore
        }
      }
    } catch (err) {
      // Fallback
      const fallback = decipherQueryLocally(queryToSubmit);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: fallback.answer,
        decipher: fallback.decipher,
        actions: fallback.actions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 select-none">
        {!isOpen && (
          <button
            onClick={onToggle}
            id="open-ai-bot-button"
            className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#173F5F] hover:bg-[#002945] text-white shadow-xl hover:shadow-2xl border border-teal-400/40 cursor-pointer transition-all hover:scale-105"
            title="Ask BHUMI-AI to decipher any land, parcel, dispute or legal question"
          >
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-teal-400 opacity-60"></span>
              <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center text-white shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-extrabold tracking-wide uppercase flex items-center gap-1">
                <span>BHUMI-AI</span>
                <span className="text-[9px] px-1 py-0.2 rounded bg-teal-400/20 text-teal-300 font-mono font-bold">
                  Decipher
                </span>
              </span>
              <span className="text-[10px] text-teal-200/80 font-medium hidden sm:inline">
                Cadastral Copilot
              </span>
            </div>
          </button>
        )}
      </div>

      {/* Floating Active Bot Window */}
      {isOpen && (
        <div
          id="bhumi-ai-copilot-window"
          className={`fixed z-50 flex flex-col rounded-2xl border shadow-2xl transition-all duration-200 overflow-hidden font-sans ${
            isExpanded
              ? 'inset-4 sm:inset-8 md:inset-12'
              : 'bottom-4 right-4 w-[92vw] sm:w-[460px] md:w-[500px] h-[640px] max-h-[88vh]'
          } ${
            isDarkMode
              ? 'bg-[#0B131C] border-[#203244] text-slate-100 shadow-teal-950/40'
              : 'bg-white border-slate-300 text-slate-900 shadow-slate-400/40'
          }`}
        >
          {/* Header Bar */}
          <div
            className={`px-4 py-3 border-b flex items-center justify-between shrink-0 ${
              isDarkMode
                ? 'bg-[#0E1824] border-[#203244]'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#173F5F] border border-teal-400/40 flex items-center justify-center text-teal-300 shadow-sm">
                <Bot className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm tracking-wide text-[#002945] dark:text-white uppercase font-sans">
                    BHUMI-AI
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    ● Grounded
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-300 font-medium">
                  Official Cadastral Intelligence &amp; Legal Records Assistant
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              {/* TTS Voice Toggle */}
              <button
                onClick={() => setTtsEnabled(!ttsEnabled)}
                title={ttsEnabled ? 'Mute AI voice output' : 'Enable AI voice synthesis'}
                className={`p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors ${
                  ttsEnabled ? 'text-teal-400 font-bold' : 'text-slate-400'
                }`}
              >
                {ttsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Clear Chat */}
              <button
                onClick={handleClearChat}
                title="Reset conversation"
                className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-400 hover:text-rose-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              {/* Expand/Shrink Toggle */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Shrink window' : 'Expand window'}
                className="hidden sm:inline-flex p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                title="Minimize Copilot"
                className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Context Banner */}
          <div className="px-3.5 py-1.5 bg-teal-500/10 border-b border-teal-500/20 text-[11px] text-teal-700 dark:text-teal-300 flex items-center justify-between font-sans shrink-0">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-teal-500 shrink-0" />
              <span>Real-time cadastral analysis &amp; statutory record verification active.</span>
            </span>
            <span className="text-[10px] font-mono font-bold text-slate-400 hidden sm:inline">
              DoLR #IND-DL-09
            </span>
          </div>

          {/* Chat Messages Feed */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-4 text-xs font-sans">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[92%] sm:max-w-[85%] rounded-xl p-3 shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-[#173F5F] text-white rounded-br-none'
                      : isDarkMode
                      ? 'bg-[#14202C] border border-[#223547] text-slate-200 rounded-bl-none'
                      : 'bg-slate-100 border border-slate-200 text-slate-800 rounded-bl-none'
                  }`}
                >
                  {/* For Bot messages: Render Decipher Breakdown Card if available */}
                  {msg.sender === 'bot' && msg.decipher && (
                    <div className="mb-2.5 p-2 rounded-lg bg-black/20 border border-teal-500/30 text-[11px] space-y-1.5 font-sans">
                      <div className="flex items-center justify-between gap-2 border-b border-slate-700/40 pb-1">
                        <div className="flex items-center gap-1.5">
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-bold font-mono uppercase bg-teal-500/20 text-teal-300 border border-teal-400/40">
                            {msg.decipher.intentLabel || msg.decipher.intent}
                          </span>
                        </div>
                        {msg.decipher.riskRating && (
                          <span
                            className={`px-1.5 py-0.2 rounded text-[10px] font-bold font-mono ${
                              msg.decipher.riskRating === 'HIGH RISK' || msg.decipher.riskRating === 'CRITICAL'
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                                : msg.decipher.riskRating === 'CLEAR'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                            }`}
                          >
                            {msg.decipher.riskRating}
                          </span>
                        )}
                      </div>

                      {/* Entities detected */}
                      {msg.decipher.detectedEntities && msg.decipher.detectedEntities.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1 text-[10px]">
                          <span className="text-slate-400 font-medium">Deciphered Entities:</span>
                          {msg.decipher.detectedEntities.map((ent, i) => (
                            <span
                              key={i}
                              className="px-1.5 py-0.2 rounded bg-slate-800 text-teal-200 border border-slate-700 font-mono"
                            >
                              {ent}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Sources matched */}
                      {msg.decipher.matchedSources && msg.decipher.matchedSources.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1 text-[10px]">
                          <span className="text-slate-400 font-medium">Verified Records:</span>
                          {msg.decipher.matchedSources.map((src, i) => (
                            <span key={i} className="text-emerald-400 font-mono">
                              • {src}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Message Body Content with Markdown-like bold and bullet formatting */}
                  <div className="space-y-1.5 whitespace-pre-wrap leading-relaxed text-[12px]">
                    {msg.text.split('\n').map((line, idx) => {
                      if (line.startsWith('• ') || line.startsWith('- ')) {
                        return (
                          <div key={idx} className="flex items-start gap-1.5 ml-1">
                            <span className="text-teal-500 shrink-0">•</span>
                            <span>{formatMarkdownInline(line.slice(2))}</span>
                          </div>
                        );
                      }
                      if (/^\d+\.\s/.test(line)) {
                        const num = line.match(/^(\d+)\.\s/)?.[1];
                        const rest = line.replace(/^\d+\.\s/, '');
                        return (
                          <div key={idx} className="flex items-start gap-1.5 ml-1 mt-1">
                            <span className="font-mono text-teal-400 font-bold shrink-0">{num}.</span>
                            <span>{formatMarkdownInline(rest)}</span>
                          </div>
                        );
                      }
                      return (
                        <p key={idx} className={line.trim() === '' ? 'h-1' : ''}>
                          {formatMarkdownInline(line)}
                        </p>
                      );
                    })}
                  </div>

                  {/* Actions buttons */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-slate-700/50 flex flex-wrap gap-1.5">
                      {msg.actions.map((act) => (
                        <button
                          key={act.id}
                          onClick={() => handleExecuteAction(act)}
                          className="px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1.5 bg-teal-600/20 hover:bg-teal-600/30 text-teal-300 border border-teal-500/40 cursor-pointer transition-all hover:scale-102"
                        >
                          <ActionIcon type={act.type} />
                          <span>{act.label}</span>
                          <ExternalLink className="w-3 h-3 text-teal-400/70" />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Footer & Copy */}
                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400/80 pt-1">
                    <span>{msg.timestamp}</span>
                    {msg.sender === 'bot' && (
                      <button
                        onClick={() => handleCopyText(msg.text, msg.id)}
                        className="flex items-center gap-1 hover:text-teal-400 transition-colors"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Thinking / Deciphering State Indicator */}
            {isThinking && (
              <div className="flex items-start gap-2">
                <div className="p-3 rounded-xl rounded-bl-none bg-slate-800/60 border border-teal-500/30 text-teal-300 text-xs flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-teal-400 animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-teal-400 animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 rounded-full bg-teal-400 animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                  <span className="font-mono text-[11px]">
                    Analyzing legal entities &amp; verifying cadastral records...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Starter Chips */}
          <div
            className={`px-3 py-2 border-t shrink-0 overflow-x-auto no-scrollbar flex items-center gap-1.5 ${
              isDarkMode ? 'bg-[#0E1824]/60 border-[#203244]' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="text-[10px] text-slate-400 uppercase font-bold shrink-0 font-mono">
              Ask:
            </span>
            {SUGGESTED_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSubmitQuery(prompt)}
                disabled={isThinking}
                className="px-2.5 py-1 rounded-full text-[11px] whitespace-nowrap bg-slate-800/80 dark:bg-slate-800 hover:bg-teal-900/60 text-slate-300 hover:text-teal-200 border border-slate-700 hover:border-teal-500/50 transition-colors cursor-pointer shrink-0 disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Bottom Query Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitQuery();
            }}
            className={`p-3 border-t shrink-0 flex items-center gap-2 ${
              isDarkMode ? 'bg-[#0E1824] border-[#203244]' : 'bg-white border-slate-200'
            }`}
          >
            <input
              ref={inputRef}
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask about cadastral parcels, disputes, 7/12 RoR, Section 26, or blockchain..."
              disabled={isThinking}
              className={`flex-1 px-3.5 py-2.5 rounded-xl text-xs border transition-colors outline-none focus:ring-2 focus:ring-teal-500/40 ${
                isDarkMode
                  ? 'bg-[#14202C] border-[#25394C] text-white placeholder-slate-400'
                  : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-500'
              }`}
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isThinking}
              className={`p-2.5 rounded-xl flex items-center justify-center transition-all ${
                inputQuery.trim() && !isThinking
                  ? 'bg-teal-600 hover:bg-teal-500 text-white cursor-pointer shadow-md'
                  : 'bg-slate-700 text-slate-400 cursor-not-allowed opacity-60'
              }`}
              title="Submit query to AI Decipher"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

// Helper: Action Icon mapper
function ActionIcon({ type }: { type: BotAction['type'] }) {
  switch (type) {
    case 'select_parcel':
      return <MapPin className="w-3.5 h-3.5 text-teal-400" />;
    case 'deed':
      return <FileText className="w-3.5 h-3.5 text-amber-400" />;
    case 'merkle':
      return <Database className="w-3.5 h-3.5 text-sky-400" />;
    case 'navigate':
    default:
      return <Layers className="w-3.5 h-3.5 text-indigo-400" />;
  }
}

// Helper: Render bold and monospace inline markdown
function formatMarkdownInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  // Regex matches `code`, **bold**, *italic*
  const regex = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;
  let lastIdx = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      parts.push(text.substring(lastIdx, match.index));
    }
    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={match.index} className="font-semibold text-teal-300 dark:text-teal-300">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        <code key={match.index} className="px-1 py-0.2 rounded bg-black/40 text-emerald-400 font-mono text-[11px]">
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      parts.push(
        <em key={match.index} className="italic text-slate-300">
          {token.slice(1, -1)}
        </em>
      );
    }
    lastIdx = regex.lastIndex;
  }

  if (lastIdx < text.length) {
    parts.push(text.substring(lastIdx));
  }

  return parts;
}

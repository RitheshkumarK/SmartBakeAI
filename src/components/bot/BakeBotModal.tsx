import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  X, 
  Bot, 
  User, 
  RotateCcw, 
  ChevronRight,
  Zap
} from 'lucide-react';
import { useBakery } from '../../context/BakeryContext';
import { BakeBotService, BotMessage } from '../../services/bakeBotService';

export const BakeBotModal: React.FC = () => {
  const { 
    isBotOpen, 
    setIsBotOpen, 
    products, 
    ingredients, 
    productionPlans, 
    wasteRecords, 
    purchases, 
    alerts, 
    todaySalesTotal,
    setActiveTab,
    generateProductionPlan,
    addToast
  } = useBakery();

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<BotMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      timestamp: 'Just now',
      text: `👋 **Hello! I'm BakeBot**, your AI bakery operations co-pilot.\n\nI'm constantly analyzing your sales history, ingredient shelves, oven schedules, and expiry dates to help you **maximize fresh sales and eliminate food waste**.\n\nHow can I help your bakery right now?`,
      actionButtons: [
        { label: '🥐 What should I bake today?', action: 'ask', payload: 'What should I bake today?' },
        { label: '⚠️ Which ingredients are running low?', action: 'ask', payload: 'Which ingredients are running low?' },
        { label: '⏰ What expires tomorrow?', action: 'ask', payload: 'What expires tomorrow?' },
      ]
    }
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickPrompts = [
    'What should I bake today?',
    'Which ingredients are running low?',
    'What expires tomorrow?',
    'What is my best-selling product?',
    'How can I reduce food waste?',
    'How much flour should I purchase?',
    'What will tomorrow\'s demand be?'
  ];

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: BotMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = BakeBotService.getResponse(query, {
        products,
        ingredients,
        productionPlans,
        wasteRecords,
        purchases,
        alerts,
        todaySales: todaySalesTotal
      });
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 550);
  };

  const handleActionClick = (action: string, payload?: any) => {
    if (action === 'ask') {
      handleSendMessage(payload);
    } else if (action === 'navigate') {
      setActiveTab(payload);
      setIsBotOpen(false);
      addToast('info', 'Navigation', `Opened ${payload} view.`);
    } else if (action === 'accept_all_plans') {
      generateProductionPlan();
      setActiveTab('production');
      setIsBotOpen(false);
      addToast('success', 'Production Schedule Updated', 'All AI recommendations loaded into oven plan.');
    } else if (action === 'order_flour') {
      setActiveTab('purchase');
      setIsBotOpen(false);
      addToast('info', 'Purchase Order', 'Opening Purchase Planner for Flour re-stock.');
    } else if (action === 'apply_discount') {
      addToast('success', 'Special Discount Applied', 'Activated 30% off evening clearance tags on expiring stock.');
    } else if (action === 'log_waste') {
      setActiveTab('waste');
      setIsBotOpen(false);
    }
  };

  return (
    <>
      {/* Floating Action Button (Always available in app) */}
      {!isBotOpen && (
        <button
          onClick={() => setIsBotOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-chocolate-900 via-chocolate-800 to-caramel-600 text-white shadow-warm-xl hover:shadow-glow-caramel hover:scale-105 transition-all duration-300 group border border-caramel-400/40"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-caramel-500 flex items-center justify-center text-white">
              <Bot className="w-5 h-5" />
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-chocolate-900 animate-pulse" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-bold leading-tight flex items-center gap-1.5">
              <span>BakeBot AI</span>
              <span className="text-[10px] font-extrabold bg-caramel-400/30 px-1.5 py-0.2 rounded text-caramel-200">LIVE</span>
            </div>
            <div className="text-[10px] text-cream-200">Ask operations assistant</div>
          </div>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isBotOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[94vw] sm:w-[460px] h-[640px] max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-cream-300 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-chocolate-950 via-chocolate-900 to-chocolate-800 text-cream-50 p-4 sm:p-5 flex items-center justify-between border-b border-caramel-500/30 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-caramel-500 to-caramel-600 flex items-center justify-center text-white shadow-md">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-base text-cream-50">BakeBot AI</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-cream-300/80">Real-time bakery intelligence</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setMessages([{
                  id: `welcome-${Date.now()}`,
                  sender: 'bot',
                  timestamp: 'Just now',
                  text: `🔄 Chat history reset. How can I help with today's baking or inventory?`,
                  actionButtons: [
                    { label: '🥐 What should I bake today?', action: 'ask', payload: 'What should I bake today?' },
                    { label: '⚠️ Which ingredients are running low?', action: 'ask', payload: 'Which ingredients are running low?' }
                  ]
                }])}
                className="p-2 text-cream-300 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
                title="Reset conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsBotOpen(false)}
                className="p-2 text-cream-300 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
                title="Close BakeBot"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Carousel */}
          <div className="px-3 py-2 bg-cream-100/70 border-b border-cream-200/80 overflow-x-auto flex gap-1.5 no-scrollbar shrink-0">
            {quickPrompts.map(prompt => (
              <button
                key={prompt}
                onClick={() => handleSendMessage(prompt)}
                className="shrink-0 text-xs px-2.5 py-1 rounded-full bg-white hover:bg-caramel-50 text-chocolate-800 border border-cream-300 hover:border-caramel-300 font-medium transition-colors shadow-warm-sm flex items-center gap-1"
              >
                <Zap className="w-3 h-3 text-caramel-500" />
                <span>{prompt}</span>
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-cream-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-xl bg-chocolate-900 text-caramel-400 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm shadow-warm-sm ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-caramel-500 to-caramel-600 text-white font-medium rounded-tr-none'
                    : 'bg-white text-chocolate-900 border border-cream-200 rounded-tl-none'
                }`}>
                  <div className="whitespace-pre-line leading-relaxed">
                    {msg.text}
                  </div>

                  {/* Interactive Action Buttons */}
                  {msg.actionButtons && msg.actionButtons.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-cream-100 flex flex-wrap gap-1.5">
                      {msg.actionButtons.map((btn, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleActionClick(btn.action, btn.payload)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-cream-100 hover:bg-caramel-500 hover:text-white text-chocolate-800 text-xs font-bold transition-all border border-cream-300 hover:border-caramel-500 shadow-sm"
                        >
                          <span>{btn.label}</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  )}

                  <div className={`text-[10px] mt-1.5 text-right ${
                    msg.sender === 'user' ? 'text-white/70' : 'text-chocolate-400'
                  }`}>
                    {msg.timestamp}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-xl bg-caramel-500 text-white flex items-center justify-center shrink-0 mt-1 shadow-sm">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-xl bg-chocolate-900 text-caramel-400 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 bg-white rounded-2xl border border-cream-200 rounded-tl-none flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-caramel-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-caramel-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-caramel-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3.5 bg-white border-t border-cream-200/80 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask BakeBot anything about your bakery..."
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-2xl bg-cream-100/70 text-chocolate-900 placeholder-chocolate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500 border border-cream-200"
              />
              <button
                type="submit"
                disabled={!inputQuery.trim()}
                className="p-2.5 rounded-2xl bg-caramel-500 hover:bg-caramel-600 disabled:opacity-40 text-white shadow-warm transition-all shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

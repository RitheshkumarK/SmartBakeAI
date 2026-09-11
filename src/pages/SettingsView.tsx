import React, { useState } from 'react';
import { 
  Settings, 
  Store, 
  User, 
  Bell, 
  Sparkles, 
  Sliders, 
  RotateCcw, 
  ShieldCheck, 
  Check, 
  Key,
  Flame,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { useBakery } from '../context/BakeryContext';
import { BentoCard } from '../components/common/BentoCard';

export const SettingsView: React.FC = () => {
  const { 
    user, 
    setUser, 
    settings, 
    updateSettings, 
    switchScenario, 
    resetAllData, 
    addToast 
  } = useBakery();

  // Bakery profile state
  const [bakeryName, setBakeryName] = useState(settings.bakeryName);
  const [currency, setCurrency] = useState(settings.currency);

  // User profile state
  const [userName, setUserName] = useState(user.name);
  const [userEmail, setUserEmail] = useState(user.email);
  const [userRole, setUserRole] = useState(user.role);

  // Thresholds
  const [lowStockPercent, setLowStockPercent] = useState(settings.lowStockThresholdPercent);
  const [expiryDays, setExpiryDays] = useState(settings.expiryWarningDays);
  const [aiSensitivity, setAiSensitivity] = useState(settings.aiSensitivity);
  const [weekendMultiplier, setWeekendMultiplier] = useState(settings.weekendSurgeMultiplier);
  const [geminiKey, setGeminiKey] = useState(settings.geminiApiKey || '');

  const handleSaveBakeryProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({ bakeryName, currency });
    setUser({ ...user, bakery_name: bakeryName });
    addToast('success', 'Bakery Profile Saved', 'Store branding updated.');
  };

  const handleSaveUserProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({ ...user, name: userName, email: userEmail, role: userRole as any });
    addToast('success', 'User Profile Saved', 'Profile settings updated.');
  };

  const handleSaveAISettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      lowStockThresholdPercent: Number(lowStockPercent),
      expiryWarningDays: Number(expiryDays),
      aiSensitivity,
      weekendSurgeMultiplier: Number(weekendMultiplier),
      geminiApiKey: geminiKey
    });
    addToast('success', 'AI Configuration Updated', 'Forecasting model recalibrated.');
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="font-display font-black text-2xl sm:text-3xl text-chocolate-950 tracking-tight">
          Settings & AI Configuration ⚙️
        </h1>
        <p className="text-sm text-chocolate-600 mt-1">
          Customize bakery profiles, safety stock thresholds, and AI prediction parameters.
        </p>
      </div>

      {/* Interactive Demo Scenarios Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-caramel-50 to-cream-100 border border-caramel-300 shadow-warm">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-caramel-600" />
          <h3 className="font-bold text-sm text-chocolate-950 uppercase tracking-wider">
            Interactive Test Drive Scenarios
          </h3>
        </div>
        <p className="text-xs text-chocolate-600 mb-4">
          Switch between real-world operational situations to observe dynamic reactions in demand forecasts, alerts, and production recommendations:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => switchScenario('normal')}
            className="p-3 rounded-2xl bg-white hover:bg-cream-50 border border-cream-300 text-left transition-all shadow-warm-sm hover:border-caramel-400 group"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-chocolate-900 group-hover:text-caramel-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Normal Shift</span>
            </div>
            <p className="text-[11px] text-chocolate-500 mt-1">Balanced baseline demand and healthy stock levels.</p>
          </button>

          <button
            onClick={() => switchScenario('weekend_rush')}
            className="p-3 rounded-2xl bg-white hover:bg-cream-50 border border-cream-300 text-left transition-all shadow-warm-sm hover:border-caramel-400 group"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-chocolate-900 group-hover:text-caramel-700">
              <Flame className="w-4 h-4 text-caramel-600" />
              <span>Weekend Rush (+35%)</span>
            </div>
            <p className="text-[11px] text-chocolate-500 mt-1">Surge foot traffic triggers higher bread production.</p>
          </button>

          <button
            onClick={() => switchScenario('high_waste')}
            className="p-3 rounded-2xl bg-white hover:bg-cream-50 border border-cream-300 text-left transition-all shadow-warm-sm hover:border-caramel-400 group"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-chocolate-900 group-hover:text-caramel-700">
              <RefreshCw className="w-4 h-4 text-rose-600" />
              <span>Perishable Waste Risk</span>
            </div>
            <p className="text-[11px] text-chocolate-500 mt-1">Expiring heavy cream & milk warnings triggered.</p>
          </button>

          <button
            onClick={() => switchScenario('stockout')}
            className="p-3 rounded-2xl bg-white hover:bg-cream-50 border border-cream-300 text-left transition-all shadow-warm-sm hover:border-caramel-400 group"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-chocolate-900 group-hover:text-caramel-700">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Flour Shortage Crisis</span>
            </div>
            <p className="text-[11px] text-chocolate-500 mt-1">Flour drops to 1kg; triggers High Priority PO.</p>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bakery Profile */}
        <BentoCard title="Bakery Store Profile" subtitle="Your bakery business identity">
          <form onSubmit={handleSaveBakeryProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-600 mb-1.5">
                Bakery Name
              </label>
              <input
                type="text"
                value={bakeryName}
                onChange={(e) => setBakeryName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-white text-chocolate-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-600 mb-1.5">
                  Currency Symbol
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-white text-chocolate-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500 font-bold"
                >
                  <option value="₹">₹ (INR - Rupee)</option>
                  <option value="$">$ (USD - Dollar)</option>
                  <option value="€">€ (EUR - Euro)</option>
                  <option value="£">£ (GBP - Pound)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-600 mb-1.5">
                  Daily Shift Hours
                </label>
                <div className="px-4 py-2.5 rounded-xl border border-cream-200 bg-cream-100/70 text-chocolate-700 text-xs font-medium">
                  06:00 AM – 09:30 PM
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-caramel-500 hover:bg-caramel-600 text-white font-bold text-xs shadow-warm transition-all"
            >
              Save Bakery Details
            </button>
          </form>
        </BentoCard>

        {/* User Profile */}
        <BentoCard title="User Account" subtitle="Manager credentials and permissions">
          <form onSubmit={handleSaveUserProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-600 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-white text-chocolate-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-600 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-white text-chocolate-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-600 mb-1.5">
                  Role
                </label>
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-white text-chocolate-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500"
                >
                  <option value="Bakery Manager">Bakery Manager</option>
                  <option value="Head Baker">Head Baker</option>
                  <option value="Store Owner">Store Owner</option>
                  <option value="Inventory Specialist">Inventory Specialist</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-chocolate-900 hover:bg-chocolate-950 text-white font-bold text-xs shadow-warm transition-all"
            >
              Update Profile
            </button>
          </form>
        </BentoCard>
      </div>

      {/* AI Engine & Threshold Configuration */}
      <BentoCard title="🤖 AI Engine & Threshold Tuning" subtitle="Control sensitivity, weekend surge multipliers, and external LLM keys">
        <form onSubmit={handleSaveAISettings} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-600 mb-1.5">
                AI Forecasting Sensitivity
              </label>
              <select
                value={aiSensitivity}
                onChange={(e) => setAiSensitivity(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-white text-chocolate-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500 font-semibold"
              >
                <option value="Conservative">Conservative (-10% Safety Cushion)</option>
                <option value="Balanced">Balanced (Standard Optimal Yield)</option>
                <option value="Aggressive">Aggressive (+15% Peak Demand Capture)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-600 mb-1.5">
                Weekend Surge Multiplier
              </label>
              <input
                type="number"
                step="0.05"
                min="1.0"
                max="2.0"
                value={weekendMultiplier}
                onChange={(e) => setWeekendMultiplier(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-white text-chocolate-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500 font-bold"
              />
              <span className="text-[10px] text-chocolate-400 mt-1 block">Default: 1.35 (+35% Friday/Saturday rush)</span>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-600 mb-1.5">
                Expiry Radar Warning Window (Days)
              </label>
              <input
                type="number"
                min="1"
                max="14"
                value={expiryDays}
                onChange={(e) => setExpiryDays(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-white text-chocolate-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500 font-bold"
              />
              <span className="text-[10px] text-chocolate-400 mt-1 block">Alert items with &le; {expiryDays} days remaining</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-600 mb-1.5">
              Gemini API Key (Optional External LLM Integration)
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-chocolate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                placeholder="AIzaSy... (Leave empty to use built-in local BakeFlow engine)"
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream-300 bg-white text-chocolate-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500"
              />
            </div>
            <p className="text-[11px] text-chocolate-500 mt-1">
              BakeFlow AI includes a comprehensive transparent local algorithmic forecasting model. You can optionally connect a Google Gemini API key for advanced conversational chat.
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-cream-200">
            <button
              type="button"
              onClick={resetAllData}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Factory Demo Data</span>
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-caramel-500 hover:bg-caramel-600 text-white font-bold text-xs sm:text-sm shadow-warm transition-all"
            >
              Save AI Preferences
            </button>
          </div>
        </form>
      </BentoCard>
    </div>
  );
};

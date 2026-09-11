import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Sparkles, 
  Menu, 
  ExternalLink,
  ChevronDown,
  RefreshCw,
  Flame,
  AlertOctagon,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useBakery } from '../../context/BakeryContext';

interface NavbarProps {
  onOpenMobileNav: () => void;
  onOpenQuickSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMobileNav, onOpenQuickSearch }) => {
  const { 
    user, 
    setUser, 
    alerts, 
    markAlertAsRead, 
    setActiveTab, 
    setIsBotOpen,
    switchScenario,
    settings
  } = useBakery();

  const [showAlertsDropdown, setShowAlertsDropdown] = useState(false);
  const [showScenarioDropdown, setShowScenarioDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const unreadAlerts = alerts.filter(a => a.status === 'unread');

  const demoUsers = [
    { name: 'Aryan Sharma', role: 'Bakery Manager', email: 'manager@bakeflow.ai' },
    { name: 'Marcus Laurent', role: 'Head Baker', email: 'baker@bakeflow.ai' },
    { name: 'Priya Verma', role: 'Store Owner', email: 'owner@bakeflow.ai' },
  ];

  const scenarios = [
    { id: 'normal', name: 'Standard Operations', icon: ShieldCheck, desc: 'Balanced baseline demand' },
    { id: 'weekend_rush', name: 'Weekend Rush (+35%)', icon: Flame, desc: 'High foot-traffic spike' },
    { id: 'high_waste', name: 'Perishable Waste Alert', icon: RefreshCw, desc: 'Expiring cream & dairy risk' },
    { id: 'stockout', name: 'Flour Shortage Emergency', icon: AlertOctagon, desc: 'Critical supply bottleneck' },
  ];

  return (
    <header className="h-20 glass-nav px-4 sm:px-8 flex items-center justify-between gap-4 sticky top-0 z-20">
      {/* Left: Mobile hamburger & Search bar */}
      <div className="flex items-center gap-3 sm:gap-4 flex-1 max-w-xl">
        <button
          onClick={onOpenMobileNav}
          className="md:hidden p-2 rounded-xl text-chocolate-700 hover:bg-cream-100 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Global Search Trigger */}
        <button
          onClick={onOpenQuickSearch}
          className="w-full max-w-md flex items-center justify-between px-4 py-2.5 rounded-2xl bg-cream-100/80 hover:bg-cream-200/70 border border-cream-300/60 text-chocolate-600 text-sm transition-all group shadow-warm-sm"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-caramel-600 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Quick search products, stock, commands...</span>
            <span className="sm:hidden">Search BakeFlow...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-bold text-chocolate-500 bg-white rounded-md border border-cream-300 shadow-sm">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Scenario Simulator Dropdown */}
        <div className="relative hidden lg:block">
          <button
            onClick={() => setShowScenarioDropdown(!showScenarioDropdown)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-caramel-50 text-caramel-800 border border-caramel-200/80 hover:bg-caramel-100 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-caramel-600 animate-pulse" />
            <span>Simulate: {settings.weekendSurgeMultiplier > 1.4 ? 'Weekend Rush' : (settings.aiSensitivity === 'Conservative' ? 'Waste Risk' : 'Standard')}</span>
            <ChevronDown className="w-3 h-3 text-caramel-600" />
          </button>

          {showScenarioDropdown && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-cream-200 p-2 z-50 animate-in fade-in zoom-in-95">
              <p className="text-[11px] font-bold text-chocolate-400 uppercase px-3 py-1.5">Interactive Demo Scenarios</p>
              {scenarios.map(s => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      switchScenario(s.id as any);
                      setShowScenarioDropdown(false);
                    }}
                    className="w-full flex items-start gap-3 p-2.5 rounded-xl text-left hover:bg-cream-100 transition-colors group"
                  >
                    <div className="p-1.5 rounded-lg bg-cream-100 text-chocolate-700 group-hover:bg-caramel-500 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-chocolate-900">{s.name}</div>
                      <div className="text-[11px] text-chocolate-500">{s.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* View Landing Page Button */}
        <button
          onClick={() => setActiveTab('landing')}
          className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-chocolate-700 hover:text-chocolate-950 hover:bg-cream-100 transition-colors"
          title="Return to Public Landing Page"
        >
          <span>Landing Page</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>

        {/* Smart Alerts Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowAlertsDropdown(!showAlertsDropdown)}
            className="p-2.5 rounded-2xl bg-cream-100/80 hover:bg-cream-200/80 border border-cream-200 text-chocolate-700 relative transition-colors shadow-warm-sm"
          >
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-chocolate-700" />
            {unreadAlerts.length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center justify-center animate-bounce shadow-md">
                {unreadAlerts.length}
              </span>
            )}
          </button>

          {showAlertsDropdown && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-cream-200 p-4 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-cream-200">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-caramel-600" />
                  <h4 className="font-bold text-sm text-chocolate-900">Smart Alerts</h4>
                </div>
                <span className="text-[11px] font-semibold text-chocolate-500">
                  {unreadAlerts.length} Unread
                </span>
              </div>

              <div className="mt-3 space-y-2 max-h-72 overflow-y-auto">
                {alerts.slice(0, 4).map(alert => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      alert.status === 'unread' ? 'bg-caramel-50/50 border-caramel-200' : 'bg-cream-50 border-cream-200 opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className={`font-bold ${
                        alert.severity === 'critical' ? 'text-rose-600' : (alert.severity === 'warning' ? 'text-amber-600' : 'text-sky-600')
                      }`}>
                        {alert.title}
                      </span>
                      <span className="text-[10px] text-chocolate-400">{alert.time}</span>
                    </div>
                    <p className="text-xs text-chocolate-700 mt-1 leading-relaxed">{alert.message}</p>
                    {alert.status === 'unread' && (
                      <button
                        onClick={() => markAlertAsRead(alert.id)}
                        className="mt-2 text-[11px] font-semibold text-caramel-700 hover:text-caramel-900 flex items-center gap-1"
                      >
                        <Check className="w-3 h-3" /> Mark as read
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setShowAlertsDropdown(false);
                  setActiveTab('alerts');
                }}
                className="w-full mt-3 py-2 rounded-xl text-center text-xs font-semibold bg-cream-100 hover:bg-cream-200 text-chocolate-900 transition-colors"
              >
                Open Smart Alerts Center →
              </button>
            </div>
          )}
        </div>

        {/* BakeBot Trigger */}
        <button
          onClick={() => setIsBotOpen(true)}
          className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-2xl bg-gradient-to-r from-chocolate-900 to-chocolate-800 text-cream-50 hover:from-chocolate-950 hover:to-chocolate-900 shadow-warm font-semibold text-xs sm:text-sm transition-all"
        >
          <Sparkles className="w-4 h-4 text-caramel-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span className="hidden sm:inline">Ask BakeBot</span>
          <span className="sm:hidden">AI</span>
        </button>

        {/* Profile Avatar & Quick Switch */}
        <div className="relative">
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center gap-2 p-1.5 sm:px-2.5 rounded-2xl hover:bg-cream-100 transition-colors"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-xl object-cover border border-caramel-300/80 shadow-sm"
            />
            <div className="hidden xl:block text-left">
              <div className="text-xs font-bold text-chocolate-900 truncate max-w-[120px]">{user.name}</div>
              <div className="text-[10px] text-chocolate-500 truncate">{user.role}</div>
            </div>
            <ChevronDown className="hidden xl:block w-3.5 h-3.5 text-chocolate-400" />
          </button>

          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-3xl shadow-2xl border border-cream-200 p-3 z-50 animate-in fade-in zoom-in-95">
              <div className="px-3 py-2 border-b border-cream-100 mb-2">
                <p className="text-xs font-bold text-chocolate-900">{user.bakery_name}</p>
                <p className="text-[11px] text-chocolate-500 truncate">{user.email}</p>
              </div>

              <p className="text-[10px] font-bold uppercase tracking-wider text-chocolate-400 px-3 mb-1">
                Switch Demo Persona
              </p>
              {demoUsers.map(du => (
                <button
                  key={du.email}
                  onClick={() => {
                    setUser({ ...user, name: du.name, role: du.role as any, email: du.email });
                    setShowProfileDropdown(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors ${
                    user.role === du.role ? 'bg-caramel-50 font-bold text-caramel-900' : 'hover:bg-cream-100 text-chocolate-700'
                  }`}
                >
                  <div>
                    <div>{du.name}</div>
                    <div className="text-[10px] text-chocolate-400 font-normal">{du.role}</div>
                  </div>
                  {user.role === du.role && <Check className="w-3.5 h-3.5 text-caramel-600" />}
                </button>
              ))}

              <div className="mt-2 pt-2 border-t border-cream-100">
                <button
                  onClick={() => {
                    setShowProfileDropdown(false);
                    setActiveTab('settings');
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-chocolate-700 hover:bg-cream-100"
                >
                  ⚙️ Bakery Settings
                </button>
                <button
                  onClick={() => {
                    setShowProfileDropdown(false);
                    setActiveTab('auth');
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50"
                >
                  🚪 Logout / Switch Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

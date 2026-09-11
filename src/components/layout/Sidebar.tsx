import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Sparkles, 
  ChefHat, 
  ClockAlert, 
  Bell, 
  ShoppingCart, 
  BarChart3, 
  Recycle, 
  MessageSquareText, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Store
} from 'lucide-react';
import { useBakery } from '../../context/BakeryContext';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (c: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const { activeTab, setActiveTab, alerts, setIsBotOpen } = useBakery();

  const unreadAlertsCount = alerts.filter(a => a.status === 'unread').length;

  const navItems = [
    { id: 'command', label: 'Command Center', icon: LayoutDashboard, badge: null },
    { id: 'inventory', label: 'Inventory', icon: Package, badge: null },
    { id: 'forecast', label: 'AI Forecast', icon: Sparkles, badge: 'AI' },
    { id: 'production', label: 'Production Planner', icon: ChefHat, badge: null },
    { id: 'expiry', label: 'Expiry Radar', icon: ClockAlert, badge: '7 Due' },
    { id: 'alerts', label: 'Smart Alerts', icon: Bell, badge: unreadAlertsCount > 0 ? `${unreadAlertsCount}` : null },
    { id: 'purchase', label: 'Purchase Planner', icon: ShoppingCart, badge: null },
    { id: 'analytics', label: 'Sales Analytics', icon: BarChart3, badge: null },
    { id: 'waste', label: 'Waste Intelligence', icon: Recycle, badge: '-23%' },
    { id: 'bot', label: 'BakeBot AI', icon: MessageSquareText, badge: 'Active' },
    { id: 'settings', label: 'Settings', icon: Settings, badge: null },
  ];

  const handleNavClick = (id: string) => {
    if (id === 'bot') {
      setIsBotOpen(true);
    } else {
      setActiveTab(id);
    }
  };

  return (
    <aside className={`
      hidden md:flex flex-col border-r border-cream-200/80 bg-white/70 backdrop-blur-md transition-all duration-300 z-30 shrink-0
      ${collapsed ? 'w-20' : 'w-64'}
    `}>
      {/* Brand Header */}
      <div className="h-20 flex items-center justify-between px-5 border-b border-cream-200/60">
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-caramel-500 to-chocolate-800 flex items-center justify-center text-white shadow-warm font-display font-extrabold text-xl">
              🥐
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-xl text-chocolate-950 tracking-tight">BakeFlow</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-caramel-500 text-white uppercase tracking-wider">AI</span>
              </div>
              <p className="text-[10px] font-medium text-chocolate-500 tracking-wide uppercase">Smart Bakery OS</p>
            </div>
          </div>
        ) : (
          <div className="mx-auto w-10 h-10 rounded-2xl bg-gradient-to-br from-caramel-500 to-chocolate-800 flex items-center justify-center text-white shadow-warm text-xl">
            🥐
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`p-1.5 rounded-xl text-chocolate-400 hover:text-chocolate-800 hover:bg-cream-100 transition-colors ${collapsed ? 'hidden' : ''}`}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id && item.id !== 'bot';

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`
                w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl font-medium text-sm transition-all group relative
                ${isActive 
                  ? 'bg-gradient-to-r from-caramel-500 to-caramel-600 text-white shadow-warm font-semibold' 
                  : 'text-chocolate-700 hover:bg-cream-100/90 hover:text-chocolate-950'}
                ${collapsed ? 'justify-center px-0' : ''}
              `}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-chocolate-500 group-hover:text-caramel-600'}`} />
              
              {!collapsed && (
                <span className="truncate flex-1 text-left">{item.label}</span>
              )}

              {!collapsed && item.badge && (
                <span className={`
                  text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0
                  ${isActive 
                    ? 'bg-white/20 text-white' 
                    : (item.id === 'alerts' ? 'bg-rose-500 text-white' : 'bg-caramel-100 text-caramel-800')}
                `}>
                  {item.badge}
                </span>
              )}

              {/* Tooltip for collapsed view */}
              {collapsed && (
                <div className="absolute left-full ml-3 px-2.5 py-1.5 rounded-xl bg-chocolate-950 text-white text-xs whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                  {item.label}
                  {item.badge && <span className="ml-1.5 font-bold text-caramel-400">({item.badge})</span>}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Expand Toggle Button when Collapsed */}
      {collapsed && (
        <div className="p-3 border-t border-cream-200/60 flex justify-center">
          <button
            onClick={() => setCollapsed(false)}
            className="p-2 rounded-xl text-chocolate-400 hover:text-chocolate-800 hover:bg-cream-100 transition-colors"
            title="Expand sidebar"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Bakery Shift Mini-Card */}
      {!collapsed && (
        <div className="p-4 border-t border-cream-200/60">
          <div className="p-3.5 rounded-2xl bg-cream-100/70 border border-cream-200/80">
            <div className="flex items-center gap-2 text-xs font-semibold text-chocolate-900">
              <Store className="w-4 h-4 text-caramel-600" />
              <span>Morning Shift (06:00 - 14:00)</span>
            </div>
            <p className="text-[11px] text-chocolate-600 mt-1">Next oven cycle: Sourdough #12</p>
            <div className="mt-2.5 flex items-center justify-between text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                AI Engine Synced
              </span>
              <span>92% Health</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ChefHat, 
  Sparkles, 
  Menu,
  ClockAlert,
  Bell,
  ShoppingCart,
  BarChart3,
  Recycle,
  Settings,
  X
} from 'lucide-react';
import { useBakery } from '../../context/BakeryContext';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const { activeTab, setActiveTab, alerts, setIsBotOpen } = useBakery();
  const unreadAlerts = alerts.filter(a => a.status === 'unread').length;

  const bottomItems = [
    { id: 'command', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'production', label: 'Production', icon: ChefHat },
    { id: 'forecast', label: 'AI Forecast', icon: Sparkles },
    { id: 'more', label: 'More', icon: Menu },
  ];

  const fullNavItems = [
    { id: 'command', label: 'Command Center', icon: LayoutDashboard },
    { id: 'inventory', label: 'Inventory Management', icon: Package },
    { id: 'forecast', label: 'AI Demand Forecast', icon: Sparkles },
    { id: 'production', label: 'Production Planner', icon: ChefHat },
    { id: 'expiry', label: 'Expiry Radar', icon: ClockAlert, badge: '7 Due' },
    { id: 'alerts', label: 'Smart Alerts', icon: Bell, badge: unreadAlerts > 0 ? `${unreadAlerts}` : null },
    { id: 'purchase', label: 'Purchase Planner', icon: ShoppingCart },
    { id: 'analytics', label: 'Sales Analytics', icon: BarChart3 },
    { id: 'waste', label: 'Waste Intelligence', icon: Recycle, badge: '-23%' },
    { id: 'bot', label: 'BakeBot Assistant', icon: Sparkles },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleSelect = (id: string) => {
    if (id === 'bot') {
      setIsBotOpen(true);
      onClose();
    } else {
      setActiveTab(id);
      onClose();
    }
  };

  return (
    <>
      {/* Slide-over Drawer for Mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="fixed inset-0 bg-chocolate-950/60 backdrop-blur-sm" onClick={onClose} />
          
          <div className="relative w-4/5 max-w-sm bg-cream-50 h-full p-6 shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-cream-200">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-caramel-500 to-chocolate-800 flex items-center justify-center text-white text-lg">
                  🥐
                </div>
                <span className="font-display font-black text-xl text-chocolate-950">BakeFlow AI</span>
              </div>
              <button onClick={onClose} className="p-2 text-chocolate-400 hover:text-chocolate-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-1">
              {fullNavItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                      isActive ? 'bg-caramel-500 text-white font-semibold' : 'text-chocolate-800 hover:bg-cream-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-caramel-100 text-caramel-800'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom Navigation Bar for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-lg border-t border-cream-200/80 px-2 py-2 flex items-center justify-around shadow-warm-lg">
        {bottomItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => item.id === 'more' ? onClose() : setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${
                isActive ? 'text-caramel-600 font-bold' : 'text-chocolate-500 hover:text-chocolate-900'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px]">{item.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};

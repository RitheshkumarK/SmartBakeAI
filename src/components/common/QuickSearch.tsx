import React, { useState, useEffect } from 'react';
import { Search, ArrowRight, Package, Sparkles, AlertTriangle, ChefHat, BarChart3, ShoppingCart, Trash2, X } from 'lucide-react';
import { useBakery } from '../../context/BakeryContext';

export interface QuickSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickSearch: React.FC<QuickSearchProps> = ({ isOpen, onClose }) => {
  const { products, ingredients, setActiveTab } = useBakery();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle search
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const navigationShortcuts = [
    { name: 'AI Command Center', tab: 'command', icon: Sparkles, desc: 'Overview & daily KPIs' },
    { name: 'Inventory Management', tab: 'inventory', icon: Package, desc: 'Products & raw materials' },
    { name: 'AI Demand Forecast', tab: 'forecast', icon: Sparkles, desc: '30-day sales predictions' },
    { name: 'Production Planner', tab: 'production', icon: ChefHat, desc: 'What should I bake today?' },
    { name: 'Expiry Radar', tab: 'expiry', icon: AlertTriangle, desc: 'Track spoilage countdowns' },
    { name: 'Purchase Planner', tab: 'purchase', icon: ShoppingCart, desc: 'BOM ingredient re-stocking' },
    { name: 'Sales Analytics', tab: 'analytics', icon: BarChart3, desc: 'Revenue & customer rush' },
    { name: 'Food Waste Intelligence', tab: 'waste', icon: Trash2, desc: 'Sustainability & loss tracker' },
  ].filter(s => s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q));

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
  );

  const filteredIngredients = ingredients.filter(i => 
    i.name.toLowerCase().includes(q) || i.category.toLowerCase().includes(q)
  );

  const handleSelectTab = (tab: string) => {
    setActiveTab(tab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      <div className="fixed inset-0 bg-chocolate-950/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-xl bg-white/95 rounded-3xl shadow-2xl border border-cream-200 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-cream-200">
          <Search className="w-5 h-5 text-caramel-600 shrink-0" />
          <input
            type="text"
            placeholder="Search products, ingredients, features, or jump to view... (ESC to close)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm sm:text-base text-chocolate-900 placeholder-chocolate-400 focus:outline-none"
          />
          <button onClick={onClose} className="p-1 rounded-lg text-chocolate-400 hover:text-chocolate-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-3 space-y-4">
          {/* Quick Navigation */}
          {navigationShortcuts.length > 0 && (
            <div>
              <p className="text-[11px] font-semibold tracking-wider text-chocolate-400 uppercase px-3 mb-1.5">
                Quick Navigation
              </p>
              <div className="space-y-1">
                {navigationShortcuts.slice(0, 4).map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.tab}
                      onClick={() => handleSelectTab(item.tab)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-cream-100 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-caramel-50 text-caramel-700 flex items-center justify-center group-hover:bg-caramel-500 group-hover:text-white transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-chocolate-900">{item.name}</div>
                          <div className="text-xs text-chocolate-500">{item.desc}</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-chocolate-300 group-hover:text-chocolate-700 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Products */}
          {filteredProducts.length > 0 && (
            <div>
              <p className="text-[11px] font-semibold tracking-wider text-chocolate-400 uppercase px-3 mb-1.5">
                Baked Products ({filteredProducts.length})
              </p>
              <div className="space-y-1">
                {filteredProducts.slice(0, 4).map(prod => (
                  <button
                    key={prod.id}
                    onClick={() => handleSelectTab('inventory')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-cream-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img src={prod.image} alt={prod.name} className="w-8 h-8 rounded-lg object-cover" />
                      <div>
                        <div className="text-sm font-medium text-chocolate-900">{prod.name}</div>
                        <div className="text-xs text-chocolate-500">{prod.category} • ₹{prod.price}</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-cream-200 text-chocolate-800">
                      {prod.quantity} {prod.unit}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Ingredients */}
          {filteredIngredients.length > 0 && (
            <div>
              <p className="text-[11px] font-semibold tracking-wider text-chocolate-400 uppercase px-3 mb-1.5">
                Raw Ingredients ({filteredIngredients.length})
              </p>
              <div className="space-y-1">
                {filteredIngredients.slice(0, 4).map(ing => (
                  <button
                    key={ing.id}
                    onClick={() => handleSelectTab('inventory')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-cream-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img src={ing.image} alt={ing.name} className="w-8 h-8 rounded-lg object-cover" />
                      <div>
                        <div className="text-sm font-medium text-chocolate-900">{ing.name}</div>
                        <div className="text-xs text-chocolate-500">{ing.supplier}</div>
                      </div>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      ing.status === 'critical' ? 'bg-rose-100 text-rose-700' : 'bg-cream-200 text-chocolate-800'
                    }`}>
                      {ing.quantity} {ing.unit}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

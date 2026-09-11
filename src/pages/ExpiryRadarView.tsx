import React, { useState } from 'react';
import { 
  ClockAlert, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Tag, 
  ChefHat, 
  Calendar, 
  Filter,
  Check
} from 'lucide-react';
import { useBakery } from '../context/BakeryContext';
import { BentoCard } from '../components/common/BentoCard';
import { Badge } from '../components/common/Badge';

export const ExpiryRadarView: React.FC = () => {
  const { 
    products, 
    ingredients, 
    addToast, 
    setActiveTab, 
    generateProductionPlan 
  } = useBakery();

  const [categoryFilter, setCategoryFilter] = useState<'all' | 'critical' | 'low' | 'fresh'>('all');

  // Combine products and ingredients with calculated days remaining
  const today = new Date('2026-09-10');

  const allTrackedItems = [
    ...ingredients.map(i => {
      const expDate = new Date(i.expiry_date);
      const diffTime = expDate.getTime() - today.getTime();
      const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      let urgency: 'critical' | 'low' | 'fresh' = 'fresh';
      if (daysRemaining <= 1) urgency = 'critical';
      else if (daysRemaining <= 3) urgency = 'low';

      return {
        id: i.id,
        name: i.name,
        category: i.category,
        type: 'Raw Material',
        quantity: i.quantity,
        unit: i.unit,
        expiryDate: i.expiry_date,
        daysRemaining: Math.max(0, daysRemaining),
        urgency,
        supplier: i.supplier,
        image: i.image
      };
    }),
    ...products.map(p => {
      const expDate = new Date(p.expiry_date);
      const diffTime = expDate.getTime() - today.getTime();
      const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      let urgency: 'critical' | 'low' | 'fresh' = 'fresh';
      if (daysRemaining <= 1) urgency = 'critical';
      else if (daysRemaining <= 3) urgency = 'low';

      return {
        id: p.id,
        name: p.name,
        category: p.category,
        type: 'Baked Good',
        quantity: p.quantity,
        unit: p.unit,
        expiryDate: p.expiry_date,
        daysRemaining: Math.max(0, daysRemaining),
        urgency,
        supplier: p.supplier,
        image: p.image
      };
    })
  ].sort((a, b) => a.daysRemaining - b.daysRemaining);

  const filteredItems = allTrackedItems.filter(item => {
    if (categoryFilter === 'all') return true;
    return item.urgency === categoryFilter;
  });

  const handleIncorporate = (itemName: string) => {
    generateProductionPlan();
    setActiveTab('production');
    addToast('success', 'Special Scheduled!', `Incorporated ${itemName} into today's baking plan.`);
  };

  const handleApplyDiscount = (itemName: string) => {
    addToast('success', 'Clearance Discount Applied', `Activated 30% off evening price for ${itemName}.`);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-black text-2xl sm:text-3xl text-chocolate-950 tracking-tight">
              Expiry Radar ⏰
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200">
              Freshness Tracker
            </span>
          </div>
          <p className="text-sm text-chocolate-600 mt-1">
            Real-time shelf life monitoring to catch expiring ingredients before they become food waste.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex bg-cream-200/80 p-1 rounded-2xl w-fit">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              categoryFilter === 'all' ? 'bg-white text-chocolate-950 shadow-warm-sm' : 'text-chocolate-600'
            }`}
          >
            All Items ({allTrackedItems.length})
          </button>
          <button
            onClick={() => setCategoryFilter('critical')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              categoryFilter === 'critical' ? 'bg-white text-rose-700 shadow-warm-sm' : 'text-chocolate-600'
            }`}
          >
            🔴 Expiring &lt;24h
          </button>
          <button
            onClick={() => setCategoryFilter('low')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              categoryFilter === 'low' ? 'bg-white text-amber-700 shadow-warm-sm' : 'text-chocolate-600'
            }`}
          >
            🟡 2-3 Days
          </button>
          <button
            onClick={() => setCategoryFilter('fresh')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              categoryFilter === 'fresh' ? 'bg-white text-emerald-700 shadow-warm-sm' : 'text-chocolate-600'
            }`}
          >
            🟢 Fresh (&gt;3 Days)
          </button>
        </div>
      </div>

      {/* AI Recommendation Banner (Section 8 Requirement) */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-caramel-500 to-amber-600 text-white shadow-warm-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 text-2xl">
            🤖
          </div>
          <div>
            <div className="text-xs font-extrabold uppercase tracking-wider text-caramel-100">
              BakeFlow AI Freshness Intelligence
            </div>
            <p className="text-base sm:text-lg font-bold text-white mt-0.5">
              “Use ingredients expiring soon in today's production plan to reduce waste.”
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            generateProductionPlan();
            setActiveTab('production');
          }}
          className="px-5 py-2.5 rounded-xl bg-white text-caramel-900 font-extrabold text-xs sm:text-sm hover:bg-cream-100 shadow-md transition-all shrink-0"
        >
          Auto-Incorporate Into Today's Bake →
        </button>
      </div>

      {/* Tracked Items Table */}
      <BentoCard
        title="Shelf Life Countdown Radar"
        subtitle="Sorted chronologically by days remaining until expiration"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-cream-100/70 border-b border-cream-200 text-chocolate-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Item & Batch</th>
                <th className="py-3.5 px-3">Type</th>
                <th className="py-3.5 px-3 text-center">On-Hand Qty</th>
                <th className="py-3.5 px-3">Expiry Date</th>
                <th className="py-3.5 px-4 text-center">Days Remaining</th>
                <th className="py-3.5 px-3">Freshness Status</th>
                <th className="py-3.5 px-4 text-right">Smart Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-100">
              {filteredItems.map(item => {
                const isUrgent = item.urgency === 'critical';
                const isWarning = item.urgency === 'low';

                return (
                  <tr key={item.id} className="hover:bg-cream-100/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-chocolate-950 flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-9 h-9 rounded-xl object-cover" />
                      <div>
                        <div>{item.name}</div>
                        <div className="text-[11px] text-chocolate-500 font-normal">{item.supplier}</div>
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="text-xs text-chocolate-600 bg-cream-100 px-2 py-0.5 rounded-md font-medium">
                        {item.type}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-center font-bold text-chocolate-900">
                      {item.quantity} {item.unit}
                    </td>

                    <td className="py-3.5 px-3 font-semibold text-chocolate-700">
                      {item.expiryDate}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-flex items-center gap-1 font-black text-xs px-2.5 py-1 rounded-full ${
                        isUrgent 
                          ? 'bg-rose-100 text-rose-800 animate-pulse' 
                          : (isWarning ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800')
                      }`}>
                        {item.daysRemaining === 0 ? 'Expires Today' : `${item.daysRemaining} days remaining`}
                      </span>
                    </td>

                    <td className="py-3.5 px-3">
                      <Badge 
                        status={isUrgent ? 'critical' : (isWarning ? 'low' : 'healthy')} 
                        size="sm"
                      >
                        {isUrgent ? 'Expiring Soon' : (isWarning ? 'Expiring Soon' : 'Fresh')}
                      </Badge>
                    </td>

                    <td className="py-3.5 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleIncorporate(item.name)}
                        className="px-2.5 py-1 rounded-lg text-xs font-bold bg-cream-100 hover:bg-caramel-50 text-caramel-800 border border-cream-300 transition-colors"
                        title="Add to daily bake plan"
                      >
                        Incorporate
                      </button>
                      <button
                        onClick={() => handleApplyDiscount(item.name)}
                        className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 transition-colors"
                        title="30% off clearance"
                      >
                        30% Off
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </BentoCard>
    </div>
  );
};

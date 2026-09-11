import React from 'react';
import { 
  TrendingUp, 
  Package, 
  AlertTriangle, 
  ClockAlert, 
  Recycle, 
  Sparkles, 
  ArrowRight, 
  Check, 
  ChefHat, 
  ShoppingCart, 
  Plus, 
  Calendar,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { useBakery } from '../context/BakeryContext';
import { BentoCard } from '../components/common/BentoCard';
import { Badge } from '../components/common/Badge';

interface CommandCenterProps {
  onOpenAddModal: (type: 'product' | 'ingredient') => void;
  onOpenWasteModal: () => void;
  onOpenPOModal: () => void;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({
  onOpenAddModal,
  onOpenWasteModal,
  onOpenPOModal
}) => {
  const { 
    user, 
    todaySalesTotal, 
    inventoryHealthScore, 
    lowStockCount, 
    expiringCount, 
    totalMonthlyWasteKg,
    acceptAIInsight,
    setActiveTab,
    productionPlans,
    ingredients,
    completeProductionBatch
  } = useBakery();

  const activeShiftPlans = productionPlans.slice(0, 4);
  const expiringIngredients = ingredients.filter(i => i.status === 'critical' || i.name.includes('Milk') || i.name.includes('Cream') || i.name.includes('Butter')).slice(0, 3);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-black text-2xl sm:text-3xl text-chocolate-950 tracking-tight">
              Good Morning, {user.name.split(' ')[0]} 👋
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-caramel-100 text-caramel-900 text-xs font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-caramel-500 animate-pulse"></span>
              Shift Active
            </span>
          </div>
          <p className="text-sm text-chocolate-600 mt-1">
            Here’s what your bakery needs to know today.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onOpenAddModal('product')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-cream-100 text-chocolate-800 border border-cream-300 shadow-warm-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5 text-caramel-600" />
            <span>+ Product</span>
          </button>
          <button
            onClick={onOpenWasteModal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-cream-100 text-chocolate-800 border border-cream-300 shadow-warm-sm transition-all"
          >
            <Recycle className="w-3.5 h-3.5 text-rose-600" />
            <span>+ Log Waste</span>
          </button>
          <button
            onClick={onOpenPOModal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-caramel-500 hover:bg-caramel-600 text-white shadow-warm transition-all"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Quick PO</span>
          </button>
        </div>
      </div>

      {/* 5 KPI Cards (Bento Style) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
        {/* KPI 1: Today's Sales */}
        <BentoCard padding="sm" className="col-span-1 border-caramel-200/60 bg-gradient-to-br from-white via-white to-caramel-50/40">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-chocolate-500">Today's Sales</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black font-display text-chocolate-950">
              ₹{todaySalesTotal.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 mt-1 text-[11px] font-semibold text-emerald-600">
              <span>+14.2%</span>
              <span className="text-chocolate-400 font-normal">vs yesterday</span>
            </div>
          </div>
        </BentoCard>

        {/* KPI 2: Inventory Health */}
        <BentoCard padding="sm" className="col-span-1 border-sky-200/60 bg-gradient-to-br from-white via-white to-sky-50/40">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-chocolate-500">Inventory Health</span>
            <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black font-display text-chocolate-950">
              {inventoryHealthScore}%
            </div>
            <div className="flex items-center gap-1 mt-1 text-[11px] font-semibold text-sky-600">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
              <span>Optimal levels</span>
            </div>
          </div>
        </BentoCard>

        {/* KPI 3: Low Stock Items */}
        <BentoCard padding="sm" className="col-span-1 border-amber-200/60 bg-gradient-to-br from-white via-white to-amber-50/40">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-chocolate-500">Low Stock Items</span>
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black font-display text-chocolate-950">
              {lowStockCount}
            </div>
            <div className="flex items-center gap-1 mt-1 text-[11px] font-semibold text-amber-700">
              <span>Action needed</span>
              <span className="text-chocolate-400 font-normal">(Flour, Butter)</span>
            </div>
          </div>
        </BentoCard>

        {/* KPI 4: Expiring Items */}
        <BentoCard padding="sm" className="col-span-1 border-rose-200/60 bg-gradient-to-br from-white via-white to-rose-50/40">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-chocolate-500">Expiring Items</span>
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
              <ClockAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black font-display text-chocolate-950">
              {expiringCount}
            </div>
            <div className="flex items-center gap-1 mt-1 text-[11px] font-semibold text-rose-600">
              <span>Next 48 hrs</span>
              <span className="text-chocolate-400 font-normal">(Milk, Cream)</span>
            </div>
          </div>
        </BentoCard>

        {/* KPI 5: Food Waste */}
        <BentoCard padding="sm" className="col-span-2 sm:col-span-1 border-emerald-200/60 bg-gradient-to-br from-white via-white to-emerald-50/40">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-chocolate-500">Food Waste</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Recycle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black font-display text-chocolate-950">
              {totalMonthlyWasteKg} kg
            </div>
            <div className="flex items-center gap-1 mt-1 text-[11px] font-semibold text-emerald-600">
              <span>-23% reduction</span>
              <span className="text-chocolate-400 font-normal">this month</span>
            </div>
          </div>
        </BentoCard>
      </div>

      {/* Prominent AI INSIGHT Bento Card (Section 4 Requirement) */}
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-chocolate-950 via-chocolate-900 to-chocolate-850 text-cream-50 shadow-warm-xl border border-caramel-400/40 overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-caramel-500/20 text-caramel-300 border border-caramel-500/40 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-4 h-4 text-caramel-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>🤖 BakeFlow AI Insight</span>
            </div>

            <blockquote className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight leading-snug">
              “Bread demand is expected to increase this weekend. Consider producing 50 additional units.”
            </blockquote>

            <p className="text-xs sm:text-sm text-cream-300/80 mt-2 leading-relaxed">
              AI forecast detected a 20% surge from upcoming weekend foot traffic and local events. Current sourdough inventory (70 loaves) is below the forecasted 120 loaves demand.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('forecast')}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-cream-50 border border-white/20 text-xs sm:text-sm font-bold transition-all text-center"
            >
              View Prediction
            </button>
            <button
              onClick={acceptAIInsight}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-caramel-500 hover:bg-caramel-600 text-white font-bold text-xs sm:text-sm shadow-warm-lg hover:shadow-glow-caramel transition-all flex items-center justify-center gap-2 group"
            >
              <Check className="w-4 h-4" />
              <span>Accept Recommendation</span>
            </button>
          </div>
        </div>

        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-caramel-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Two Column Bento Section: Production Schedule & Expiry Radar Glance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Production Schedule Mini-Table */}
        <div className="lg:col-span-7">
          <BentoCard
            title="Today's Baking Production Schedule"
            subtitle="Real-time shift batches generated by BakeFlow AI"
            action={
              <button
                onClick={() => setActiveTab('production')}
                className="text-xs font-bold text-caramel-600 hover:text-caramel-700 flex items-center gap-1"
              >
                <span>Full Planner</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-cream-200/80 text-chocolate-500 font-bold uppercase tracking-wider">
                    <th className="pb-3">Product</th>
                    <th className="pb-3 text-center">Current Stock</th>
                    <th className="pb-3 text-center">Predicted</th>
                    <th className="pb-3 text-center">Bake Qty</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream-100">
                  {activeShiftPlans.map(plan => (
                    <tr key={plan.id} className="hover:bg-cream-100/50 transition-colors">
                      <td className="py-3 font-semibold text-chocolate-950 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-caramel-500"></span>
                        <span className="truncate max-w-[140px] sm:max-w-none">{plan.product_name}</span>
                      </td>
                      <td className="py-3 text-center text-chocolate-700">{plan.current_stock}</td>
                      <td className="py-3 text-center text-chocolate-700 font-medium">{plan.predicted_demand}</td>
                      <td className="py-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[11px] ${
                          plan.recommended_production > 0 ? 'bg-caramel-100 text-caramel-800' : 'bg-cream-200 text-chocolate-500'
                        }`}>
                          {plan.recommended_production > 0 ? `+${plan.recommended_production}` : '0'}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        {plan.status === 'completed' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Done
                          </span>
                        ) : plan.recommended_production > 0 ? (
                          <button
                            onClick={() => completeProductionBatch(plan.id)}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-caramel-500 hover:bg-caramel-600 text-white shadow-sm transition-all"
                          >
                            Bake Batch
                          </button>
                        ) : (
                          <span className="text-[11px] text-chocolate-400">Stocked</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </BentoCard>
        </div>

        {/* Right: Expiry Radar Watchlist */}
        <div className="lg:col-span-5">
          <BentoCard
            title="Expiry Radar Watchlist"
            subtitle="Perishables requiring immediate priority"
            action={
              <button
                onClick={() => setActiveTab('expiry')}
                className="text-xs font-bold text-caramel-600 hover:text-caramel-700 flex items-center gap-1"
              >
                <span>View Radar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            }
          >
            <div className="space-y-3">
              {/* Milk Item */}
              <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-sm">
                    🥛
                  </div>
                  <div>
                    <div className="text-xs font-bold text-chocolate-900">Fresh Whole Dairy Milk</div>
                    <div className="text-[11px] text-rose-700 font-semibold">1 day remaining (Expires tomorrow)</div>
                  </div>
                </div>
                <Badge status="critical" size="sm">Urgent</Badge>
              </div>

              {/* Cream Item */}
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 font-bold flex items-center justify-center text-sm">
                    🍫
                  </div>
                  <div>
                    <div className="text-xs font-bold text-chocolate-900">Chocolate Whipping Cream</div>
                    <div className="text-[11px] text-amber-700 font-semibold">2 days remaining</div>
                  </div>
                </div>
                <Badge status="low" size="sm">2 Days</Badge>
              </div>

              {/* Butter Item */}
              <div className="p-3.5 rounded-2xl bg-cream-100/70 border border-cream-200/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cream-200 text-chocolate-700 font-bold flex items-center justify-center text-sm">
                    🧈
                  </div>
                  <div>
                    <div className="text-xs font-bold text-chocolate-900">European Unsalted Butter</div>
                    <div className="text-[11px] text-chocolate-600 font-medium">6 days remaining (6.5 kg)</div>
                  </div>
                </div>
                <Badge status="healthy" size="sm">Fresh</Badge>
              </div>
            </div>

            {/* AI Recommendation footer */}
            <div className="mt-4 p-3 rounded-xl bg-caramel-50/80 border border-caramel-200/60 text-[11px] text-caramel-900 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-caramel-600 shrink-0 mt-0.5" />
              <span>
                <strong>AI Recommendation:</strong> Use ingredients expiring soon in today's production plan to reduce food waste.
              </span>
            </div>
          </BentoCard>
        </div>
      </div>
    </div>
  );
};

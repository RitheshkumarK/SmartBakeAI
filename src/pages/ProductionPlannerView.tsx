import React, { useState } from 'react';
import { 
  ChefHat, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Flame, 
  AlertTriangle, 
  Check, 
  Edit2, 
  Save, 
  RefreshCw,
  Plus,
  Minus
} from 'lucide-react';
import { useBakery } from '../context/BakeryContext';
import { BentoCard } from '../components/common/BentoCard';
import { Badge } from '../components/common/Badge';

export const ProductionPlannerView: React.FC = () => {
  const { 
    productionPlans, 
    generateProductionPlan, 
    updateProductionPlanQuantity, 
    completeProductionBatch, 
    addToast,
    setActiveTab
  } = useBakery();

  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  const [overrideQty, setOverrideQty] = useState<number>(0);

  const startEdit = (planId: string, currentQty: number) => {
    setEditingPlanId(planId);
    setOverrideQty(currentQty);
  };

  const saveEdit = (planId: string) => {
    updateProductionPlanQuantity(planId, Number(overrideQty));
    setEditingPlanId(null);
    addToast('info', 'Recommendation Modified', 'Production batch quantity updated.');
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-chocolate-950 tracking-tight">
            “What Should I Bake Today?” 🥐
          </h1>
          <p className="text-sm text-chocolate-600 mt-1">
            AI-optimized morning production schedule calculated to satisfy peak demand with zero day-end waste.
          </p>
        </div>

        {/* Generate AI Production Plan Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={generateProductionPlan}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-caramel-500 to-caramel-600 hover:from-caramel-600 hover:to-caramel-700 text-white font-bold text-xs sm:text-sm shadow-warm hover:shadow-glow-caramel hover:scale-[1.02] transition-all"
          >
            <Sparkles className="w-4 h-4 text-caramel-200 animate-spin" style={{ animationDuration: '6s' }} />
            <span>✨ Generate AI Production Plan</span>
          </button>
        </div>
      </div>

      {/* Main Canonical Production Recommendation Table */}
      <BentoCard
        title="Active Shift Baking Schedule"
        subtitle="Calculated from: Predicted Demand – Current Stock + Safety Buffer"
        action={
          <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>AI Synchronized</span>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-cream-100/70 border-b border-cream-200 text-chocolate-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-4 px-4">Product</th>
                <th className="py-4 px-3 text-center">Current Stock</th>
                <th className="py-4 px-3 text-center">Predicted Demand</th>
                <th className="py-4 px-4 text-center">Recommendation</th>
                <th className="py-4 px-4">Raw Ingredient Feasibility</th>
                <th className="py-4 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-100">
              {productionPlans.map(plan => {
                const isEditing = editingPlanId === plan.id;
                const isComplete = plan.status === 'completed';
                const hasProduction = plan.recommended_production > 0;

                return (
                  <tr key={plan.id} className="hover:bg-cream-100/40 transition-colors">
                    {/* Product Name */}
                    <td className="py-4 px-4 font-bold text-chocolate-950">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-2.5 h-2.5 rounded-full ${
                          isComplete ? 'bg-emerald-500' : (hasProduction ? 'bg-caramel-500' : 'bg-chocolate-300')
                        }`} />
                        <span>{plan.product_name}</span>
                      </div>
                    </td>

                    {/* Current Stock */}
                    <td className="py-4 px-3 text-center font-semibold text-chocolate-700">
                      {plan.current_stock}
                    </td>

                    {/* Predicted Demand */}
                    <td className="py-4 px-3 text-center font-bold text-caramel-700">
                      {plan.predicted_demand}
                    </td>

                    {/* Recommendation (Produce X / No Production) */}
                    <td className="py-4 px-4 text-center">
                      {isEditing ? (
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setOverrideQty(Math.max(0, overrideQty - 5))}
                            className="p-1 rounded-lg bg-cream-200 text-chocolate-800"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <input
                            type="number"
                            min="0"
                            value={overrideQty}
                            onChange={(e) => setOverrideQty(Number(e.target.value))}
                            className="w-16 px-2 py-1 text-center font-bold text-xs rounded-lg border border-cream-300 bg-white"
                          />
                          <button
                            type="button"
                            onClick={() => setOverrideQty(overrideQty + 5)}
                            className="p-1 rounded-lg bg-cream-200 text-chocolate-800"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => saveEdit(plan.id)}
                            className="p-1 text-emerald-600 hover:bg-emerald-50 rounded-lg ml-1"
                            title="Save"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full font-black text-xs ${
                            plan.recommended_production > 0 
                              ? 'bg-caramel-100 text-caramel-900 border border-caramel-300' 
                              : 'bg-cream-200 text-chocolate-500'
                          }`}>
                            {plan.recommended_production > 0 
                              ? `Produce ${plan.recommended_production}` 
                              : 'No Production'}
                          </span>
                          {!isComplete && (
                            <button
                              onClick={() => startEdit(plan.id, plan.recommended_production)}
                              className="text-chocolate-400 hover:text-caramel-600 p-1"
                              title="Modify quantity"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      )}
                    </td>

                    {/* Raw Ingredient Feasibility Check */}
                    <td className="py-4 px-4">
                      {plan.raw_materials_ready ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>All ingredients in stock</span>
                        </span>
                      ) : (
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-700">
                          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                          <span>{plan.missing_ingredients?.[0] || 'Shortage: Re-stock Flour'}</span>
                          <button
                            onClick={() => setActiveTab('purchase')}
                            className="ml-1 text-[11px] underline text-caramel-700 font-bold"
                          >
                            Order
                          </button>
                        </div>
                      )}
                    </td>

                    {/* Action */}
                    <td className="py-4 px-4 text-right">
                      {isComplete ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                          <Check className="w-3.5 h-3.5" />
                          <span>Batch Baked & Stocked</span>
                        </span>
                      ) : plan.recommended_production > 0 ? (
                        <button
                          onClick={() => completeProductionBatch(plan.id)}
                          className="px-4 py-1.5 rounded-xl font-bold text-xs bg-caramel-500 hover:bg-caramel-600 text-white shadow-warm transition-all flex items-center gap-1.5 ml-auto"
                        >
                          <Flame className="w-3.5 h-3.5" />
                          <span>Bake Batch</span>
                        </button>
                      ) : (
                        <span className="text-xs text-chocolate-400 italic">No Action Needed</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </BentoCard>

      {/* Production Guide & Shift Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-3xl glass-card border border-cream-200 shadow-warm">
          <div className="w-10 h-10 rounded-2xl bg-caramel-100 text-caramel-700 flex items-center justify-center mb-3">
            <Clock className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-base text-chocolate-950">Optimal Proofing Times</h4>
          <p className="text-xs text-chocolate-600 mt-1.5 leading-relaxed">
            Sourdough fermentation recommended at 24°C for 3.5 hours before 11:00 AM baking rush.
          </p>
        </div>

        <div className="p-5 rounded-3xl glass-card border border-cream-200 shadow-warm">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-base text-chocolate-950">Zero Overproduction</h4>
          <p className="text-xs text-chocolate-600 mt-1.5 leading-relaxed">
            Cakes currently have 15 units covering the 12 forecasted demand, preventing ₹3,900 in weekend staling.
          </p>
        </div>

        <div className="p-5 rounded-3xl glass-card border border-cream-200 shadow-warm">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
            <Flame className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-base text-chocolate-950">Oven Batch Consolidator</h4>
          <p className="text-xs text-chocolate-600 mt-1.5 leading-relaxed">
            Muffins and Croissants can share Deck Oven 2 at 190°C for 22 minutes to optimize energy consumption.
          </p>
        </div>
      </div>
    </div>
  );
};

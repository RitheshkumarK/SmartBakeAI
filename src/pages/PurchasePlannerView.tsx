import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Sparkles, 
  Plus, 
  Check, 
  Clock, 
  CheckCircle2, 
  Truck, 
  Building, 
  FileText,
  AlertOctagon
} from 'lucide-react';
import { useBakery } from '../context/BakeryContext';
import { BentoCard } from '../components/common/BentoCard';
import { Badge } from '../components/common/Badge';
import { QuickPOModal } from '../components/forms/QuickPOModal';

export const PurchasePlannerView: React.FC = () => {
  const { 
    purchases, 
    updatePurchaseStatus, 
    ingredients,
    addToast 
  } = useBakery();

  const [isPOModalOpen, setIsPOModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredPurchases = purchases.filter(p => {
    if (filterStatus === 'all') return true;
    return p.status.toLowerCase() === filterStatus.toLowerCase();
  });

  const totalPendingCost = purchases
    .filter(p => p.status === 'Pending')
    .reduce((acc, curr) => acc + curr.total_cost, 0);

  const handleExportPO = () => {
    addToast('success', 'Purchase Order Exported', 'Downloaded PO summary formatted for bakery vendors.');
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-black text-2xl sm:text-3xl text-chocolate-950 tracking-tight">
              Purchase Planner 🛒
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-caramel-100 text-caramel-900 text-xs font-bold border border-caramel-300">
              Recipe BOM Linked
            </span>
          </div>
          <p className="text-sm text-chocolate-600 mt-1">
            Automated ingredient procurement driven by forecasted baking batch requirements.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportPO}
            className="px-4 py-2.5 rounded-2xl bg-white hover:bg-cream-100 text-chocolate-800 border border-cream-300 text-xs sm:text-sm font-bold shadow-warm-sm transition-all flex items-center gap-1.5"
          >
            <FileText className="w-4 h-4 text-chocolate-600" />
            <span>Export POs</span>
          </button>
          <button
            onClick={() => setIsPOModalOpen(true)}
            className="px-5 py-2.5 rounded-2xl bg-caramel-500 hover:bg-caramel-600 text-white font-bold text-xs sm:text-sm shadow-warm transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>+ Create Order</span>
          </button>
        </div>
      </div>

      {/* Featured AI Recommendation Card (Section 10 Canonical: Flour) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-chocolate-950 via-chocolate-900 to-chocolate-900 text-cream-50 shadow-warm-xl border border-caramel-400/40 relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1">
                <AlertOctagon className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                Priority: 🔴 High
              </span>
              <span className="text-xs text-cream-300">Required Date: Sept 11, 2026</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Flour (Organic Wheat Maida/Atta)
            </h2>

            <p className="text-xs sm:text-sm text-cream-300/80 mt-1 max-w-2xl">
              Golden Grain Mills Ltd. • Minimum Lead Time: 24 Hours • Estimated Cost: ₹360
            </p>

            <div className="grid grid-cols-3 gap-3 mt-5">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="text-[10px] font-bold uppercase text-cream-400">Current Stock</div>
                <div className="text-xl font-black text-rose-400 font-display mt-0.5">5 kg</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="text-[10px] font-bold uppercase text-cream-400">Predicted Requirement</div>
                <div className="text-xl font-black text-white font-display mt-0.5">10 kg</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-caramel-500/20 border border-caramel-500/40 text-center">
                <div className="text-[10px] font-bold uppercase text-caramel-200">Recommended Purchase</div>
                <div className="text-xl font-black text-caramel-400 font-display mt-0.5">8 kg</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center gap-3">
            <button
              onClick={() => {
                const flourOrder = purchases.find(p => p.ingredient.includes('Flour'));
                if (flourOrder) {
                  updatePurchaseStatus(flourOrder.id, 'Ordered');
                } else {
                  addToast('success', 'Order Placed!', 'Dispatched 8kg Flour order to Golden Grain Mills.');
                }
              }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-caramel-500 hover:bg-caramel-600 text-white font-bold text-sm shadow-warm-lg hover:shadow-glow-caramel hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <Truck className="w-4 h-4" />
              <span>Order Now (₹360)</span>
            </button>
            <button
              onClick={() => addToast('info', 'Added to PO', 'Flour added to cumulative supplier batch.')}
              className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-all text-center"
            >
              Add to Purchase List
            </button>
          </div>
        </div>

        <div className="absolute -top-10 -right-10 w-80 h-80 bg-caramel-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Procurement Orders Table */}
      <BentoCard
        title="Active Ingredient Purchase Orders"
        subtitle="Manage pending, ordered, and delivered vendor shipments"
        action={
          <div className="flex bg-cream-100 p-1 rounded-xl">
            {['all', 'pending', 'ordered', 'delivered'].map(st => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-all ${
                  filterStatus === st ? 'bg-white text-chocolate-950 shadow-sm' : 'text-chocolate-500'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-cream-100/70 border-b border-cream-200 text-chocolate-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Ingredient</th>
                <th className="py-3.5 px-3 text-center">Current Stock</th>
                <th className="py-3.5 px-3 text-center">Predicted Need</th>
                <th className="py-3.5 px-3 text-center">Rec. Order</th>
                <th className="py-3.5 px-3">Supplier</th>
                <th className="py-3.5 px-3 text-center">Cost</th>
                <th className="py-3.5 px-3">Priority</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-100">
              {filteredPurchases.map(po => {
                const isDelivered = po.status === 'Delivered';
                const isOrdered = po.status === 'Ordered';

                return (
                  <tr key={po.id} className="hover:bg-cream-100/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-chocolate-950">
                      <div>{po.ingredient}</div>
                      <div className="text-[10px] text-chocolate-400 font-normal">Needed by: {po.required_date}</div>
                    </td>
                    <td className="py-3.5 px-3 text-center text-chocolate-700 font-medium">
                      {po.current_stock} {po.unit}
                    </td>
                    <td className="py-3.5 px-3 text-center text-chocolate-700">
                      {po.predicted_requirement} {po.unit}
                    </td>
                    <td className="py-3.5 px-3 text-center font-bold text-caramel-700">
                      {po.recommended_purchase} {po.unit}
                    </td>
                    <td className="py-3.5 px-3 text-chocolate-800 text-xs">
                      {po.supplier}
                    </td>
                    <td className="py-3.5 px-3 text-center font-bold text-chocolate-950">
                      ₹{po.total_cost.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        po.priority === 'High' ? 'bg-rose-100 text-rose-800' : (po.priority === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800')
                      }`}>
                        {po.priority}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        isDelivered 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : (isOrdered ? 'bg-sky-100 text-sky-800' : 'bg-cream-200 text-chocolate-700')
                      }`}>
                        {po.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      {po.status === 'Pending' && (
                        <button
                          onClick={() => updatePurchaseStatus(po.id, 'Ordered')}
                          className="px-2.5 py-1 rounded-lg text-xs font-bold bg-caramel-500 hover:bg-caramel-600 text-white shadow-sm transition-all"
                        >
                          Order Now
                        </button>
                      )}
                      {po.status === 'Ordered' && (
                        <button
                          onClick={() => updatePurchaseStatus(po.id, 'Delivered')}
                          className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
                          title="Mark delivered and replenish inventory"
                        >
                          Mark Received
                        </button>
                      )}
                      {isDelivered && (
                        <span className="text-xs text-emerald-600 font-bold inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> In Stock
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </BentoCard>

      {/* Quick PO Modal */}
      {isPOModalOpen && (
        <QuickPOModal
          isOpen={isPOModalOpen}
          onClose={() => setIsPOModalOpen(false)}
        />
      )}
    </div>
  );
};

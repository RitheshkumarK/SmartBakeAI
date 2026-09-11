import React, { useState } from 'react';
import { 
  Recycle, 
  Sparkles, 
  TrendingDown, 
  AlertTriangle, 
  Plus, 
  DollarSign, 
  PieChart as PieIcon, 
  FileSpreadsheet,
  CheckCircle2
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { useBakery } from '../context/BakeryContext';
import { BentoCard } from '../components/common/BentoCard';
import { LogWasteModal } from '../components/forms/LogWasteModal';

export const WasteIntelligenceView: React.FC = () => {
  const { 
    wasteRecords, 
    totalMonthlyWasteKg, 
    totalWasteLossAmount,
    addToast 
  } = useBakery();

  const [isWasteModalOpen, setIsWasteModalOpen] = useState(false);

  // Waste by Reason dataset
  const wasteByReason = [
    { name: 'Unsold Day-End', value: 18, color: '#E67E22' },
    { name: 'Expired Date', value: 11, color: '#DC2626' },
    { name: 'Handling Damage', value: 7, color: '#F59E0B' },
    { name: 'Burnt/Defect', value: 6, color: '#78350F' }
  ];

  // Weekly Waste Trend
  const weeklyWasteTrend = [
    { week: 'Week 1', actual: 16, aiTarget: 12 },
    { week: 'Week 2', actual: 14, aiTarget: 10 },
    { week: 'Week 3', actual: 12, aiTarget: 9 },
    { week: 'Week 4 (Current)', actual: 10, aiTarget: 8 },
  ];

  // Waste by Product
  const wasteByProduct = [
    { name: 'Artisan Sourdough', kg: 14, loss: 630 },
    { name: 'Crispy Butter Puffs', kg: 10, loss: 1510 },
    { name: 'Heavy Whipping Cream', kg: 6, loss: 1150 },
    { name: 'Croissants', kg: 5, loss: 420 },
    { name: 'Muffins', kg: 4, loss: 480 },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-black text-2xl sm:text-3xl text-chocolate-950 tracking-tight">
              Waste Intelligence ♻️
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300">
              Sustainability Co-pilot
            </span>
          </div>
          <p className="text-sm text-chocolate-600 mt-1">
            Track day-end unsold goods, expired dairy, and oven waste to preserve bakery profit margins.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsWasteModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-warm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Log Food Waste</span>
          </button>
        </div>
      </div>

      {/* 3 Core Sustainability Metrics (Section 12 Canonical: 42kg, ₹4,200, 23%) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <BentoCard padding="md" className="border-emerald-200/80 bg-gradient-to-br from-white via-white to-emerald-50/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-chocolate-500">Monthly Food Waste</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Recycle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl sm:text-4xl font-black font-display text-chocolate-950">
              {totalMonthlyWasteKg} kg
            </div>
            <div className="flex items-center gap-1 mt-1 text-xs font-semibold text-emerald-600">
              <span>Down from 55 kg last month</span>
            </div>
          </div>
        </BentoCard>

        <BentoCard padding="md" className="border-rose-200/80 bg-gradient-to-br from-white via-white to-rose-50/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-chocolate-500">Estimated Financial Loss</span>
            <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl sm:text-4xl font-black font-display text-rose-700">
              ₹{totalWasteLossAmount.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 mt-1 text-xs font-semibold text-rose-600">
              <span>Direct ingredient & retail loss</span>
            </div>
          </div>
        </BentoCard>

        <BentoCard padding="md" className="border-caramel-200/80 bg-gradient-to-br from-white via-white to-caramel-50/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-chocolate-500">Waste Reduction</span>
            <div className="w-9 h-9 rounded-xl bg-caramel-100 text-caramel-800 flex items-center justify-center font-bold">
              <TrendingDown className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl sm:text-4xl font-black font-display text-emerald-600">
              23%
            </div>
            <div className="flex items-center gap-1 mt-1 text-xs font-semibold text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Projected to reach 35% by Q4</span>
            </div>
          </div>
        </BentoCard>
      </div>

      {/* Prominent AI Waste Insight (Section 12 Requirement) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-chocolate-950 to-chocolate-900 text-cream-50 shadow-warm-xl border border-caramel-400/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-caramel-500/20 text-caramel-300 border border-caramel-500/40 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-caramel-400" />
              <span>🤖 BakeFlow AI Waste Insight</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight">
              “Reducing Saturday bread production by 10% could lower food waste.”
            </h3>
            <p className="text-xs sm:text-sm text-cream-300/80 mt-1.5 max-w-2xl leading-relaxed">
              Historical logs indicate that unsold Sunday morning sourdough stale carryover accounts for 14 kg of waste per month. Trimming the late Saturday bake saves an estimated ₹1,400 weekly.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-white/15 text-center shrink-0 w-full sm:w-auto">
            <div className="text-[10px] uppercase font-bold text-cream-300">Estimated Annual Recovery</div>
            <div className="text-2xl font-black text-caramel-400 font-display mt-0.5">₹16,800</div>
            <div className="text-[10px] text-emerald-400 mt-0.5 font-semibold">168 kg saved</div>
          </div>
        </div>
      </div>

      {/* Charts: Waste by Reason (Donut) & Weekly Waste Trend (Bar Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Trend */}
        <div className="lg:col-span-7">
          <BentoCard
            title="Weekly Waste Reduction vs Target"
            subtitle="Comparing actual discarded kilograms against AI reduction roadmap"
          >
            <div className="h-72 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyWasteTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EBDDC9" vertical={false} />
                  <XAxis dataKey="week" stroke="#945C3C" fontSize={11} tickLine={false} />
                  <YAxis stroke="#945C3C" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '1rem',
                      border: '1px solid #DEC4A4',
                      fontSize: '12px'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="actual" name="Actual Waste (kg)" fill="#DC2626" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="aiTarget" name="AI Target (kg)" fill="#10B981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </BentoCard>
        </div>

        {/* Waste by Root Cause */}
        <div className="lg:col-span-5">
          <BentoCard
            title="Waste by Root Cause"
            subtitle="Unsold Day-End overproduction accounts for 43% of total loss"
          >
            <div className="h-52 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={wasteByReason}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {wasteByReason.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: number) => [`${val} kg`, 'Quantity']}
                    contentStyle={{ borderRadius: '0.75rem', fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-1.5 mt-2">
              {wasteByReason.map(reason => (
                <div key={reason.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: reason.color }} />
                    <span className="text-chocolate-800">{reason.name}</span>
                  </div>
                  <span className="font-bold text-chocolate-950">{reason.value} kg</span>
                </div>
              ))}
            </div>
          </BentoCard>
        </div>
      </div>

      {/* Waste Records Audit Log */}
      <BentoCard
        title="Logged Food Waste Events"
        subtitle="Recent shift logs with root cause justifications"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-cream-100/70 border-b border-cream-200 text-chocolate-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-3">Item Name</th>
                <th className="py-3 px-3 text-center">Wasted Qty</th>
                <th className="py-3 px-3">Root Cause</th>
                <th className="py-3 px-3 text-center">Estimated Loss</th>
                <th className="py-3 px-3">Logged By</th>
                <th className="py-3 px-4">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-100">
              {wasteRecords.map(w => (
                <tr key={w.id} className="hover:bg-cream-100/40 transition-colors">
                  <td className="py-3 px-4 text-chocolate-600 font-medium">{w.date}</td>
                  <td className="py-3 px-3 font-bold text-chocolate-950">{w.item_name}</td>
                  <td className="py-3 px-3 text-center font-bold text-rose-700">{w.quantity} {w.unit}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-cream-200 text-chocolate-800">
                      {w.reason}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-bold text-rose-700">₹{w.estimated_loss}</td>
                  <td className="py-3 px-3 text-chocolate-700">{w.logged_by}</td>
                  <td className="py-3 px-4 text-chocolate-500 text-xs italic">{w.notes || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </BentoCard>

      {/* Log Waste Modal */}
      {isWasteModalOpen && (
        <LogWasteModal
          isOpen={isWasteModalOpen}
          onClose={() => setIsWasteModalOpen(false)}
        />
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  Calendar, 
  DollarSign, 
  PieChart as PieIcon, 
  Award, 
  Clock, 
  ArrowUpRight,
  Filter
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
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

export const SalesAnalyticsView: React.FC = () => {
  const { sales, todaySalesTotal } = useBakery();
  const [timeFilter, setTimeFilter] = useState<'Daily' | 'Weekly' | 'Monthly' | 'Custom'>('Daily');

  // Sales Trends Data (Hourly for Daily, or 7-day for Weekly)
  const hourlyData = [
    { time: '06:00', sales: 1200, footfall: 14 },
    { time: '07:00', sales: 2400, footfall: 28 },
    { time: '08:00 (Rush)', sales: 4850, footfall: 65 },
    { time: '09:00', sales: 3200, footfall: 42 },
    { time: '10:00', sales: 1800, footfall: 22 },
    { time: '11:00', sales: 1400, footfall: 18 },
    { time: '12:00', sales: 900, footfall: 15 },
    { time: '14:00', sales: 750, footfall: 12 },
    { time: '16:00 (Tea)', sales: 1850, footfall: 34 },
    { time: '18:00', sales: 300, footfall: 8 }
  ];

  const weeklyTrendData = [
    { day: 'Mon', revenue: 14200, loaves: 55 },
    { day: 'Tue', revenue: 13800, loaves: 50 },
    { day: 'Wed', revenue: 15400, loaves: 58 },
    { day: 'Thu (Today)', revenue: 18650, loaves: 68 },
    { day: 'Fri', revenue: 22400, loaves: 85 },
    { day: 'Sat (Peak)', revenue: 26800, loaves: 110 },
    { day: 'Sun', revenue: 24500, loaves: 95 },
  ];

  // Best-selling vs Low-selling
  const bestSellers = [
    { name: 'Belgian Chocolate Truffle Cake', units: 12, revenue: 7800, margin: '51%', status: 'Top Earner' },
    { name: 'Artisan Sourdough Bread', units: 58, revenue: 2610, margin: '48%', status: 'Volume Leader' },
    { name: 'Classic Madagascar Vanilla Cake', units: 5, revenue: 2750, margin: '52%', status: 'High Margin' },
    { name: 'French Butter Croissant', units: 28, revenue: 2240, margin: '56%', status: 'Morning Staple' },
  ];

  const lowSellers = [
    { name: 'Glazed Donut (Single)', units: 15, revenue: 1050, advice: 'Bundle with coffee' },
    { name: 'Spiced Potato & Pea Veg Puff', units: 19, revenue: 760, advice: 'Offer combo with Chicken Puff' },
    { name: 'Blueberry Crumble Muffin', units: 14, revenue: 840, advice: 'Adjust morning bake size to 20' },
  ];

  // Category distribution
  const categoryData = [
    { name: 'Cakes & Gateaux', value: 10550, color: '#2A1810' },
    { name: 'Artisan Breads', value: 2610, color: '#E67E22' },
    { name: 'Viennoiserie & Pastries', value: 2240, color: '#F59E0B' },
    { name: 'Savory Puffs', value: 1360, color: '#945C3C' },
    { name: 'Donuts & Muffins', value: 1890, color: '#DEC4A4' },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-chocolate-950 tracking-tight">
            Sales & Revenue Analytics 📊
          </h1>
          <p className="text-sm text-chocolate-600 mt-1">
            Real-time transaction tracking, peak footfall hours, and product margin performance.
          </p>
        </div>

        {/* Time Filters */}
        <div className="flex bg-cream-200/90 p-1 rounded-2xl w-fit">
          {['Daily', 'Weekly', 'Monthly', 'Custom'].map(f => (
            <button
              key={f}
              onClick={() => setTimeFilter(f as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                timeFilter === f ? 'bg-white text-chocolate-950 shadow-warm-sm' : 'text-chocolate-600 hover:text-chocolate-950'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Revenue KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <BentoCard padding="sm">
          <div className="text-[11px] font-bold uppercase tracking-wider text-chocolate-500">Today's Gross Sales</div>
          <div className="text-3xl font-black font-display text-chocolate-950 mt-1">₹{todaySalesTotal.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14.2% vs yesterday (₹16,330)</span>
          </div>
        </BentoCard>

        <BentoCard padding="sm">
          <div className="text-[11px] font-bold uppercase tracking-wider text-chocolate-500">Weekly Revenue</div>
          <div className="text-3xl font-black font-display text-chocolate-950 mt-1">₹1,24,500</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">
            <span>On track for ₹1,35k target</span>
          </div>
        </BentoCard>

        <BentoCard padding="sm">
          <div className="text-[11px] font-bold uppercase tracking-wider text-chocolate-500">Monthly Revenue</div>
          <div className="text-3xl font-black font-display text-chocolate-950 mt-1">₹5,40,000</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">
            <span>+18% year-over-year</span>
          </div>
        </BentoCard>

        <BentoCard padding="sm">
          <div className="text-[11px] font-bold uppercase tracking-wider text-chocolate-500">Average Order Value (AOV)</div>
          <div className="text-3xl font-black font-display text-chocolate-950 mt-1">₹385</div>
          <div className="text-[11px] text-chocolate-600 font-medium mt-1">
            <span>Cake orders boost basket size</span>
          </div>
        </BentoCard>
      </div>

      {/* Primary Chart: Sales Velocity & Peak Hours */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <BentoCard
            title={timeFilter === 'Daily' ? "Today's Hourly Sales Velocity & Rush Hours" : "Weekly Revenue Trajectory"}
            subtitle={timeFilter === 'Daily' ? "Peak rush occurs at 08:00 AM (breakfast) and 04:00 PM (afternoon tea)" : "Weekend days account for 42% of total weekly bakery turnover"}
          >
            <div className="h-80 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                {timeFilter === 'Daily' ? (
                  <BarChart data={hourlyData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EBDDC9" vertical={false} />
                    <XAxis dataKey="time" stroke="#945C3C" fontSize={11} tickLine={false} />
                    <YAxis stroke="#945C3C" fontSize={11} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '1rem',
                        border: '1px solid #DEC4A4',
                        boxShadow: '0 4px 20px rgba(42, 24, 16, 0.1)',
                        fontSize: '12px'
                      }}
                    />
                    <Bar dataKey="sales" name="Sales (₹)" fill="#E67E22" radius={[8, 8, 0, 0]} />
                  </BarChart>
                ) : (
                  <LineChart data={weeklyTrendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EBDDC9" vertical={false} />
                    <XAxis dataKey="day" stroke="#945C3C" fontSize={11} tickLine={false} />
                    <YAxis stroke="#945C3C" fontSize={11} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '1rem',
                        border: '1px solid #DEC4A4',
                        fontSize: '12px'
                      }}
                    />
                    <Line type="monotone" dataKey="revenue" name="Daily Revenue (₹)" stroke="#2A1810" strokeWidth={3} dot={{ fill: '#E67E22', r: 5 }} />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>
          </BentoCard>
        </div>

        {/* Category Share (Donut Chart) */}
        <div className="lg:col-span-4">
          <BentoCard
            title="Revenue by Category"
            subtitle="Cakes & Gateaux generate 56% of total income"
          >
            <div className="h-56 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: number) => [`₹${val.toLocaleString()}`, 'Revenue']}
                    contentStyle={{ borderRadius: '0.75rem', fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-1.5 mt-2">
              {categoryData.map(cat => (
                <div key={cat.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-chocolate-800">{cat.name}</span>
                  </div>
                  <span className="font-bold text-chocolate-950">₹{cat.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </BentoCard>
        </div>
      </div>

      {/* Two Column: Best Sellers vs Low Sellers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Best Sellers */}
        <BentoCard
          title="🏆 Best-Selling Products"
          subtitle="Top gross revenue drivers with healthy profit margins"
        >
          <div className="space-y-3">
            {bestSellers.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-cream-100/70 border border-cream-200 flex items-center justify-between">
                <div>
                  <div className="text-xs sm:text-sm font-bold text-chocolate-950">{item.name}</div>
                  <div className="text-[11px] text-chocolate-500 mt-0.5">
                    {item.units} units sold today • Margin: {item.margin}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-caramel-600">₹{item.revenue.toLocaleString()}</div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-caramel-100 text-caramel-800">
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </BentoCard>

        {/* Low Sellers & Opportunities */}
        <BentoCard
          title="📉 Low-Selling Products & AI Fixes"
          subtitle="Items with slower turnover; recommendations to avoid staling"
        >
          <div className="space-y-3">
            {lowSellers.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200 flex items-center justify-between">
                <div>
                  <div className="text-xs sm:text-sm font-bold text-chocolate-950">{item.name}</div>
                  <div className="text-[11px] text-amber-900 mt-0.5 font-medium">
                    💡 AI Advice: {item.advice}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-chocolate-900">₹{item.revenue}</div>
                  <span className="text-[10px] text-chocolate-500">{item.units} sold</span>
                </div>
              </div>
            ))}
          </div>
        </BentoCard>
      </div>
    </div>
  );
};

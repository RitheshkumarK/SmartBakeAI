import React, { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  Calendar, 
  Info, 
  Check, 
  ArrowRight, 
  Flame, 
  Clock, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { useBakery } from '../context/BakeryContext';
import { BentoCard } from '../components/common/BentoCard';
import { Badge } from '../components/common/Badge';

export const DemandPredictionView: React.FC = () => {
  const { 
    products, 
    predictions, 
    sales, 
    setActiveTab, 
    generateProductionPlan, 
    addToast 
  } = useBakery();

  const [timeframe, setTimeframe] = useState<'today' | '7days' | '30days' | '3months'>('today');
  const [selectedProductId, setSelectedProductId] = useState<string>('prod-1'); // Default Bread

  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0];
  const selectedPrediction = predictions.find(p => p.product_id === selectedProductId) || predictions[0];

  // Prepare chart dataset: Historical Sales → Current Trend → AI Forecast
  const chartData = [
    { date: 'Sep 04 (Fri)', historical: 48, trend: 48, forecast: null },
    { date: 'Sep 05 (Sat)', historical: 62, trend: 60, forecast: null },
    { date: 'Sep 06 (Sun)', historical: 70, trend: 68, forecast: null },
    { date: 'Sep 07 (Mon)', historical: 42, trend: 45, forecast: null },
    { date: 'Sep 08 (Tue)', historical: 40, trend: 44, forecast: null },
    { date: 'Sep 09 (Wed)', historical: 45, trend: 49, forecast: null },
    { date: 'Sep 10 (Today)', historical: 58, trend: 58, forecast: 58 },
    { date: 'Sep 11 (Fri)', historical: null, trend: null, forecast: 78 },
    { date: 'Sep 12 (Sat Peak)', historical: null, trend: null, forecast: 120 },
    { date: 'Sep 13 (Sun)', historical: null, trend: null, forecast: 110 },
  ];

  const handleApplyToProduction = () => {
    generateProductionPlan();
    setActiveTab('production');
    addToast('success', 'Production Sync Complete', 'Forecasted demand applied to production schedule.');
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display font-black text-2xl sm:text-3xl text-chocolate-950 tracking-tight">
              AI Demand Prediction 🤖
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-caramel-100 text-caramel-900 text-xs font-bold border border-caramel-300">
              v2.6 Local Engine
            </span>
          </div>
          <p className="text-sm text-chocolate-600 mt-1">
            Multivariate machine learning demand forecasting analyzing footfall, day-of-week surges, and current stock.
          </p>
        </div>

        {/* Timeframe Selection */}
        <div className="flex bg-cream-200/90 p-1 rounded-2xl w-fit">
          {[
            { id: 'today', label: 'Today' },
            { id: '7days', label: '7 Days' },
            { id: '30days', label: '30 Days' },
            { id: '3months', label: '3 Months' }
          ].map(tf => (
            <button
              key={tf.id}
              onClick={() => setTimeframe(tf.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                timeframe === tf.id
                  ? 'bg-white text-chocolate-950 shadow-warm-sm'
                  : 'text-chocolate-600 hover:text-chocolate-950'
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Featured Prediction Card (Section 6 Canonical: Bread) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-chocolate-950 via-chocolate-900 to-chocolate-900 text-cream-50 shadow-warm-xl border border-caramel-400/40 relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-caramel-500/30 text-caramel-300 border border-caramel-500/40">
                ⭐ Featured Focus: {selectedProduct.name}
              </span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                AI Confidence: {selectedPrediction.confidence}%
              </span>
            </div>

            <blockquote className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight leading-snug">
              “Based on previous weekend sales, {selectedProduct.name.toLowerCase()} demand is expected to increase by 20%.”
            </blockquote>

            <p className="text-xs sm:text-sm text-cream-300/80 mt-2 leading-relaxed max-w-2xl">
              Our multi-factor algorithm analyzed 30 days of sales history, upcoming weekend footfall, local weather forecasts, and historical Saturday morning rushes to calibrate this recommendation.
            </p>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] font-bold uppercase tracking-wider text-cream-300/70">Current Stock</div>
                <div className="text-2xl font-black text-white font-display mt-0.5">
                  {selectedPrediction.current_stock} <span className="text-xs font-normal text-cream-300">{selectedProduct.unit}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-[10px] font-bold uppercase tracking-wider text-caramel-300">Predicted Demand</div>
                <div className="text-2xl font-black text-caramel-400 font-display mt-0.5">
                  {selectedPrediction.predicted_demand} <span className="text-xs font-normal text-cream-300">{selectedProduct.unit}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-caramel-500/20 border border-caramel-500/40">
                <div className="text-[10px] font-bold uppercase tracking-wider text-caramel-200">Recommended Production</div>
                <div className="text-2xl font-black text-caramel-300 font-display mt-0.5">
                  Produce {selectedPrediction.recommended_production}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40">
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">AI Confidence</div>
                <div className="text-2xl font-black text-emerald-300 font-display mt-0.5">
                  {selectedPrediction.confidence}%
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
            <button
              onClick={handleApplyToProduction}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-caramel-500 hover:bg-caramel-600 text-white font-bold text-sm shadow-warm-lg hover:shadow-glow-caramel hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group"
            >
              <span>✨ Apply to Production Planner</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <span className="text-[11px] text-cream-300/60 mt-2">Instantly queues into oven shift schedule</span>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-caramel-500/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Interactive Forecast Chart: Historical Sales -> Current Trend -> AI Forecast */}
      <BentoCard
        title="Interactive Forecast: Historical Sales → Current Trend → AI Forecast"
        subtitle={`Visualizing demand trajectory for ${selectedProduct.name} (Units)`}
        action={
          <div className="flex items-center gap-2">
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-cream-100 border border-cream-300 text-xs font-bold text-chocolate-900 focus:outline-none focus:ring-2 focus:ring-caramel-500"
            >
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
        }
      >
        <div className="h-80 w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorHist" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#78350F" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#78350F" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E67E22" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#E67E22" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EBDDC9" vertical={false} />
              <XAxis dataKey="date" stroke="#945C3C" fontSize={11} tickLine={false} />
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
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Area
                type="monotone"
                dataKey="historical"
                name="Historical Actual Sales"
                stroke="#3D2317"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorHist)"
              />
              <Area
                type="monotone"
                dataKey="trend"
                name="Moving Average Trend"
                stroke="#B87A54"
                strokeWidth={2}
                strokeDasharray="4 4"
                fill="none"
              />
              <Area
                type="monotone"
                dataKey="forecast"
                name="BakeFlow AI Forecast"
                stroke="#E67E22"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorForecast)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </BentoCard>

      {/* Grid of All Product Predictions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-extrabold text-xl text-chocolate-950">
            Catalog-Wide AI Predictions
          </h2>
          <span className="text-xs text-chocolate-500">
            Click any product to inspect forecast variables
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {predictions.map(pred => {
            const prod = products.find(p => p.id === pred.product_id);
            const isSelected = pred.product_id === selectedProductId;

            return (
              <div
                key={pred.product_id}
                onClick={() => setSelectedProductId(pred.product_id)}
                className={`p-5 rounded-3xl cursor-pointer transition-all duration-300 border ${
                  isSelected
                    ? 'bg-cream-100/90 border-caramel-500 shadow-warm-lg ring-2 ring-caramel-400/50'
                    : 'glass-card border-cream-200 hover:border-caramel-300 shadow-warm'
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    {prod?.image && (
                      <img src={prod.image} alt={pred.product_name} className="w-10 h-10 rounded-xl object-cover" />
                    )}
                    <div className="min-w-0">
                      <h4 className="font-bold text-sm text-chocolate-950 truncate">{pred.product_name}</h4>
                      <div className="text-[11px] text-chocolate-500">{prod?.category}</div>
                    </div>
                  </div>
                  <Badge status={pred.confidence > 90 ? 'healthy' : 'info'} size="sm">
                    {pred.confidence}% Conf.
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 border-y border-cream-200/80 text-center text-xs">
                  <div>
                    <div className="text-[10px] text-chocolate-400 font-bold uppercase">Current</div>
                    <div className="font-extrabold text-chocolate-900 mt-0.5">{pred.current_stock}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-caramel-600 font-bold uppercase">Predicted</div>
                    <div className="font-extrabold text-caramel-700 mt-0.5">{pred.predicted_demand}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-emerald-600 font-bold uppercase">Bake Rec.</div>
                    <div className="font-extrabold text-emerald-700 mt-0.5">
                      {pred.recommended_production > 0 ? `+${pred.recommended_production}` : '0'}
                    </div>
                  </div>
                </div>

                <div className="mt-3 space-y-1">
                  {pred.reasoning.slice(0, 2).map((reason, idx) => (
                    <div key={idx} className="text-[11px] text-chocolate-600 flex items-start gap-1.5">
                      <span className="text-caramel-600 font-bold">•</span>
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

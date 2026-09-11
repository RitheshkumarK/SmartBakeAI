import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Package, 
  Recycle, 
  Bot, 
  ClockAlert, 
  ChefHat, 
  ShoppingCart, 
  BarChart3, 
  CheckCircle2, 
  Star,
  Calculator,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useBakery } from '../context/BakeryContext';

export const LandingPage: React.FC = () => {
  const { setActiveTab } = useBakery();
  const [dailySalesSlider, setDailySalesSlider] = useState<number>(25000);

  // ROI Calculator estimations
  const monthlyRevenue = dailySalesSlider * 30;
  const estimatedCurrentWaste = Math.round(monthlyRevenue * 0.12); // ~12% standard bakery waste
  const estimatedSavingsWithAI = Math.round(estimatedCurrentWaste * 0.65); // 65% reduction in avoidable waste
  const annualSavings = estimatedSavingsWithAI * 12;

  const features = [
    {
      icon: TrendingUp,
      title: 'AI Demand Prediction',
      desc: 'Machine learning forecasting trained on footfall, day-of-week surges, weather, holidays, and past sales.',
      tag: 'Forecasting'
    },
    {
      icon: Package,
      title: 'Smart Inventory',
      desc: 'Real-time stock monitoring for finished pastries and raw baking ingredients with automated safety thresholds.',
      tag: 'Stock Control'
    },
    {
      icon: ClockAlert,
      title: 'Expiry Radar',
      desc: 'Urgency-coded alerts before milk, cream, or yeast spoil, with AI recipes to incorporate them into specials.',
      tag: 'Zero Spoilage'
    },
    {
      icon: ChefHat,
      title: 'Production Planning',
      desc: 'Answers “What Should I Bake Today?” every morning with optimized batch recommendations and ingredient checks.',
      tag: 'Shift Scheduler'
    },
    {
      icon: ShoppingCart,
      title: 'Purchase Recommendations',
      desc: 'Recipe BOM auto-calculator that suggests exact purchase quantities for flour, butter, and chocolate before shortages.',
      tag: 'Procurement'
    },
    {
      icon: Recycle,
      title: 'Waste Intelligence',
      desc: 'Track discarded goods, analyze root causes (burnt, expired, unsold), and calculate recovered profit margins.',
      tag: 'Sustainability'
    },
    {
      icon: BarChart3,
      title: 'Sales Analytics',
      desc: 'Deep dive into hourly customer rush hours, best-selling artisan loaves, and category profit margins.',
      tag: 'Revenue Intel'
    },
    {
      icon: Bot,
      title: 'BakeBot AI Assistant',
      desc: 'Conversational assistant available 24/7 to answer inventory queries, check stock, and optimize bakery operations.',
      tag: 'AI Co-pilot'
    }
  ];

  return (
    <div className="min-h-screen bg-cream-50 text-chocolate-900 selection:bg-caramel-500 selection:text-white">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 glass-nav px-6 lg:px-16 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-caramel-500 to-chocolate-800 flex items-center justify-center text-white text-xl shadow-warm">
            🥐
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-xl text-chocolate-950 tracking-tight">BakeFlow</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-caramel-500 text-white uppercase tracking-wider">AI</span>
            </div>
            <span className="text-[10px] text-chocolate-500 tracking-wide">Smart Bakery Platform</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-chocolate-700">
          <a href="#features" className="hover:text-caramel-600 transition-colors">Features</a>
          <a href="#demo" className="hover:text-caramel-600 transition-colors">AI Preview</a>
          <a href="#roi" className="hover:text-caramel-600 transition-colors">ROI Calculator</a>
          <a href="#testimonials" className="hover:text-caramel-600 transition-colors">Testimonials</a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('auth')}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-chocolate-700 hover:text-chocolate-950 hover:bg-cream-100 transition-colors"
          >
            Log In
          </button>
          <button
            onClick={() => setActiveTab('command')}
            className="px-5 py-2.5 rounded-2xl text-sm font-bold bg-caramel-500 hover:bg-caramel-600 text-white shadow-warm hover:shadow-glow-caramel transition-all flex items-center gap-2 group"
          >
            <span>Launch App</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 px-6 lg:px-16 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-caramel-100/80 border border-caramel-300 text-caramel-900 text-xs font-bold mb-6 shadow-warm-sm animate-warm-pulse">
            <Sparkles className="w-4 h-4 text-caramel-600" />
            <span>Next-Gen 2026 Bakery Intelligence Operating System</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-chocolate-950 tracking-tight leading-[1.15]">
            Run Your Bakery Smarter <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-caramel-600 via-caramel-500 to-amber-600 bg-clip-text text-transparent">
              with BakeFlow AI.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-chocolate-700 leading-relaxed font-normal">
            Predict demand. Manage inventory. Reduce waste. Grow your bakery.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setActiveTab('command')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-caramel-500 to-caramel-600 hover:from-caramel-600 hover:to-caramel-700 text-white text-base font-bold shadow-warm-lg hover:shadow-glow-caramel hover:scale-[1.02] transition-all flex items-center justify-center gap-2.5"
            >
              <span>Explore Live Demo</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveTab('auth')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-cream-100 text-chocolate-900 border border-cream-300 text-base font-bold shadow-warm hover:shadow-warm-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Get Started Free</span>
              <ChevronRight className="w-4 h-4 text-chocolate-400" />
            </button>
          </div>

          <p className="mt-3.5 text-xs text-chocolate-500">
            ⚡ Pre-loaded with realistic bakery inventory, 30 days of sales history, and AI insights.
          </p>
        </div>

        {/* Hero Visual Mockup with Floating Stats */}
        <div className="mt-14 relative max-w-5xl mx-auto">
          {/* Main Visual Frame */}
          <div className="relative rounded-3xl sm:rounded-4xl p-2.5 sm:p-4 bg-gradient-to-b from-caramel-300/40 via-cream-200/50 to-chocolate-900/10 shadow-2xl border border-cream-300/80 backdrop-blur-md">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-chocolate-950 aspect-[16/9] max-h-[500px] flex items-center justify-center group">
              <img
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600&auto=format&fit=crop&q=80"
                alt="Artisan Bakery Kitchen"
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-chocolate-950 via-chocolate-950/40 to-transparent" />
              
              {/* Overlay Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/20 backdrop-blur-md text-white text-xs font-semibold w-fit mb-3 border border-white/20">
                  <Bot className="w-4 h-4 text-caramel-400" />
                  <span>Real-Time AI Forecasting Engine</span>
                </div>
                <h3 className="text-xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  “Bread demand expected to increase 20% this weekend.”
                </h3>
                <p className="text-xs sm:text-sm text-cream-200 mt-1 max-w-xl">
                  Automated BOM calculation recommended producing 50 additional loaves and ordering 8 kg of Flour before Friday shift.
                </p>
              </div>
            </div>
          </div>

          {/* Floating Stat 1: Demand +18% */}
          <div className="absolute -top-6 -left-4 sm:left-4 z-20 p-4 rounded-2xl glass-card shadow-warm-lg border border-cream-300/80 flex items-center gap-3 transform -rotate-1 hover:rotate-0 transition-transform">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              📈
            </div>
            <div>
              <div className="text-[11px] font-bold text-chocolate-500 uppercase tracking-wider">Demand Surge</div>
              <div className="text-lg font-black text-emerald-700">+18% This Week</div>
            </div>
          </div>

          {/* Floating Stat 2: Inventory Health 92% */}
          <div className="absolute -top-8 -right-4 sm:right-6 z-20 p-4 rounded-2xl glass-card shadow-warm-lg border border-cream-300/80 flex items-center gap-3 transform rotate-2 hover:rotate-0 transition-transform">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
              📦
            </div>
            <div>
              <div className="text-[11px] font-bold text-chocolate-500 uppercase tracking-wider">Inventory Health</div>
              <div className="text-lg font-black text-sky-700">92% Optimum</div>
            </div>
          </div>

          {/* Floating Stat 3: Waste -23% */}
          <div className="absolute -bottom-6 left-2 sm:left-12 z-20 p-4 rounded-2xl glass-card shadow-warm-lg border border-cream-300/80 flex items-center gap-3 transform rotate-1 hover:rotate-0 transition-transform">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              ♻️
            </div>
            <div>
              <div className="text-[11px] font-bold text-chocolate-500 uppercase tracking-wider">Food Waste Cut</div>
              <div className="text-lg font-black text-emerald-700">-23% Reduced</div>
            </div>
          </div>

          {/* Floating Stat 4: AI Recommendations */}
          <div className="absolute -bottom-6 right-2 sm:right-12 z-20 p-4 rounded-2xl glass-card shadow-warm-lg border border-cream-300/80 flex items-center gap-3 transform -rotate-2 hover:rotate-0 transition-transform">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              🤖
            </div>
            <div>
              <div className="text-[11px] font-bold text-chocolate-500 uppercase tracking-wider">AI Recommendations</div>
              <div className="text-lg font-black text-chocolate-900">4 Active Plans</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-20 px-6 lg:px-16 max-w-7xl mx-auto border-t border-cream-200">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-200/80 text-chocolate-700 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Commercial-Grade Intelligence</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-chocolate-950">
            Engineered Specifically for Modern Bakeries
          </h2>
          <p className="mt-3 text-sm sm:text-base text-chocolate-600">
            Everything your bakery needs to forecast sales, eliminate food spoilage, streamline ingredient procurement, and delight customers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl glass-card border border-cream-200 hover:border-caramel-400/60 shadow-warm hover:shadow-warm-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-caramel-50 text-caramel-600 group-hover:bg-caramel-500 group-hover:text-white transition-colors flex items-center justify-center shadow-warm-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cream-100 text-chocolate-600">
                      {feat.tag}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-chocolate-950 tracking-tight group-hover:text-caramel-600 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-chocolate-600 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-cream-100 flex items-center text-xs font-bold text-caramel-700 group-hover:text-caramel-900 gap-1">
                  <span>Explore module</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive ROI Calculator Section */}
      <section id="roi" className="py-20 px-6 lg:px-16 bg-gradient-to-b from-cream-100/60 to-cream-50 border-y border-cream-200">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
                <Calculator className="w-3.5 h-3.5" />
                <span>Bakery Waste & Profit Calculator</span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-chocolate-950">
                How Much Can Your Bakery Save?
              </h2>
              <p className="mt-3 text-sm text-chocolate-600 leading-relaxed">
                Traditional bakeries lose between 10% to 15% of daily revenue to unsold loaves and expired ingredients. Drag the slider to see your projected recovery with BakeFlow AI.
              </p>

              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 text-xs text-chocolate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Reduces day-end unsold baguettes and sourdoughs</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-chocolate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Eliminates bulk heavy cream & milk expiry losses</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-chocolate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Optimizes raw ingredient inventory holding costs</span>
                </div>
              </div>
            </div>

            {/* Interactive Calculator Card */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white shadow-warm-xl border border-cream-300">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-chocolate-600">
                    Average Daily Bakery Sales
                  </label>
                  <span className="text-2xl font-black text-caramel-600 font-display">
                    ₹{dailySalesSlider.toLocaleString()} / day
                  </span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="150000"
                  step="5000"
                  value={dailySalesSlider}
                  onChange={(e) => setDailySalesSlider(Number(e.target.value))}
                  className="w-full h-2 bg-cream-200 rounded-lg appearance-none cursor-pointer accent-caramel-500"
                />
                <div className="flex justify-between text-[10px] text-chocolate-400 mt-1">
                  <span>₹5,000 (Small Cafe)</span>
                  <span>₹75,000 (Artisan Boutique)</span>
                  <span>₹1,50,000+ (High Volume)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-cream-200">
                <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100">
                  <div className="text-[11px] font-bold uppercase text-rose-700">Estimated Current Waste</div>
                  <div className="text-2xl font-black text-rose-700 mt-1">₹{estimatedCurrentWaste.toLocaleString()}</div>
                  <div className="text-[11px] text-rose-600/80 mt-0.5">approx. 12% revenue lost monthly</div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                  <div className="text-[11px] font-bold uppercase text-emerald-700">Estimated Annual Savings</div>
                  <div className="text-2xl font-black text-emerald-700 mt-1">₹{annualSavings.toLocaleString()}</div>
                  <div className="text-[11px] text-emerald-600/80 mt-0.5">recovered profit with BakeFlow AI</div>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('command')}
                className="w-full mt-6 py-3.5 rounded-2xl bg-caramel-500 hover:bg-caramel-600 text-white font-bold text-sm shadow-warm hover:shadow-glow-caramel transition-all flex items-center justify-center gap-2"
              >
                <span>Try BakeFlow AI on Your Bakery Data</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section id="testimonials" className="py-20 px-6 lg:px-16 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2 className="font-display font-extrabold text-3xl text-chocolate-950">
            Trusted by Master Bakers & Patisseries
          </h2>
          <p className="mt-2 text-sm text-chocolate-600">
            See how bakeries transform their morning kitchen routines and bottom-line margins.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl glass-card border border-cream-200 shadow-warm flex flex-col justify-between">
            <div>
              <div className="flex text-amber-400 gap-1 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-xs sm:text-sm text-chocolate-800 leading-relaxed italic">
                “BakeFlow AI predicted our weekend Sourdough spike with 94% accuracy. We never ran out before noon, and our food waste dropped from 45kg to under 12kg.”
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-cream-100 flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=100&auto=format&fit=crop&q=80"
                alt="Aryan Sharma"
                className="w-10 h-10 rounded-xl object-cover"
              />
              <div>
                <div className="text-xs font-bold text-chocolate-900">Aryan Sharma</div>
                <div className="text-[10px] text-chocolate-500">General Manager, La Petite Pâtisserie</div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl glass-card border border-cream-200 shadow-warm flex flex-col justify-between">
            <div>
              <div className="flex text-amber-400 gap-1 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-xs sm:text-sm text-chocolate-800 leading-relaxed italic">
                “The Expiry Radar alone saved us thousands of rupees in dairy and cream. BakeBot reminds us what to fold into daily specials before it expires.”
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-cream-100 flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=100&auto=format&fit=crop&q=80"
                alt="Chef Marcus"
                className="w-10 h-10 rounded-xl object-cover"
              />
              <div>
                <div className="text-xs font-bold text-chocolate-900">Chef Marcus Laurent</div>
                <div className="text-[10px] text-chocolate-500">Master Pastry Chef, Golden Crust</div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl glass-card border border-cream-200 shadow-warm flex flex-col justify-between">
            <div>
              <div className="flex text-amber-400 gap-1 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-xs sm:text-sm text-chocolate-800 leading-relaxed italic">
                “The Production Planner button ‘What Should I Bake Today?’ gives my team exact tray counts in 5 seconds every morning. It feels like having an extra sous-chef.”
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-cream-100 flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                alt="Priya Verma"
                className="w-10 h-10 rounded-xl object-cover"
              />
              <div>
                <div className="text-xs font-bold text-chocolate-900">Priya Verma</div>
                <div className="text-[10px] text-chocolate-500">Founder, Flour & Bloom Bakery</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-16 px-6 lg:px-16 bg-gradient-to-br from-chocolate-950 via-chocolate-900 to-chocolate-950 text-cream-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl bg-caramel-500 flex items-center justify-center text-white text-2xl mx-auto mb-6 shadow-glow-caramel">
            🥐
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-cream-50 tracking-tight">
            Ready to Run Your Bakery Smarter?
          </h2>
          <p className="mt-4 text-base text-cream-200/80 max-w-xl mx-auto">
            Experience real-time AI inventory management, demand forecasting, and zero-waste kitchen production.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setActiveTab('command')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-caramel-500 hover:bg-caramel-600 text-white font-bold text-base shadow-warm-lg hover:shadow-glow-caramel transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Interactive Demo</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveTab('auth')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-base transition-all"
            >
              <span>Sign Up Free</span>
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-300/60">
            <div>© 2026 BakeFlow AI Inc. All rights reserved.</div>
            <div className="mt-2 sm:mt-0">“Smarter Inventory. Less Waste. Better Bakery.”</div>
          </div>
        </div>
      </section>
    </div>
  );
};

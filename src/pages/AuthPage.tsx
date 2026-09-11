import React, { useState } from 'react';
import { Sparkles, ArrowRight, Lock, Mail, User, Store, ShieldCheck } from 'lucide-react';
import { useBakery } from '../context/BakeryContext';

export const AuthPage: React.FC = () => {
  const { setUser, setActiveTab, addToast } = useBakery();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  
  // Login fields
  const [loginEmail, setLoginEmail] = useState('manager@bakeflow.ai');
  const [loginPassword, setLoginPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  // Signup fields
  const [signupName, setSignupName] = useState('');
  const [signupBakeryName, setSignupBakeryName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      id: 'usr-1',
      name: 'Aryan Sharma',
      email: loginEmail,
      bakery_name: 'La Petite Pâtisserie & Boulangerie',
      role: 'Bakery Manager',
      avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=150&auto=format&fit=crop&q=80'
    });
    addToast('success', 'Welcome Back, Aryan!', 'Logged in as Bakery Manager.');
    setActiveTab('command');
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupPassword !== signupConfirmPassword) {
      addToast('error', 'Password Mismatch', 'Passwords do not match. Please verify.');
      return;
    }
    setUser({
      id: `usr-${Date.now()}`,
      name: signupName || 'New Bakery Owner',
      email: signupEmail || 'owner@bakery.com',
      bakery_name: signupBakeryName || 'Artisan Bakery Co.',
      role: 'Store Owner',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    });
    addToast('success', 'Account Created!', `Welcome to BakeFlow AI, ${signupName || 'Owner'}!`);
    setActiveTab('command');
  };

  const handleQuickDemoLogin = (roleName: 'Bakery Manager' | 'Head Baker' | 'Store Owner') => {
    if (roleName === 'Bakery Manager') {
      setUser({
        id: 'usr-1',
        name: 'Aryan Sharma',
        email: 'manager@bakeflow.ai',
        bakery_name: 'La Petite Pâtisserie & Boulangerie',
        role: 'Bakery Manager',
        avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=150&auto=format&fit=crop&q=80'
      });
    } else if (roleName === 'Head Baker') {
      setUser({
        id: 'usr-2',
        name: 'Marcus Laurent',
        email: 'baker@bakeflow.ai',
        bakery_name: 'La Petite Pâtisserie & Boulangerie',
        role: 'Head Baker',
        avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&auto=format&fit=crop&q=80'
      });
    } else {
      setUser({
        id: 'usr-3',
        name: 'Priya Verma',
        email: 'owner@bakeflow.ai',
        bakery_name: 'La Petite Pâtisserie & Boulangerie',
        role: 'Store Owner',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
      });
    }
    addToast('success', `Quick Access: ${roleName}`, 'Demo session activated.');
    setActiveTab('command');
  };

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl bg-white rounded-3xl sm:rounded-4xl shadow-2xl border border-cream-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Visual Sidebar */}
        <div className="lg:col-span-5 bg-gradient-to-br from-chocolate-950 via-chocolate-900 to-chocolate-800 text-cream-50 p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-2xl bg-caramel-500 flex items-center justify-center text-white text-xl shadow-warm">
                🥐
              </div>
              <span className="font-display font-black text-2xl text-cream-50 tracking-tight">BakeFlow AI</span>
            </div>

            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-cream-50 leading-tight">
              Smarter Inventory. <br />
              <span className="text-caramel-400">Less Waste.</span> <br />
              Better Bakery.
            </h2>

            <p className="mt-4 text-xs sm:text-sm text-cream-200/80 leading-relaxed">
              Log in to access your daily AI demand predictions, recipe BOM calculations, and smart production schedules.
            </p>
          </div>

          {/* Quick Demo Access Buttons */}
          <div className="relative z-10 mt-10 pt-6 border-t border-white/10">
            <p className="text-[11px] font-bold uppercase tracking-wider text-caramel-300 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>1-Click Instant Demo Access</span>
            </p>
            <div className="space-y-2">
              <button
                onClick={() => handleQuickDemoLogin('Bakery Manager')}
                className="w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-cream-50 transition-all flex items-center justify-between text-left group"
              >
                <span>👤 Log in as Bakery Manager</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => handleQuickDemoLogin('Head Baker')}
                className="w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-cream-50 transition-all flex items-center justify-between text-left group"
              >
                <span>🥐 Log in as Head Baker</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => handleQuickDemoLogin('Store Owner')}
                className="w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-cream-50 transition-all flex items-center justify-between text-left group"
              >
                <span>💼 Log in as Store Owner</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="absolute -bottom-16 -right-16 w-52 h-52 bg-caramel-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Right Form Container */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
          {/* Tab Switcher */}
          <div className="flex bg-cream-100 p-1 rounded-2xl mb-8">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                mode === 'login' ? 'bg-white text-chocolate-900 shadow-warm-sm' : 'text-chocolate-600 hover:text-chocolate-900'
              }`}
            >
              Sign In to Bakery
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                mode === 'signup' ? 'bg-white text-chocolate-900 shadow-warm-sm' : 'text-chocolate-600 hover:text-chocolate-900'
              }`}
            >
              Register New Bakery
            </button>
          </div>

          {mode === 'login' ? (
            /* Login Form */
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-600 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-chocolate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="manager@bakeflow.ai"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream-300 bg-white text-chocolate-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-chocolate-600">
                    Password
                  </label>
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); addToast('info', 'Password Reset', 'Demo mode: Any password works!'); }} className="text-xs font-semibold text-caramel-600 hover:text-caramel-700">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-chocolate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream-300 bg-white text-chocolate-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-2 text-xs text-chocolate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-cream-300 text-caramel-600 focus:ring-caramel-500"
                  />
                  <span>Remember me on this browser</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-caramel-500 hover:bg-caramel-600 text-white font-bold text-sm shadow-warm hover:shadow-glow-caramel transition-all flex items-center justify-center gap-2 mt-4"
              >
                <span>Login to Command Center</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* Signup Form */
            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-600 mb-1.5">
                  Your Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-chocolate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="Chef Pierre Dubois"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream-300 bg-white text-chocolate-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-600 mb-1.5">
                  Bakery Name
                </label>
                <div className="relative">
                  <Store className="w-4 h-4 text-chocolate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={signupBakeryName}
                    onChange={(e) => setSignupBakeryName(e.target.value)}
                    placeholder="Artisan Boulangerie & Cafe"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream-300 bg-white text-chocolate-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-600 mb-1.5">
                  Work Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-chocolate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="chef@artisanboulangerie.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-cream-300 bg-white text-chocolate-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-600 mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-white text-chocolate-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-chocolate-600 mb-1.5">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    required
                    value={signupConfirmPassword}
                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-white text-chocolate-900 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-caramel-500 hover:bg-caramel-600 text-white font-bold text-sm shadow-warm hover:shadow-glow-caramel transition-all flex items-center justify-center gap-2 mt-4"
              >
                <span>Create Account & Start Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="mt-8 pt-4 border-t border-cream-100 flex items-center justify-between text-xs text-chocolate-500">
            <button
              onClick={() => setActiveTab('landing')}
              className="text-chocolate-600 hover:text-chocolate-950 font-semibold"
            >
              ← Back to Landing Page
            </button>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Bank-grade 256-bit encryption
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

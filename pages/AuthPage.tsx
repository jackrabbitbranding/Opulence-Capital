import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Lock, ArrowRight, ShieldCheck, TrendingUp } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { currentTenant } = useTheme();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email)) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Please try demo accounts.');
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      {/* Left Panel - Visuals */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/90 to-violet-900/90 mix-blend-multiply z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center grayscale opacity-50"></div>
        
        <div className="relative z-20 flex flex-col justify-between w-full p-16 text-white h-full">
           <div>
             <div className="h-14 w-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 mb-10 shadow-2xl">
                <TrendingUp className="w-7 h-7 text-white" />
             </div>
             <h1 className="text-6xl font-bold leading-tight mb-8 tracking-tight">Wealth<br/><span className="text-indigo-200">Reimagined.</span></h1>
             <p className="text-xl text-slate-100 max-w-md leading-relaxed font-light">
               Experience the next generation of financial management. Secure, transparent, and tailored to your growth.
             </p>
           </div>
           
           <div className="grid grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:bg-white/15 transition-colors">
                 <ShieldCheck className="w-8 h-8 text-emerald-300 mb-4" />
                 <h3 className="font-bold text-lg mb-2">Bank-Grade Security</h3>
                 <p className="text-sm text-slate-200 leading-relaxed">Your data is encrypted and protected with industry-leading standards.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:bg-white/15 transition-colors">
                 <TrendingUp className="w-8 h-8 text-indigo-300 mb-4" />
                 <h3 className="font-bold text-lg mb-2">Smart Analytics</h3>
                 <p className="text-sm text-slate-200 leading-relaxed">Real-time insights to help you make informed investment decisions.</p>
              </div>
           </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-32 bg-white relative">
        <div className="max-w-md w-full mx-auto animate-fade-in">
          <div className="mb-12">
             <h2 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">Welcome back</h2>
             <p className="text-slate-500 text-lg">Please enter your details to sign in.</p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 text-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-medium"
                placeholder="name@company.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 text-slate-900 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-medium"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
               <div className="flex items-center">
                 <input type="checkbox" id="remember" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
                 <label htmlFor="remember" className="ml-2 text-slate-600 font-medium">Remember me</label>
               </div>
               <a href="#" className="text-primary hover:text-indigo-800 font-bold">Forgot password?</a>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-rose-50 text-rose-600 text-sm border border-rose-100 flex items-center font-medium">
                <span className="mr-2 text-lg">⚠️</span> {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-lg shadow-indigo-200 text-base font-bold text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all transform hover:-translate-y-0.5"
            >
              Sign in <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </form>

          <div className="mt-12">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-400 font-medium uppercase tracking-wider text-xs">Quick Demo Access</span>
              </div>
            </div>

            <div className="mt-8 space-y-4">
               <button onClick={() => setEmail('admin@platform.com')} className="w-full flex items-center justify-between px-6 py-4 border border-gray-100 rounded-xl shadow-sm bg-white hover:border-indigo-100 hover:shadow-md transition-all group">
                 <span className="text-sm font-bold text-slate-700">Super Admin</span>
                 <span className="text-sm text-gray-400 font-mono group-hover:text-primary transition-colors">admin@platform.com</span>
               </button>
               <button onClick={() => setEmail('rahul@opulence.com')} className="w-full flex items-center justify-between px-6 py-4 border border-gray-100 rounded-xl shadow-sm bg-white hover:border-indigo-100 hover:shadow-md transition-all group">
                 <span className="text-sm font-bold text-slate-700">Advisor</span>
                 <span className="text-sm text-gray-400 font-mono group-hover:text-primary transition-colors">rahul@opulence.com</span>
               </button>
               <button onClick={() => setEmail('amit@gmail.com')} className="w-full flex items-center justify-between px-6 py-4 border border-gray-100 rounded-xl shadow-sm bg-white hover:border-indigo-100 hover:shadow-md transition-all group">
                 <span className="text-sm font-bold text-slate-700">Client</span>
                 <span className="text-sm text-gray-400 font-mono group-hover:text-primary transition-colors">amit@gmail.com</span>
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
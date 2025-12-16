
import React, { useState, useEffect } from 'react';
import { PublicLayout } from '../components/ui/Layout';
import { ArrowRight, Shield, TrendingUp, DollarSign, Target, Award, Users, Mail, Phone, MapPin, Send, CheckCircle, BookOpen, Clock, Calendar, Percent, Briefcase, ChevronDown, ChevronUp, Star, Quote } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { MOCK_POSTS } from '../services/mockData';
import { SEOHead } from '../components/SEOHead';

// --- Reusable Financial Calculator Component ---
export const FinancialTools: React.FC<{ type?: 'all' | 'sip' | 'emi' | 'retirement' }> = ({ type = 'all' }) => {
  const [activeTab, setActiveTab] = useState<'sip' | 'emi' | 'retirement'>('sip');
  const [sipInvestment, setSipInvestment] = useState(5000);
  const [sipRate, setSipRate] = useState(12);
  const [sipYears, setSipYears] = useState(10);
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [loanRate, setLoanRate] = useState(9);
  const [loanTenure, setLoanTenure] = useState(5);
  const [currentAge, setCurrentAge] = useState(30);
  const [retireAge, setRetireAge] = useState(60);
  const [monthlyExp, setMonthlyExp] = useState(30000);

  useEffect(() => {
    if (type !== 'all') {
      setActiveTab(type);
    }
  }, [type]);
  
  const calculateSIP = () => {
    const monthlyRate = sipRate / 12 / 100;
    const months = sipYears * 12;
    return sipInvestment * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate * (1 + monthlyRate);
  };
  const calculateEMI = () => {
    const monthlyRate = loanRate / 12 / 100;
    const months = loanTenure * 12;
    return (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  };
  const calculateRetirement = () => {
    const years = retireAge - currentAge;
    const fvExpense = monthlyExp * Math.pow(1 + 0.06, years);
    return { corpus: fvExpense * 12 * 20, monthly: fvExpense };
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      {type === 'all' && (
        <div className="flex border-b border-gray-100">
          {['sip', 'emi', 'retirement'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab as any)} className={`flex-1 py-5 text-center font-bold text-sm uppercase tracking-wider transition-colors ${activeTab === tab ? 'bg-primary text-white' : 'hover:bg-gray-50 text-gray-600'}`}>{tab} Calculator</button>
          ))}
        </div>
      )}
      <div className="p-10">
        {activeTab === 'sip' && (
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div><label className="block text-sm font-bold text-gray-700 mb-3">Monthly Investment (₹)</label><input type="range" min="500" max="100000" step="500" value={sipInvestment} onChange={(e) => setSipInvestment(Number(e.target.value))} className="w-full accent-primary" /><div className="text-right font-bold text-primary mt-2">₹ {sipInvestment.toLocaleString()}</div></div>
              <div><label className="block text-sm font-bold text-gray-700 mb-3">Expected Return (%)</label><input type="range" min="5" max="30" step="0.5" value={sipRate} onChange={(e) => setSipRate(Number(e.target.value))} className="w-full accent-primary" /><div className="text-right font-bold text-primary mt-2">{sipRate}%</div></div>
              <div><label className="block text-sm font-bold text-gray-700 mb-3">Time Period (Years)</label><input type="range" min="1" max="30" value={sipYears} onChange={(e) => setSipYears(Number(e.target.value))} className="w-full accent-primary" /><div className="text-right font-bold text-primary mt-2">{sipYears} Years</div></div>
            </div>
            <div className="bg-blue-50 p-8 rounded-3xl text-center"><p className="text-xs font-bold text-gray-500 uppercase">Future Value</p><div className="text-5xl font-bold text-primary my-4">₹ {Math.round(calculateSIP()).toLocaleString()}</div><p className="text-sm text-green-600 font-bold">Gain: ₹ {(Math.round(calculateSIP()) - (sipInvestment * sipYears * 12)).toLocaleString()}</p></div>
          </div>
        )}
        {activeTab === 'emi' && (
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div><label className="block text-sm font-bold text-gray-700 mb-3">Loan Amount (₹)</label><input type="range" min="100000" max="10000000" step="10000" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full accent-primary" /><div className="text-right font-bold text-primary mt-2">₹ {loanAmount.toLocaleString()}</div></div>
              <div><label className="block text-sm font-bold text-gray-700 mb-3">Interest Rate (%)</label><input type="range" min="5" max="20" step="0.1" value={loanRate} onChange={(e) => setLoanRate(Number(e.target.value))} className="w-full accent-primary" /><div className="text-right font-bold text-primary mt-2">{loanRate}%</div></div>
              <div><label className="block text-sm font-bold text-gray-700 mb-3">Tenure (Years)</label><input type="range" min="1" max="30" value={loanTenure} onChange={(e) => setLoanTenure(Number(e.target.value))} className="w-full accent-primary" /><div className="text-right font-bold text-primary mt-2">{loanTenure} Years</div></div>
            </div>
            <div className="bg-blue-50 p-8 rounded-3xl text-center"><p className="text-xs font-bold text-gray-500 uppercase">Monthly EMI</p><div className="text-5xl font-bold text-primary my-4">₹ {Math.round(calculateEMI()).toLocaleString()}</div><p className="text-sm text-gray-500">Total Interest: ₹ {(Math.round(calculateEMI()) * loanTenure * 12 - loanAmount).toLocaleString()}</p></div>
          </div>
        )}
        {activeTab === 'retirement' && (
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div><label className="block text-sm font-bold text-gray-700 mb-3">Current Age: {currentAge}</label><input type="range" min="20" max="60" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} className="w-full accent-primary" /></div>
              <div><label className="block text-sm font-bold text-gray-700 mb-3">Retirement Age: {retireAge}</label><input type="range" min="50" max="75" value={retireAge} onChange={(e) => setRetireAge(Number(e.target.value))} className="w-full accent-primary" /></div>
              <div><label className="block text-sm font-bold text-gray-700 mb-3">Current Monthly Expense (₹)</label><input className="w-full border-gray-200 rounded-lg p-3" type="number" value={monthlyExp} onChange={(e) => setMonthlyExp(Number(e.target.value))} /></div>
            </div>
            <div className="bg-blue-50 p-8 rounded-3xl text-center"><p className="text-xs font-bold text-gray-500 uppercase">Required Corpus</p><div className="text-4xl font-bold text-primary my-4">₹ {(calculateRetirement().corpus / 10000000).toFixed(2)} Cr</div><p className="text-xs text-gray-500">Est. expense at retirement: ₹ {Math.round(calculateRetirement().monthly).toLocaleString()}</p></div>
          </div>
        )}
      </div>
    </div>
  );
};

export const LandingPage: React.FC = () => {
  const { currentTenant } = useTheme();

  return (
    <PublicLayout>
      <SEOHead title="Home" />
      <div className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0"><div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary/30 blur-3xl"></div><div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl"></div></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium text-blue-200 mb-6 animate-fadeIn">Trusted by 5000+ Investors</span>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight leading-tight">Wealth Management <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Reimagined.</span></h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto font-light leading-relaxed">Secure your financial future with {currentTenant.name}. Expert advisory, comprehensive insurance, and smart lending solutions.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/login" className="bg-primary hover:bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:-translate-y-1 shadow-lg shadow-primary/30">Get Started</Link>
            <Link to="/calculators" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:shadow-lg">Financial Tools</Link>
          </div>
        </div>
      </div>
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16"><h2 className="text-3xl font-bold text-gray-900">Holistic Financial Services</h2><p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">Everything you need to manage, grow, and protect your wealth under one roof.</p></div>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"><div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors"><TrendingUp className="h-7 w-7 text-primary group-hover:text-white transition-colors" /></div><h3 className="text-2xl font-bold mb-3 text-gray-900">Smart Investments</h3><p className="text-gray-600 mb-6 leading-relaxed">Expertly managed portfolios in Equity, Mutual Funds, and PMS tailored to your risk profile.</p><Link to="/services" className="text-primary font-bold inline-flex items-center group-hover:translate-x-1 transition-transform">Learn more <ArrowRight className="w-4 h-4 ml-2"/></Link></div>
            <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"><div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors"><Shield className="h-7 w-7 text-green-600 group-hover:text-white transition-colors" /></div><h3 className="text-2xl font-bold mb-3 text-gray-900">Comprehensive Insurance</h3><p className="text-gray-600 mb-6 leading-relaxed">Protect your family and assets with our range of Life, Health, and General insurance plans.</p><Link to="/services" className="text-green-600 font-bold inline-flex items-center group-hover:translate-x-1 transition-transform">Learn more <ArrowRight className="w-4 h-4 ml-2"/></Link></div>
            <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"><div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors"><DollarSign className="h-7 w-7 text-purple-600 group-hover:text-white transition-colors" /></div><h3 className="text-2xl font-bold mb-3 text-gray-900">Hassle-free Loans</h3><p className="text-gray-600 mb-6 leading-relaxed">Quick approvals for Home, Personal, and Business loans with competitive interest rates.</p><Link to="/services" className="text-purple-600 font-bold inline-flex items-center group-hover:translate-x-1 transition-transform">Learn more <ArrowRight className="w-4 h-4 ml-2"/></Link></div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export const AboutPage: React.FC = () => {
  const { currentTenant } = useTheme();
  return (
    <PublicLayout>
      <SEOHead title="About Us" description={`Learn about ${currentTenant.name}'s mission to democratize wealth management.`} />
      <div className="bg-slate-900 text-white py-32 relative overflow-hidden"><div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"><h1 className="text-5xl md:text-6xl font-bold mb-6">About {currentTenant.name}</h1><p className="text-xl md:text-2xl max-w-3xl mx-auto text-slate-300 font-light">Empowering your financial journey with expert guidance and innovative technology.</p></div></div>
      
      {/* Mission Section - Updated */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 text-primary bg-blue-50 px-3 py-1 rounded-full mb-6">
                <Target className="h-4 w-4" />
                <span className="font-bold tracking-wide uppercase text-xs">Our Mission</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">Democratizing Wealth Management</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At {currentTenant.name}, we believe that professional financial guidance should be accessible to everyone, not just the ultra-wealthy. Our goal is to simplify the complex world of finance through technology and transparency.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We envision a future where every individual has the tools and knowledge to build generational wealth. By integrating investment, insurance, and lending services into a single platform, we are redefining how India manages money.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="flex flex-col">
                      <span className="text-3xl font-bold text-primary">5K+</span>
                      <span className="text-sm text-gray-500 font-medium">Families Trust Us</span>
                  </div>
                  <div className="flex flex-col">
                      <span className="text-3xl font-bold text-primary">₹500Cr+</span>
                      <span className="text-sm text-gray-500 font-medium">Assets Managed</span>
                  </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-purple-600 rounded-3xl opacity-30 blur-lg"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px]">
                <img 
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                  alt="Team meeting" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-gray-900">Trusted by Families</h2>
             <p className="mt-4 text-xl text-gray-500">See what our valued clients have to say about their journey with us.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
               <Quote className="w-10 h-10 text-primary/20 mb-6" />
               <p className="text-gray-600 italic mb-6 leading-relaxed">"{currentTenant.name} helped me plan my retirement with absolute clarity. The transparency in their advisory process is unmatched in the industry."</p>
               <div className="flex items-center">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-700 mr-3">R</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Rajesh Khanna</h4>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Mumbai, India</p>
                  </div>
               </div>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
               <Quote className="w-10 h-10 text-primary/20 mb-6" />
               <p className="text-gray-600 italic mb-6 leading-relaxed">"I was confused about insurance policies for my family. The team guided me to the perfect health and term plans. Highly recommended!"</p>
               <div className="flex items-center">
                  <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center font-bold text-purple-700 mr-3">P</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Priya Patel</h4>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Ahmedabad, India</p>
                  </div>
               </div>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
               <Quote className="w-10 h-10 text-primary/20 mb-6" />
               <p className="text-gray-600 italic mb-6 leading-relaxed">"Their loan processing service was incredibly fast. I got my home loan approved within days at a very competitive interest rate."</p>
               <div className="flex items-center">
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-700 mr-3">V</div>
                  <div>
                    <h4 className="font-bold text-gray-900">Vikram Singh</h4>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Bangalore, India</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-4 text-xl text-gray-500">Common queries about our wealth management services.</p>
          </div>
          <div className="space-y-4">
             <details className="group bg-gray-50 rounded-xl border border-gray-100 open:ring-2 open:ring-primary/20 transition-all">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6 text-gray-900 text-lg">
                  How do you structure your advisory fees?
                  <span className="transition group-open:rotate-180">
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </span>
                </summary>
                <div className="text-gray-600 px-6 pb-6 pt-0 leading-relaxed">
                  We believe in complete transparency. Our advisory fees are based on the Assets Under Management (AUM) or a flat consultation fee, depending on the service model you choose. There are no hidden charges or entry loads.
                </div>
             </details>

             <details className="group bg-gray-50 rounded-xl border border-gray-100 open:ring-2 open:ring-primary/20 transition-all">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6 text-gray-900 text-lg">
                  What is the minimum investment required to start?
                  <span className="transition group-open:rotate-180">
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </span>
                </summary>
                <div className="text-gray-600 px-6 pb-6 pt-0 leading-relaxed">
                  You can start investing with as little as ₹500 per month via SIPs (Systematic Investment Plans) in Mutual Funds. For Portfolio Management Services (PMS), the minimum requirement is typically ₹50 Lakhs as per SEBI regulations.
                </div>
             </details>

             <details className="group bg-gray-50 rounded-xl border border-gray-100 open:ring-2 open:ring-primary/20 transition-all">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6 text-gray-900 text-lg">
                  Do you help with insurance claim settlements?
                  <span className="transition group-open:rotate-180">
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </span>
                </summary>
                <div className="text-gray-600 px-6 pb-6 pt-0 leading-relaxed">
                  Absolutely. We provide end-to-end claim assistance for all insurance policies purchased through us. Our dedicated support team coordinates with the insurer to ensure a smooth and hassle-free settlement process.
                </div>
             </details>

             <details className="group bg-gray-50 rounded-xl border border-gray-100 open:ring-2 open:ring-primary/20 transition-all">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6 text-gray-900 text-lg">
                  Is my data safe with your platform?
                  <span className="transition group-open:rotate-180">
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </span>
                </summary>
                <div className="text-gray-600 px-6 pb-6 pt-0 leading-relaxed">
                  Yes, we use bank-grade encryption and security protocols to protect your personal and financial data. We are fully compliant with Indian data privacy laws and do not share your information with unauthorized third parties.
                </div>
             </details>
             
             <details className="group bg-gray-50 rounded-xl border border-gray-100 open:ring-2 open:ring-primary/20 transition-all">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6 text-gray-900 text-lg">
                  How can I apply for a loan through your platform?
                  <span className="transition group-open:rotate-180">
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </span>
                </summary>
                <div className="text-gray-600 px-6 pb-6 pt-0 leading-relaxed">
                  You can apply for home, personal, or business loans directly through your dashboard. Our team will review your requirement, match you with the best lenders, and assist with documentation and disbursement.
                </div>
             </details>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export const ServicesPage: React.FC = () => {
  return (
    <PublicLayout>
      <SEOHead title="Our Services" description="Strategic investments, comprehensive insurance, and loan solutions." />
      <div className="bg-slate-900 text-white py-24 text-center"><div className="max-w-4xl mx-auto px-4"><h1 className="text-5xl font-bold mb-6">Our Services</h1><p className="text-xl text-slate-300 font-light">Holistic financial solutions tailored to your life goals.</p></div></div>
      <div className="max-w-7xl mx-auto px-4 py-24 space-y-32">
        <div className="grid md:grid-cols-2 gap-16 items-center"><div><h2 className="text-4xl font-bold text-gray-900 mb-6">Strategic Investments</h2><p className="text-lg text-gray-600 mb-8">We offer a diverse range of investment vehicles designed to maximize returns while managing risk.</p><ul className="space-y-4">{['Mutual Funds', 'Direct Equity', 'PMS', 'Corporate Bonds', 'Sovereign Gold Bonds'].map(item => (<li key={item} className="flex items-center text-gray-700 font-medium"><CheckCircle className="w-5 h-5 text-green-500 mr-3" /> {item}</li>))}</ul></div><div className="rounded-3xl overflow-hidden shadow-xl bg-gray-100 h-80"><img src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover"/></div></div>
        <div className="grid md:grid-cols-2 gap-16 items-center md:flex-row-reverse"><div className="md:order-2"><h2 className="text-4xl font-bold text-gray-900 mb-6">Comprehensive Insurance</h2><p className="text-lg text-gray-600 mb-8">Safeguard your family's future and your assets with our insurance solutions.</p><ul className="space-y-4">{['Term Life Insurance', 'Health & Critical Illness', 'Motor Insurance', 'Home Insurance'].map(item => (<li key={item} className="flex items-center text-gray-700 font-medium"><CheckCircle className="w-5 h-5 text-green-500 mr-3" /> {item}</li>))}</ul></div><div className="rounded-3xl overflow-hidden shadow-xl md:order-1 bg-gray-100 h-80"><img src="https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover"/></div></div>
        <div className="grid md:grid-cols-2 gap-16 items-center"><div><h2 className="text-4xl font-bold text-gray-900 mb-6">Loan Solutions</h2><p className="text-lg text-gray-600 mb-8">Competitive interest rates and hassle-free processing for all your financing needs.</p><ul className="space-y-4">{['Home Loans', 'Personal Loans', 'Business Loans', 'Loan Against Property'].map(item => (<li key={item} className="flex items-center text-gray-700 font-medium"><CheckCircle className="w-5 h-5 text-green-500 mr-3" /> {item}</li>))}</ul></div><div className="rounded-3xl overflow-hidden shadow-xl bg-gray-100 h-80"><img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover"/></div></div>
      </div>
    </PublicLayout>
  );
};

export const KnowledgeCenterPage: React.FC = () => {
  return (
    <PublicLayout>
      <SEOHead title="Knowledge Center" description="Financial insights, market analysis, and educational resources." />
      <div className="bg-slate-900 text-white py-24 text-center"><h1 className="text-5xl font-bold mb-6">Knowledge Center</h1><p className="text-xl text-slate-300 font-light">Expert insights, market analysis, and financial guides.</p></div>
      <div className="max-w-7xl mx-auto px-4 py-24"><div className="grid md:grid-cols-3 gap-10">{MOCK_POSTS.map(post => (<div key={post.id} className="bg-white rounded-3xl shadow-sm overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col group cursor-pointer hover:-translate-y-2"><div className="h-64 bg-gray-200 relative overflow-hidden"><img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" /><div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm uppercase tracking-wide">{post.category}</div></div><div className="p-8 flex-grow flex flex-col"><h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-primary transition-colors">{post.title}</h3><p className="text-gray-600 mb-6 flex-grow leading-relaxed">{post.excerpt}</p></div></div>))}</div></div>
    </PublicLayout>
  );
};

export const CalculatorPage: React.FC = () => {
  return (
    <PublicLayout>
      <SEOHead title="Financial Tools" description="Calculators for SIP, EMI, and Retirement planning." />
      <div className="max-w-5xl mx-auto px-4 py-20">
        <div className="text-center mb-12"><h2 className="text-4xl font-bold text-gray-900">Financial Calculators</h2><p className="text-gray-500 mt-2">Plan your future with precision.</p></div>
        <FinancialTools type="all" />
      </div>
    </PublicLayout>
  );
};

export const DynamicCustomPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { currentTenant } = useTheme();
  const page = currentTenant.customPages?.find(p => p.slug === slug && p.isPublished);

  if (!page) {
    return <PublicLayout><div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4"><h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1><p className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</p><Link to="/" className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors">Return Home</Link></div></PublicLayout>;
  }

  const renderSection = (section: any) => {
    switch(section.type) {
      case 'HERO': return (<div key={section.id} className="relative py-32 overflow-hidden bg-slate-900 text-white" style={{ backgroundColor: section.content.backgroundColor, color: section.content.textColor }}>{section.content.backgroundImage && (<div className="absolute inset-0 z-0"><div className="absolute inset-0 bg-black/40 z-10"></div><img src={section.content.backgroundImage} className="w-full h-full object-cover" alt="Hero BG" /></div>)}<div className="relative z-20 max-w-7xl mx-auto px-4 text-center"><h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">{section.content.title}</h1>{section.content.subtitle && <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-light" style={{ color: section.content.textColor ? 'inherit' : undefined, opacity: 0.9 }}>{section.content.subtitle}</p>}{section.content.buttonText && (<a href={section.content.buttonLink || '#'} className="bg-white text-slate-900 hover:bg-gray-100 px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg transform hover:-translate-y-1 inline-block" style={{ color: section.content.backgroundColor, backgroundColor: section.content.textColor }}>{section.content.buttonText}</a>)}</div></div>);
      case 'TEXT': return (<div key={section.id} className="py-24" style={{ backgroundColor: section.content.backgroundColor, color: section.content.textColor }}><div className="max-w-4xl mx-auto px-4"><div className="prose prose-lg prose-blue max-w-none leading-relaxed" style={{ color: section.content.textColor }} dangerouslySetInnerHTML={{ __html: section.content.html }} /></div></div>);
      case 'HTML': return (<div key={section.id} dangerouslySetInnerHTML={{ __html: section.content.html }} />);
      case 'FEATURES': return (<div key={section.id} className="py-24 bg-gray-50"><div className="max-w-7xl mx-auto px-4"><div className="grid md:grid-cols-3 gap-10">{section.content.items?.map((item: any, i: number) => (<div key={i} className="p-8 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"><h3 className="text-xl font-bold mb-3">{item.title}</h3><p className="text-gray-600">{item.description}</p></div>))}</div></div></div>);
      case 'IMAGE_TEXT': return (<div key={section.id} className="py-24 bg-white" style={{ backgroundColor: section.content.backgroundColor, color: section.content.textColor }}><div className="max-w-7xl mx-auto px-4"><div className={`grid md:grid-cols-2 gap-16 items-center ${section.content.imagePosition === 'left' ? 'md:flex-row-reverse' : ''}`}><div className={section.content.imagePosition === 'left' ? 'md:order-2' : ''}><h2 className="text-4xl font-bold mb-6">{section.content.title}</h2><p className="text-lg leading-relaxed opacity-80">{section.content.text}</p></div><div className={`rounded-3xl overflow-hidden shadow-2xl h-96 ${section.content.imagePosition === 'left' ? 'md:order-1' : ''}`}><img src={section.content.image || "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"} className="w-full h-full object-cover"/></div></div></div></div>);
      case 'CTA': return (<div key={section.id} className="py-24 bg-primary text-white text-center" style={{ backgroundColor: section.content.backgroundColor, color: section.content.textColor }}><div className="max-w-4xl mx-auto px-4"><h2 className="text-4xl font-bold mb-8">{section.content.title}</h2><a href={section.content.buttonLink} className="bg-white text-primary px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-gray-100 transition-colors inline-block" style={{ color: section.content.backgroundColor, backgroundColor: section.content.textColor }}>{section.content.buttonText}</a></div></div>);
      case 'CALCULATOR': return (<div key={section.id} className="py-24 bg-gray-50" style={{ backgroundColor: section.content.backgroundColor, color: section.content.textColor }}><div className="max-w-5xl mx-auto px-4"><div className="text-center mb-12"><h2 className="text-4xl font-bold mb-4">{section.content.title}</h2></div><FinancialTools type={section.content.calculatorType} /></div></div>);
      case 'MAP': 
        const encodedAddress = encodeURIComponent(section.content.address || 'Mumbai');
        const mapSrc = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
        return (
          <div key={section.id} className="py-24 bg-white" style={{ backgroundColor: section.content.backgroundColor, color: section.content.textColor }}>
            <div className="max-w-7xl mx-auto px-4">
               {section.content.title && <div className="text-center mb-12"><h2 className="text-4xl font-bold mb-4">{section.content.title}</h2></div>}
               <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-200">
                  <iframe 
                    width="100%" 
                    height={section.content.height || 450} 
                    frameBorder="0" 
                    scrolling="no" 
                    marginHeight={0} 
                    marginWidth={0} 
                    src={mapSrc}
                    title="Map Location"
                  ></iframe>
               </div>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <PublicLayout>
      <SEOHead 
        title={page.seo?.title || page.title} 
        description={page.seo?.description} 
        keywords={page.seo?.keywords} 
        image={page.seo?.ogImage} 
      />
      <div>
        {page.sections?.sort((a: any, b: any) => a.order - b.order).map(renderSection)}
      </div>
    </PublicLayout>
  );
};

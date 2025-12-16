
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { LayoutDashboard, Users, PieChart, FileText, Settings, LogOut, Menu, X, Home, Calculator, BookOpen, Briefcase, User as UserIcon, HelpCircle, Globe, ChevronDown, Bell, Search, Shield, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { UserRole } from '../../types';

export const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentTenant } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  // Default navigation if not configured
  const defaultNav = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Insights', path: '/knowledge' },
    { label: 'Tools', path: '/calculators' },
  ];
  
  const navLinks = currentTenant.headerConfig?.navigation.length 
    ? currentTenant.headerConfig.navigation 
    : defaultNav;

  const showAuth = currentTenant.headerConfig?.showAuthButton ?? true;

  // Footer defaults
  const footerLinks = currentTenant.footerConfig?.links || [
     { id: 'd1', label: 'About Us', path: '/about' },
     { id: 'd2', label: 'Our Services', path: '/services' },
     { id: 'd3', label: 'Insights & Blog', path: '/knowledge' },
     { id: 'd4', label: 'Financial Calculators', path: '/calculators' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans selection:bg-primary/20">
      <header className="fixed w-full top-0 z-50 glass-panel transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
               {currentTenant.logoUrl ? (
                 <img src={currentTenant.logoUrl} alt={currentTenant.name} className="h-9 w-auto object-contain" />
               ) : (
                 <div className="h-10 w-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                    <Globe className="w-5 h-5" />
                 </div>
               )}
               <span className="text-xl font-bold text-slate-900 tracking-tight">{currentTenant.name}</span>
            </div>
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((item) => (
                <Link key={item.path + item.label} to={item.path} className={`text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-200 ${location.pathname === item.path ? 'text-primary bg-primary/5 font-semibold' : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'}`}>
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="hidden md:flex items-center space-x-4">
               {showAuth && (
                 <Link to="/login" className="text-sm font-semibold text-white bg-slate-900 px-6 py-2.5 rounded-full hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 hover:shadow-slate-900/20 transform hover:-translate-y-0.5 active:translate-y-0">
                   Client Login
                 </Link>
               )}
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 absolute w-full h-screen">
            <div className="px-6 py-8 space-y-4">
               {navLinks.map((item) => (
                 <Link key={item.path} to={item.path} className="block text-xl font-medium text-slate-900">{item.label}</Link>
               ))}
               {showAuth && (
                 <Link to="/login" className="block mt-8 text-center w-full px-6 py-4 text-lg font-bold text-white bg-primary rounded-2xl shadow-xl shadow-primary/20">Login</Link>
               )}
            </div>
          </div>
        )}
      </header>
      
      <main className="flex-grow pt-20">
        {children}
      </main>
      
      <footer className="bg-slate-900 text-white pt-24 pb-12 rounded-t-[3rem] mt-12 mx-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
             <div className="col-span-1 md:col-span-1 space-y-6">
               <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-white/10 rounded-lg flex items-center justify-center text-white">
                    <Globe className="w-4 h-4" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{currentTenant.name}</h3>
               </div>
               <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
                 {currentTenant.footerConfig?.description || currentTenant.welcomeMessage || 'Empowering your financial future with expert guidance and technology.'}
               </p>
             </div>
             <div>
               <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Quick Links</h4>
               <ul className="space-y-4 text-sm text-slate-400">
                 {footerLinks.map((link) => (
                   <li key={link.path + link.label}><Link to={link.path} className="hover:text-white transition-colors">{link.label}</Link></li>
                 ))}
               </ul>
             </div>
             <div>
               <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Legal</h4>
               <ul className="space-y-4 text-sm text-slate-400">
                 <li>Privacy Policy</li>
                 <li>Terms of Service</li>
                 <li>Disclaimer</li>
                 <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div> SEBI: {currentTenant.sebiRegNo || 'Pending'}</li>
               </ul>
             </div>
             <div>
               <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Contact</h4>
               {currentTenant.footerConfig?.showContact !== false && (
                 <div className="space-y-4 text-sm text-slate-400">
                   <p className="flex items-center gap-3"><span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"><Briefcase className="w-3 h-3"/></span> {currentTenant.contactEmail || 'support@finance.com'}</p>
                   <p className="flex items-center gap-3"><span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"><Briefcase className="w-3 h-3"/></span> {currentTenant.contactPhone || '+91 123 456 7890'}</p>
                   <p className="leading-relaxed pl-11 border-l-2 border-slate-800 ml-4">{currentTenant.address || 'Financial District, Mumbai, India'}</p>
                 </div>
               )}
             </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
            <p>{currentTenant.footerConfig?.copyrightText || `© 2024 ${currentTenant.name}. All rights reserved.`}</p>
            <p className="mt-2 md:mt-0">Secured by Opulence Tech</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const { currentTenant } = useTheme();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const location = useLocation();

  const getNavItems = () => {
    const common = [{ name: 'Overview', icon: LayoutDashboard, path: '/dashboard' }];
    
    // Super Admin: Full Access
    if (user?.role === UserRole.SUPER_ADMIN) {
      return [
        ...common,
        { name: 'Website Builder', icon: Globe, path: '/dashboard/builder' },
        { name: 'Tenant Agencies', icon: Briefcase, path: '/dashboard/tenants' },
        { name: 'User Management', icon: Users, path: '/dashboard/users' },
        { name: 'Communication', icon: Mail, path: '/dashboard/communication' },
        { name: 'System Settings', icon: Settings, path: '/dashboard/settings' },
        { name: 'Profile', icon: UserIcon, path: '/dashboard/profile' },
      ];
    }

    // Semi Admin: Tenants, Users, Profile (No Builder/Settings)
    if (user?.role === UserRole.SEMI_ADMIN) {
      return [
        ...common,
        { name: 'Tenant Agencies', icon: Briefcase, path: '/dashboard/tenants' },
        { name: 'User Management', icon: Users, path: '/dashboard/users' },
        { name: 'Communication', icon: Mail, path: '/dashboard/communication' },
        { name: 'System Docs', icon: FileText, path: '/dashboard/documents' },
        { name: 'Profile', icon: UserIcon, path: '/dashboard/profile' },
      ];
    }

    // Advisor: Clients, Docs, Profile
    if (user?.role === UserRole.ADVISOR) {
      return [
        ...common,
        { name: 'My Clients', icon: Users, path: '/dashboard/clients' },
        { name: 'Communication', icon: Mail, path: '/dashboard/communication' },
        { name: 'Documents', icon: FileText, path: '/dashboard/documents' },
        { name: 'Profile', icon: UserIcon, path: '/dashboard/profile' },
      ];
    }

    // Client: Portfolio, Docs, Support
    if (user?.role === UserRole.CLIENT) {
      return [
        ...common,
        { name: 'My Portfolio', icon: PieChart, path: '/dashboard/portfolio' },
        { name: 'Documents Vault', icon: FileText, path: '/dashboard/documents' },
        { name: 'Help & Support', icon: HelpCircle, path: '/dashboard/support' },
        { name: 'Profile', icon: UserIcon, path: '/dashboard/profile' },
      ];
    }
    return common;
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>
        <div className="h-24 flex items-center px-8 border-b border-gray-50">
           <div className="flex items-center gap-3">
             <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/20">
               {currentTenant.name.charAt(0)}
             </div>
             <div className="flex flex-col">
               <span className="font-bold text-base leading-none text-slate-900">{currentTenant.name}</span>
               <span className="text-[11px] text-slate-400 mt-1.5 uppercase tracking-widest font-semibold">{user?.role.replace('_', ' ')}</span>
             </div>
           </div>
        </div>
        
        <div className="flex-1 overflow-y-auto py-8 px-5 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`group flex items-center px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-200 ${isActive ? 'bg-primary/5 text-primary' : 'text-slate-500 hover:bg-gray-50 hover:text-slate-900'}`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-primary' : 'text-slate-400 group-hover:text-slate-600'}`} />
                {item.name}
              </Link>
            );
          })}
        </div>
        
        <div className="p-5 border-t border-gray-50">
          <button onClick={logout} className="flex items-center w-full px-4 py-3 text-sm font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors">
            <LogOut className="mr-3 h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 px-8 h-24 flex items-center justify-between border-b border-gray-100/50">
            <div className="flex items-center">
              <button className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 mr-4" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-6 w-6" />
              </button>
              <h2 className="text-xl font-bold text-slate-800 capitalize tracking-tight hidden sm:block">
                {location.pathname.split('/')[2] || 'Overview'}
              </h2>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center bg-gray-50 rounded-full px-4 py-2 border border-gray-100">
                <Search className="w-4 h-4 text-gray-400 mr-2" />
                <input type="text" placeholder="Search..." className="bg-transparent border-none text-sm focus:outline-none w-48 text-gray-600 placeholder:text-gray-400" />
              </div>

              <button className="p-2.5 text-gray-400 hover:text-primary rounded-full hover:bg-primary/5 transition-colors relative">
                <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
                <Bell className="w-5 h-5" />
              </button>
              
              <div className="h-8 w-px bg-gray-100 hidden sm:block"></div>
              
              <div className="flex items-center gap-3 pl-2 cursor-pointer hover:opacity-80 transition-opacity">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-bold text-slate-700 leading-none">{user?.name}</p>
                  <p className="text-xs text-slate-400 mt-1">{user?.email}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent p-0.5 shadow-md">
                  <div className="h-full w-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                      {user?.avatar ? <img src={user.avatar} alt="" className="h-full w-full object-cover" /> : <span className="font-bold text-primary text-sm">{user?.name.charAt(0)}</span>}
                  </div>
                </div>
              </div>
            </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          <div className="max-w-7xl mx-auto animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

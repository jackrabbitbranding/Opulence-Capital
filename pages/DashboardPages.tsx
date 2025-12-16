
import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route, useNavigate, Link, useSearchParams } from 'react-router-dom';
import { DashboardLayout } from '../components/ui/Layout';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';
import { 
  Users, TrendingUp, ShieldCheck, CreditCard, Settings, Edit, Save, FileText, Download, Search, Plus, 
  ArrowLeft, ArrowRight, ToggleLeft, ToggleRight, User as UserIcon, Lock, Bell, AlertTriangle, 
  CheckCircle, XCircle, FileCheck, ClipboardCheck, Info, Target, HelpCircle, MessageSquare, Upload, 
  Trash2, Globe, Layout, Palette, Image as ImageIcon, MoveUp, MoveDown, Grid, Type, Monitor, Mail, 
  Award, Smile, Megaphone, Sidebar, Server, Activity, Copy, GripVertical, PanelTop, PanelBottom, 
  Search as SearchIcon, ChevronDown, ChevronUp, Calculator, Map, Shield, Send 
} from 'lucide-react';
import { 
  getInvestmentsByClient, getLoansByClient, getInsuranceByClient, getAllClientsByTenant, MOCK_TENANTS, getDocumentsByClient, getClientById, getAuditLogs, getSupportTickets, getNotifications, MOCK_USERS, MOCK_COMMUNICATIONS
} from '../services/mockData';
import { 
  UserRole, Tenant, Document, KYCStatus, RiskProfileType, CustomPage, MediaAsset, PageSection, SectionType, SeoConfig, User, Communication 
} from '../types';

// --- Shared Components ---

const StatCard: React.FC<{ title: string; value: string; icon: any; color: string }> = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-card flex items-center hover:shadow-float transition-all duration-300 group border border-gray-100/50">
    <div className={`p-4 rounded-xl mr-5 ${color} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300 transform group-hover:scale-110`}>
      <Icon className={`h-6 w-6 ${color.replace('bg-', 'text-')}`} />
    </div>
    <div>
      <p className="text-sm font-semibold text-gray-400 mb-1 uppercase tracking-wide">{title}</p>
      <p className="text-2xl font-bold text-slate-800 tracking-tight">{value}</p>
    </div>
  </div>
);

const SectionHeader: React.FC<{ title: string; description?: string; action?: React.ReactNode }> = ({ title, description, action }) => (
  <div className="mb-10 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 border-b border-gray-100 pb-6">
    <div>
      <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{title}</h1>
      {description && <p className="text-slate-500 mt-2 text-base font-medium">{description}</p>}
    </div>
    {action}
  </div>
);

const KYCStatusBadge: React.FC<{ status: KYCStatus }> = ({ status }) => {
  const styles = {
    [KYCStatus.VERIFIED]: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    [KYCStatus.PENDING]: 'bg-amber-50 text-amber-700 border-amber-100',
    [KYCStatus.SUBMITTED]: 'bg-blue-50 text-blue-700 border-blue-100',
    [KYCStatus.REJECTED]: 'bg-red-50 text-red-700 border-red-100',
  };
  const icons = {
    [KYCStatus.VERIFIED]: CheckCircle,
    [KYCStatus.PENDING]: AlertTriangle,
    [KYCStatus.SUBMITTED]: FileCheck,
    [KYCStatus.REJECTED]: XCircle,
  };
  const Icon = icons[status];

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${styles[status]}`}>
      <Icon className="w-3.5 h-3.5 mr-1.5"/> {status.replace('_', ' ')}
    </span>
  );
};

const RiskProfileBadge: React.FC<{ profile: RiskProfileType }> = ({ profile }) => {
  const colors = {
    [RiskProfileType.CONSERVATIVE]: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    [RiskProfileType.MODERATE]: 'bg-violet-50 text-violet-700 border-violet-100',
    [RiskProfileType.AGGRESSIVE]: 'bg-rose-50 text-rose-700 border-rose-100',
    [RiskProfileType.PENDING]: 'bg-gray-50 text-gray-600 border-gray-100',
  };
  return <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${colors[profile]}`}>{profile}</span>;
};

const SEBIDisclaimer: React.FC = () => (
  <div className="mt-12 bg-gray-50 border border-gray-200 p-6 text-xs text-gray-500 rounded-xl leading-relaxed">
    <p className="font-bold mb-2 text-gray-700 flex items-center"><Info className="w-4 h-4 mr-2"/> Standard Regulatory Disclaimer:</p>
    <p>
      Investments in the securities market are subject to market risks. Read all the related documents carefully before investing. 
      The securities quoted are for illustration only and are not recommendatory. Registration granted by SEBI, membership of BASL (in case of IAs) 
      and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.
    </p>
  </div>
);

// --- Communication Center ---

const CommunicationCenter: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preFilledEmail = searchParams.get('email') || '';
  
  const [communications, setCommunications] = useState<Communication[]>(MOCK_COMMUNICATIONS);
  const [recipient, setRecipient] = useState(preFilledEmail);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'compose' | 'history'>('compose');

  // Simple filtered user list for "To" dropdown (excluding current user ideally)
  const users = MOCK_USERS; 

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if(!recipient || !subject || !message) return;

    const newComm: Communication = {
      id: `c${Date.now()}`,
      senderId: 'currentUser', // Mock
      receiverEmail: recipient,
      subject,
      message,
      date: new Date().toISOString().split('T')[0],
      status: 'Sent'
    };
    
    setCommunications([newComm, ...communications]);
    alert(`Email sent successfully to ${recipient}!`);
    
    // Reset form
    setRecipient('');
    setSubject('');
    setMessage('');
    setActiveTab('history');
  };

  return (
    <div>
      <SectionHeader title="Communication Center" description="Send emails and manage communications with your clients and team." />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left / Top: Controls */}
        <div className="lg:col-span-1 space-y-4">
           <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <nav className="space-y-1">
                <button 
                  onClick={() => setActiveTab('compose')} 
                  className={`w-full flex items-center px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'compose' ? 'bg-primary text-white shadow-lg' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <Edit className="w-4 h-4 mr-3" /> Compose Email
                </button>
                <button 
                  onClick={() => setActiveTab('history')} 
                  className={`w-full flex items-center px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'history' ? 'bg-primary text-white shadow-lg' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <Activity className="w-4 h-4 mr-3" /> Sent History
                </button>
              </nav>
           </div>
           
           <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
              <h4 className="font-bold text-indigo-900 mb-2 flex items-center"><Info className="w-4 h-4 mr-2"/> Email Tips</h4>
              <p className="text-xs text-indigo-700 leading-relaxed">
                Ensure your subject line is clear. Communications regarding investments should include standard disclaimers automatically appended by the system.
              </p>
           </div>
        </div>

        {/* Right / Main Area */}
        <div className="lg:col-span-2">
          {activeTab === 'compose' && (
             <div className="bg-white p-8 rounded-2xl shadow-card border border-gray-100 animate-fade-in">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center"><Mail className="w-5 h-5 mr-2 text-primary"/> New Message</h3>
                <form onSubmit={handleSend} className="space-y-6">
                   <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Recipient</label>
                      <div className="relative">
                        <select 
                          className="w-full border-gray-200 rounded-xl p-3 text-sm focus:ring-primary focus:border-primary appearance-none bg-white" 
                          value={recipient} 
                          onChange={e => setRecipient(e.target.value)}
                          required
                        >
                          <option value="">Select a user...</option>
                          {users.map(u => (
                            <option key={u.id} value={u.email}>{u.name} ({u.email}) - {u.role}</option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-4 pointer-events-none"/>
                      </div>
                      {preFilledEmail && recipient === preFilledEmail && (
                        <p className="text-xs text-emerald-600 mt-2 font-medium flex items-center"><CheckCircle className="w-3 h-3 mr-1"/> Pre-filled from user selection</p>
                      )}
                   </div>
                   
                   <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                      <input 
                        type="text" 
                        className="w-full border-gray-200 rounded-xl p-3 text-sm focus:ring-primary focus:border-primary" 
                        placeholder="e.g. Portfolio Review Q3" 
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        required
                      />
                   </div>
                   
                   <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Message Body</label>
                      <textarea 
                        className="w-full border-gray-200 rounded-xl p-3 text-sm focus:ring-primary focus:border-primary min-h-[200px]" 
                        placeholder="Write your message here..." 
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        required
                      ></textarea>
                   </div>
                   
                   <div className="flex justify-end pt-4 border-t border-gray-100">
                      <button type="submit" className="bg-primary text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-indigo-700 transition-all flex items-center">
                        <Send className="w-4 h-4 mr-2" /> Send Email
                      </button>
                   </div>
                </form>
             </div>
          )}

          {activeTab === 'history' && (
             <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden animate-fade-in">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                   <h3 className="font-bold text-slate-800">Sent History</h3>
                </div>
                <div className="divide-y divide-gray-100">
                   {communications.map(comm => (
                      <div key={comm.id} className="p-6 hover:bg-gray-50 transition-colors">
                         <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-slate-800 text-sm">{comm.subject}</h4>
                            <span className="text-xs font-mono text-gray-400">{comm.date}</span>
                         </div>
                         <p className="text-sm text-gray-500 mb-3">To: <span className="font-medium text-gray-700">{comm.receiverEmail}</span></p>
                         <p className="text-sm text-gray-600 line-clamp-2">{comm.message}</p>
                         <div className="mt-3 flex items-center">
                            <span className="text-[10px] font-bold uppercase tracking-wide bg-emerald-50 text-emerald-600 px-2 py-1 rounded border border-emerald-100">{comm.status}</span>
                         </div>
                      </div>
                   ))}
                   {communications.length === 0 && (
                     <div className="p-12 text-center text-gray-400">
                       <Mail className="w-12 h-12 mx-auto mb-3 opacity-20"/>
                       <p>No communications sent yet.</p>
                     </div>
                   )}
                </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- User Management Component ---

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const { currentTenant } = useTheme();
  const navigate = useNavigate();

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);
    // In a real app, this would make an API call
  };

  const roleConfig = {
    [UserRole.SUPER_ADMIN]: { color: 'bg-purple-100 text-purple-700 border-purple-200', label: 'Super Admin' },
    [UserRole.SEMI_ADMIN]: { color: 'bg-indigo-100 text-indigo-700 border-indigo-200', label: 'Semi Admin' },
    [UserRole.ADVISOR]: { color: 'bg-blue-100 text-blue-700 border-blue-200', label: 'Advisor' },
    [UserRole.CLIENT]: { color: 'bg-emerald-100 text-emerald-700 border-emerald-200', label: 'Client' },
  };

  const PermissionsMatrix = () => (
    <div className="mb-10 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h3 className="font-bold text-gray-800 flex items-center"><ShieldCheck className="w-5 h-5 mr-2 text-primary"/> Role & Permissions Matrix</h3>
      </div>
      <div className="p-0 overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-3">Feature Access</th>
              <th className="px-6 py-3 text-center text-purple-700">Super Admin</th>
              <th className="px-6 py-3 text-center text-indigo-700">Semi Admin</th>
              <th className="px-6 py-3 text-center text-blue-700">Advisor</th>
              <th className="px-6 py-3 text-center text-emerald-700">Client</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
             {[
               { feature: 'Manage Tenants', sa: true, semi: true, adv: false, cl: false },
               { feature: 'Manage Users', sa: true, semi: true, adv: false, cl: false },
               { feature: 'Website Builder', sa: true, semi: false, adv: false, cl: false },
               { feature: 'System Settings', sa: true, semi: false, adv: false, cl: false },
               { feature: 'Manage Clients', sa: true, semi: true, adv: true, cl: false },
               { feature: 'View Documents', sa: true, semi: true, adv: true, cl: true },
               { feature: 'View Portfolio', sa: true, semi: true, adv: true, cl: true },
             ].map((row, idx) => (
               <tr key={idx} className="hover:bg-gray-50/50">
                 <td className="px-6 py-3 font-medium text-gray-700">{row.feature}</td>
                 <td className="px-6 py-3 text-center">{row.sa ? <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto"/> : <XCircle className="w-5 h-5 text-gray-200 mx-auto"/>}</td>
                 <td className="px-6 py-3 text-center">{row.semi ? <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto"/> : <XCircle className="w-5 h-5 text-gray-200 mx-auto"/>}</td>
                 <td className="px-6 py-3 text-center">{row.adv ? <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto"/> : <XCircle className="w-5 h-5 text-gray-200 mx-auto"/>}</td>
                 <td className="px-6 py-3 text-center">{row.cl ? <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto"/> : <XCircle className="w-5 h-5 text-gray-200 mx-auto"/>}</td>
               </tr>
             ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div>
      <SectionHeader 
        title="User Management" 
        description="Manage user roles, access rights, and permissions across the platform."
        action={<button className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg hover:bg-indigo-700 flex items-center"><Plus className="w-4 h-4 mr-2"/> Add User</button>}
      />

      <PermissionsMatrix />

      <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-bold tracking-wider">
                <th className="p-6">User</th>
                <th className="p-6">Email</th>
                <th className="p-6">Tenant</th>
                <th className="p-6">Role</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <span className="font-bold text-slate-800">{user.name}</span>
                    </div>
                  </td>
                  <td className="p-6 text-sm text-gray-600 font-mono">{user.email}</td>
                  <td className="p-6 text-sm text-gray-600">
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs font-bold text-gray-500 uppercase">{user.tenantId}</span>
                  </td>
                  <td className="p-6">
                    <select 
                      value={user.role} 
                      onChange={(e) => handleRoleChange(user.id, e.target.value as UserRole)}
                      className={`text-xs font-bold uppercase px-3 py-1.5 rounded-lg border-2 cursor-pointer outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500 transition-all ${roleConfig[user.role].color}`}
                    >
                      {Object.values(UserRole).map(role => (
                        <option key={role} value={role}>{role.replace('_', ' ')}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button 
                         onClick={() => navigate(`/dashboard/communication?email=${user.email}`)}
                         className="text-gray-400 hover:text-primary transition-colors p-2 rounded-full hover:bg-gray-100"
                         title="Send Email"
                       >
                         <Mail className="w-4 h-4" />
                       </button>
                       <button className="text-gray-400 hover:text-primary transition-colors p-2 rounded-full hover:bg-gray-100" title="Settings">
                         <Settings className="w-4 h-4" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- File Manager Component ---

const FileManager: React.FC<{ 
  onSelect?: (url: string) => void; 
  onClose?: () => void;
  isModal?: boolean; 
}> = ({ onSelect, onClose, isModal = false }) => {
  const { currentTenant, updateTenant } = useTheme();
  const [assets, setAssets] = useState<MediaAsset[]>(currentTenant.assets || []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newAsset: MediaAsset = {
        id: `a${Date.now()}`,
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type.includes('image') ? 'image' : 'document',
        date: new Date().toISOString().split('T')[0],
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`
      };
      const updatedAssets = [newAsset, ...assets];
      setAssets(updatedAssets);
      updateTenant({ assets: updatedAssets });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this file?')) {
      const updatedAssets = assets.filter(a => a.id !== id);
      setAssets(updatedAssets);
      updateTenant({ assets: updatedAssets });
    }
  };

  const Wrapper = isModal ? 'div' : React.Fragment;
  const wrapperProps = isModal ? { className: "fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4" } : {};

  const Content = (
    <div className={`${isModal ? 'bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[85vh] flex flex-col animate-fadeIn border border-gray-100' : 'bg-white rounded-3xl border border-gray-100 shadow-card p-6'}`}>
      <div className={`flex justify-between items-center ${isModal ? 'p-8 border-b border-gray-100' : 'mb-6'}`}>
        <div>
          <h3 className="text-2xl font-bold text-slate-900">File Manager</h3>
          <p className="text-sm text-gray-500 mt-1">Manage your digital assets and documents</p>
        </div>
        <div className="flex items-center space-x-3">
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            onChange={handleUpload} 
            accept="image/*,.pdf"
          />
          <button onClick={() => fileInputRef.current?.click()} className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 transform hover:-translate-y-0.5">
            <Upload className="w-4 h-4 mr-2" /> Upload New
          </button>
          {isModal && <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"><XCircle className="w-6 h-6"/></button>}
        </div>
      </div>
      
      <div className={`overflow-y-auto ${isModal ? 'p-8 flex-1 bg-gray-50/50' : ''}`}>
        {assets.length === 0 ? (
          <div className="text-center py-20 text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl bg-white">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
               <ImageIcon className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-base font-medium text-gray-600">No files uploaded yet</p>
            <p className="text-sm mt-1">Upload images or documents to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {assets.map(asset => (
              <div key={asset.id} className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-w-4 aspect-h-3 h-40 bg-gray-100 flex items-center justify-center overflow-hidden relative">
                  {asset.type === 'image' ? (
                    <img src={asset.url} alt={asset.name} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <FileText className="w-12 h-12 text-gray-300" />
                  )}
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                     {onSelect && (
                       <button onClick={() => onSelect(asset.url)} className="bg-white text-emerald-600 p-3 rounded-full hover:bg-emerald-50 transition-colors shadow-lg transform hover:scale-110" title="Select">
                         <CheckCircle className="w-5 h-5" />
                       </button>
                     )}
                     <button onClick={() => handleDelete(asset.id)} className="bg-white text-rose-600 p-3 rounded-full hover:bg-rose-50 transition-colors shadow-lg transform hover:scale-110" title="Delete">
                       <Trash2 className="w-5 h-5" />
                     </button>
                  </div>
                </div>
                <div className="p-4 border-t border-gray-50">
                  <p className="text-sm font-bold text-gray-800 truncate" title={asset.name}>{asset.name}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[10px] uppercase font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">{asset.type}</span>
                    <span className="text-xs text-gray-400">{asset.size}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return <Wrapper {...wrapperProps}>{Content}</Wrapper>;
};

// --- Website Builder & Theme Customizer ---

const WebsiteBuilder = () => {
  const { currentTenant, updateTenant } = useTheme();
  const [activeTab, setActiveTab] = useState<'pages' | 'theme' | 'files' | 'header-footer' | 'seo'>('pages');
  const [pages, setPages] = useState<CustomPage[]>(currentTenant.customPages || []);
  const [editingPage, setEditingPage] = useState<Partial<CustomPage> | null>(null);
  const [showFileModal, setShowFileModal] = useState(false);
  const [activeImageField, setActiveImageField] = useState<{sectionId?: string, field: string, itemIndex?: number, isGlobal?: boolean, isPageSeo?: boolean, pageId?: string, isTheme?: boolean} | null>(null);
  const [themeForm, setThemeForm] = useState({
    primaryColor: currentTenant.primaryColor,
    secondaryColor: currentTenant.secondaryColor,
    name: currentTenant.name,
    logoUrl: currentTenant.logoUrl || ''
  });
  const [draggedSectionIndex, setDraggedSectionIndex] = useState<number | null>(null);
  const [expandedPageSeo, setExpandedPageSeo] = useState<string | null>(null);
  
  // Header & Footer State
  const [headerConfig, setHeaderConfig] = useState(currentTenant.headerConfig || { navigation: [], showAuthButton: true });
  const [footerConfig, setFooterConfig] = useState(currentTenant.footerConfig || { description: '', links: [], showContact: true, copyrightText: '' });
  const [newHeaderLink, setNewHeaderLink] = useState({ label: '', path: '' });
  const [newFooterLink, setNewFooterLink] = useState({ label: '', path: '' });

  // Global SEO State
  const [globalSeo, setGlobalSeo] = useState<SeoConfig>(currentTenant.seo || { title: '', description: '', keywords: '', ogImage: '' });

  const handleSaveTheme = () => {
    updateTenant(themeForm);
    alert('Theme updated successfully!');
  };

  const handleSaveHeaderFooter = () => {
    updateTenant({
      headerConfig,
      footerConfig,
      logoUrl: themeForm.logoUrl 
    });
    alert('Header and Footer configurations saved!');
  };

  const handleSaveSeoSettings = () => {
    updateTenant({ 
      seo: globalSeo,
      customPages: pages 
    });
    alert('All SEO settings (Global & Pages) saved!');
  };

  const updatePageSeo = (pageId: string, field: keyof SeoConfig, value: string) => {
    setPages(pages.map(p => {
      if (p.id === pageId) {
        return { ...p, seo: { ...p.seo, [field]: value } };
      }
      return p;
    }));
  };

  const handleSavePage = () => {
    if(!editingPage?.title || !editingPage?.slug) return;
    let updatedPages = [...pages];
    if(editingPage.id) {
       updatedPages = updatedPages.map(p => p.id === editingPage.id ? { ...p, ...editingPage } as CustomPage : p);
    } else {
       const newPage: CustomPage = {
         id: `p${Date.now()}`,
         title: editingPage.title,
         slug: editingPage.slug,
         sections: editingPage.sections || [],
         isPublished: editingPage.isPublished || false,
         lastUpdated: new Date().toISOString().split('T')[0],
         seo: editingPage.seo || {}
       };
       updatedPages.push(newPage);
    }
    setPages(updatedPages);
    updateTenant({ customPages: updatedPages });
    setEditingPage(null);
  };

  const addSection = (type: SectionType) => {
    if (!editingPage) return;
    const newSection: PageSection = {
      id: `s${Date.now()}`,
      type,
      order: (editingPage.sections?.length || 0),
      content: {}
    };

    if (type === 'HERO') newSection.content = { title: 'Hero Title', subtitle: 'Subtitle goes here', buttonText: 'Learn More', buttonLink: '#', backgroundColor: '#0f172a', textColor: '#ffffff' };
    if (type === 'TEXT') newSection.content = { html: '<p>Enter your text here...</p>', backgroundColor: '#ffffff', textColor: '#374151' };
    if (type === 'FEATURES') newSection.content = { items: [{title: 'Feature 1', description: 'Desc'}, {title: 'Feature 2', description: 'Desc'}] };
    if (type === 'IMAGE_TEXT') newSection.content = { title: 'Section Title', text: 'Description content goes here.', imagePosition: 'right', backgroundColor: '#ffffff', textColor: '#111827' };
    if (type === 'CTA') newSection.content = { title: 'Ready to get started?', buttonText: 'Contact Us', buttonLink: '/contact', variant: 'primary', backgroundColor: '#4f46e5', textColor: '#ffffff' };
    if (type === 'HTML') newSection.content = { html: '<div>Raw HTML</div>' };
    if (type === 'STATS') newSection.content = { items: [{ label: 'Clients', value: '1000+' }, { label: 'AUM', value: '₹500Cr' }, { label: 'Years', value: '10+' }] };
    if (type === 'TESTIMONIALS') newSection.content = { items: [{ author: 'John Doe', role: 'CEO', quote: 'Excellent service!' }] };
    if (type === 'PRICING') newSection.content = { plans: [{ name: 'Basic', price: 'Free', features: 'Feature 1, Feature 2', buttonText: 'Sign Up' }] };
    if (type === 'TEAM') newSection.content = { members: [{ name: 'Jane Smith', role: 'Advisor', bio: 'Expert in wealth management.' }] };
    if (type === 'FAQ') newSection.content = { questions: [{ q: 'How do I start?', a: 'Just sign up!' }] };
    if (type === 'CONTACT') newSection.content = { email: 'support@example.com', phone: '+91 12345 67890', address: 'Mumbai, India', showForm: true };
    if (type === 'CALCULATOR') newSection.content = { title: 'Financial Tools', calculatorType: 'all', backgroundColor: '#ffffff', textColor: '#374151' };
    if (type === 'MAP') newSection.content = { title: 'Our Location', address: 'Bandra Kurla Complex, Mumbai', height: '400', backgroundColor: '#ffffff', textColor: '#374151' };

    setEditingPage({
      ...editingPage,
      sections: [...(editingPage.sections || []), newSection]
    });
  };

  const removeSection = (id: string) => {
    if (!editingPage) return;
    setEditingPage({
      ...editingPage,
      sections: editingPage.sections?.filter(s => s.id !== id)
    });
  };

  const duplicateSection = (sectionId: string) => {
    if (!editingPage?.sections) return;
    const index = editingPage.sections.findIndex(s => s.id === sectionId);
    if (index === -1) return;

    const sectionToCopy = editingPage.sections[index];
    const newSection: PageSection = {
      ...sectionToCopy,
      id: `s${Date.now()}`,
      order: index + 1,
      content: JSON.parse(JSON.stringify(sectionToCopy.content))
    };

    const newSections = [...editingPage.sections];
    newSections.splice(index + 1, 0, newSection);
    newSections.forEach((s, i) => s.order = i);

    setEditingPage({ ...editingPage, sections: newSections });
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    if (!editingPage?.sections) return;
    const newSections = [...editingPage.sections];
    if (direction === 'up' && index > 0) {
      [newSections[index], newSections[index - 1]] = [newSections[index - 1], newSections[index]];
    } else if (direction === 'down' && index < newSections.length - 1) {
      [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
    }
    newSections.forEach((s, i) => s.order = i);
    setEditingPage({ ...editingPage, sections: newSections });
  };

  const updateSectionContent = (id: string, content: any) => {
    if (!editingPage) return;
    setEditingPage({
      ...editingPage,
      sections: editingPage.sections?.map(s => s.id === id ? { ...s, content: { ...s.content, ...content } } : s)
    });
  };

  const handleImageSelect = (url: string) => {
    if (activeImageField) {
      if (activeImageField.isGlobal) {
        setGlobalSeo({...globalSeo, ogImage: url});
      } else if (activeImageField.isPageSeo && activeImageField.pageId) {
        updatePageSeo(activeImageField.pageId, 'ogImage', url);
      } else if (activeImageField.isTheme) {
        setThemeForm({...themeForm, [activeImageField.field]: url});
      } else if (activeImageField.sectionId && editingPage) {
        const section = editingPage.sections?.find(s => s.id === activeImageField.sectionId);
        if (section) {
          if (activeImageField.itemIndex !== undefined) {
             const listKey = section.type === 'TEAM' ? 'members' : 'items';
             const newItems = [...(section.content[listKey] || [])];
             if (newItems[activeImageField.itemIndex]) {
               newItems[activeImageField.itemIndex][activeImageField.field] = url;
               updateSectionContent(activeImageField.sectionId, { [listKey]: newItems });
             }
          } else {
             updateSectionContent(activeImageField.sectionId, { [activeImageField.field]: url });
          }
        }
      } else if (editingPage) {
        // Page SEO Image inside editor
        setEditingPage({
          ...editingPage,
          seo: { ...editingPage.seo, ogImage: url }
        });
      }
    }
    setShowFileModal(false);
    setActiveImageField(null);
  };

  const handleDeletePage = (id: string) => {
    if(confirm('Are you sure you want to delete this page?')) {
       const updated = pages.filter(p => p.id !== id);
       setPages(updated);
       updateTenant({ customPages: updated });
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedSectionIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (draggedSectionIndex === null || draggedSectionIndex === index || !editingPage?.sections) {
      setDraggedSectionIndex(null);
      return;
    }

    const newSections = [...editingPage.sections];
    const [draggedItem] = newSections.splice(draggedSectionIndex, 1);
    newSections.splice(index, 0, draggedItem);
    newSections.forEach((s, i) => s.order = i);

    setEditingPage({ ...editingPage, sections: newSections });
    setDraggedSectionIndex(null);
  };

  // Header/Footer Utils
  const addHeaderLink = () => {
    if(newHeaderLink.label && newHeaderLink.path) {
      setHeaderConfig({...headerConfig, navigation: [...headerConfig.navigation, { ...newHeaderLink, id: `n${Date.now()}` }]});
      setNewHeaderLink({label: '', path: ''});
    }
  };

  const removeHeaderLink = (id: string) => {
    setHeaderConfig({...headerConfig, navigation: headerConfig.navigation.filter(n => n.id !== id)});
  };

  const addFooterLink = () => {
    if(newFooterLink.label && newFooterLink.path) {
      setFooterConfig({...footerConfig, links: [...footerConfig.links, { ...newFooterLink, id: `f${Date.now()}` }]});
      setNewFooterLink({label: '', path: ''});
    }
  };

  const removeFooterLink = (id: string) => {
    setFooterConfig({...footerConfig, links: footerConfig.links.filter(n => n.id !== id)});
  };

  const ColorPicker = ({ label, value, onChange, placeholder }: any) => (
    <div>
      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">{label}</label>
      <div className="flex gap-2 mt-1.5">
        <input 
          type="color" 
          className="h-10 w-10 rounded cursor-pointer border-0 p-0 overflow-hidden shadow-sm" 
          value={value || '#ffffff'} 
          onChange={e => onChange(e.target.value)} 
        />
        <input 
          type="text" 
          className="flex-1 border-gray-200 rounded-lg text-sm p-2.5 font-mono uppercase text-gray-600" 
          value={value || ''} 
          onChange={e => onChange(e.target.value)} 
          placeholder={placeholder} 
        />
      </div>
    </div>
  );

  return (
    <div>
      <SectionHeader title="Website Builder" description="Customize your white-label website appearance and content." />

      {showFileModal && (
        <FileManager 
          isModal 
          onClose={() => setShowFileModal(false)} 
          onSelect={handleImageSelect} 
        />
      )}

      <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden mb-12">
         <div className="flex border-b border-gray-100 bg-gray-50/30">
            {[
              { id: 'pages', label: 'Pages', icon: Layout },
              { id: 'header-footer', label: 'Header & Footer', icon: PanelTop },
              { id: 'seo', label: 'SEO Settings', icon: SearchIcon },
              { id: 'files', label: 'File Manager', icon: ImageIcon },
              { id: 'theme', label: 'Theme & Branding', icon: Palette }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-8 py-5 font-bold text-sm flex items-center transition-all ${activeTab === tab.id ? 'bg-white text-primary border-t-2 border-primary shadow-sm' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'}`}
              >
                <tab.icon className={`w-4 h-4 mr-2 ${activeTab === tab.id ? 'text-primary' : 'text-gray-400'}`} /> {tab.label}
              </button>
            ))}
         </div>

         <div className="p-8">
            {activeTab === 'files' && <FileManager />}

            {activeTab === 'seo' && (
              <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
                 {/* Global SEO Settings */}
                 <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-card">
                    <div className="flex items-center mb-6">
                      <div className="p-2 bg-indigo-50 rounded-lg mr-3"><Globe className="w-6 h-6 text-primary"/></div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">Global SEO Settings</h3>
                        <p className="text-sm text-gray-500">Default settings for the entire site (fallback for all pages).</p>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                       <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Default Site Title</label>
                          <input className="w-full border-gray-200 rounded-xl p-3 text-sm focus:ring-primary focus:border-primary" value={globalSeo.title} onChange={e => setGlobalSeo({...globalSeo, title: e.target.value})} placeholder={currentTenant.name} />
                       </div>
                       <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Default Meta Description</label>
                          <textarea className="w-full border-gray-200 rounded-xl p-3 text-sm focus:ring-primary focus:border-primary" rows={3} value={globalSeo.description} onChange={e => setGlobalSeo({...globalSeo, description: e.target.value})} placeholder="Describe your agency..." />
                       </div>
                       <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Default Keywords</label>
                          <input className="w-full border-gray-200 rounded-xl p-3 text-sm focus:ring-primary focus:border-primary" value={globalSeo.keywords} onChange={e => setGlobalSeo({...globalSeo, keywords: e.target.value})} placeholder="finance, investment, advisory" />
                       </div>
                       <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Default Social Share Image (OG:Image)</label>
                          <div className="flex items-center gap-4">
                             {globalSeo.ogImage && <img src={globalSeo.ogImage} className="h-16 w-16 object-cover rounded-lg border border-gray-200" alt="OG Preview" />}
                             <button onClick={() => { setShowFileModal(true); setActiveImageField({ field: 'ogImage', isGlobal: true }); }} className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 flex items-center"><ImageIcon className="w-4 h-4 mr-2"/> Select Image</button>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Page Level SEO Settings */}
                 <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-card">
                    <div className="flex items-center mb-6">
                      <div className="p-2 bg-indigo-50 rounded-lg mr-3"><SearchIcon className="w-6 h-6 text-primary"/></div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-800">Page-Level SEO Overrides</h3>
                        <p className="text-sm text-gray-500">Configure specific meta tags for your custom pages.</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                       {pages.map(page => (
                          <div key={page.id} className="border border-gray-100 rounded-xl overflow-hidden">
                             <button 
                               onClick={() => setExpandedPageSeo(expandedPageSeo === page.id ? null : page.id)}
                               className="w-full flex items-center justify-between p-4 bg-gray-50/50 hover:bg-gray-50 transition-colors"
                             >
                                <div className="flex items-center gap-3">
                                   <div className="p-1.5 bg-white rounded border border-gray-200"><Layout className="w-4 h-4 text-gray-400"/></div>
                                   <div className="text-left">
                                      <p className="text-sm font-bold text-slate-800">{page.title}</p>
                                      <p className="text-xs text-gray-400 font-mono">/{page.slug}</p>
                                   </div>
                                </div>
                                {expandedPageSeo === page.id ? <ChevronUp className="w-4 h-4 text-gray-400"/> : <ChevronDown className="w-4 h-4 text-gray-400"/>}
                             </button>
                             
                             {expandedPageSeo === page.id && (
                                <div className="p-6 bg-white border-t border-gray-100 space-y-5 animate-fade-in">
                                   <div className="grid grid-cols-2 gap-5">
                                      <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Meta Title</label>
                                        <input type="text" className="w-full border-gray-200 rounded-xl shadow-sm text-sm p-2.5" value={page.seo?.title || ''} onChange={e => updatePageSeo(page.id, 'title', e.target.value)} placeholder={`e.g. ${page.title} | Company`} />
                                      </div>
                                      <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Keywords</label>
                                        <input type="text" className="w-full border-gray-200 rounded-xl shadow-sm text-sm p-2.5" value={page.seo?.keywords || ''} onChange={e => updatePageSeo(page.id, 'keywords', e.target.value)} placeholder="specific, keywords" />
                                      </div>
                                      <div className="col-span-2">
                                        <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Meta Description</label>
                                        <textarea className="w-full border-gray-200 rounded-xl shadow-sm text-sm p-2.5" rows={2} value={page.seo?.description || ''} onChange={e => updatePageSeo(page.id, 'description', e.target.value)} placeholder="Specific description for this page..." />
                                      </div>
                                      <div className="col-span-2">
                                        <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Social Image (OG)</label>
                                        <div className="flex gap-3 items-center">
                                           <input type="text" className="flex-1 border-gray-200 rounded-xl shadow-sm text-sm p-2.5 bg-gray-50" value={page.seo?.ogImage || ''} readOnly />
                                           {page.seo?.ogImage && <img src={page.seo.ogImage} className="h-10 w-10 object-cover rounded-lg border border-gray-200"/>}
                                           <button onClick={() => { setShowFileModal(true); setActiveImageField({ field: 'ogImage', isPageSeo: true, pageId: page.id }); }} className="bg-gray-100 hover:bg-gray-200 p-2.5 rounded-lg text-gray-600"><ImageIcon className="w-4 h-4"/></button>
                                        </div>
                                      </div>
                                   </div>
                                </div>
                             )}
                          </div>
                       ))}
                       {pages.length === 0 && (
                         <div className="text-center py-8 text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                            No custom pages created yet. Go to the "Pages" tab to create one.
                         </div>
                       )}
                    </div>
                 </div>

                 <button onClick={handleSaveSeoSettings} className="w-full bg-slate-900 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-slate-800 transition-all transform hover:-translate-y-1">Save All SEO Settings</button>
              </div>
            )}

            {activeTab === 'theme' && (
              <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
                 <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-card">
                    <h3 className="text-xl font-bold text-slate-800 mb-6">Brand Identity</h3>
                    <div className="space-y-6">
                       <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Agency Name</label>
                          <input className="w-full border-gray-200 rounded-xl p-3 text-sm focus:ring-primary focus:border-primary" value={themeForm.name} onChange={e => setThemeForm({...themeForm, name: e.target.value})} />
                       </div>
                       
                       <div className="grid grid-cols-2 gap-6">
                          <ColorPicker label="Primary Color" value={themeForm.primaryColor} onChange={(v: string) => setThemeForm({...themeForm, primaryColor: v})} />
                          <ColorPicker label="Secondary Color" value={themeForm.secondaryColor} onChange={(v: string) => setThemeForm({...themeForm, secondaryColor: v})} />
                       </div>
                    </div>
                 </div>
                 <button onClick={handleSaveTheme} className="w-full bg-slate-900 text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-slate-800 transition-all transform hover:-translate-y-1">Save Theme Settings</button>
              </div>
            )}
         </div>
      </div>
    </div>
  );
};

const DashboardOverview: React.FC = () => {
  const { user } = useAuth();
  const { currentTenant } = useTheme();

  return (
    <div>
      <SectionHeader title={`Welcome, ${user?.name}`} description={`Overview for ${currentTenant.name}`} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Clients" value="1,245" icon={Users} color="bg-blue-500 text-blue-500" />
        <StatCard title="AUM" value="₹ 45.2 Cr" icon={TrendingUp} color="bg-emerald-500 text-emerald-500" />
        <StatCard title="Active SIPs" value="850" icon={Activity} color="bg-violet-500 text-violet-500" />
        <StatCard title="Pending KYC" value="12" icon={AlertTriangle} color="bg-amber-500 text-amber-500" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-white p-6 rounded-2xl shadow-card border border-gray-100">
            <h3 className="text-lg font-bold mb-6">Investment Trends</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl text-gray-400">Chart Placeholder</div>
         </div>
         <div className="bg-white p-6 rounded-2xl shadow-card border border-gray-100">
            <h3 className="text-lg font-bold mb-6">Recent Activities</h3>
            <ul className="space-y-4">
               {[1,2,3].map(i => (
                 <li key={i} className="flex items-start pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                    <div className="h-2 w-2 mt-2 rounded-full bg-primary mr-3"></div>
                    <div>
                       <p className="text-sm font-bold text-gray-800">New Client Onboarded</p>
                       <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                 </li>
               ))}
            </ul>
         </div>
      </div>
    </div>
  );
};

const ClientPortfolio: React.FC = () => <div className="p-8 text-center text-gray-500">Client Portfolio Component Placeholder</div>;
const ClientList: React.FC = () => <div className="p-8 text-center text-gray-500">Client List Component Placeholder</div>;
const DocumentVault: React.FC = () => <div className="p-8 text-center text-gray-500">Document Vault Component Placeholder</div>;
const SupportSystem: React.FC = () => <div className="p-8 text-center text-gray-500">Support System Component Placeholder</div>;
const ProfileSettings: React.FC = () => <div className="p-8 text-center text-gray-500">Profile Settings Component Placeholder</div>;
const TenantManager: React.FC = () => <div className="p-8 text-center text-gray-500">Tenant Manager Component Placeholder</div>;

export const Dashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<DashboardOverview />} />
        <Route path="portfolio" element={<ClientPortfolio />} />
        <Route path="clients" element={<ClientList />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="communication" element={<CommunicationCenter />} />
        <Route path="documents" element={<DocumentVault />} />
        <Route path="support" element={<SupportSystem />} />
        <Route path="profile" element={<ProfileSettings />} />
        <Route path="tenants" element={<TenantManager />} />
        <Route path="builder" element={<WebsiteBuilder />} />
        <Route path="settings" element={<ProfileSettings />} />
      </Routes>
    </DashboardLayout>
  );
};

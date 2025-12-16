
import { User, UserRole, Tenant, Investment, InsurancePolicy, Loan, Document, BlogPost, KYCStatus, RiskProfileType, AuditLog, InvestmentObjective, SupportTicket, Notification, CustomPage, MediaAsset, Communication } from '../types';

export const MOCK_ASSETS: MediaAsset[] = [
  { id: 'a1', name: 'office-meeting.jpg', url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80', type: 'image', date: '2024-03-01', size: '2.4 MB' },
  { id: 'a2', name: 'hero-bg.jpg', url: 'https://images.unsplash.com/photo-1565514020176-dbf227747023?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80', type: 'image', date: '2024-03-05', size: '3.1 MB' },
  { id: 'a3', name: 'investment-graph.jpg', url: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', type: 'image', date: '2024-03-10', size: '1.2 MB' },
];

// Mock Tenants with Rich Branding & Module Config
export const MOCK_TENANTS: Tenant[] = [
  {
    id: 'tenant-1',
    name: 'Opulence Capital',
    primaryColor: '#1e3a8a', // Deep Blue
    secondaryColor: '#0f172a',
    domain: 'opulence.com',
    contactEmail: 'support@opulence.com',
    contactPhone: '+91 22 1234 5678',
    address: '123 Financial District, Mumbai, India',
    welcomeMessage: 'Welcome to Opulence Capital - Your Wealth, Our Priority.',
    logoUrl: 'https://cdn-icons-png.flaticon.com/512/2503/2503920.png', 
    sebiRegNo: 'INA000012345',
    modules: {
      investment: true,
      insurance: true,
      loans: true,
      documentVault: true
    },
    assets: MOCK_ASSETS,
    headerConfig: {
      navigation: [
        { id: 'n1', label: 'Home', path: '/' },
        { id: 'n2', label: 'About', path: '/about' },
        { id: 'n3', label: 'Services', path: '/services' },
        { id: 'n4', label: 'Insights', path: '/knowledge' },
        { id: 'n5', label: 'Careers', path: '/page/careers' }
      ],
      showAuthButton: true
    },
    footerConfig: {
      description: 'Empowering your financial future with expert guidance and innovative technology.',
      links: [
        { id: 'f1', label: 'About Us', path: '/about' },
        { id: 'f2', label: 'Our Services', path: '/services' },
        { id: 'f3', label: 'Insights & Blog', path: '/knowledge' },
        { id: 'f4', label: 'Financial Calculators', path: '/calculators' }
      ],
      showContact: true,
      copyrightText: '© 2024 Opulence Capital. All rights reserved.'
    },
    seo: {
      title: 'Opulence Capital - Premier Wealth Management',
      description: 'Expert financial advisory, insurance solutions, and loan services tailored for your growth.',
      keywords: 'wealth management, insurance, loans, fintech, investment',
      ogImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    },
    customPages: [
      {
        id: 'p1',
        title: 'Careers',
        slug: 'careers',
        isPublished: true,
        lastUpdated: '2024-03-01',
        seo: {
          title: 'Careers at Opulence',
          description: 'Join our team of financial experts and tech innovators.',
          keywords: 'jobs, finance careers, hiring'
        },
        sections: [
          {
            id: 's1',
            type: 'HERO',
            order: 0,
            content: {
              title: 'Join Our Team',
              subtitle: 'Build the future of wealth management with us.',
              backgroundImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80',
              buttonText: 'View Openings',
              buttonLink: '#openings'
            }
          },
          {
            id: 's2',
            type: 'TEXT',
            order: 1,
            content: {
              html: '<h3>Why work with us?</h3><p>We are looking for talented financial advisors and tech enthusiasts. We offer competitive compensation and a growth-oriented culture.</p>'
            }
          },
          {
             id: 's3',
             type: 'FEATURES',
             order: 2,
             content: {
               items: [
                 { title: 'Growth', description: 'Fast track career progression' },
                 { title: 'Impact', description: 'Help families secure their future' },
                 { title: 'Innovation', description: 'Work with latest fintech tools' }
               ]
             }
          }
        ]
      }
    ]
  },
  {
    id: 'tenant-2',
    name: 'WealthGrow Partners',
    primaryColor: '#047857', // Emerald Green
    secondaryColor: '#064e3b',
    domain: 'wealthgrow.com',
    contactEmail: 'contact@wealthgrow.com',
    contactPhone: '+91 80 9876 5432',
    address: '45 Tech Park, Bangalore, India',
    welcomeMessage: 'Growing your future, together.',
    sebiRegNo: 'INA000098765',
    logoUrl: 'https://cdn-icons-png.flaticon.com/512/2830/2830289.png',
    modules: {
      investment: true,
      insurance: false, 
      loans: true,
      documentVault: true
    },
    customPages: [],
    assets: []
  }
];

// Mock Users with KYC & Risk Profile
export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Super Admin',
    email: 'admin@platform.com',
    role: UserRole.SUPER_ADMIN,
    tenantId: 'global',
    kycStatus: KYCStatus.VERIFIED,
    riskProfile: RiskProfileType.MODERATE,
  },
  {
    id: 'u5',
    name: 'Sameer Ops',
    email: 'ops@platform.com',
    role: UserRole.SEMI_ADMIN,
    tenantId: 'global',
    kycStatus: KYCStatus.VERIFIED,
    riskProfile: RiskProfileType.MODERATE,
  },
  {
    id: 'u2',
    name: 'Rahul Advisor',
    email: 'rahul@opulence.com',
    role: UserRole.ADVISOR,
    tenantId: 'tenant-1',
    kycStatus: KYCStatus.VERIFIED,
    riskProfile: RiskProfileType.AGGRESSIVE,
  },
  {
    id: 'u3',
    name: 'Amit Client',
    email: 'amit@gmail.com',
    role: UserRole.CLIENT,
    tenantId: 'tenant-1',
    kycStatus: KYCStatus.PENDING, // Pending KYC for demo
    riskProfile: RiskProfileType.PENDING, // Pending Risk Profile for demo
    investmentObjective: undefined,
    panNumber: 'ABCDE1234F'
  },
  {
    id: 'u4',
    name: 'Sarah Partner',
    email: 'sarah@wealthgrow.com',
    role: UserRole.ADVISOR,
    tenantId: 'tenant-2',
    kycStatus: KYCStatus.VERIFIED,
    riskProfile: RiskProfileType.MODERATE,
  },
];

// Mock Financial Data with Risk Categories
export const MOCK_INVESTMENTS: Investment[] = [
  { id: 'i1', type: 'Mutual Fund', name: 'HDFC Top 100', investedAmount: 500000, currentValue: 650000, clientId: 'u3', riskCategory: RiskProfileType.MODERATE },
  { id: 'i2', type: 'Equity', name: 'Reliance Industries', investedAmount: 200000, currentValue: 210000, clientId: 'u3', riskCategory: RiskProfileType.AGGRESSIVE },
  { id: 'i3', type: 'Fixed Deposit', name: 'SBI Term Deposit', investedAmount: 100000, currentValue: 108000, clientId: 'u3', riskCategory: RiskProfileType.CONSERVATIVE },
];

export const MOCK_INSURANCE: InsurancePolicy[] = [
  { id: 'ins1', type: 'Health', provider: 'Star Health', policyNumber: 'SH123456', sumAssured: 1000000, premium: 15000, expiryDate: '2024-12-31', clientId: 'u3' },
  { id: 'ins2', type: 'Life', provider: 'LIC Jeevan Anand', policyNumber: 'LIC998877', sumAssured: 5000000, premium: 45000, expiryDate: '2030-05-15', clientId: 'u3' },
];

export const MOCK_LOANS: Loan[] = [
  { id: 'l1', type: 'Home', amount: 5000000, outstanding: 4200000, interestRate: 8.5, emi: 45000, clientId: 'u3' },
];

export const MOCK_DOCUMENTS: Document[] = [
  { id: 'd1', title: 'Q3 Investment Report', type: 'Report', date: '2024-10-01', url: '#', clientId: 'u3' },
  { id: 'd2', title: 'Tax Statement FY23-24', type: 'Tax', date: '2024-04-15', url: '#', clientId: 'u3' },
  { id: 'd3', title: 'Advisory Contract', type: 'Contract', date: '2023-01-10', url: '#', clientId: 'u3' },
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  { id: 'log1', action: 'LOGIN', userId: 'u3', timestamp: '2024-03-20T10:00:00Z', details: 'User logged in from IP 192.168.1.1' },
  { id: 'log2', action: 'VIEW_PORTFOLIO', userId: 'u3', timestamp: '2024-03-20T10:05:00Z', details: 'Viewed investment summary' },
];

export const MOCK_POSTS: BlogPost[] = [
  {
    id: '1',
    title: '5 Strategies for Wealth Creation in 2024',
    excerpt: 'Discover the top investment strategies that are shaping the financial landscape this year.',
    category: 'Investment',
    date: 'March 15, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    author: 'Priya Sharma'
  },
  {
    id: '2',
    title: 'Understanding Term Insurance vs Life Insurance',
    excerpt: 'A comprehensive guide to choosing the right protection for your family.',
    category: 'Insurance',
    date: 'March 10, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    author: 'Rajesh Kumar'
  },
  {
    id: '3',
    title: 'Tax Saving Benefits of Home Loans',
    excerpt: 'Maximize your tax savings while building your dream home.',
    category: 'Loans',
    date: 'March 05, 2024',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059ee971?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    author: 'Amit Patel'
  }
];

export const MOCK_TICKETS: SupportTicket[] = [
  { id: 't1', subject: 'Discrepancy in portfolio value', message: 'My equity holdings show incorrect value for Reliance.', status: 'Open', priority: 'High', date: '2024-03-22', clientId: 'u3' },
  { id: 't2', subject: 'Tax report request', message: 'Please send tax report for FY 2022-23.', status: 'Resolved', priority: 'Medium', date: '2024-03-10', clientId: 'u3' },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', title: 'KYC Pending', message: 'Please complete your KYC to continue investing.', date: '2024-03-22', read: false, type: 'warning' },
  { id: 'n2', title: 'New Document', message: 'Advisor uploaded Q3 Performance Report.', date: '2024-03-20', read: true, type: 'info' },
];

export const MOCK_COMMUNICATIONS: Communication[] = [
  { id: 'c1', senderId: 'u2', receiverEmail: 'amit@gmail.com', subject: 'Portfolio Review Q3', message: 'Dear Amit, please find attached the Q3 review...', date: '2024-03-20', status: 'Sent' },
  { id: 'c2', senderId: 'u2', receiverEmail: 'amit@gmail.com', subject: 'KYC Update Required', message: 'Please update your KYC documents ASAP.', date: '2024-03-22', status: 'Sent' },
];

// Service functions
export const getInvestmentsByClient = (clientId: string) => MOCK_INVESTMENTS.filter(i => i.clientId === clientId);
export const getInsuranceByClient = (clientId: string) => MOCK_INSURANCE.filter(i => i.clientId === clientId);
export const getLoansByClient = (clientId: string) => MOCK_LOANS.filter(i => i.clientId === clientId);
export const getDocumentsByClient = (clientId: string) => MOCK_DOCUMENTS.filter(d => d.clientId === clientId);
export const getAllClientsByTenant = (tenantId: string) => MOCK_USERS.filter(u => u.role === UserRole.CLIENT && u.tenantId === tenantId);
export const getTenantById = (tenantId: string) => MOCK_TENANTS.find(t => t.id === tenantId);
export const getClientById = (clientId: string) => MOCK_USERS.find(u => u.id === clientId);
export const getAuditLogs = () => MOCK_AUDIT_LOGS;
export const getSupportTickets = (clientId: string) => MOCK_TICKETS.filter(t => t.clientId === clientId);
export const getNotifications = () => MOCK_NOTIFICATIONS;
export const getCommunications = () => MOCK_COMMUNICATIONS;

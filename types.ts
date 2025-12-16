
export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  SEMI_ADMIN = 'SEMI_ADMIN',
  ADVISOR = 'ADVISOR',
  CLIENT = 'CLIENT',
}

export enum KYCStatus {
  PENDING = 'PENDING',
  SUBMITTED = 'SUBMITTED',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED'
}

export enum RiskProfileType {
  PENDING = 'PENDING',
  CONSERVATIVE = 'CONSERVATIVE',
  MODERATE = 'MODERATE',
  AGGRESSIVE = 'AGGRESSIVE'
}

export enum InvestmentObjective {
  WEALTH_CREATION = 'Wealth Creation',
  INCOME_GENERATION = 'Income Generation',
  CAPITAL_PRESERVATION = 'Capital Preservation'
}

export type SectionType = 'HERO' | 'TEXT' | 'IMAGE_TEXT' | 'FEATURES' | 'CTA' | 'HTML' | 'STATS' | 'TESTIMONIALS' | 'PRICING' | 'TEAM' | 'FAQ' | 'CONTACT' | 'CALCULATOR' | 'MAP';

export interface PageSection {
  id: string;
  type: SectionType;
  content: any; // Dynamic based on type
  order: number;
}

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'document';
  date: string;
  size: string;
}

export interface SeoConfig {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

export interface CustomPage {
  id: string;
  title: string;
  slug: string;
  sections: PageSection[]; // Replaces simple content string
  isPublished: boolean;
  lastUpdated: string;
  seo?: SeoConfig;
}

export interface NavigationLink {
  id: string;
  label: string;
  path: string;
}

export interface HeaderConfig {
  navigation: NavigationLink[];
  showAuthButton: boolean;
}

export interface FooterConfig {
  description: string;
  links: NavigationLink[];
  showContact: boolean;
  copyrightText: string;
}

export interface Tenant {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  logoUrl?: string; // URL for the agency logo
  domain: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  welcomeMessage?: string;
  sebiRegNo?: string; // SEBI Registration Number
  modules: {
    investment: boolean;
    insurance: boolean;
    loans: boolean;
    documentVault: boolean;
  };
  customPages: CustomPage[];
  assets: MediaAsset[];
  headerConfig?: HeaderConfig;
  footerConfig?: FooterConfig;
  seo?: SeoConfig;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  tenantId: string; // "global" for Super Admin
  avatar?: string;
  kycStatus: KYCStatus;
  riskProfile: RiskProfileType;
  investmentObjective?: InvestmentObjective;
  panNumber?: string;
}

export interface Investment {
  id: string;
  type: 'Equity' | 'Mutual Fund' | 'Bond' | 'Fixed Deposit';
  name: string;
  investedAmount: number;
  currentValue: number;
  clientId: string;
  riskCategory: RiskProfileType; // Product risk level
}

export interface InsurancePolicy {
  id: string;
  type: 'Life' | 'General' | 'Health';
  provider: string;
  policyNumber: string;
  sumAssured: number;
  premium: number;
  expiryDate: string;
  clientId: string;
}

export interface Loan {
  id: string;
  type: 'Home' | 'Personal' | 'Business';
  amount: number;
  outstanding: number;
  interestRate: number;
  emi: number;
  clientId: string;
}

export interface Document {
  id: string;
  title: string;
  type: 'Report' | 'Tax' | 'Invoice' | 'Contract' | 'KYC';
  date: string;
  url: string;
  clientId: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  imageUrl: string;
  author: string;
}

export interface AuditLog {
  id: string;
  action: string;
  userId: string;
  timestamp: string;
  details: string;
}

export interface SupportTicket {
  id: string;
  subject: string;
  message: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  priority: 'Low' | 'Medium' | 'High';
  date: string;
  clientId: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'info' | 'warning' | 'success';
}

export interface Communication {
  id: string;
  senderId: string;
  receiverEmail: string;
  subject: string;
  message: string;
  date: string;
  status: 'Sent' | 'Scheduled' | 'Failed';
}

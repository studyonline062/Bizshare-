export type UserRole = 'promoter' | 'admin' | 'dealer' | 'sales_rep';

export type UserCategory = 
  | 'student' 
  | 'homemaker' 
  | 'freelancer' 
  | 'social_media_promoter' 
  | 'other';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  role: UserRole;
  category: UserCategory;
  referralCode: string;
  isVerified: boolean;
  avatarUrl?: string;
  joinedDate: string;
  payoutDetails: {
    method: 'bank_transfer' | 'jazzcash' | 'easypaisa';
    accountTitle: string;
    accountNumber: string;
    bankName?: string;
  };
}

export type PropertyCategory = 
  | 'Residential Plots' 
  | 'Commercial Plots' 
  | 'Houses' 
  | 'Apartments' 
  | 'Shops' 
  | 'Offices' 
  | 'Agricultural Land' 
  | 'Investment Projects';

export interface PropertyListing {
  id: string;
  slug: string;
  title: string;
  category: PropertyCategory;
  city: string;
  area: string;
  pricePKR: number;
  formattedPrice: string;
  areaSize: string; // e.g. "1 Kanal", "10 Marla", "1,850 Sq Ft"
  bedrooms?: number;
  bathrooms?: number;
  isVerified: boolean;
  isFeatured?: boolean;
  referralRewardType: 'fixed' | 'percentage';
  referralRewardValue: number; // e.g. 50000 PKR or 1%
  referralRewardDisplay: string; // "PKR 50,000" or "1.0% (~PKR 150,000)"
  images: string[];
  description: string;
  features: string[];
  seller: {
    id: string;
    name: string;
    company: string;
    phone: string;
    isVerified: boolean;
    rating: number;
  };
  locationCoordinates?: {
    lat: number;
    lng: number;
  };
  totalClicks: number;
  totalLeads: number;
  status: 'active' | 'under_deal' | 'sold';
  createdAt: string;
}

export type LeadStatus = 
  | 'new' 
  | 'contacted' 
  | 'qualified' 
  | 'site_visit' 
  | 'negotiation' 
  | 'completed' 
  | 'rejected';

export interface LeadActivity {
  id: string;
  timestamp: string;
  status: LeadStatus;
  note: string;
  author: string;
}

export interface Lead {
  id: string;
  customerName: string;
  customerPhone: string; // masked in promoter view for privacy
  customerEmail: string;
  propertyId: string;
  propertyTitle: string;
  propertyArea: string;
  promoterId: string;
  promoterName: string;
  referralCode: string;
  status: LeadStatus;
  assignedSalesRep: {
    id: string;
    name: string;
    phone: string;
  };
  dealValuePKR?: number;
  referralRewardPKR: number;
  notes: string;
  activities: LeadActivity[];
  disputeStatus: 'none' | 'disputed' | 'resolved';
  createdAt: string;
  updatedAt: string;
}

export type CommissionStatus = 'pending' | 'under_review' | 'approved' | 'paid' | 'rejected';

export interface CommissionRecord {
  id: string;
  promoterId: string;
  promoterName: string;
  leadId: string;
  propertyId: string;
  propertyTitle: string;
  customerName: string;
  amountPKR: number;
  status: CommissionStatus;
  milestoneReached: string;
  transactionReference?: string;
  payoutMethod?: string;
  approvedBy?: string;
  approvedAt?: string;
  paidAt?: string;
  notes?: string;
  createdAt: string;
}

export interface SharedLinkRecord {
  id: string;
  promoterId: string;
  propertyId: string;
  propertyTitle: string;
  propertyPrice: string;
  referralUrl: string;
  referralCode: string;
  clicksCount: number;
  leadsCount: number;
  lastSharedAt: string;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  userId?: string;
  roleTarget: 'promoter' | 'admin' | 'all';
  title: string;
  message: string;
  type: 'lead' | 'commission' | 'deal' | 'system' | 'dispute';
  isRead: boolean;
  createdAt: string;
  linkPage?: string;
}

export interface LeaderboardEntry {
  rank: number;
  promoterId: string;
  name: string;
  category: UserCategory;
  city: string;
  dealsCompleted: number;
  leadsGenerated: number;
  totalEarnedPKR: number;
  badge: string;
}

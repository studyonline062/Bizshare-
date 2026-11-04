import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  PropertyListing, 
  UserProfile, 
  Lead, 
  CommissionRecord, 
  SharedLinkRecord, 
  NotificationItem,
  UserRole,
  LeadStatus,
  CommissionStatus
} from '../types';
import { 
  INITIAL_PROPERTIES, 
  CURRENT_USER, 
  INITIAL_LEADS, 
  INITIAL_COMMISSIONS, 
  INITIAL_SHARED_LINKS, 
  INITIAL_NOTIFICATIONS 
} from '../data/mockData';

export type PageRoute = 
  | 'home'
  | 'properties'
  | 'property-detail'
  | 'become-promoter'
  | 'how-it-works'
  | 'partner'
  | 'about'
  | 'contact'
  | 'terms'
  | 'privacy'
  | 'commission-policy'
  | 'faq'
  | 'login'
  | 'register'
  | 'promoter-dashboard'
  | 'admin-dashboard';

interface AppContextType {
  currentPage: PageRoute;
  setCurrentPage: (page: PageRoute) => void;
  selectedPropertyId: string | null;
  setSelectedPropertyId: (id: string | null) => void;
  navigateToProperty: (id: string) => void;
  
  // User & Auth
  currentUser: UserProfile;
  activeRole: UserRole;
  switchRole: (role: UserRole) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  isLoggedIn: boolean;
  loginUser: (email: string, role?: UserRole) => void;
  logoutUser: () => void;

  // Referral Attribution
  activeReferralCode: string | null;
  setActiveReferralCode: (code: string | null) => void;

  // Modals
  shareModalProperty: PropertyListing | null;
  setShareModalProperty: (property: PropertyListing | null) => void;
  posterModalProperty: PropertyListing | null;
  setPosterModalProperty: (property: PropertyListing | null) => void;
  inquiryModalProperty: PropertyListing | null;
  setInquiryModalProperty: (property: PropertyListing | null) => void;

  // Entities
  properties: PropertyListing[];
  leads: Lead[];
  commissions: CommissionRecord[];
  sharedLinks: SharedLinkRecord[];
  notifications: NotificationItem[];

  // Actions
  addProperty: (property: Omit<PropertyListing, 'id' | 'totalClicks' | 'totalLeads' | 'createdAt'>) => void;
  updateProperty: (id: string, updates: Partial<PropertyListing>) => void;
  deleteProperty: (id: string) => void;
  togglePropertyVerification: (id: string) => void;

  submitInquiry: (data: {
    propertyId: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    notes: string;
  }) => { success: boolean; leadId: string };

  trackShareAction: (propertyId: string, channel: string) => string;
  recordLinkClick: (referralCode: string, propertyId: string) => void;
  
  updateLeadStatus: (leadId: string, status: LeadStatus, note?: string) => void;
  assignLeadSalesRep: (leadId: string, salesRep: { id: string; name: string; phone: string }) => void;
  resolveLeadDispute: (leadId: string, resolvedPromoterId: string) => void;

  approveCommission: (commissionId: string, notes?: string) => void;
  rejectCommission: (commissionId: string, reason: string) => void;
  payoutCommission: (commissionId: string, transactionReference: string, payoutMethod: string) => void;

  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>('prop-101');
  const [activeRole, setActiveRole] = useState<UserRole>('promoter');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<UserProfile>(CURRENT_USER);
  const [activeReferralCode, setActiveReferralCode] = useState<string | null>('BS1025');

  // Modals state
  const [shareModalProperty, setShareModalProperty] = useState<PropertyListing | null>(null);
  const [posterModalProperty, setPosterModalProperty] = useState<PropertyListing | null>(null);
  const [inquiryModalProperty, setInquiryModalProperty] = useState<PropertyListing | null>(null);

  // Core Data
  const [properties, setProperties] = useState<PropertyListing[]>(() => {
    const saved = localStorage.getItem('bizshare_properties');
    return saved ? JSON.parse(saved) : INITIAL_PROPERTIES;
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('bizshare_leads');
    return saved ? JSON.parse(saved) : INITIAL_LEADS;
  });

  const [commissions, setCommissions] = useState<CommissionRecord[]>(() => {
    const saved = localStorage.getItem('bizshare_commissions');
    return saved ? JSON.parse(saved) : INITIAL_COMMISSIONS;
  });

  const [sharedLinks, setSharedLinks] = useState<SharedLinkRecord[]>(() => {
    const saved = localStorage.getItem('bizshare_links');
    return saved ? JSON.parse(saved) : INITIAL_SHARED_LINKS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('bizshare_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('bizshare_properties', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('bizshare_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('bizshare_commissions', JSON.stringify(commissions));
  }, [commissions]);

  useEffect(() => {
    localStorage.setItem('bizshare_links', JSON.stringify(sharedLinks));
  }, [sharedLinks]);

  useEffect(() => {
    localStorage.setItem('bizshare_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Check URL query parameters for referral on mount
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const refParam = params.get('ref');
      if (refParam) {
        setActiveReferralCode(refParam);
      }
    } catch {
      // ignore
    }
  }, []);

  const navigateToProperty = (id: string) => {
    setSelectedPropertyId(id);
    setCurrentPage('property-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const switchRole = (role: UserRole) => {
    setActiveRole(role);
    if (role === 'admin') {
      setCurrentUser(prev => ({
        ...prev,
        role: 'admin',
        fullName: 'Zainab Siddiqui (Admin)',
        email: 'admin@bizshare.pk'
      }));
    } else if (role === 'sales_rep') {
      setCurrentUser(prev => ({
        ...prev,
        role: 'sales_rep',
        fullName: 'Ayesha Malik (Sales Consultant)',
        email: 'ayesha.sales@bizshare.pk'
      }));
    } else if (role === 'dealer') {
      setCurrentUser(prev => ({
        ...prev,
        role: 'dealer',
        fullName: 'Chaudhry Farhan (Dealer)',
        email: 'farhan@apexrealtors.pk'
      }));
    } else {
      setCurrentUser(CURRENT_USER);
    }
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setCurrentUser(prev => ({ ...prev, ...updates }));
  };

  const loginUser = (email: string, role: UserRole = 'promoter') => {
    setIsLoggedIn(true);
    switchRole(role);
    if (role === 'admin') {
      setCurrentPage('admin-dashboard');
    } else {
      setCurrentPage('promoter-dashboard');
    }
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
    setCurrentPage('home');
  };

  const addProperty = (newPropData: Omit<PropertyListing, 'id' | 'totalClicks' | 'totalLeads' | 'createdAt'>) => {
    const newProperty: PropertyListing = {
      ...newPropData,
      id: `prop-${Date.now()}`,
      totalClicks: 0,
      totalLeads: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProperties(prev => [newProperty, ...prev]);

    // Admin notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      roleTarget: 'admin',
      title: 'New Property Listed',
      message: `${newProperty.title} (${newProperty.area}) listed with reward ${newProperty.referralRewardDisplay}.`,
      type: 'system',
      isRead: false,
      createdAt: 'Just now',
      linkPage: 'admin-dashboard'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const updateProperty = (id: string, updates: Partial<PropertyListing>) => {
    setProperties(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProperty = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  const togglePropertyVerification = (id: string) => {
    setProperties(prev => prev.map(p => p.id === id ? { ...p, isVerified: !p.isVerified } : p));
  };

  const trackShareAction = (propertyId: string, channel: string): string => {
    const prop = properties.find(p => p.id === propertyId);
    if (!prop) return '';

    const promoCode = currentUser.referralCode || 'BS1025';
    const baseUrl = window.location.origin;
    const shareUrl = `${baseUrl}/?property=${prop.slug}&ref=${promoCode}`;

    // Update or insert shared link record
    setSharedLinks(prev => {
      const existing = prev.find(l => l.propertyId === propertyId && l.promoterId === currentUser.id);
      if (existing) {
        return prev.map(l => l.id === existing.id ? { 
          ...l, 
          lastSharedAt: new Date().toISOString().split('T')[0] 
        } : l);
      } else {
        const newRecord: SharedLinkRecord = {
          id: `link-${Date.now()}`,
          promoterId: currentUser.id,
          propertyId: prop.id,
          propertyTitle: prop.title,
          propertyPrice: prop.formattedPrice,
          referralUrl: shareUrl,
          referralCode: promoCode,
          clicksCount: 1,
          leadsCount: 0,
          lastSharedAt: new Date().toISOString().split('T')[0],
          createdAt: new Date().toISOString().split('T')[0]
        };
        return [newRecord, ...prev];
      }
    });

    // Increment click/share counter on property
    setProperties(prev => prev.map(p => p.id === propertyId ? { ...p, totalClicks: p.totalClicks + 1 } : p));

    return shareUrl;
  };

  const recordLinkClick = (refCode: string, propId: string) => {
    setSharedLinks(prev => prev.map(l => {
      if (l.referralCode === refCode && l.propertyId === propId) {
        return { ...l, clicksCount: l.clicksCount + 1 };
      }
      return l;
    }));
  };

  const submitInquiry = (data: {
    propertyId: string;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    notes: string;
  }) => {
    const prop = properties.find(p => p.id === data.propertyId);
    if (!prop) return { success: false, leadId: '' };

    const refCode = activeReferralCode || 'BS1025';
    // Promoter Hamza Tariq is default demo promoter
    const promoterId = refCode === 'BS1025' ? 'usr-promoter-01' : 'usr-promoter-01';
    const promoterName = 'Hamza Tariq';
    const leadId = `lead-${Date.now()}`;

    const newLead: Lead = {
      id: leadId,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerEmail: data.customerEmail,
      propertyId: prop.id,
      propertyTitle: prop.title,
      propertyArea: prop.area,
      promoterId: promoterId,
      promoterName: promoterName,
      referralCode: refCode,
      status: 'new',
      assignedSalesRep: {
        id: 'sales-1',
        name: 'Ayesha Malik',
        phone: '+92 300 9410022'
      },
      dealValuePKR: prop.pricePKR,
      referralRewardPKR: prop.referralRewardValue,
      notes: data.notes,
      activities: [
        {
          id: `act-${Date.now()}`,
          timestamp: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
          status: 'new',
          note: `Customer inquiry submitted for ${prop.title} via referral code ${refCode}.`,
          author: 'System Lead Engine'
        }
      ],
      disputeStatus: 'none',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setLeads(prev => [newLead, ...prev]);

    // Update property lead count
    setProperties(prev => prev.map(p => p.id === prop.id ? { ...p, totalLeads: p.totalLeads + 1 } : p));

    // Update shared links lead count
    setSharedLinks(prev => prev.map(l => {
      if (l.propertyId === prop.id && l.referralCode === refCode) {
        return { ...l, leadsCount: l.leadsCount + 1 };
      }
      return l;
    }));

    // Notifications
    const promoterNotif: NotificationItem = {
      id: `notif-${Date.now()}-1`,
      userId: promoterId,
      roleTarget: 'promoter',
      title: 'New Lead Generated from Your Link!',
      message: `A client inquired about "${prop.title}". Assigned to Sales Rep Ayesha Malik for verification.`,
      type: 'lead',
      isRead: false,
      createdAt: 'Just now',
      linkPage: 'promoter-leads'
    };

    const adminNotif: NotificationItem = {
      id: `notif-${Date.now()}-2`,
      roleTarget: 'admin',
      title: 'New Property Lead Received',
      message: `${data.customerName} requested details for ${prop.title} (Referred by ${promoterName}).`,
      type: 'lead',
      isRead: false,
      createdAt: 'Just now',
      linkPage: 'admin-dashboard'
    };

    setNotifications(prev => [promoterNotif, adminNotif, ...prev]);

    return { success: true, leadId };
  };

  const updateLeadStatus = (leadId: string, newStatus: LeadStatus, note?: string) => {
    let resolvedLead: Lead | undefined;

    setLeads(prev => prev.map(lead => {
      if (lead.id === leadId) {
        const updatedLead: Lead = {
          ...lead,
          status: newStatus,
          updatedAt: new Date().toISOString().split('T')[0],
          activities: [
            {
              id: `act-${Date.now()}`,
              timestamp: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
              status: newStatus,
              note: note || `Lead milestone updated to ${newStatus.replace('_', ' ').toUpperCase()}`,
              author: currentUser.fullName
            },
            ...lead.activities
          ]
        };
        resolvedLead = updatedLead;
        return updatedLead;
      }
      return lead;
    }));

    if (resolvedLead) {
      // If completed, trigger or update commission record!
      if (newStatus === 'completed') {
        const commId = `comm-${Date.now()}`;
        const newComm: CommissionRecord = {
          id: commId,
          promoterId: (resolvedLead as Lead).promoterId,
          promoterName: (resolvedLead as Lead).promoterName,
          leadId: (resolvedLead as Lead).id,
          propertyId: (resolvedLead as Lead).propertyId,
          propertyTitle: (resolvedLead as Lead).propertyTitle,
          customerName: (resolvedLead as Lead).customerName,
          amountPKR: (resolvedLead as Lead).referralRewardPKR,
          status: 'under_review',
          milestoneReached: 'Deal Completed by Sales Team - Pending Admin Verification',
          createdAt: new Date().toISOString().split('T')[0]
        };
        setCommissions(prev => [newComm, ...prev]);

        // Notify promoter & admin
        const compNotif: NotificationItem = {
          id: `notif-${Date.now()}-comp`,
          userId: (resolvedLead as Lead).promoterId,
          roleTarget: 'promoter',
          title: 'Deal Completed! Commission Under Review',
          message: `Congratulations! The deal for "${(resolvedLead as Lead).propertyTitle}" was finalized. Your referral commission of PKR ${(resolvedLead as Lead).referralRewardPKR.toLocaleString()} is queued for approval.`,
          type: 'deal',
          isRead: false,
          createdAt: 'Just now',
          linkPage: 'promoter-earnings'
        };
        setNotifications(prev => [compNotif, ...prev]);
      } else {
        // Status update notification for promoter
        const statusNotif: NotificationItem = {
          id: `notif-${Date.now()}-stat`,
          userId: (resolvedLead as Lead).promoterId,
          roleTarget: 'promoter',
          title: `Lead Update: ${newStatus.replace('_', ' ').toUpperCase()}`,
          message: `Lead for "${(resolvedLead as Lead).propertyTitle}" moved to status: ${newStatus.replace('_', ' ')}.`,
          type: 'lead',
          isRead: false,
          createdAt: 'Just now',
          linkPage: 'promoter-leads'
        };
        setNotifications(prev => [statusNotif, ...prev]);
      }
    }
  };

  const assignLeadSalesRep = (leadId: string, salesRep: { id: string; name: string; phone: string }) => {
    setLeads(prev => prev.map(lead => lead.id === leadId ? {
      ...lead,
      assignedSalesRep: salesRep,
      activities: [
        {
          id: `act-${Date.now()}`,
          timestamp: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
          status: lead.status,
          note: `Assigned sales representative: ${salesRep.name} (${salesRep.phone})`,
          author: currentUser.fullName
        },
        ...lead.activities
      ]
    } : lead));
  };

  const resolveLeadDispute = (leadId: string, resolvedPromoterId: string) => {
    setLeads(prev => prev.map(lead => lead.id === leadId ? {
      ...lead,
      promoterId: resolvedPromoterId,
      disputeStatus: 'resolved',
      activities: [
        {
          id: `act-${Date.now()}`,
          timestamp: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
          status: lead.status,
          note: `Referral attribution dispute reviewed and resolved by Admin.`,
          author: 'Admin Ops'
        },
        ...lead.activities
      ]
    } : lead));
  };

  const approveCommission = (commissionId: string, notes?: string) => {
    let targetComm: CommissionRecord | undefined;
    setCommissions(prev => prev.map(c => {
      if (c.id === commissionId) {
        targetComm = {
          ...c,
          status: 'approved',
          approvedBy: currentUser.fullName,
          approvedAt: new Date().toISOString().split('T')[0],
          notes: notes || c.notes
        };
        return targetComm;
      }
      return c;
    }));

    if (targetComm) {
      const notif: NotificationItem = {
        id: `notif-${Date.now()}`,
        userId: (targetComm as CommissionRecord).promoterId,
        roleTarget: 'promoter',
        title: 'Commission Approved!',
        message: `Your commission of PKR ${(targetComm as CommissionRecord).amountPKR.toLocaleString()} for ${(targetComm as CommissionRecord).propertyTitle} has been approved and scheduled for bank disbursement.`,
        type: 'commission',
        isRead: false,
        createdAt: 'Just now',
        linkPage: 'promoter-earnings'
      };
      setNotifications(prev => [notif, ...prev]);
    }
  };

  const rejectCommission = (commissionId: string, reason: string) => {
    setCommissions(prev => prev.map(c => c.id === commissionId ? {
      ...c,
      status: 'rejected',
      notes: reason
    } : c));
  };

  const payoutCommission = (commissionId: string, transactionReference: string, payoutMethod: string) => {
    let targetComm: CommissionRecord | undefined;
    setCommissions(prev => prev.map(c => {
      if (c.id === commissionId) {
        targetComm = {
          ...c,
          status: 'paid',
          transactionReference,
          payoutMethod,
          paidAt: new Date().toISOString().split('T')[0]
        };
        return targetComm;
      }
      return c;
    }));

    if (targetComm) {
      const notif: NotificationItem = {
        id: `notif-${Date.now()}`,
        userId: (targetComm as CommissionRecord).promoterId,
        roleTarget: 'promoter',
        title: 'Payment Disbursed to Your Account!',
        message: `PKR ${(targetComm as CommissionRecord).amountPKR.toLocaleString()} has been paid via ${payoutMethod}. Reference: ${transactionReference}.`,
        type: 'commission',
        isRead: false,
        createdAt: 'Just now',
        linkPage: 'promoter-earnings'
      };
      setNotifications(prev => [notif, ...prev]);
    }
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  return (
    <AppContext.Provider value={{
      currentPage,
      setCurrentPage,
      selectedPropertyId,
      setSelectedPropertyId,
      navigateToProperty,
      currentUser,
      activeRole,
      switchRole,
      updateUserProfile,
      isLoggedIn,
      loginUser,
      logoutUser,
      activeReferralCode,
      setActiveReferralCode,
      shareModalProperty,
      setShareModalProperty,
      posterModalProperty,
      setPosterModalProperty,
      inquiryModalProperty,
      setInquiryModalProperty,
      properties,
      leads,
      commissions,
      sharedLinks,
      notifications,
      addProperty,
      updateProperty,
      deleteProperty,
      togglePropertyVerification,
      submitInquiry,
      trackShareAction,
      recordLinkClick,
      updateLeadStatus,
      assignLeadSalesRep,
      resolveLeadDispute,
      approveCommission,
      rejectCommission,
      payoutCommission,
      markNotificationAsRead,
      markAllNotificationsAsRead
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

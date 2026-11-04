import { PropertyListing, UserProfile, Lead, CommissionRecord, SharedLinkRecord, NotificationItem, LeaderboardEntry } from '../types';

export const INITIAL_PROPERTIES: PropertyListing[] = [
  {
    id: 'prop-101',
    slug: 'dha-phase-6-luxury-1-kanal-villa',
    title: '1 Kanal Ultra-Modern Designer Villa with Landscaped Lawn',
    category: 'Houses',
    city: 'Lahore',
    area: 'Phase 6, DHA Lahore',
    pricePKR: 78500000,
    formattedPrice: 'PKR 7.85 Crore',
    areaSize: '1 Kanal (500 Sq Yds)',
    bedrooms: 5,
    bathrooms: 6,
    isVerified: true,
    isFeatured: true,
    referralRewardType: 'fixed',
    referralRewardValue: 150000,
    referralRewardDisplay: 'PKR 150,000',
    images: [
      '/src/assets/images/prop_dha_villa_1793767011983.jpg',
      '/src/assets/images/prop_bahria_apt_1793767011771.jpg'
    ],
    description: 'Bespoke contemporary masterpiece situated in Phase 6, Sector C, DHA Lahore. Featuring imported Spanish tile flooring, automated smart lighting, Italian fitted show kitchen, double height ceiling lobby, private lush front lawn, and dedicated servant quarter with separate access. 100% verified ownership documents with direct builder warranty.',
    features: [
      'Spanish porcelain tile flooring',
      'Italian fitted kitchen with appliances',
      'Double-glazed thermal break windows',
      'Smart home automation system',
      'Private servant quarter & guard post',
      'Underground water tank with filtration'
    ],
    seller: {
      id: 'dealer-1',
      name: 'Chaudhry Farhan',
      company: 'Premier Apex Properties',
      phone: '+92 300 8472910',
      isVerified: true,
      rating: 4.9
    },
    locationCoordinates: { lat: 31.4721, lng: 74.4283 },
    totalClicks: 342,
    totalLeads: 18,
    status: 'active',
    createdAt: '2026-10-14'
  },
  {
    id: 'prop-102',
    slug: 'the-grande-residences-bahria-town-penthouse',
    title: '2-Bed Luxury Executive Penthouse with Panoramic Views',
    category: 'Apartments',
    city: 'Lahore',
    area: 'Sector B, Bahria Town Lahore',
    pricePKR: 24000000,
    formattedPrice: 'PKR 2.40 Crore',
    areaSize: '1,750 Sq Ft',
    bedrooms: 2,
    bathrooms: 3,
    isVerified: true,
    isFeatured: true,
    referralRewardType: 'fixed',
    referralRewardValue: 60000,
    referralRewardDisplay: 'PKR 60,000',
    images: [
      '/src/assets/images/prop_bahria_apt_1793767011771.jpg',
      '/src/assets/images/hero_lahore_skyline_1793767011069.jpg'
    ],
    description: 'High-elevation living overlooking the iconic Eiffel Tower park in Bahria Town Lahore. Floor-to-ceiling soundproof glass facades, high-speed Otis elevators, 24/7 dedicated power backup generator, secure basement RFID parking, and community rooftop infinity pool.',
    features: [
      'Uninterrupted 24/7 generator backup',
      'Dedicated basement parking slot',
      'Rooftop leisure terrace & gymnasium',
      'Biometric access control lobby',
      'High rental yield (~8.5% annual)'
    ],
    seller: {
      id: 'dealer-2',
      name: 'Zeeshan Qureshi',
      company: 'Horizon Capital Realtors',
      phone: '+92 321 4455889',
      isVerified: true,
      rating: 4.8
    },
    locationCoordinates: { lat: 31.3685, lng: 74.1812 },
    totalClicks: 520,
    totalLeads: 29,
    status: 'active',
    createdAt: '2026-10-20'
  },
  {
    id: 'prop-103',
    slug: 'mall-9-gulberg-commercial-corporate-floor',
    title: 'Prime Commercial Corporate Suite & Retail Space',
    category: 'Commercial Plots',
    city: 'Lahore',
    area: 'Main Boulevard, Gulberg III, Lahore',
    pricePKR: 42000000,
    formattedPrice: 'PKR 4.20 Crore',
    areaSize: '2,800 Sq Ft',
    isVerified: true,
    isFeatured: true,
    referralRewardType: 'fixed',
    referralRewardValue: 110000,
    referralRewardDisplay: 'PKR 110,000',
    images: [
      '/src/assets/images/prop_gulberg_plaza_1793767012540.jpg',
      '/src/assets/images/hero_lahore_skyline_1793767011069.jpg'
    ],
    description: 'Prestigious corporate retail & office space located in the golden hub of Gulberg III on Main Boulevard. Heavy footfall, front glass display facade, approved LDA commercial status, VRF centralized air conditioning system, and fire safety systems installed.',
    features: [
      'Approved commercial classification (LDA)',
      'Direct frontage on Main Boulevard Gulberg',
      'Centralized VRF energy-saving AC',
      'High-speed cargo & passenger elevators',
      'Guaranteed long-term institutional tenant demand'
    ],
    seller: {
      id: 'dealer-3',
      name: 'Malik Haroon',
      company: 'Beacon Real Estate Investment',
      phone: '+92 333 9988771',
      isVerified: true,
      rating: 5.0
    },
    locationCoordinates: { lat: 31.5204, lng: 74.3587 },
    totalClicks: 215,
    totalLeads: 12,
    status: 'active',
    createdAt: '2026-10-25'
  },
  {
    id: 'prop-104',
    slug: 'lake-city-10-marla-golf-estate-villa',
    title: '10 Marla Golf View Spanish Villa in Gated Community',
    category: 'Houses',
    city: 'Lahore',
    area: 'Sector M-3, Lake City, Raiwind Road',
    pricePKR: 39500000,
    formattedPrice: 'PKR 3.95 Crore',
    areaSize: '10 Marla (250 Sq Yds)',
    bedrooms: 4,
    bathrooms: 5,
    isVerified: true,
    isFeatured: false,
    referralRewardType: 'fixed',
    referralRewardValue: 75000,
    referralRewardDisplay: 'PKR 75,000',
    images: [
      '/src/assets/images/prop_dha_villa_1793767011983.jpg'
    ],
    description: 'Immaculate single-family home facing lush green park in Lake City Lahore. Underground electricity, Lake City Mall and international standard golf course just 3 minutes away. Ideal for peaceful family living with quick Ring Road access.',
    features: [
      'Direct access to Lahore Ring Road SL-3',
      'Underground wiring and gas connection',
      'Solid Ash wood doors and cabinetry',
      'Solar net-metering 10kW pre-installed',
      'Round the clock elite security patrol'
    ],
    seller: {
      id: 'dealer-1',
      name: 'Chaudhry Farhan',
      company: 'Premier Apex Properties',
      phone: '+92 300 8472910',
      isVerified: true,
      rating: 4.9
    },
    locationCoordinates: { lat: 31.3521, lng: 74.2415 },
    totalClicks: 180,
    totalLeads: 9,
    status: 'active',
    createdAt: '2026-10-28'
  },
  {
    id: 'prop-105',
    slug: 'dha-phase-8-park-view-1-kanal-plot',
    title: '1 Kanal Prime Residential Plot - Ready for Construction',
    category: 'Residential Plots',
    city: 'Lahore',
    area: 'Phase 8 (Ex-Park View), DHA Lahore',
    pricePKR: 46000000,
    formattedPrice: 'PKR 4.60 Crore',
    areaSize: '1 Kanal (500 Sq Yds)',
    isVerified: true,
    isFeatured: false,
    referralRewardType: 'fixed',
    referralRewardValue: 90000,
    referralRewardDisplay: 'PKR 90,000',
    images: [
      '/src/assets/images/hero_lahore_skyline_1793767011069.jpg'
    ],
    description: 'Prime location plot in DHA Phase 8 Block B, facing community park and adjacent to commercial sector. Fully developed with possession available immediately, direct transfer in DHA office.',
    features: [
      'Possession paid with direct transfer',
      'Opposite 50 Kanal central park',
      '60-foot wide carpeted front road',
      'Direct access from Lahore Airport Road'
    ],
    seller: {
      id: 'dealer-2',
      name: 'Zeeshan Qureshi',
      company: 'Horizon Capital Realtors',
      phone: '+92 321 4455889',
      isVerified: true,
      rating: 4.8
    },
    locationCoordinates: { lat: 31.5031, lng: 74.4510 },
    totalClicks: 290,
    totalLeads: 14,
    status: 'active',
    createdAt: '2026-11-01'
  },
  {
    id: 'prop-106',
    slug: 'johar-town-double-storey-commercial-shop',
    title: 'Double Storey Commercial Boutique Shop in Main Market',
    category: 'Shops',
    city: 'Lahore',
    area: 'G-Block Commercial Market, Johar Town',
    pricePKR: 18500000,
    formattedPrice: 'PKR 1.85 Crore',
    areaSize: '5 Marla Commercial',
    isVerified: true,
    isFeatured: false,
    referralRewardType: 'fixed',
    referralRewardValue: 45000,
    referralRewardDisplay: 'PKR 45,000',
    images: [
      '/src/assets/images/prop_gulberg_plaza_1793767012540.jpg'
    ],
    description: 'High rental income commercial shop in G-Block Johar Town near Doctors Hospital and Expo Centre Lahore. Currently leased to a reputable retail brand fetching PKR 140,000 monthly rent.',
    features: [
      'Active rental yield with signed lease',
      'High footfall pedestrian shopping zone',
      'Dual shutters and separate meter',
      'Verified LDA registry & intiqal'
    ],
    seller: {
      id: 'dealer-3',
      name: 'Malik Haroon',
      company: 'Beacon Real Estate Investment',
      phone: '+92 333 9988771',
      isVerified: true,
      rating: 5.0
    },
    locationCoordinates: { lat: 31.4697, lng: 74.2728 },
    totalClicks: 140,
    totalLeads: 7,
    status: 'active',
    createdAt: '2026-11-02'
  }
];

export const CURRENT_USER: UserProfile = {
  id: 'usr-promoter-01',
  fullName: 'Hamza Tariq',
  email: 'hamza.tariq@gmail.com',
  phone: '+92 301 5567890',
  city: 'Lahore',
  role: 'promoter',
  category: 'student',
  referralCode: 'BS1025',
  isVerified: true,
  joinedDate: '2026-08-15',
  payoutDetails: {
    method: 'bank_transfer',
    accountTitle: 'Hamza Tariq',
    accountNumber: 'PK76MEZN0001020304050607',
    bankName: 'Meezan Bank Limited (Lahore Cantt Branch)'
  }
};

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-501',
    customerName: 'Sarmad Nawaz',
    customerPhone: '+92 321 ••••412',
    customerEmail: 'sarmad.nawaz@corporate.pk',
    propertyId: 'prop-101',
    propertyTitle: '1 Kanal Ultra-Modern Designer Villa with Landscaped Lawn',
    propertyArea: 'Phase 6, DHA Lahore',
    promoterId: 'usr-promoter-01',
    promoterName: 'Hamza Tariq',
    referralCode: 'BS1025',
    status: 'site_visit',
    assignedSalesRep: {
      id: 'sales-1',
      name: 'Ayesha Malik',
      phone: '+92 300 9410022'
    },
    dealValuePKR: 78500000,
    referralRewardPKR: 150000,
    notes: 'Client reviewed WhatsApp shared link. Requested physical site visit on Saturday 3:00 PM with family. Highly interested in Phase 6 Sector C location.',
    activities: [
      {
        id: 'act-1',
        timestamp: '2026-10-29 11:20 AM',
        status: 'new',
        note: 'Referral inquiry generated via promoter link (BS1025).',
        author: 'System'
      },
      {
        id: 'act-2',
        timestamp: '2026-10-29 02:45 PM',
        status: 'contacted',
        note: 'Sales Rep Ayesha phoned client to confirm budget and preferred timeline.',
        author: 'Ayesha Malik'
      },
      {
        id: 'act-3',
        timestamp: '2026-10-31 04:00 PM',
        status: 'site_visit',
        note: 'Site inspection scheduled at DHA Phase 6 Villa with builder representative present.',
        author: 'Ayesha Malik'
      }
    ],
    disputeStatus: 'none',
    createdAt: '2026-10-29',
    updatedAt: '2026-10-31'
  },
  {
    id: 'lead-502',
    customerName: 'Dr. Faisal Shahzad',
    customerPhone: '+92 300 ••••991',
    customerEmail: 'faisal.shahzad@health.pk',
    propertyId: 'prop-102',
    propertyTitle: '2-Bed Luxury Executive Penthouse with Panoramic Views',
    propertyArea: 'Sector B, Bahria Town Lahore',
    promoterId: 'usr-promoter-01',
    promoterName: 'Hamza Tariq',
    referralCode: 'BS1025',
    status: 'completed',
    assignedSalesRep: {
      id: 'sales-2',
      name: 'Bilal Hassan',
      phone: '+92 333 4455112'
    },
    dealValuePKR: 24000000,
    referralRewardPKR: 60000,
    notes: 'Token money submitted at Bahria Town registry. Token verified by BIZSHARE Admin.',
    activities: [
      {
        id: 'act-4',
        timestamp: '2026-10-18 10:15 AM',
        status: 'new',
        note: 'Customer inquiry received through Facebook shared poster link.',
        author: 'System'
      },
      {
        id: 'act-5',
        timestamp: '2026-10-20 03:00 PM',
        status: 'qualified',
        note: 'Buyer has ready financing; confirmed interest in 2-bed Bahria penthouse.',
        author: 'Bilal Hassan'
      },
      {
        id: 'act-6',
        timestamp: '2026-10-27 12:00 PM',
        status: 'completed',
        note: 'Deal closed and buyer transfer letter issued. Commission approved for promoter.',
        author: 'Admin'
      }
    ],
    disputeStatus: 'none',
    createdAt: '2026-10-18',
    updatedAt: '2026-10-27'
  },
  {
    id: 'lead-503',
    customerName: 'Khurram Jamil',
    customerPhone: '+92 345 ••••667',
    customerEmail: 'kjamil.ventures@gmail.com',
    propertyId: 'prop-103',
    propertyTitle: 'Prime Commercial Corporate Suite & Retail Space',
    propertyArea: 'Main Boulevard, Gulberg III, Lahore',
    promoterId: 'usr-promoter-01',
    promoterName: 'Hamza Tariq',
    referralCode: 'BS1025',
    status: 'negotiation',
    assignedSalesRep: {
      id: 'sales-1',
      name: 'Ayesha Malik',
      phone: '+92 300 9410022'
    },
    dealValuePKR: 42000000,
    referralRewardPKR: 110000,
    notes: 'Commercial lease versus outright purchase negotiation in progress with Beacon Real Estate.',
    activities: [
      {
        id: 'act-7',
        timestamp: '2026-10-25 09:30 AM',
        status: 'new',
        note: 'Lead captured via promoter WhatsApp broadcast.',
        author: 'System'
      },
      {
        id: 'act-8',
        timestamp: '2026-10-28 05:00 PM',
        status: 'negotiation',
        note: 'Price offer of PKR 4.10 Crore under discussion with property owner.',
        author: 'Ayesha Malik'
      }
    ],
    disputeStatus: 'none',
    createdAt: '2026-10-25',
    updatedAt: '2026-10-28'
  }
];

export const INITIAL_COMMISSIONS: CommissionRecord[] = [
  {
    id: 'comm-801',
    promoterId: 'usr-promoter-01',
    promoterName: 'Hamza Tariq',
    leadId: 'lead-502',
    propertyId: 'prop-102',
    propertyTitle: '2-Bed Luxury Executive Penthouse with Panoramic Views',
    customerName: 'Dr. Faisal Shahzad',
    amountPKR: 60000,
    status: 'paid',
    milestoneReached: 'Title Transfer & Stamp Duty Verified',
    transactionReference: 'TRX-MEZN-94821034',
    payoutMethod: 'Meezan Bank Transfer',
    approvedBy: 'Platform Admin',
    approvedAt: '2026-10-28',
    paidAt: '2026-10-29',
    notes: 'Transferred directly to registered IBAN. Promoter notified.',
    createdAt: '2026-10-27'
  },
  {
    id: 'comm-802',
    promoterId: 'usr-promoter-01',
    promoterName: 'Hamza Tariq',
    leadId: 'lead-503',
    propertyId: 'prop-103',
    propertyTitle: 'Prime Commercial Corporate Suite & Retail Space',
    customerName: 'Khurram Jamil',
    amountPKR: 110000,
    status: 'under_review',
    milestoneReached: 'Offer Accepted - Awaiting Token Registration',
    approvedBy: 'Admin Ops',
    notes: 'Token agreement submitted; final verification pending before payout disbursement.',
    createdAt: '2026-10-30'
  }
];

export const INITIAL_SHARED_LINKS: SharedLinkRecord[] = [
  {
    id: 'link-1',
    promoterId: 'usr-promoter-01',
    propertyId: 'prop-101',
    propertyTitle: '1 Kanal Ultra-Modern Designer Villa with Landscaped Lawn',
    propertyPrice: 'PKR 7.85 Crore',
    referralUrl: 'https://bizshare.pk/property/dha-phase-6-luxury-1-kanal-villa?ref=BS1025',
    referralCode: 'BS1025',
    clicksCount: 148,
    leadsCount: 6,
    lastSharedAt: '2026-11-01',
    createdAt: '2026-10-15'
  },
  {
    id: 'link-2',
    promoterId: 'usr-promoter-01',
    propertyId: 'prop-102',
    propertyTitle: '2-Bed Luxury Executive Penthouse with Panoramic Views',
    propertyPrice: 'PKR 2.40 Crore',
    referralUrl: 'https://bizshare.pk/property/the-grande-residences-bahria-town-penthouse?ref=BS1025',
    referralCode: 'BS1025',
    clicksCount: 210,
    leadsCount: 8,
    lastSharedAt: '2026-10-28',
    createdAt: '2026-10-20'
  },
  {
    id: 'link-3',
    promoterId: 'usr-promoter-01',
    propertyId: 'prop-103',
    propertyTitle: 'Prime Commercial Corporate Suite & Retail Space',
    propertyPrice: 'PKR 4.20 Crore',
    referralUrl: 'https://bizshare.pk/property/mall-9-gulberg-commercial-corporate-floor?ref=BS1025',
    referralCode: 'BS1025',
    clicksCount: 85,
    leadsCount: 4,
    lastSharedAt: '2026-10-30',
    createdAt: '2026-10-26'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    userId: 'usr-promoter-01',
    roleTarget: 'promoter',
    title: 'Commission Paid into Account',
    message: 'PKR 60,000 has been transferred to your Meezan Bank account for Bahria Penthouse deal (Ref: TRX-MEZN-94821034).',
    type: 'commission',
    isRead: false,
    createdAt: '2 days ago',
    linkPage: 'promoter-earnings'
  },
  {
    id: 'notif-2',
    userId: 'usr-promoter-01',
    roleTarget: 'promoter',
    title: 'Site Visit Scheduled for Your Lead',
    message: 'Your referred client Sarmad Nawaz is visiting Phase 6 DHA Villa with senior consultant Ayesha Malik on Saturday.',
    type: 'lead',
    isRead: false,
    createdAt: '3 days ago',
    linkPage: 'promoter-leads'
  },
  {
    id: 'notif-3',
    roleTarget: 'admin',
    title: 'New Promoter Registered',
    message: 'Zainab Fatima (Homemaker, Lahore Cantt) joined BIZSHARE promoter network.',
    type: 'system',
    isRead: false,
    createdAt: '1 hour ago',
    linkPage: 'admin-promoters'
  },
  {
    id: 'notif-4',
    roleTarget: 'admin',
    title: 'Commission Verification Requested',
    message: 'Lead #503 negotiation reaching token threshold. Review PKR 110,000 reward for promoter Hamza Tariq.',
    type: 'commission',
    isRead: false,
    createdAt: '5 hours ago',
    linkPage: 'admin-commissions'
  }
];

export const LEADERBOARD_DATA: LeaderboardEntry[] = [
  {
    rank: 1,
    promoterId: 'usr-p01',
    name: 'Taimoor Ahmed',
    category: 'freelancer',
    city: 'Lahore (Model Town)',
    dealsCompleted: 6,
    leadsGenerated: 42,
    totalEarnedPKR: 420000,
    badge: 'Diamond Promoter'
  },
  {
    rank: 2,
    promoterId: 'usr-promoter-01',
    name: 'Hamza Tariq',
    category: 'student',
    city: 'Lahore (FAST NUCES)',
    dealsCompleted: 2,
    leadsGenerated: 18,
    totalEarnedPKR: 170000,
    badge: 'Rising Star'
  },
  {
    rank: 3,
    promoterId: 'usr-p03',
    name: 'Sobia Imran',
    category: 'homemaker',
    city: 'Lahore (DHA Phase 5)',
    dealsCompleted: 3,
    leadsGenerated: 26,
    totalEarnedPKR: 215000,
    badge: 'Gold Promoter'
  },
  {
    rank: 4,
    promoterId: 'usr-p04',
    name: 'Daniyal Qureshi',
    category: 'social_media_promoter',
    city: 'Lahore (Johar Town)',
    dealsCompleted: 2,
    leadsGenerated: 35,
    totalEarnedPKR: 145000,
    badge: 'Top Sharer'
  },
  {
    rank: 5,
    promoterId: 'usr-p05',
    name: 'Amina Farooq',
    category: 'freelancer',
    city: 'Lahore (Gulberg)',
    dealsCompleted: 1,
    leadsGenerated: 14,
    totalEarnedPKR: 90000,
    badge: 'Active Partner'
  }
];

export const PLATFORM_STATS = {
  availableProperties: 124,
  registeredPromoters: 3850,
  successfulReferrals: 412,
  partnerAgencies: 68,
  totalPaidCommissionPKR: 28450000
};

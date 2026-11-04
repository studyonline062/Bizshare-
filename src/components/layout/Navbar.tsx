import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';
import { 
  Bell, 
  Menu, 
  X, 
  CheckCircle2, 
  UserCheck, 
  LogOut, 
  TrendingUp,
  LayoutDashboard,
  ShieldAlert,
  Building,
  UserCheck2
} from 'lucide-react';
import { UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const { 
    currentPage, 
    setCurrentPage, 
    currentUser, 
    activeRole, 
    switchRole, 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead,
    isLoggedIn,
    logoutUser 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleSelector, setShowRoleSelector] = useState(false);

  const unreadNotifications = notifications.filter(n => !n.isRead && (n.roleTarget === activeRole || n.roleTarget === 'all' || n.userId === currentUser.id));

  const roleLabels: Record<UserRole, { title: string; color: string; icon: React.ReactNode }> = {
    promoter: { 
      title: 'Promoter', 
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200', 
      icon: <TrendingUp className="w-3.5 h-3.5" /> 
    },
    admin: { 
      title: 'Platform Admin', 
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200', 
      icon: <ShieldAlert className="w-3.5 h-3.5" /> 
    },
    dealer: { 
      title: 'Property Dealer', 
      color: 'bg-amber-50 text-amber-800 border-amber-200', 
      icon: <Building className="w-3.5 h-3.5" /> 
    },
    sales_rep: { 
      title: 'Sales Rep', 
      color: 'bg-blue-50 text-blue-700 border-blue-200', 
      icon: <UserCheck2 className="w-3.5 h-3.5" /> 
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 h-18">
            
            {/* Zone 1: Brand Wordmark (Single Element) */}
            <button 
              onClick={() => setCurrentPage('home')} 
              className="text-left shrink-0 cursor-pointer focus:outline-none"
            >
              <Logo size="md" />
            </button>

            {/* Zone 2: 4-5 Clean Nav Links (Single line, text only) */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
              <button
                onClick={() => setCurrentPage('properties')}
                className={`transition-colors whitespace-nowrap cursor-pointer hover:text-[#0B3D91] ${
                  currentPage === 'properties' ? 'text-[#0B3D91] font-semibold underline underline-offset-8 decoration-2 decoration-[#F4B400]' : ''
                }`}
              >
                Properties
              </button>
              <button
                onClick={() => setCurrentPage('how-it-works')}
                className={`transition-colors whitespace-nowrap cursor-pointer hover:text-[#0B3D91] ${
                  currentPage === 'how-it-works' ? 'text-[#0B3D91] font-semibold underline underline-offset-8 decoration-2 decoration-[#F4B400]' : ''
                }`}
              >
                How It Works
              </button>
              <button
                onClick={() => setCurrentPage('become-promoter')}
                className={`transition-colors whitespace-nowrap cursor-pointer hover:text-[#0B3D91] ${
                  currentPage === 'become-promoter' ? 'text-[#0B3D91] font-semibold underline underline-offset-8 decoration-2 decoration-[#F4B400]' : ''
                }`}
              >
                Become Promoter
              </button>
              <button
                onClick={() => setCurrentPage('partner')}
                className={`transition-colors whitespace-nowrap cursor-pointer hover:text-[#0B3D91] ${
                  currentPage === 'partner' ? 'text-[#0B3D91] font-semibold underline underline-offset-8 decoration-2 decoration-[#F4B400]' : ''
                }`}
              >
                Partner With Us
              </button>
              <button
                onClick={() => setCurrentPage('about')}
                className={`transition-colors whitespace-nowrap cursor-pointer hover:text-[#0B3D91] ${
                  currentPage === 'about' ? 'text-[#0B3D91] font-semibold underline underline-offset-8 decoration-2 decoration-[#F4B400]' : ''
                }`}
              >
                About BIZSHARE
              </button>
            </nav>

            {/* Zone 3: Single Primary Action Area (Notification, Role Switcher & Action) */}
            <div className="flex items-center gap-3 shrink-0">
              
              {/* Notification Center */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  aria-label="View notifications"
                  className="relative p-2 text-slate-600 hover:text-[#0B3D91] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  <Bell className="w-5 h-5" />
                  {unreadNotifications.length > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-[#F4B400] text-[#0B3D91] font-bold text-[10px] rounded-full flex items-center justify-center shadow-xs">
                      {unreadNotifications.length}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-84 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden py-1">
                    <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900">Notifications</span>
                        <span className="text-xs text-slate-500 font-medium">{unreadNotifications.length} unread</span>
                      </div>
                      {unreadNotifications.length > 0 && (
                        <button 
                          onClick={markAllNotificationsAsRead}
                          className="text-xs text-[#0B3D91] font-semibold hover:underline cursor-pointer"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>

                    <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-xs text-slate-500">No notifications yet.</div>
                      ) : (
                        notifications.slice(0, 5).map(n => (
                          <div 
                            key={n.id}
                            onClick={() => {
                              markNotificationAsRead(n.id);
                              setShowNotifications(false);
                              if (n.linkPage === 'promoter-leads' || n.linkPage === 'promoter-earnings') {
                                setCurrentPage('promoter-dashboard');
                              } else if (n.linkPage === 'admin-dashboard' || n.linkPage === 'admin-commissions') {
                                setCurrentPage('admin-dashboard');
                              }
                            }}
                            className={`p-3 hover:bg-slate-50 transition-colors cursor-pointer text-left ${
                              !n.isRead ? 'bg-amber-50/40' : ''
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="text-xs font-semibold text-slate-900 leading-snug">{n.title}</span>
                              <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.createdAt}</span>
                            </div>
                            <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">{n.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Role Perspective Switcher for Testing (Promoter, Admin, Dealer, Sales Rep) */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setShowRoleSelector(!showRoleSelector)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${roleLabels[activeRole].color}`}
                  title="Switch preview perspective"
                >
                  {roleLabels[activeRole].icon}
                  <span>{roleLabels[activeRole].title}</span>
                </button>

                {showRoleSelector && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 z-50 p-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
                      Switch Role Perspective
                    </div>
                    {(['promoter', 'admin', 'dealer', 'sales_rep'] as UserRole[]).map(r => (
                      <button
                        key={r}
                        onClick={() => {
                          switchRole(r);
                          setShowRoleSelector(false);
                          if (r === 'admin') setCurrentPage('admin-dashboard');
                          else if (r === 'promoter') setCurrentPage('promoter-dashboard');
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
                          activeRole === r ? 'bg-slate-100 text-[#0B3D91] font-semibold' : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {roleLabels[r].icon}
                          <span>{roleLabels[r].title}</span>
                        </div>
                        {activeRole === r && <CheckCircle2 className="w-3.5 h-3.5 text-[#0B3D91]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Primary Action Button */}
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    if (activeRole === 'admin') {
                      setCurrentPage('admin-dashboard');
                    } else {
                      setCurrentPage('promoter-dashboard');
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-bold text-[#0B3D91] bg-[#F4B400] hover:bg-[#db9f00] transition-colors rounded-lg shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>{activeRole === 'admin' ? 'Admin Panel' : 'Promoter Console'}</span>
                </button>
              ) : (
                <button
                  onClick={() => setCurrentPage('login')}
                  className="px-4 py-2 text-xs md:text-sm font-bold text-white bg-[#0B3D91] hover:bg-[#082d6b] transition-colors rounded-lg shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Promoter Login
                </button>
              )}

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                className="lg:hidden p-2 text-slate-700 hover:text-[#0B3D91] rounded-lg cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-3">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
              <button
                onClick={() => { switchRole('promoter'); setCurrentPage('promoter-dashboard'); setMobileMenuOpen(false); }}
                className={`py-2 px-3 rounded-lg text-xs font-semibold text-center border ${
                  activeRole === 'promoter' ? 'bg-[#0B3D91] text-white border-[#0B3D91]' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Promoter View
              </button>
              <button
                onClick={() => { switchRole('admin'); setCurrentPage('admin-dashboard'); setMobileMenuOpen(false); }}
                className={`py-2 px-3 rounded-lg text-xs font-semibold text-center border ${
                  activeRole === 'admin' ? 'bg-[#0B3D91] text-white border-[#0B3D91]' : 'bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Admin View
              </button>
            </div>

            <nav className="flex flex-col space-y-2 text-sm font-medium text-slate-700">
              <button
                onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}
                className="py-2 text-left hover:text-[#0B3D91] font-semibold"
              >
                Home
              </button>
              <button
                onClick={() => { setCurrentPage('properties'); setMobileMenuOpen(false); }}
                className="py-2 text-left hover:text-[#0B3D91]"
              >
                Explore Properties
              </button>
              <button
                onClick={() => { setCurrentPage('become-promoter'); setMobileMenuOpen(false); }}
                className="py-2 text-left hover:text-[#0B3D91]"
              >
                Become a Promoter
              </button>
              <button
                onClick={() => { setCurrentPage('how-it-works'); setMobileMenuOpen(false); }}
                className="py-2 text-left hover:text-[#0B3D91]"
              >
                How It Works
              </button>
              <button
                onClick={() => { setCurrentPage('partner'); setMobileMenuOpen(false); }}
                className="py-2 text-left hover:text-[#0B3D91]"
              >
                Partner With Us
              </button>
              <button
                onClick={() => { setCurrentPage('about'); setMobileMenuOpen(false); }}
                className="py-2 text-left hover:text-[#0B3D91]"
              >
                About Us
              </button>
              <button
                onClick={() => { setCurrentPage('contact'); setMobileMenuOpen(false); }}
                className="py-2 text-left hover:text-[#0B3D91]"
              >
                Contact
              </button>
            </nav>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#0B3D91] text-white font-bold text-xs flex items-center justify-center">
                  {currentUser.fullName.charAt(0)}
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900">{currentUser.fullName}</div>
                  <div className="text-[10px] text-slate-500">Ref Code: {currentUser.referralCode}</div>
                </div>
              </div>
              <button
                onClick={() => { logoutUser(); setMobileMenuOpen(false); }}
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

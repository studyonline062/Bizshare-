import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/common/Logo';
import { UserCategory } from '../types';
import { 
  CheckCircle2, 
  Lock, 
  Mail, 
  Phone, 
  User, 
  MapPin, 
  ShieldCheck, 
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles
} from 'lucide-react';

interface AuthPagesProps {
  initialMode?: 'login' | 'register';
}

export const AuthPages: React.FC<AuthPagesProps> = ({ initialMode = 'login' }) => {
  const { loginUser, setCurrentPage, switchRole } = useApp();
  const [mode, setMode] = useState<'login' | 'register' | 'otp' | 'forgot'>(initialMode);
  
  // Registration form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+92 3');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('Lahore');
  const [category, setCategory] = useState<UserCategory>('student');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // OTP state
  const [otpCode, setOtpCode] = useState(['', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName || !email || phone.length < 11 || !password) {
      setErrorMessage('Please fill out all required fields.');
      return;
    }
    if (!acceptedTerms) {
      setErrorMessage('Please accept the Terms and Conditions and Privacy Policy.');
      return;
    }

    // Move to simulated OTP screen
    setMode('otp');
  };

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      loginUser(email, 'promoter');
    }, 700);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }
    // Check if admin login
    if (email.toLowerCase().includes('admin')) {
      loginUser(email, 'admin');
    } else {
      loginUser(email, 'promoter');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-6">
        
        {/* Brand Lockup */}
        <div className="text-center space-y-2">
          <Logo size="md" className="justify-center" />
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight pt-2">
            {mode === 'login' && 'Sign in to BIZSHARE'}
            {mode === 'register' && 'Become a Registered Promoter'}
            {mode === 'otp' && 'Verify Your Pakistani Mobile'}
            {mode === 'forgot' && 'Reset Your Password'}
          </h2>
          <p className="text-xs text-slate-500">
            {mode === 'login' && 'Access your promoter console or admin portal'}
            {mode === 'register' && 'Zero joining fee • Start sharing and earning today'}
            {mode === 'otp' && `We sent a 4-digit SMS verification code to ${phone}`}
            {mode === 'forgot' && 'Enter your registered email to receive reset instructions'}
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs">
            {errorMessage}
          </div>
        )}

        {/* 1. LOGIN MODE */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="promoter@gmail.com (or admin@bizshare.pk)"
                  className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B3D91] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-slate-700">Password</label>
                <button
                  type="button"
                  onClick={() => setMode('forgot')}
                  className="text-[11px] text-[#0B3D91] font-semibold hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-8 pr-10 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B3D91] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#0B3D91] hover:bg-[#082a66] text-white font-bold rounded-xl shadow-md transition-colors cursor-pointer text-xs"
            >
              Sign In to Dashboard
            </button>

            {/* Quick Demo Login Helpers */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 block text-center">
                Quick Demo Access
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEmail('hamza.tariq@gmail.com');
                    setPassword('password123');
                    loginUser('hamza.tariq@gmail.com', 'promoter');
                  }}
                  className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-[11px] font-semibold text-slate-700 cursor-pointer"
                >
                  Demo Promoter (Hamza)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEmail('admin@bizshare.pk');
                    setPassword('admin123');
                    loginUser('admin@bizshare.pk', 'admin');
                  }}
                  className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-[11px] font-semibold text-slate-700 cursor-pointer"
                >
                  Demo Admin (Operations)
                </button>
              </div>
            </div>

            <div className="text-center pt-2 text-xs text-slate-600">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="font-bold text-[#0B3D91] hover:underline cursor-pointer"
              >
                Register as Promoter Free
              </button>
            </div>
          </form>
        )}

        {/* 2. REGISTRATION MODE */}
        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
              <div className="relative">
                <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="e.g. Zainab Fatima"
                  className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B3D91] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="zainab@gmail.com"
                  className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B3D91] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Mobile (SMS OTP) *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+92 300 1234567"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B3D91] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">City *</label>
                <select
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B3D91] focus:outline-none cursor-pointer"
                >
                  <option value="Lahore">Lahore</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Faisalabad">Faisalabad</option>
                  <option value="Multan">Multan</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">User Category *</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as UserCategory)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B3D91] focus:outline-none cursor-pointer"
              >
                <option value="student">University & College Student</option>
                <option value="homemaker">Homemaker</option>
                <option value="freelancer">Freelancer & Digital Creator</option>
                <option value="social_media_promoter">Social Media Promoter</option>
                <option value="other">Other Individual Promoter</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Password *</label>
              <div className="relative">
                <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B3D91] focus:outline-none"
                />
              </div>
            </div>

            <label className="flex items-start gap-2 pt-1 text-[11px] text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={acceptedTerms}
                onChange={e => setAcceptedTerms(e.target.checked)}
                className="mt-0.5 rounded border-slate-300 text-[#0B3D91]"
              />
              <span>
                I accept the{' '}
                <button 
                  type="button" 
                  onClick={() => setCurrentPage('terms')}
                  className="text-[#0B3D91] underline"
                >
                  Terms & Conditions
                </button>
                ,{' '}
                <button 
                  type="button" 
                  onClick={() => setCurrentPage('privacy')}
                  className="text-[#0B3D91] underline"
                >
                  Privacy Policy
                </button>
                , and{' '}
                <button 
                  type="button" 
                  onClick={() => setCurrentPage('commission-policy')}
                  className="text-[#0B3D91] underline"
                >
                  Referral Commission Agreement
                </button>
                .
              </span>
            </label>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#F4B400] hover:bg-[#db9f00] text-[#0B3D91] font-extrabold rounded-xl shadow-md transition-colors cursor-pointer text-xs"
            >
              Verify Mobile & Join Free
            </button>

            <div className="text-center pt-1 text-xs text-slate-600">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-bold text-[#0B3D91] hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </form>
        )}

        {/* 3. OTP VERIFICATION MODE */}
        {mode === 'otp' && (
          <form onSubmit={handleOtpVerify} className="space-y-4 text-xs text-center">
            <div className="flex justify-center gap-3 py-2">
              {[0, 1, 2, 3].map(idx => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  defaultValue={idx === 0 ? '7' : idx === 1 ? '4' : idx === 2 ? '2' : '9'}
                  className="w-12 h-14 text-center text-lg font-bold font-mono bg-slate-50 border border-slate-300 rounded-xl focus:border-[#0B3D91] focus:bg-white focus:outline-none"
                />
              ))}
            </div>

            <p className="text-[11px] text-slate-500">
              Auto-filled demo test code: <strong>7429</strong>
            </p>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3 px-4 bg-[#0B3D91] hover:bg-[#082a66] text-white font-bold rounded-xl shadow-md transition-colors cursor-pointer text-xs"
            >
              {isVerifying ? 'Confirming OTP...' : 'Complete Registration'}
            </button>

            <button
              type="button"
              onClick={() => setMode('register')}
              className="text-xs text-slate-500 hover:text-slate-800"
            >
              Change Phone Number
            </button>
          </form>
        )}

        {/* 4. FORGOT PASSWORD MODE */}
        {mode === 'forgot' && (
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="your.email@gmail.com"
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                alert('Password reset link sent to your registered email address!');
                setMode('login');
              }}
              className="w-full py-2.5 bg-[#0B3D91] text-white font-bold rounded-xl"
            >
              Send Reset Link
            </button>
            <div className="text-center">
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-[#0B3D91] font-semibold hover:underline"
              >
                Back to Sign In
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

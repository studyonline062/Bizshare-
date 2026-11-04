import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageCircle } from 'lucide-react';

export const ContactUsPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+92 3');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Promoter Support');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold tracking-widest uppercase text-[#0B3D91]">
          We Are Here To Assist You
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Contact BIZSHARE
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Have inquiries regarding promoter payouts, listing properties, or scheduling site visits? Reach our Lahore headquarters.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Info (5 cols) */}
        <div className="lg:col-span-5 bg-[#0B3D91] text-white rounded-3xl p-8 space-y-8 shadow-md">
          <div className="space-y-2">
            <h3 className="text-xl font-extrabold text-[#F4B400]">Lahore Headquarters</h3>
            <p className="text-xs text-slate-200 leading-relaxed">
              Drop by for a cup of tea, discuss property listing terms, or consult with our legal verification desk.
            </p>
          </div>

          <div className="space-y-6 text-xs text-slate-200">
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-[#F4B400] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block text-sm">Helpline & Phone:</strong>
                <span className="text-slate-300"></span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-[#F4B400] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block text-sm">Email Inquiries:</strong>
                <span>support@bizshare.pk • operations@bizshare.pk</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#F4B400] shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block text-sm">Working Hours:</strong>
                <span>Monday – Saturday: 9:30 AM to 6:30 PM (PKT)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Message Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Send an Online Message</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Our operations desk will respond within 2 hours.
            </p>
          </div>

          {sent ? (
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="text-sm font-bold text-emerald-900">Message Dispatched!</h4>
              <p className="text-xs text-emerald-700">
                Thank you, {name}. A support specialist will get back to you at {phone} shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Faraz Babar"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B3D91] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mobile / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B3D91] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="user@gmail.com"
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B3D91] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Inquiry Topic</label>
                  <select
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B3D91] focus:outline-none cursor-pointer"
                  >
                    <option value="Promoter Support">Promoter Support & Link Tracking</option>
                    <option value="Commission Payouts">Commission Payout Inquiry</option>
                    <option value="Property Dealer Listing">Property Listing Onboarding</option>
                    <option value="Buyer Site Visit">Buyer Site Visit Request</option>
                    <option value="Other">Other Operational Question</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Message *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="How can we assist you today?"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B3D91] focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#0B3D91] hover:bg-[#082a66] text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  );
};

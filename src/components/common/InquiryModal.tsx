import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Send, ShieldCheck, UserCheck, CheckCircle2, Phone, Mail, Calendar, MessageSquare } from 'lucide-react';

export const InquiryModal: React.FC = () => {
  const { 
    inquiryModalProperty, 
    setInquiryModalProperty, 
    activeReferralCode, 
    submitInquiry 
  } = useApp();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+92 3');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('I am interested in scheduling a site inspection and reviewing verified ownership documentation.');
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  if (!inquiryModalProperty) return null;

  const prop = inquiryModalProperty;
  const refCode = activeReferralCode || 'BS1025';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (phone.length < 11) {
      setFormError('Please enter a valid Pakistani mobile number (e.g. +92 300 1234567).');
      return;
    }
    if (!email.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = submitInquiry({
        propertyId: prop.id,
        customerName: fullName.trim(),
        customerPhone: phone.trim(),
        customerEmail: email.trim(),
        notes: notes.trim()
      });

      setIsSubmitting(false);
      if (res.success) {
        setSubmittedLeadId(res.leadId);
      }
    }, 600);
  };

  const handleClose = () => {
    setInquiryModalProperty(null);
    setSubmittedLeadId(null);
    setFullName('');
    setPhone('+92 3');
    setEmail('');
    setFormError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0B3D91] text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/10 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-[#F4B400]" />
            </div>
            <div>
              <h3 className="font-bold text-base">Inquire About Property</h3>
              <p className="text-xs text-slate-300">Direct connection with authorized sales consultant</p>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="p-1.5 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedLeadId ? (
          /* Submission Success State */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900">Inquiry Received Successfully!</h4>
              <p className="text-xs text-slate-600 mt-1">
                Your reference ID is <span className="font-mono font-bold text-[#0B3D91]">{submittedLeadId}</span>.
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl text-left border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Property:</span>
                <span className="font-semibold text-slate-900">{prop.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Asking Price:</span>
                <span className="font-extrabold text-[#0B3D91]">{prop.formattedPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Attributed Promoter:</span>
                <span className="font-semibold text-emerald-700">Hamza Tariq (Ref: {refCode})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Assigned Consultant:</span>
                <span className="font-semibold text-slate-900">Ayesha Malik (+92 300 9410022)</span>
              </div>
            </div>
            <p className="text-xs text-slate-500">
              Our verified sales consultant has been notified and will call you within 2 working hours to assist with site inspection and paperwork.
            </p>
            <button
              onClick={handleClose}
              className="w-full py-2.5 rounded-xl bg-[#0B3D91] text-white font-bold text-xs hover:bg-[#082a66] transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          /* Form State */
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {/* Referral Attribution Banner */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2.5">
              <UserCheck className="w-4 h-4 text-[#F4B400] shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900">
                <span className="font-bold">Referral Partner Guarantee:</span> You are connecting via Promoter code{' '}
                <span className="font-mono font-bold text-[#0B3D91]">{refCode}</span>. Promoter commission will be honored upon transaction completion.
              </div>
            </div>

            {/* Property Quick Glance */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
              <span className="text-slate-500">Property:</span>
              <span className="font-bold text-slate-900 truncate max-w-[260px]">{prop.title}</span>
            </div>

            {formError && (
              <div className="p-2.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-lg text-xs">
                {formError}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="e.g. Sarmad Nawaz"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B3D91] focus:outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile / WhatsApp Number *
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+92 300 1234567"
                    className="w-full pl-8 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B3D91] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="buyer@corporate.pk"
                    className="w-full pl-8 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B3D91] focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Requirement / Inspection Request
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Mention preferred site visit timings or specific queries..."
                className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-[#0B3D91] focus:outline-none transition-colors resize-none"
              />
            </div>

            <p className="text-[11px] text-slate-400 leading-normal">
              Your contact details are securely transmitted to the authorized sales desk. No spam policy.
            </p>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 font-semibold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-lg bg-[#0B3D91] hover:bg-[#082a66] text-white font-bold text-xs shadow-md transition-colors cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Submitting...' : 'Submit Inquiry'}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

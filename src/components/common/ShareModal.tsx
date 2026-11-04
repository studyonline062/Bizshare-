import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Copy, 
  Check, 
  Share2, 
  QrCode, 
  Download, 
  MessageCircle, 
  Facebook, 
  Instagram, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';

export const ShareModal: React.FC = () => {
  const { 
    shareModalProperty, 
    setShareModalProperty, 
    setPosterModalProperty, 
    currentUser, 
    trackShareAction 
  } = useApp();

  const [copied, setCopied] = useState(false);

  if (!shareModalProperty) return null;

  const prop = shareModalProperty;
  const promoCode = currentUser.referralCode || 'BS1025';
  const shareUrl = `${window.location.origin}/?property=${prop.slug}&ref=${promoCode}`;

  const defaultShareMessage = `Assalam-o-Alaikum! 🏡 Check out this verified property opportunity in ${prop.area}, ${prop.city}:
*${prop.title}*
💰 Price: ${prop.formattedPrice}
📐 Size: ${prop.areaSize}
⭐ Verified by BIZSHARE Real Estate Network.

Inquire directly or schedule a site inspection via my official link:
👉 ${shareUrl}`;

  const handleCopyLink = () => {
    trackShareAction(prop.id, 'clipboard');
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    trackShareAction(prop.id, 'whatsapp');
    const waUrl = `https://wa.me/?text=${encodeURIComponent(defaultShareMessage)}`;
    window.open(waUrl, '_blank');
  };

  const handleFacebookShare = () => {
    trackShareAction(prop.id, 'facebook');
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(fbUrl, '_blank');
  };

  const handleInstagramShare = () => {
    trackShareAction(prop.id, 'instagram');
    navigator.clipboard.writeText(defaultShareMessage);
    alert('Caption & Link copied to clipboard! Open Instagram and paste in your Story or Post.');
  };

  const handleOpenPoster = () => {
    const currentProp = prop;
    setShareModalProperty(null);
    setPosterModalProperty(currentProp);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0B3D91] text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/10 rounded-lg">
              <Share2 className="w-5 h-5 text-[#F4B400]" />
            </div>
            <div>
              <h3 className="font-bold text-base">Share & Earn Referral Reward</h3>
              <p className="text-xs text-slate-300">Tracked with your code: <span className="font-mono text-[#F4B400] font-bold">{promoCode}</span></p>
            </div>
          </div>
          <button 
            onClick={() => setShareModalProperty(null)}
            className="p-1.5 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Property Brief */}
        <div className="p-6 space-y-5">
          <div className="flex gap-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <img 
              src={prop.images[0]} 
              alt={prop.title}
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-lg object-cover shrink-0" 
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{prop.title}</h4>
              <p className="text-xs text-slate-500 mt-0.5">{prop.area}</p>
              <div className="text-sm font-extrabold text-[#0B3D91] mt-1">{prop.formattedPrice}</div>
              <div className="mt-1 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                <span>Earn Commission:</span>
                <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-mono">{prop.referralRewardDisplay}</span>
              </div>
            </div>
          </div>

          {/* Unique Referral Link */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Your Unique Referral Link
            </label>
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                readOnly 
                value={shareUrl}
                className="w-full text-xs font-mono bg-slate-100 border border-slate-300 rounded-lg px-3 py-2 text-slate-700 select-all focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 bg-[#0B3D91] hover:bg-[#082a66] text-white text-xs font-bold rounded-lg shrink-0 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-[#F4B400]" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Inquiries submitted through this link will be automatically attributed to your promoter ID.
            </p>
          </div>

          {/* Social Channels */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Share Instantly on Social Media
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                onClick={handleWhatsAppShare}
                className="flex flex-col items-center justify-center p-3 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs transition-colors cursor-pointer gap-1.5"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                <span>WhatsApp</span>
              </button>
              
              <button
                onClick={handleFacebookShare}
                className="flex flex-col items-center justify-center p-3 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold text-xs transition-colors cursor-pointer gap-1.5"
              >
                <Facebook className="w-5 h-5 text-blue-600" />
                <span>Facebook</span>
              </button>

              <button
                onClick={handleInstagramShare}
                className="flex flex-col items-center justify-center p-3 rounded-xl border border-pink-200 bg-pink-50 hover:bg-pink-100 text-pink-800 font-bold text-xs transition-colors cursor-pointer gap-1.5"
              >
                <Instagram className="w-5 h-5 text-pink-600" />
                <span>Instagram</span>
              </button>
            </div>
          </div>

          {/* Branded Poster Generation */}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={handleOpenPoster}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#0B3D91] to-[#124cb1] text-white hover:opacity-95 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <QrCode className="w-4 h-4 text-[#F4B400]" />
              <span>Generate Branded Promotional Poster with QR</span>
            </button>
            <p className="text-center text-[11px] text-slate-500 mt-1.5">
              Generates high-resolution branded poster ready for WhatsApp status & Facebook groups.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

import React, { useRef, useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Download, Share2, Check, RefreshCw, Sparkles, AlertCircle } from 'lucide-react';

export const PosterGeneratorModal: React.FC = () => {
  const { 
    posterModalProperty, 
    setPosterModalProperty, 
    currentUser, 
    trackShareAction 
  } = useApp();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const prop = posterModalProperty;

  useEffect(() => {
    if (!prop) return;

    setIsGenerating(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas size (high-res portrait for Instagram/WhatsApp story: 800 x 1050)
    const width = 800;
    const height = 1050;
    canvas.width = width;
    canvas.height = height;

    // Load Property Image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = prop.images[0];

    img.onload = () => {
      renderPoster(ctx, width, height, img);
      setIsGenerating(false);
    };

    img.onerror = () => {
      // Fallback with clean gradient if image fails
      renderPoster(ctx, width, height, null);
      setIsGenerating(false);
    };

  }, [prop, currentUser]);

  const renderPoster = (
    ctx: CanvasRenderingContext2D, 
    width: number, 
    height: number, 
    propImg: HTMLImageElement | null
  ) => {
    if (!prop) return;

    const promoCode = currentUser.referralCode || 'BS1025';

    // 1. Background fill
    ctx.fillStyle = '#0B3D91';
    ctx.fillRect(0, 0, width, height);

    // Subtle header gradient
    const grad = ctx.createLinearGradient(0, 0, width, 180);
    grad.addColorStop(0, '#06255B');
    grad.addColorStop(1, '#0B3D91');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, 160);

    // 2. Brand Header
    // Logo Icon box
    ctx.fillStyle = '#F4B400';
    ctx.beginPath();
    ctx.roundRect(40, 36, 60, 60, 12);
    ctx.fill();

    // Icon detail
    ctx.fillStyle = '#0B3D91';
    ctx.font = 'bold 32px Plus Jakarta Sans, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('B', 70, 78);

    // Brand Name
    ctx.textAlign = 'left';
    ctx.font = '800 38px Plus Jakarta Sans, sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('BIZ', 115, 68);
    ctx.fillStyle = '#F4B400';
    ctx.fillText('SHARE', 182, 68);

    // Tagline
    ctx.font = '600 13px Manrope, sans-serif';
    ctx.fillStyle = '#CBD5E1';
    ctx.letterSpacing = '1px';
    ctx.fillText('A PLATFORM OF MUTUAL WORKING', 116, 92);

    // Top Right verified badge
    ctx.fillStyle = '#10B981';
    ctx.beginPath();
    ctx.roundRect(width - 240, 48, 200, 38, 19);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 13px Manrope, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✓ VERIFIED LISTING', width - 140, 72);

    // 3. Property Image Card
    const cardX = 40;
    const cardY = 130;
    const cardW = width - 80;
    const cardH = 430;

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, 20);
    ctx.clip();

    if (propImg) {
      // Cover fit image
      const imgRatio = propImg.width / propImg.height;
      const cardRatio = cardW / cardH;
      let sx, sy, sw, sh;
      if (imgRatio > cardRatio) {
        sh = propImg.height;
        sw = sh * cardRatio;
        sx = (propImg.width - sw) / 2;
        sy = 0;
      } else {
        sw = propImg.width;
        sh = sw / cardRatio;
        sx = 0;
        sy = (propImg.height - sh) / 2;
      }
      ctx.drawImage(propImg, sx, sy, sw, sh, cardX, cardY, cardW, cardH);
    } else {
      ctx.fillStyle = '#1E293B';
      ctx.fillRect(cardX, cardY, cardW, cardH);
    }

    // Gradient scrim at bottom of image
    const scrim = ctx.createLinearGradient(0, cardY + 250, 0, cardY + cardH);
    scrim.addColorStop(0, 'rgba(0,0,0,0)');
    scrim.addColorStop(1, 'rgba(0,0,0,0.85)');
    ctx.fillStyle = scrim;
    ctx.fillRect(cardX, cardY + 200, cardW, cardH - 200);

    // Category chip on image
    ctx.fillStyle = 'rgba(11, 61, 145, 0.9)';
    ctx.beginPath();
    ctx.roundRect(cardX + 24, cardY + 24, 150, 36, 18);
    ctx.fill();
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 13px Manrope, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(prop.category.toUpperCase(), cardX + 99, cardY + 47);

    // Area Size on image bottom
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 18px Manrope, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`📐 ${prop.areaSize}`, cardX + 24, cardY + cardH - 24);

    ctx.restore();

    // 4. White Content Board below
    const boardY = 580;
    const boardH = 430;
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.roundRect(cardX, boardY, cardW, boardH, 20);
    ctx.fill();

    // Property Title
    ctx.textAlign = 'left';
    ctx.fillStyle = '#0F172A';
    ctx.font = '800 24px Plus Jakarta Sans, sans-serif';
    // Multi-line wrap title
    const words = prop.title.split(' ');
    let line = '';
    let currentY = boardY + 45;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > cardW - 60 && n > 0) {
        ctx.fillText(line, cardX + 30, currentY);
        line = words[n] + ' ';
        currentY += 32;
        if (currentY > boardY + 80) break; // limit lines
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, cardX + 30, currentY);

    // Location
    ctx.font = '600 15px Manrope, sans-serif';
    ctx.fillStyle = '#475569';
    ctx.fillText(`📍 ${prop.area}, ${prop.city}`, cardX + 30, currentY + 30);

    // Price Pill / Box
    const priceY = currentY + 54;
    ctx.fillStyle = '#0B3D91';
    ctx.beginPath();
    ctx.roundRect(cardX + 30, priceY, 320, 56, 12);
    ctx.fill();

    ctx.fillStyle = '#F4B400';
    ctx.font = '600 12px Manrope, sans-serif';
    ctx.fillText('DEMAND / ASKING PRICE', cardX + 46, priceY + 22);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 22px Plus Jakarta Sans, sans-serif';
    ctx.fillText(prop.formattedPrice, cardX + 46, priceY + 46);

    // Divider
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cardX + 30, priceY + 76);
    ctx.lineTo(cardX + cardW - 30, priceY + 76);
    ctx.stroke();

    // 5. Promoter Referral & QR Section
    const footerY = priceY + 95;

    // QR Simulated Code Pattern
    const qrSize = 100;
    const qrX = cardX + cardW - 130;
    const qrY = footerY;

    ctx.fillStyle = '#0B3D91';
    ctx.beginPath();
    ctx.roundRect(qrX, qrY, qrSize, qrSize, 8);
    ctx.fill();

    // Draw stylized QR squares inside
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(qrX + 6, qrY + 6, qrSize - 12, qrSize - 12);

    ctx.fillStyle = '#0B3D91';
    // Top-left finder
    ctx.fillRect(qrX + 14, qrY + 14, 24, 24);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(qrX + 18, qrY + 18, 16, 16);
    ctx.fillStyle = '#0B3D91';
    ctx.fillRect(qrX + 22, qrY + 22, 8, 8);

    // Top-right finder
    ctx.fillRect(qrX + qrSize - 38, qrY + 14, 24, 24);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(qrX + qrSize - 34, qrY + 18, 16, 16);
    ctx.fillStyle = '#0B3D91';
    ctx.fillRect(qrX + qrSize - 30, qrY + 22, 8, 8);

    // Bottom-left finder
    ctx.fillRect(qrX + 14, qrY + qrSize - 38, 24, 24);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(qrX + 18, qrY + qrSize - 34, 16, 16);
    ctx.fillStyle = '#0B3D91';
    ctx.fillRect(qrX + 22, qrY + qrSize - 30, 8, 8);

    // Matrix dots
    ctx.fillRect(qrX + 46, qrY + 20, 6, 6);
    ctx.fillRect(qrX + 54, qrY + 32, 6, 6);
    ctx.fillRect(qrX + 46, qrY + 44, 6, 6);
    ctx.fillRect(qrX + 60, qrY + 54, 6, 6);
    ctx.fillRect(qrX + 40, qrY + 66, 6, 6);
    ctx.fillRect(qrX + 56, qrY + 76, 6, 6);

    // Promoter attribution info text
    ctx.textAlign = 'left';
    ctx.font = '600 12px Manrope, sans-serif';
    ctx.fillStyle = '#64748B';
    ctx.fillText('OFFICIAL BIZSHARE PROMOTER', cardX + 30, footerY + 20);

    ctx.font = '800 18px Plus Jakarta Sans, sans-serif';
    ctx.fillStyle = '#0B3D91';
    ctx.fillText(currentUser.fullName, cardX + 30, footerY + 44);

    ctx.font = '700 13px Manrope, sans-serif';
    ctx.fillStyle = '#F4B400';
    ctx.fillText(`Referral Code: ${promoCode}`, cardX + 30, footerY + 68);

    ctx.font = '500 11px Manrope, sans-serif';
    ctx.fillStyle = '#64748B';
    ctx.fillText('Scan QR to verify documents & schedule visit', cardX + 30, footerY + 92);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas || !prop) return;

    trackShareAction(prop.id, 'poster_download');
    const imageURI = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `BIZSHARE-${prop.slug}-${currentUser.referralCode || 'BS1025'}.png`;
    link.href = imageURI;
    link.click();

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleWhatsAppShare = () => {
    if (!prop) return;
    trackShareAction(prop.id, 'poster_whatsapp');
    const promoCode = currentUser.referralCode || 'BS1025';
    const shareUrl = `${window.location.origin}/?property=${prop.slug}&ref=${promoCode}`;
    const text = `Assalam-o-Alaikum! 🏡 Check out this verified property poster for ${prop.title} in ${prop.area}: Price: ${prop.formattedPrice}. Open link to view details: ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (!prop) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-4"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0B3D91] text-white">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#F4B400]" />
            <div>
              <h3 className="font-bold text-base">Promotional Poster Studio</h3>
              <p className="text-xs text-slate-300">Auto-generated with your personal referral QR</p>
            </div>
          </div>
          <button 
            onClick={() => setPosterModalProperty(null)}
            className="p-1.5 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Poster Canvas Preview */}
        <div className="p-6 bg-slate-100 flex flex-col items-center">
          <div className="relative max-w-xs sm:max-w-sm rounded-xl overflow-hidden shadow-2xl border border-slate-300">
            {isGenerating && (
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex flex-col items-center justify-center text-white gap-2">
                <RefreshCw className="w-6 h-6 animate-spin text-[#F4B400]" />
                <span className="text-xs font-semibold">Rendering high-res poster...</span>
              </div>
            )}
            <canvas 
              ref={canvasRef} 
              className="w-full h-auto block"
            />
          </div>

          <p className="text-xs text-slate-500 mt-3 text-center">
            Poster includes property highlights, asking price, and your trackable QR code.
          </p>
        </div>

        {/* Action Controls */}
        <div className="p-6 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => setPosterModalProperty(null)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-xs cursor-pointer"
          >
            Close
          </button>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handleWhatsAppShare}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Link</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#F4B400] hover:bg-[#db9f00] text-[#0B3D91] font-extrabold text-xs shadow-md transition-colors cursor-pointer"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-800" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Poster (PNG)</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

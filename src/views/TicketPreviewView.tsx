import React, { useRef, useState } from 'react';
import { ArrowLeft, Share2, Download, ShieldAlert, Sparkles, CheckCircle2, Clock, Check } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { QRCodePlaceholder } from '../components/QRCodePlaceholder';

export const TicketPreviewView: React.FC = () => {
  const { currentTicketToPreview, userTickets, setBookingStep, setActiveTab, getSelectedEvent } = useAppStore();
  const event = getSelectedEvent();
  const [downloaded, setDownloaded] = useState(false);

  const ticket = currentTicketToPreview || userTickets[0] || {
    ticketId: 'DSG-KBS-8942',
    eventId: event.id,
    eventTitle: event.title,
    eventDate: event.date,
    eventTime: event.time,
    venue: `${event.venue}, ${event.city}`,
    city: event.city,
    attendeeName: 'Pooja Deshmukh',
    attendeePhone: '+91 98765 43210',
    attendeeEmail: 'pooja@example.com',
    ticketType: 'Premium Pass',
    amountPaid: event.registrationFee,
    status: 'Pending Verification',
    bookedAt: 'Today',
    qrCodeValue: 'BOOKANEVENT-DSG-KBS-8942'
  };

  const [shared, setShared] = useState(false);

  const handleShare = async () => {
    const textToShare = `🎟️ Event Pass: ${ticket.eventTitle}\nID: ${ticket.ticketId}\nAttendee: ${ticket.attendeeName}\nDate: ${ticket.eventDate}\nVenue: ${ticket.venue}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Event Pass: ${ticket.eventTitle}`,
          text: textToShare,
          url: window.location.href,
        });
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }
    
    try {
      await navigator.clipboard.writeText(textToShare);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    } catch (e) {
      alert(`Ticket Details:\n${textToShare}`);
    }
  };

  const handleDownloadImage = () => {
    // Generate an image representation via SVG canvas / Data URL download
      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 540;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Draw background
        ctx.fillStyle = '#1D1D1F';
        ctx.fillRect(0, 0, 600, 540);
      
      // Header banner
      ctx.fillStyle = '#1E293B';
      ctx.fillRect(0, 0, 600, 200);
      
      // Branding
      ctx.fillStyle = '#2563EB';
      ctx.fillRect(40, 30, 50, 50);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText('B', 56, 64);
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText('BookAnEvent Pass', 105, 62);
      
      // Ticket details
      ctx.fillStyle = '#94A3B8';
      ctx.font = '14px sans-serif';
      ctx.fillText('EVENT', 40, 130);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText(ticket.eventTitle, 40, 165);
      
      // Attendee details
      ctx.fillStyle = '#94A3B8';
      ctx.font = '14px sans-serif';
      ctx.fillText('ATTENDEE NAME', 40, 250);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText(ticket.attendeeName, 40, 280);
      
      ctx.fillStyle = '#94A3B8';
      ctx.font = '14px sans-serif';
      ctx.fillText('PASS ID', 350, 250);
      ctx.fillStyle = '#60A5FA';
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText(ticket.ticketId, 350, 280);
      
      ctx.fillStyle = '#94A3B8';
      ctx.font = '14px sans-serif';
      ctx.fillText('DATE & TIME', 40, 340);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText(`${ticket.eventDate} (${ticket.eventTime})`, 40, 370);
      
      ctx.fillStyle = '#94A3B8';
      ctx.font = '14px sans-serif';
      ctx.fillText('VENUE', 40, 430);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText(ticket.venue, 40, 460);



      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `Ticket_${ticket.ticketId}.png`;
      link.href = dataUrl;
      link.click();

      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    }
  };

  return (
    <div className="pb-32 space-y-5 animate-fadeIn max-w-md mx-auto px-4 pt-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            setActiveTab('tickets');
            setBookingStep('event-details');
          }}
          aria-label="Back"
          className="p-2 rounded-full bg-white border border-[#EAEAEA] text-[#1D1D1F] active:scale-90 transition-transform"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <h2 className="font-heading font-bold text-base text-[#1D1D1F]">
            Digital Pass
          </h2>
          <p className="font-body text-[10px] text-[#6E6E73] font-num uppercase tracking-wider">
            Verified Event Entry
          </p>
        </div>
        <div className="relative">
          <button
            onClick={handleShare}
            aria-label="Share ticket"
            className="p-2 rounded-full bg-white border border-[#EAEAEA] text-[#1D1D1F] active:scale-90 transition-transform flex items-center justify-center"
          >
            {shared ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
          </button>
          {shared && (
            <span className="absolute top-10 right-0 bg-[#1D1D1F] text-white text-[10px] px-2 py-1 rounded shadow-md whitespace-nowrap z-30">
              Copied!
            </span>
          )}
        </div>
      </div>

      {/* DIGITAL WALLET PASS CARD */}
      <div className="relative rounded-[32px] bg-[#1D1D1F] text-white overflow-hidden shadow-2xl border border-gray-800">
        {/* Pass Top Banner */}
        <div className="relative h-36 bg-gradient-to-r from-blue-900 via-indigo-900 to-black overflow-hidden">
          <img
            src={event.bannerImage}
            alt={ticket.eventTitle}
            className="w-full h-full object-cover opacity-50 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1F] via-transparent to-transparent" />

          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-md text-white font-heading font-bold text-xs flex items-center justify-center border border-white/20">
                DSG
              </div>
              <span className="font-heading font-bold text-xs tracking-wide text-white">BookAnEvent</span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-[10px] font-num font-semibold text-blue-300 border border-white/10">
              {ticket.ticketType}
            </span>
          </div>

          <div className="absolute bottom-2 left-4 right-4">
            <span className="text-[9px] text-gray-400 font-num uppercase tracking-wider block">Event</span>
            <h3 className="font-heading font-extrabold text-lg text-white truncate">{ticket.eventTitle}</h3>
          </div>
        </div>

        {/* Circular Cutouts for Ticket Stub Feel */}
        <div className="relative flex items-center justify-between my-2 px-1">
          <div className="w-5 h-8 bg-[#FAFAFA] rounded-r-full border-r border-[#EAEAEA] -ml-1" />
          <div className="flex-1 border-b-2 border-dashed border-gray-700 mx-2" />
          <div className="w-5 h-8 bg-[#FAFAFA] rounded-l-full border-l border-[#EAEAEA] -mr-1" />
        </div>

        {/* Pass Details Grid */}
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3 font-num">
            <div>
              <span className="text-[9px] text-gray-400 uppercase tracking-wider block">Attendee Name</span>
              <p className="font-bold text-sm text-white truncate">{ticket.attendeeName}</p>
            </div>
            <div>
              <span className="text-[9px] text-gray-400 uppercase tracking-wider block">Pass ID</span>
              <p className="font-bold text-sm text-blue-400 font-num">{ticket.ticketId}</p>
            </div>

            <div className="col-span-2">
              <span className="text-[9px] text-gray-400 uppercase tracking-wider block">Date & Time</span>
              <p className="font-medium text-xs text-gray-200">{ticket.eventDate} ({ticket.eventTime})</p>
            </div>
          </div>

          <div>
            <span className="text-[9px] text-gray-400 uppercase tracking-wider block">Venue & Location</span>
            <p className="font-medium text-xs text-gray-200">{ticket.venue}</p>
          </div>

          {/* Status Badge */}
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
            <span className="text-[10px] text-gray-400 font-num uppercase">Verification Status</span>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold">
              <Clock className="w-3.5 h-3.5 animate-spin-slow text-amber-400" />
              <span>{ticket.status}</span>
            </div>
          </div>


        </div>
      </div>



      {/* Action Buttons: Download Ticket Image */}
      <div className="space-y-2 pt-1">
        <button
          onClick={handleDownloadImage}
          className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-heading font-semibold text-xs flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md"
        >
          {downloaded ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>Ticket Image Saved!</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Download Ticket Image</span>
            </>
          )}
        </button>

        <button
          onClick={() => {
            setActiveTab('tickets');
          }}
          className="w-full py-3 rounded-2xl bg-[#1D1D1F] text-white font-heading font-medium text-xs active:scale-98 transition-transform"
        >
          View All Saved Tickets
        </button>
      </div>
    </div>
  );
};

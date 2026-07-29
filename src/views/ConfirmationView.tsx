import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Ticket, Home, MessageCircle, ShieldCheck } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const ConfirmationView: React.FC = () => {
  const { setBookingStep, setActiveTab, currentTicketToPreview, getSelectedEvent } = useAppStore();
  const event = getSelectedEvent();

  useEffect(() => {
    // Fire celebratory confetti on mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563EB', '#22C55E', '#1D1D1F', '#F59E0B']
      });
    } catch (e) {
      // fallback
    }
  }, []);

  const handleViewTicket = () => {
    setBookingStep('ticket-preview');
  };

  const handleReturnHome = () => {
    setActiveTab('home');
    setBookingStep('event-details');
  };

  return (
    <div className="pb-32 space-y-6 animate-fadeIn max-w-md mx-auto px-4 pt-6 text-center">
      {/* Animated Checkmark Circle */}
      <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-25" />
        <div className="w-20 h-20 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg relative z-10">
          <CheckCircle2 className="w-12 h-12" />
        </div>
      </div>

      {/* Main Success Message */}
      <div className="space-y-2">
        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold font-num uppercase tracking-wider">
          Verification Request Received
        </span>
        <h2 className="font-heading font-extrabold text-2xl text-[#1D1D1F]">
          Registration Submitted Successfully
        </h2>
        <p className="font-body text-xs text-[#6E6E73] max-w-xs mx-auto leading-relaxed">
          Our team will verify your payment shortly. Your verified event ticket will be shared with you via WhatsApp after successful verification.
        </p>
      </div>

      {/* Ticket Brief Details Card */}
      {currentTicketToPreview && (
        <div className="ios-card p-4 bg-[#FAFAFA] border border-[#EAEAEA] text-left space-y-2">
          <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-2">
            <span className="text-[10px] text-[#6E6E73] font-num uppercase">Registration ID</span>
            <span className="font-num font-bold text-xs text-blue-600">{currentTicketToPreview.ticketId}</span>
          </div>
          <div className="space-y-1 text-xs">
            <p className="font-heading font-semibold text-[#1D1D1F]">{currentTicketToPreview.eventTitle}</p>
            <p className="font-body text-[#6E6E73] text-[11px]">{currentTicketToPreview.eventDate} • {currentTicketToPreview.venue}</p>
            <p className="font-body text-[#6E6E73] text-[11px]">Attendee: <strong className="text-[#1D1D1F]">{currentTicketToPreview.attendeeName}</strong></p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-2.5 pt-2">
        <button
          onClick={handleViewTicket}
          className="w-full py-4 rounded-2xl bg-blue-600 text-white font-heading font-bold text-sm shadow-lg hover:bg-blue-700 active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <Ticket className="w-4 h-4" />
          <span>View Ticket Preview</span>
        </button>

        <button
          onClick={handleReturnHome}
          className="w-full py-3.5 rounded-2xl bg-white border border-[#EAEAEA] text-[#1D1D1F] font-heading font-medium text-xs hover:bg-gray-50 active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4 text-[#6E6E73]" />
          <span>Return Home</span>
        </button>
      </div>

      <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#6E6E73]">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
        <span>Powered by DSG Engine Ticket Verification System</span>
      </div>
    </div>
  );
};

import React from 'react';
import { ArrowLeft, MessageSquare, ShieldAlert, CheckCircle2, Send, ArrowRight } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { UserTicket } from '../types';

export const WhatsAppVerificationView: React.FC = () => {
  const { setBookingStep, bookingData, getSelectedEvent, addTicket } = useAppStore();
  const event = getSelectedEvent();

  const phone = event.whatsappNumber || '919876543210';
  const messageText = `Hello,

I have completed my payment for ${event.title}.

Name: ${bookingData.fullName || 'Valued Guest'}
Phone: +91 ${bookingData.mobileNumber || ''}
Email: ${bookingData.emailAddress || ''}

I have attached my payment screenshot for verification.

Thank you.`;

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(messageText)}`;

  const handleOpenWhatsApp = () => {
    window.open(whatsappUrl, '_blank');
  };

  const handleSentScreenshot = () => {
    // Generate new ticket in state store
    const randomTicketId = `DSG-KBS-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTicket: UserTicket = {
      ticketId: randomTicketId,
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
      eventTime: event.time,
      venue: `${event.venue}, ${event.city}`,
      city: event.city,
      attendeeName: bookingData.fullName || 'Guest Attendee',
      attendeePhone: `+91 ${bookingData.mobileNumber}`,
      attendeeEmail: bookingData.emailAddress,
      seat: `VIP-${String.fromCharCode(65 + Math.floor(Math.random() * 5))}-${Math.floor(1 + Math.random() * 30)}`,
      ticketType: bookingData.ticketType || 'Premium Pass',
      amountPaid: event.registrationFee,
      status: 'Pending Verification',
      bookedAt: 'Just now',
      qrCodeValue: `BOOKANEVENT-${randomTicketId}-${bookingData.fullName.toUpperCase().replace(/\s+/g, '-')}`
    };

    addTicket(newTicket);
    setBookingStep('confirmation');
  };

  return (
    <div className="pb-32 space-y-5 animate-fadeIn max-w-md mx-auto px-4 pt-2">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setBookingStep('payment')}
          aria-label="Back to payment"
          className="p-2 rounded-full bg-white border border-[#EAEAEA] text-[#1D1D1F] active:scale-90 transition-transform"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="font-heading font-bold text-lg text-[#1D1D1F]">
            Verification Step
          </h2>
          <p className="font-body text-xs text-[#6E6E73]">
            Fast WhatsApp Payment Approval
          </p>
        </div>
      </div>

      {/* Instructions Card */}
      <div className="ios-card p-5 space-y-4 text-center">
        <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
          <MessageSquare className="w-8 h-8" />
        </div>

        <div>
          <h3 className="font-heading font-extrabold text-xl text-[#1D1D1F]">
            Send Payment Screenshot
          </h3>
          <p className="font-body text-xs text-[#6E6E73] mt-1.5 leading-relaxed">
            Upload your UPI payment receipt directly on WhatsApp. Our verification engine approves your ticket in under 15 minutes!
          </p>
        </div>

        {/* Pre-filled Message Preview Box */}
        <div className="p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#EAEAEA] text-left space-y-1">
          <span className="text-[10px] text-emerald-600 font-bold uppercase font-num block">
            Pre-filled WhatsApp Message
          </span>
          <pre className="font-body text-[11px] text-[#1D1D1F] whitespace-pre-wrap leading-tight bg-white p-2.5 rounded-xl border border-gray-200">
            {messageText}
          </pre>
        </div>

        {/* Main WhatsApp CTA */}
        <button
          onClick={handleOpenWhatsApp}
          className="w-full py-4 rounded-2xl bg-emerald-600 text-white font-heading font-bold text-sm shadow-lg hover:bg-emerald-700 active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          <span>Send Screenshot on WhatsApp</span>
        </button>
      </div>

      {/* Secondary Confirmation Card */}
      <div className="ios-card p-5 space-y-3">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-heading font-semibold text-xs text-[#1D1D1F]">
              Already sent the screenshot?
            </h4>
            <p className="font-body text-[11px] text-[#6E6E73] mt-0.5">
              Click below to view your Apple Wallet style ticket preview right away.
            </p>
          </div>
        </div>

        <button
          onClick={handleSentScreenshot}
          className="w-full py-3 rounded-2xl bg-[#1D1D1F] text-white font-heading font-medium text-xs hover:bg-gray-800 active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <span>I've Sent the Screenshot</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ArrowLeft, Copy, Check, ExternalLink, ShieldCheck, QrCode, ArrowRight } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { QRCodePlaceholder } from '../components/QRCodePlaceholder';

export const PaymentView: React.FC = () => {
  const { setBookingStep, bookingData, getSelectedEvent } = useAppStore();
  const event = getSelectedEvent();
  const [copied, setCopied] = useState(false);

  const upiId = event.upiId || 'dsg.events@okicici';
  const amount = event.registrationFee;
  const note = `Booking for ${event.title}`;

  // Standard UPI Deep Link URI Format
  const upiDeepLink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent('BookAnEvent DSG')}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenUpiApp = (appName: string) => {
    // Attempt to launch UPI deep link
    window.location.href = upiDeepLink;
  };

  const handlePaymentCompleted = () => {
    setBookingStep('whatsapp-verification');
  };

  return (
    <div className="pb-32 space-y-5 animate-fadeIn max-w-md mx-auto px-4 pt-2">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setBookingStep('booking-form')}
          aria-label="Back to booking form"
          className="p-2 rounded-full bg-white border border-[#EAEAEA] text-[#1D1D1F] active:scale-90 transition-transform"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="font-heading font-bold text-lg text-[#1D1D1F]">
            UPI Payment
          </h2>
          <p className="font-body text-xs text-[#6E6E73]">
            Scan QR or select your preferred UPI App
          </p>
        </div>
      </div>

      {/* Payment Amount Card */}
      <div className="ios-card p-4 bg-[#1D1D1F] text-white flex items-center justify-between shadow-lg">
        <div>
          <p className="font-body text-[11px] text-gray-400 uppercase tracking-wider font-num">Total Amount Payable</p>
          <h3 className="font-heading font-extrabold text-2xl text-white font-num mt-0.5">
            {event.currency}{amount}
          </h3>
          <p className="font-body text-[10px] text-blue-400 mt-0.5">Attendee: {bookingData.fullName || 'Guest'}</p>
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-xs font-semibold text-emerald-400 font-num">
          0% Gateway Fee
        </div>
      </div>

      {/* Official Merchant UPI ID Card */}
      <div className="ios-card p-4 space-y-3">
        <div className="p-3.5 rounded-2xl bg-[#FAFAFA] border border-[#EAEAEA] flex items-center justify-between gap-2">
          <div className="text-left min-w-0">
            <span className="text-[10px] text-[#6E6E73] font-num block uppercase">Official Merchant UPI ID</span>
            <p className="font-num font-bold text-xs text-[#1D1D1F] truncate">{upiId}</p>
          </div>
          <button
            onClick={handleCopyUPI}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-white border border-[#EAEAEA] text-[#1D1D1F] hover:bg-gray-50 active:scale-95'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-blue-600" />
                <span>Copy UPI</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Direct UPI App Launch Buttons */}
      <div className="ios-card p-5 space-y-3">
        <h3 className="font-heading font-semibold text-xs text-[#1D1D1F] uppercase tracking-wider text-center">
          Or Pay Directly via Mobile App
        </h3>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => handleOpenUpiApp('Google Pay')}
            className="p-3 rounded-2xl bg-[#FAFAFA] border border-[#EAEAEA] hover:border-blue-500 hover:bg-white active:scale-95 transition-all flex items-center gap-2.5 text-left"
          >
            <div className="w-7 h-7 rounded-xl bg-white border border-gray-200 flex items-center justify-center font-bold text-blue-600 text-xs shadow-2xs">
              G
            </div>
            <div>
              <p className="font-heading font-semibold text-xs text-[#1D1D1F]">Google Pay</p>
              <p className="text-[9px] text-[#6E6E73]">Instant launch</p>
            </div>
          </button>

          <button
            onClick={() => handleOpenUpiApp('PhonePe')}
            className="p-3 rounded-2xl bg-[#FAFAFA] border border-[#EAEAEA] hover:border-purple-500 hover:bg-white active:scale-95 transition-all flex items-center gap-2.5 text-left"
          >
            <div className="w-7 h-7 rounded-xl bg-purple-100 border border-purple-200 text-purple-700 flex items-center justify-center font-bold text-xs shadow-2xs">
              P
            </div>
            <div>
              <p className="font-heading font-semibold text-xs text-[#1D1D1F]">PhonePe</p>
              <p className="text-[9px] text-[#6E6E73]">Instant launch</p>
            </div>
          </button>

          <button
            onClick={() => handleOpenUpiApp('Paytm')}
            className="p-3 rounded-2xl bg-[#FAFAFA] border border-[#EAEAEA] hover:border-sky-500 hover:bg-white active:scale-95 transition-all flex items-center gap-2.5 text-left"
          >
            <div className="w-7 h-7 rounded-xl bg-sky-100 border border-sky-200 text-sky-700 flex items-center justify-center font-bold text-xs shadow-2xs">
              Py
            </div>
            <div>
              <p className="font-heading font-semibold text-xs text-[#1D1D1F]">Paytm</p>
              <p className="text-[9px] text-[#6E6E73]">Instant launch</p>
            </div>
          </button>

          <button
            onClick={() => handleOpenUpiApp('Any UPI App')}
            className="p-3 rounded-2xl bg-[#FAFAFA] border border-[#EAEAEA] hover:border-emerald-500 hover:bg-white active:scale-95 transition-all flex items-center gap-2.5 text-left"
          >
            <div className="w-7 h-7 rounded-xl bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold text-xs shadow-2xs">
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="font-heading font-semibold text-xs text-[#1D1D1F]">Other UPI</p>
              <p className="text-[9px] text-[#6E6E73]">Any UPI App</p>
            </div>
          </button>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#6E6E73] pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Encrypted peer-to-peer UPI transaction</span>
        </div>
      </div>

      {/* Sticky Bottom CTA for "I've Completed Payment" */}
      <div className="fixed bottom-4 left-0 right-0 z-30 px-4 pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto">
          <button
            onClick={handlePaymentCompleted}
            className="w-full py-4 rounded-2xl bg-emerald-600 text-white font-heading font-bold text-sm shadow-xl hover:bg-emerald-700 active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <span>I've Completed Payment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

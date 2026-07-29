import React, { useState } from 'react';
import { ArrowLeft, User, Phone, Mail, MapPin, Briefcase, Ticket, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const BookingView: React.FC = () => {
  const { bookingData, setBookingData, setBookingStep, getSelectedEvent } = useAppStore();
  const event = getSelectedEvent();

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!bookingData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!bookingData.mobileNumber.trim() || bookingData.mobileNumber.length < 10) {
      newErrors.mobileNumber = 'Valid 10-digit mobile number is required';
    }
    if (bookingData.emailAddress.trim() && !bookingData.emailAddress.includes('@')) {
      newErrors.emailAddress = 'Please enter a valid email address';
    }
    if (!bookingData.city.trim()) newErrors.city = 'City is required';
    if (!bookingData.profession.trim()) newErrors.profession = 'Profession is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setBookingStep('payment');
    }
  };

  return (
    <div className="pb-32 space-y-5 animate-fadeIn max-w-md mx-auto px-4 pt-2">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setBookingStep('event-details')}
          aria-label="Back to details"
          className="p-2 rounded-full bg-white border border-[#EAEAEA] text-[#1D1D1F] active:scale-90 transition-transform"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="font-heading font-bold text-lg text-[#1D1D1F]">
            Attendee Details
          </h2>
          <p className="font-body text-xs text-[#6E6E73]">
            {event.title}
          </p>
        </div>
      </div>

      {/* Ticket Summary Card */}
      <div className="ios-card p-4 bg-gradient-to-r from-blue-50/50 via-white to-white border border-blue-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0">
            <Ticket className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-blue-600 font-bold uppercase font-num">Selected Pass</span>
            <h4 className="font-heading font-bold text-sm text-[#1D1D1F]">{bookingData.ticketType}</h4>
            <p className="font-body text-[11px] text-[#6E6E73]">{event.date} • {event.venue}</p>
          </div>
        </div>
        <div className="text-right font-num">
          <span className="font-extrabold text-lg text-[#1D1D1F]">{event.currency}{event.registrationFee}</span>
        </div>
      </div>

      {/* Form Card */}
      <form onSubmit={handleContinue} className="ios-card p-5 space-y-4">
        <h3 className="font-heading font-semibold text-sm text-[#1D1D1F] border-b border-[#EAEAEA] pb-2">
          Personal Information
        </h3>

        {/* Full Name */}
        <div className="space-y-1">
          <label className="font-heading text-xs font-medium text-[#1D1D1F] flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-blue-600" />
            <span>Full Name *</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Pooja Deshmukh"
            value={bookingData.fullName}
            onChange={(e) => setBookingData({ fullName: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl bg-[#FAFAFA] border border-[#EAEAEA] text-xs font-medium text-[#1D1D1F] focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
          />
          {errors.fullName && <p className="text-[10px] text-red-500">{errors.fullName}</p>}
        </div>

        {/* Mobile Number */}
        <div className="space-y-1">
          <label className="font-heading text-xs font-medium text-[#1D1D1F] flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-blue-600" />
            <span>Mobile Number (WhatsApp) *</span>
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3.5 text-xs text-[#6E6E73] font-num font-semibold">+91</span>
            <input
              type="tel"
              placeholder="9876543210"
              maxLength={10}
              value={bookingData.mobileNumber}
              onChange={(e) => setBookingData({ mobileNumber: e.target.value.replace(/\D/g, '') })}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-[#FAFAFA] border border-[#EAEAEA] text-xs font-medium font-num text-[#1D1D1F] focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
            />
          </div>
          {errors.mobileNumber && <p className="text-[10px] text-red-500">{errors.mobileNumber}</p>}
        </div>

        {/* Email Address */}
        <div className="space-y-1">
          <label className="font-heading text-xs font-medium text-[#1D1D1F] flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-blue-600" />
            <span>Email Address (Optional)</span>
          </label>
          <input
            type="email"
            placeholder="pooja@example.com"
            value={bookingData.emailAddress}
            onChange={(e) => setBookingData({ emailAddress: e.target.value })}
            className="w-full px-4 py-3 rounded-2xl bg-[#FAFAFA] border border-[#EAEAEA] text-xs font-medium text-[#1D1D1F] focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
          />
          {errors.emailAddress && <p className="text-[10px] text-red-500">{errors.emailAddress}</p>}
        </div>

        {/* City & Profession */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="font-heading text-xs font-medium text-[#1D1D1F] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>Your City *</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Amravati"
              value={bookingData.city}
              onChange={(e) => setBookingData({ city: e.target.value })}
              className="w-full px-3.5 py-3 rounded-2xl bg-[#FAFAFA] border border-[#EAEAEA] text-xs font-medium text-[#1D1D1F] focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
            />
            {errors.city && <p className="text-[10px] text-red-500">{errors.city}</p>}
          </div>

          <div className="space-y-1">
            <label className="font-heading text-xs font-medium text-[#1D1D1F] flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-blue-600" />
              <span>Profession *</span>
            </label>
            <select
              value={bookingData.profession}
              onChange={(e) => setBookingData({ profession: e.target.value })}
              className="w-full px-3 py-3 rounded-2xl bg-[#FAFAFA] border border-[#EAEAEA] text-xs font-medium text-[#1D1D1F] focus:outline-none focus:border-blue-600 focus:bg-white transition-all"
            >
              <option value="Salon Owner / Professional">Salon Owner</option>
              <option value="Beautician / Aesthetician">Beautician</option>
              <option value="Makeup Artist">Makeup Artist</option>
              <option value="Cosmetology Student">Student</option>
              <option value="Beauty Enthusiast">Enthusiast</option>
            </select>
          </div>
        </div>

        {/* Fee breakdown info */}
        <div className="p-3.5 rounded-2xl bg-gray-50 border border-[#EAEAEA] space-y-1.5 font-num text-xs">
          <div className="flex justify-between text-[#6E6E73]">
            <span>Registration Fee</span>
            <span>{event.currency}{event.registrationFee}</span>
          </div>
          <div className="flex justify-between text-[#6E6E73]">
            <span>GST & Service Charge</span>
            <span className="text-emerald-600 font-semibold">Included</span>
          </div>
          <div className="border-t border-[#EAEAEA] pt-1.5 flex justify-between font-bold text-[#1D1D1F] text-sm">
            <span>Total Payable</span>
            <span className="text-blue-600">{event.currency}{event.registrationFee}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-[#6E6E73]">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>Your information is protected and used strictly for ticket issuance.</span>
        </div>
      </form>

      {/* Sticky Bottom Continue Button */}
      <div className="fixed bottom-4 left-0 right-0 z-30 px-4 pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto">
          <button
            onClick={handleContinue}
            className="w-full py-4 rounded-2xl bg-blue-600 text-white font-heading font-bold text-sm shadow-xl hover:bg-blue-700 active:scale-98 transition-all flex items-center justify-center gap-2"
          >
            <span>Continue to Payment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

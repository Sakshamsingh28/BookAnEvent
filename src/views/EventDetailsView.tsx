import React, { useState } from 'react';
import { 
  Calendar, MapPin, Clock, Star, Share2, Bookmark, ArrowLeft, 
  ChevronDown, ChevronUp, CheckCircle, Award, Users, HelpCircle, 
  Sparkles, ExternalLink, ShieldCheck, Image as ImageIcon
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { motion, AnimatePresence } from 'motion/react';

export const EventDetailsView: React.FC = () => {
  const { getSelectedEvent, setBookingStep, bookmarkedEventIds, toggleBookmark, setActiveTab } = useAppStore();
  const event = getSelectedEvent();
  const isBookmarked = bookmarkedEventIds.includes(event.id);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleBookClick = () => {
    setBookingStep('booking-form');
  };

  const handleBackClick = () => {
    setActiveTab('home');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Event link copied to clipboard!');
    }
  };

  return (
    <div className="pb-32 space-y-5 animate-fadeIn max-w-md mx-auto px-4 pt-2">
      {/* Top Hero Banner with Glassmorphic Circular Controls */}
      <div className="relative w-full rounded-[32px] overflow-hidden shadow-md bg-gray-900">
        <div className="relative h-80 w-full overflow-hidden">
          <img
            src={event.bannerImage}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

          {/* Top Glassmorphic Navigation Buttons */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
            <button
              onClick={handleBackClick}
              aria-label="Go Back"
              className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white active:scale-90 transition-all shadow-lg hover:bg-white/30"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                aria-label="Share Event"
                className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white active:scale-90 transition-all shadow-lg hover:bg-white/30"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => toggleBookmark(event.id)}
                aria-label="Bookmark Event"
                className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white active:scale-90 transition-all shadow-lg hover:bg-white/30"
              >
                <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-blue-500 text-blue-500' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Overlapping Main Header Card with Rounded Top Corners */}
        <div className="bg-white rounded-t-[32px] p-6 -mt-8 relative z-10 space-y-3">
          {/* Location Badge (Matching Reference UI) */}
          <div className="flex items-center gap-2 text-[#6E6E73]">
            <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-[#1D1D1F]">
              <MapPin className="w-4 h-4" />
            </div>
            <span className="font-heading text-xs font-semibold text-[#1D1D1F]">
              {event.city}, Maharashtra
            </span>
          </div>

          {/* Event Main Title */}
          <h1 className="font-heading font-extrabold text-2xl text-[#1D1D1F] leading-tight">
            {event.title}
          </h1>

          <p className="font-body text-xs text-[#6E6E73] leading-relaxed">
            {event.description}
          </p>

          {/* Attendees & Interactive Map Container (Matching Reference UI) */}
          <div className="pt-2">
            <div className="p-4 rounded-3xl bg-sky-50/70 border border-sky-100 space-y-3">
              {/* Attendees Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2 overflow-hidden">
                    <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" alt="Attendee" />
                    <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" alt="Attendee" />
                    <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" alt="Attendee" />
                    <div className="h-7 w-7 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center text-[10px] font-bold font-num text-amber-800">
                      99+
                    </div>
                  </div>
                  <span className="font-heading text-xs font-bold text-[#1D1D1F]">Attend 100+</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#1D1D1F] shadow-2xs">
                  <MapPin className="w-4 h-4 text-blue-600" />
                </div>
              </div>

              {/* Styled Location Preview Map Box */}
              <div className="relative h-32 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden flex flex-col items-center justify-center p-3 text-center">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:12px_12px]" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mb-1 shadow-md animate-bounce">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <p className="font-heading font-extrabold text-xs text-[#1D1D1F]">{event.venue}</p>
                  <p className="font-body text-[10px] text-[#6E6E73] truncate max-w-xs">{event.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <section className="px-4">
        <div className="ios-card p-5 space-y-3">
          <h3 className="font-heading font-bold text-base text-[#1D1D1F]">About the Seminar</h3>
          <p className="font-body text-xs text-[#6E6E73] leading-relaxed">
            {event.description}
          </p>

          <div className="pt-2">
            <h4 className="font-heading font-semibold text-xs text-[#1D1D1F] mb-2">Key Highlights</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {event.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-2 text-xs text-[#1D1D1F]">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      {event.schedule && event.schedule.length > 0 && (
        <section className="px-4">
          <div className="ios-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-base text-[#1D1D1F]">Event Schedule</h3>
              <span className="text-[10px] text-blue-600 font-num font-semibold uppercase">12 Aug 2026</span>
            </div>

            <div className="max-h-72 overflow-y-auto pr-1 space-y-3 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-gray-200">
              {event.schedule.map((item, index) => (
                <div key={index} className="relative flex items-start gap-3 pl-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-blue-600 border-2 border-white shadow-xs shrink-0 mt-0.5 z-10" />
                  <div className="flex-1 bg-[#FAFAFA] border border-[#EAEAEA] p-3 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <span className="font-num font-bold text-xs text-blue-600">{item.time}</span>
                      {item.speaker && (
                        <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                          {item.speaker}
                        </span>
                      )}
                    </div>
                    <h5 className="font-heading font-semibold text-xs text-[#1D1D1F] mt-1">{item.title}</h5>
                    {item.description && (
                      <p className="font-body text-[11px] text-[#6E6E73] mt-0.5">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Speakers Section */}
      {event.speakers && event.speakers.length > 0 && (
        <section className="px-4">
          <div className="ios-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-base text-[#1D1D1F]">Distinguished Speakers</h3>
              <Users className="w-4 h-4 text-[#6E6E73]" />
            </div>

            <div className="space-y-3">
              {event.speakers.map((speaker) => (
                <div key={speaker.id} className="p-3 rounded-2xl bg-[#FAFAFA] border border-[#EAEAEA] flex items-center gap-3">
                  <img
                    src={speaker.avatar}
                    alt={speaker.name}
                    className="w-12 h-12 rounded-full object-cover border border-white shadow-xs shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h5 className="font-heading font-semibold text-xs text-[#1D1D1F]">{speaker.name}</h5>
                    <p className="font-body text-[11px] text-blue-600 font-medium truncate">{speaker.title}</p>
                    <p className="font-body text-[10px] text-[#6E6E73] truncate">{speaker.organization}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Venue Map Placeholder */}
      <section className="px-4">
        <div className="ios-card p-5 space-y-3">
          <h3 className="font-heading font-bold text-base text-[#1D1D1F]">Venue Location</h3>
          <p className="font-body text-xs text-[#6E6E73]">{event.venue} — {event.address}</p>

          <div className="relative h-40 rounded-2xl bg-gray-100 border border-[#EAEAEA] overflow-hidden flex flex-col items-center justify-center p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-2 shadow-xs">
              <MapPin className="w-6 h-6" />
            </div>
            <p className="font-heading font-semibold text-xs text-[#1D1D1F]">Hotel Aurtus, Rajapeth Square</p>
            <p className="font-body text-[10px] text-[#6E6E73] mt-0.5">Amravati, Maharashtra 444601</p>
            <span className="mt-2 text-[10px] text-blue-600 font-semibold underline flex items-center gap-1">
              Open in Apple Maps / Google Maps <ExternalLink className="w-3 h-3" />
            </span>
          </div>
        </div>
      </section>



      {/* FAQ Section */}
      {event.faqs && event.faqs.length > 0 && (
        <section className="px-4">
          <div className="ios-card p-5 space-y-3">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <h3 className="font-heading font-bold text-base text-[#1D1D1F]">Frequently Asked Questions</h3>
            </div>

            <div className="space-y-2">
              {event.faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div key={index} className="border border-[#EAEAEA] rounded-2xl overflow-hidden transition-all">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full p-3.5 bg-[#FAFAFA] flex items-center justify-between text-left font-heading font-semibold text-xs text-[#1D1D1F]"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" /> : <ChevronDown className="w-4 h-4 text-[#6E6E73] shrink-0" />}
                    </button>
                    {isOpen && (
                      <div className="p-3.5 bg-white font-body text-xs text-[#6E6E73] border-t border-[#EAEAEA] leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Floating Bottom Sticky Bar for Booking Seat */}
      <div className="fixed bottom-20 left-0 right-0 z-30 px-4 pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto">
          <div className="ios-glass-nav rounded-3xl p-3.5 flex items-center justify-between border border-white shadow-xl">
            <div>
              <span className="text-[10px] text-[#6E6E73] font-medium uppercase tracking-wider block">
                Pass Fee
              </span>
              <div className="flex items-baseline gap-1 font-num">
                <span className="font-black text-xl text-[#1D1D1F]">
                  {event.currency}{event.registrationFee}
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                  Instant Verification
                </span>
              </div>
            </div>

            <button
              onClick={handleBookClick}
              className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-heading font-bold text-xs shadow-md hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>Book Seat</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

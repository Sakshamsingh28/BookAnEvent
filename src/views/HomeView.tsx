import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { EVENTS_DATA } from '../data/events';
import { EventCard } from '../components/EventCard';
import { CountdownTimer } from '../components/CountdownTimer';
import { Sparkles, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const HomeView: React.FC = () => {
  const featuredEvent = EVENTS_DATA[0];

  return (
    <div className="space-y-6 pb-24 animate-fadeIn max-w-md mx-auto">
      {/* Live Countdown Banner for Flagship Event */}
      <div className="px-4">
        <CountdownTimer targetDateISO={featuredEvent.dateISO} />
      </div>

      {/* Flagship Single Event Spotlight */}
      <section className="px-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
            <h2 className="font-heading font-extrabold text-lg text-[#1D1D1F]">
              Official Masterclass 2026
            </h2>
          </div>
          <span className="text-[11px] text-blue-600 font-bold uppercase tracking-wider font-num bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
            Exclusive Pass
          </span>
        </div>

        <EventCard event={featuredEvent} layout="featured" />
      </section>

      {/* Trust & Verification Badges */}
      <section className="px-4 space-y-2.5">
        <div className="ios-card p-4 bg-gradient-to-r from-blue-50 to-indigo-50/50 border border-blue-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-xs text-[#1D1D1F]">
              100% Guaranteed Spot & Accreditation
            </h4>
            <p className="font-body text-[11px] text-[#6E6E73] mt-0.5 leading-snug">
              Official Accredited International Certificate, Hands-On Live Practice, and Free K-Beauty Kit included.
            </p>
          </div>
        </div>

        <div className="ios-card p-3.5 flex items-center justify-around text-center text-xs text-[#1D1D1F]">
          <div className="flex items-center gap-1.5 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Instant UPI Verify</span>
          </div>
          <div className="h-4 w-px bg-gray-200" />
          <div className="flex items-center gap-1.5 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            <span>Digital Pass Passcode</span>
          </div>
        </div>
      </section>
    </div>
  );
};

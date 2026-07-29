import React, { useState } from 'react';
import { 
  User, Bookmark, Bell, Shield, MessageCircle, HelpCircle, 
  Smartphone, ChevronRight, Moon, ExternalLink, Award, Sparkles 
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { EVENTS_DATA } from '../data/events';

export const ProfileView: React.FC = () => {
  const { bookmarkedEventIds, bookingData, setSelectedEventId, setBookingStep, setActiveTab } = useAppStore();

  const savedEvents = EVENTS_DATA.filter((e) => bookmarkedEventIds.includes(e.id));

  return (
    <div className="pb-32 space-y-5 animate-fadeIn max-w-md mx-auto px-4 pt-2">
      {/* Profile Header */}
      <div className="ios-card p-5 flex items-center gap-4 bg-gradient-to-r from-blue-50/50 via-white to-white border border-blue-100">
        <div className="w-14 h-14 rounded-full bg-blue-600 text-white font-num font-bold text-xl flex items-center justify-center shadow-md shrink-0">
          PS
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-heading font-extrabold text-lg text-[#1D1D1F]">
            {bookingData.fullName || 'Pooja Deshmukh'}
          </h3>
          <p className="font-body text-xs text-[#6E6E73] truncate">
            {bookingData.emailAddress || 'pooja@example.com'}
          </p>
          <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold font-num">
            {bookingData.profession || 'Salon Professional'}
          </span>
        </div>
      </div>

      {/* Bookmarked Events Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Bookmark className="w-4 h-4 text-blue-600 fill-blue-600" />
            <h3 className="font-heading font-bold text-base text-[#1D1D1F]">
              Saved Bookmarks ({savedEvents.length})
            </h3>
          </div>
        </div>

        {savedEvents.length > 0 ? (
          <div className="space-y-3">
            {savedEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => {
                  setSelectedEventId(event.id);
                  setBookingStep('event-details');
                  setActiveTab('home');
                }}
                className="ios-card p-3.5 flex items-center gap-3 cursor-pointer hover:border-blue-300 active:scale-98 transition-all"
              >
                <img
                  src={event.bannerImage}
                  alt={event.title}
                  className="w-14 h-14 rounded-2xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading font-semibold text-xs text-[#1D1D1F] truncate">
                    {event.title}
                  </h4>
                  <p className="font-body text-[10px] text-[#6E6E73] mt-0.5 font-num">
                    {event.date} • {event.city}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#6E6E73]" />
              </div>
            ))}
          </div>
        ) : (
          <div className="ios-card p-5 text-center text-xs text-[#6E6E73]">
            No saved events yet. Tap the bookmark icon on any event card to save it here!
          </div>
        )}
      </div>

      {/* Account Settings List */}
      <div className="ios-card p-2 divide-y divide-[#EAEAEA]">
        <div className="p-3 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gray-100 text-[#1D1D1F] flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <p className="font-heading font-medium text-xs text-[#1D1D1F]">Push Notifications</p>
              <p className="text-[10px] text-[#6E6E73]">Event reminders & verification alerts</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-num">Active</span>
        </div>

        <div className="p-3 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="font-heading font-medium text-xs text-[#1D1D1F]">WhatsApp Help Desk</p>
              <p className="text-[10px] text-[#6E6E73]">Direct organizer verification support</p>
            </div>
          </div>
          <a
            href="https://wa.me/919876543210?text=Hello%20DSG%20BookAnEvent%20Support"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-bold text-blue-600 underline"
          >
            Chat
          </a>
        </div>

        <div className="p-3 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Moon className="w-4 h-4" />
            </div>
            <div>
              <p className="font-heading font-medium text-xs text-[#1D1D1F]">Appearance Theme</p>
              <p className="text-[10px] text-[#6E6E73]">Apple Light Luxury Aesthetic</p>
            </div>
          </div>
          <span className="text-[10px] font-semibold text-gray-500 font-num">Light (Default)</span>
        </div>
      </div>

      {/* Engine Info Box */}
      <div className="ios-card p-4 bg-gray-900 text-white space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-white text-black font-heading font-bold text-xs flex items-center justify-center">
              D
            </div>
            <span className="font-heading font-bold text-xs">DSG Engine</span>
          </div>
          <span className="text-[10px] text-gray-400 font-num">v2.4.0 (Build 894)</span>
        </div>
        <p className="font-body text-[11px] text-gray-400 leading-relaxed">
          BookAnEvent architecture is built on DSG Engine — providing lightning fast mobile ticketing, PWA offline caching, and instant UPI deep link verification.
        </p>
      </div>
    </div>
  );
};

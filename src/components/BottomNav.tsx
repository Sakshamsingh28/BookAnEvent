import React, { useState, useEffect } from 'react';
import { Home, Ticket } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { TabType } from '../types';
import { motion } from 'motion/react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, bookingStep, setBookingStep, userTickets } = useAppStore();

  const navItems: { id: TabType; label: string; icon: React.ComponentType<{ className?: string }>; badge?: number }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'tickets', label: 'My Tickets', icon: Ticket, badge: userTickets.length }
  ];

  const handleTabClick = (tabId: TabType) => {
    setActiveTab(tabId);
    if (tabId === 'home') {
      setBookingStep('event-details');
    }
  };

  // Only hide bottom nav during checkout/payment flows
  if (bookingStep !== 'event-details' && bookingStep !== 'ticket-preview') {
    return null;
  }

  return (
    <nav className="fixed bottom-4 left-0 right-0 z-40 px-4 pointer-events-none">
      <div className="max-w-xs sm:max-w-md mx-auto pointer-events-auto">
        <div className="ios-glass-nav rounded-full p-1.5 flex items-center justify-around shadow-lg border border-white/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`relative flex flex-col items-center justify-center py-2 px-4 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-blue-600 font-semibold'
                    : 'text-[#6E6E73] hover:text-[#1D1D1F] active:scale-95'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-blue-50/90 rounded-full -z-10 border border-blue-200/50"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                <div className="relative">
                  <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`} />
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-1 -right-2 bg-blue-600 text-white font-num font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>

                <span className="text-[10px] mt-0.5 tracking-tight font-medium">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

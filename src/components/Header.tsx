import React, { useState, useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

export const Header: React.FC = () => {
  const { setActiveTab } = useAppStore();

  return (
    <header className="sticky top-0 z-40 bg-[#FAFAFA]/90 backdrop-blur-md border-b border-[#EAEAEA]/80 px-4 py-3">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-[#1D1D1F] text-white flex items-center justify-center font-heading font-bold text-lg shadow-sm group-active:scale-95 transition-transform">
            B
          </div>
          <div>
            <h1 className="font-heading font-extrabold text-base leading-tight tracking-tight text-[#1D1D1F]">
              BookAnEvent
            </h1>
            <p className="font-body text-[10px] text-[#6E6E73] tracking-wide uppercase font-semibold">
              Discover. Book. Experience.
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold font-num">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live Registration</span>
        </div>
      </div>
    </header>
  );
};

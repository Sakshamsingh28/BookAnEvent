import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-6 px-4 text-center border-t border-[#EAEAEA] mt-8 mb-20 bg-white/50">
      <div className="max-w-md mx-auto space-y-1.5">
        <p className="font-heading font-semibold text-xs text-[#1D1D1F] tracking-tight">
          BookAnEvent
        </p>
        <p className="font-body text-[11px] text-[#6E6E73]">
          Discover. Book. Experience.
        </p>
        <div className="pt-2 flex items-center justify-center gap-1.5 text-[10px] text-[#6E6E73] uppercase font-num tracking-widest">
          <span>Powered by</span>
          <span className="font-bold text-[#1D1D1F] bg-gray-100 px-2 py-0.5 rounded-md border border-gray-200">
            DSG Engine
          </span>
        </div>
      </div>
    </footer>
  );
};

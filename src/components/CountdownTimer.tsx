import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  targetDateISO: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDateISO }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDateISO) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDateISO]);

  return (
    <div className="bg-[#1D1D1F] text-white rounded-2xl p-3.5 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-blue-400">
          <Clock className="w-4 h-4 animate-spin-slow" />
        </div>
        <div>
          <p className="font-heading text-xs font-semibold tracking-wide">Event Starts In</p>
          <p className="font-body text-[10px] text-gray-400">12 August 2026 • 10:00 AM</p>
        </div>
      </div>

      <div className="flex items-center gap-2 font-num">
        <div className="flex flex-col items-center">
          <span className="bg-white/15 px-2 py-1 rounded-lg text-sm font-bold text-white min-w-[32px] text-center">
            {String(timeLeft.days).padStart(2, '0')}
          </span>
          <span className="text-[9px] text-gray-400 mt-0.5">Days</span>
        </div>
        <span className="text-gray-500 font-bold -mt-3">:</span>

        <div className="flex flex-col items-center">
          <span className="bg-white/15 px-2 py-1 rounded-lg text-sm font-bold text-white min-w-[32px] text-center">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
          <span className="text-[9px] text-gray-400 mt-0.5">Hrs</span>
        </div>
        <span className="text-gray-500 font-bold -mt-3">:</span>

        <div className="flex flex-col items-center">
          <span className="bg-white/15 px-2 py-1 rounded-lg text-sm font-bold text-white min-w-[32px] text-center">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
          <span className="text-[9px] text-gray-400 mt-0.5">Min</span>
        </div>
        <span className="text-gray-500 font-bold -mt-3">:</span>

        <div className="flex flex-col items-center">
          <span className="bg-blue-600 px-2 py-1 rounded-lg text-sm font-bold text-white min-w-[32px] text-center">
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
          <span className="text-[9px] text-blue-300 mt-0.5">Sec</span>
        </div>
      </div>
    </div>
  );
};

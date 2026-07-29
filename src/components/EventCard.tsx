import React from 'react';
import { Calendar, MapPin, Bookmark, Share2, ArrowRight } from 'lucide-react';
import { EventItem } from '../types';
import { useAppStore } from '../store/useAppStore';

interface EventCardProps {
  event: EventItem;
  layout?: 'featured' | 'standard' | 'compact';
  onSelect?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, layout = 'standard', onSelect }) => {
  const { bookmarkedEventIds, toggleBookmark, setSelectedEventId, setBookingStep, setActiveTab } = useAppStore();
  const isBookmarked = bookmarkedEventIds.includes(event.id);

  const handleCardClick = () => {
    setSelectedEventId(event.id);
    setBookingStep('event-details');
    if (onSelect) onSelect();
  };

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedEventId(event.id);
    setBookingStep('booking-form');
    setActiveTab('home');
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmark(event.id);
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
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

  if (layout === 'featured') {
    return (
      <div 
        onClick={handleCardClick}
        className="ios-card ios-card-hover overflow-hidden cursor-pointer group transition-all duration-300"
      >
        {/* Banner Image Area */}
        <div className="relative h-56 sm:h-64 w-full bg-gray-100 overflow-hidden">
          <img
            src={event.bannerImage}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Floating Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#1D1D1F] text-xs font-semibold font-num shadow-xs">
              {event.category}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleShareClick}
                aria-label="Share Event"
                className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#1D1D1F] hover:bg-white active:scale-90 transition-all shadow-xs"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleBookmarkClick}
                aria-label="Bookmark Event"
                className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#1D1D1F] hover:bg-white active:scale-90 transition-all shadow-xs"
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-blue-600 text-blue-600' : ''}`} />
              </button>
            </div>
          </div>

          {/* Floating Bottom Left Date & Location Chips */}
          <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-medium font-num">
              <Calendar className="w-3 h-3 text-blue-400" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-medium">
              <MapPin className="w-3 h-3 text-red-400" />
              <span className="truncate max-w-[130px]">{event.venue}, {event.city}</span>
            </div>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-5 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-heading font-bold text-xl text-[#1D1D1F] leading-snug group-hover:text-blue-600 transition-colors">
                {event.title}
              </h3>
              <p className="font-body text-xs text-[#6E6E73] mt-1 line-clamp-2 leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>

          {/* Highlights Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {event.highlights.slice(0, 3).map((h, i) => (
              <span key={i} className="px-2.5 py-0.5 rounded-md bg-[#FAFAFA] border border-[#EAEAEA] text-[10px] text-[#6E6E73] font-medium">
                • {h}
              </span>
            ))}
          </div>

          {/* Price & Action Row */}
          <div className="pt-3 border-t border-[#EAEAEA] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#6E6E73] font-medium block">
                Registration Fee
              </span>
              <div className="flex items-baseline gap-1.5 font-num">
                <span className="font-extrabold text-xl text-[#1D1D1F]">
                  {event.currency}{event.registrationFee}
                </span>
                {event.originalPrice && (
                  <span className="text-xs text-[#6E6E73] line-through">
                    {event.currency}{event.originalPrice}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={handleRegisterClick}
              className="px-5 py-2.5 rounded-full bg-blue-600 text-white font-medium text-xs shadow-md hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <span>Register Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={handleCardClick}
      className="ios-card ios-card-hover overflow-hidden cursor-pointer group transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div className="relative h-40 w-full bg-gray-100 overflow-hidden">
          <img
            src={event.bannerImage}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[#1D1D1F] text-[10px] font-semibold">
              {event.category}
            </span>
            <button
              onClick={handleBookmarkClick}
              aria-label="Bookmark Event"
              className="w-7 h-7 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#1D1D1F] active:scale-90 transition-all"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-blue-600 text-blue-600' : ''}`} />
            </button>
          </div>

          <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white text-[10px]">
            <span className="bg-black/50 px-2 py-0.5 rounded-full font-num">
              {event.date}
            </span>
            <span className="bg-black/50 px-2 py-0.5 rounded-full truncate max-w-[100px]">
              {event.city}
            </span>
          </div>
        </div>

        <div className="p-4 space-y-2">
          <h4 className="font-heading font-semibold text-sm text-[#1D1D1F] leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
            {event.title}
          </h4>
          <p className="font-body text-[11px] text-[#6E6E73] line-clamp-2">
            {event.description}
          </p>
        </div>
      </div>

      <div className="p-4 pt-0 border-t border-[#EAEAEA] mt-2 flex items-center justify-between">
        <div className="font-num">
          <span className="font-bold text-sm text-[#1D1D1F]">
            {event.currency}{event.registrationFee}
          </span>
        </div>

        <button
          onClick={handleRegisterClick}
          className="px-3.5 py-1.5 rounded-full bg-[#1D1D1F] text-white font-medium text-[11px] hover:bg-blue-600 active:scale-95 transition-all"
        >
          Book Seat
        </button>
      </div>
    </div>
  );
};

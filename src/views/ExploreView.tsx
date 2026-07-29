import React from 'react';
import { Search, SlidersHorizontal, MapPin, Sparkles, X } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { EVENTS_DATA, CATEGORIES_LIST, CITIES_LIST } from '../data/events';
import { EventCard } from '../components/EventCard';

export const ExploreView: React.FC = () => {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, selectedCity, setSelectedCity } = useAppStore();

  const filteredEvents = EVENTS_DATA.filter((event) => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pb-32 space-y-5 animate-fadeIn max-w-md mx-auto px-4 pt-2">
      {/* Title */}
      <div>
        <h2 className="font-heading font-extrabold text-2xl text-[#1D1D1F]">
          Explore Events
        </h2>
        <p className="font-body text-xs text-[#6E6E73]">
          Discover workshops, tech summits, design labs & seminars
        </p>
      </div>

      {/* Search Input Box */}
      <div className="relative flex items-center">
        <Search className="absolute left-3.5 w-4 h-4 text-[#6E6E73]" />
        <input
          type="text"
          placeholder="Search by event title, speaker, or city..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-9 py-3 rounded-2xl bg-white border border-[#EAEAEA] text-xs font-medium text-[#1D1D1F] focus:outline-none focus:border-blue-600 shadow-2xs transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 p-1 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {CATEGORIES_LIST.map((category) => {
          const isActive = category === selectedCategory;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-blue-600 text-white font-semibold shadow-sm scale-102'
                  : 'bg-white border border-[#EAEAEA] text-[#6E6E73] hover:text-[#1D1D1F]'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Event Results Counter */}
      <div className="flex items-center justify-between text-xs font-num font-medium text-[#6E6E73]">
        <span>Showing {filteredEvents.length} Events</span>
        {selectedCategory !== 'All' && (
          <button
            onClick={() => setSelectedCategory('All')}
            className="text-blue-600 font-semibold underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} layout="standard" />
          ))}
        </div>
      ) : (
        <div className="ios-card p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h4 className="font-heading font-semibold text-sm text-[#1D1D1F]">
            No Events Found
          </h4>
          <p className="font-body text-xs text-[#6E6E73]">
            Try searching for another keyword or change your category filter.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="px-4 py-2 rounded-xl bg-[#1D1D1F] text-white font-medium text-xs active:scale-95 transition-transform"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};

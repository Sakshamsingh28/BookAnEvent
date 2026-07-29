import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TabType, BookingStep, BookingFormData, UserTicket, EventItem } from '../types';
import { EVENTS_DATA, FEATURED_EVENT_ID } from '../data/events';

interface AppState {
  // Navigation & View State
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  
  selectedEventId: string;
  setSelectedEventId: (id: string) => void;
  
  bookingStep: BookingStep;
  setBookingStep: (step: BookingStep) => void;

  // Filters & Search
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;

  // Active Booking Form State
  bookingData: BookingFormData;
  setBookingData: (data: Partial<BookingFormData>) => void;
  resetBookingData: () => void;

  // Bookmarks & Tickets
  bookmarkedEventIds: string[];
  toggleBookmark: (eventId: string) => void;
  
  userTickets: UserTicket[];
  addTicket: (ticket: UserTicket) => void;
  currentTicketToPreview: UserTicket | null;
  setCurrentTicketToPreview: (ticket: UserTicket | null) => void;

  // Helper getters
  getSelectedEvent: () => EventItem;
}

const defaultBookingData: BookingFormData = {
  fullName: '',
  mobileNumber: '',
  emailAddress: '',
  city: 'Amravati',
  profession: 'Salon Owner / Professional',
  ticketType: 'Premium Pass',
  price: 499
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      activeTab: 'home',
      setActiveTab: (tab) => set({ activeTab: tab }),

      selectedEventId: FEATURED_EVENT_ID,
      setSelectedEventId: (id) => set({ selectedEventId: id }),

      bookingStep: 'event-details',
      setBookingStep: (step) => {
        window.history.pushState({ bookingStep: step }, '');
        set({ bookingStep: step });
      },

      selectedCity: 'Amravati',
      setSelectedCity: (city) => set({ selectedCity: city }),

      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),

      selectedCategory: 'All',
      setSelectedCategory: (category) => set({ selectedCategory: category }),

      bookingData: defaultBookingData,
      setBookingData: (data) =>
        set((state) => ({
          bookingData: { ...state.bookingData, ...data }
        })),
      resetBookingData: () => set({ bookingData: defaultBookingData }),

      bookmarkedEventIds: [FEATURED_EVENT_ID],
      toggleBookmark: (eventId) =>
        set((state) => {
          const exists = state.bookmarkedEventIds.includes(eventId);
          return {
            bookmarkedEventIds: exists
              ? state.bookmarkedEventIds.filter((id) => id !== eventId)
              : [...state.bookmarkedEventIds, eventId]
          };
        }),

      userTickets: [],
      addTicket: (ticket) =>
        set((state) => ({
          userTickets: [ticket, ...state.userTickets],
          currentTicketToPreview: ticket
        })),

      currentTicketToPreview: null,
      setCurrentTicketToPreview: (ticket) => set({ currentTicketToPreview: ticket }),

      getSelectedEvent: () => {
        const id = get().selectedEventId;
        const found = EVENTS_DATA.find((e) => e.id === id);
        return found || EVENTS_DATA[0];
      }
    }),
    {
      name: 'bookanevent-storage',
      partialize: (state) => ({
        userTickets: state.userTickets,
        bookmarkedEventIds: state.bookmarkedEventIds,
        bookingData: state.bookingData,
        selectedCity: state.selectedCity
      })
    }
  )
);

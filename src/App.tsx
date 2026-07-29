import React, { useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';
import { useAppStore } from './store/useAppStore';

import { EventDetailsView } from './views/EventDetailsView';
import { BookingView } from './views/BookingView';
import { PaymentView } from './views/PaymentView';
import { WhatsAppVerificationView } from './views/WhatsAppVerificationView';
import { ConfirmationView } from './views/ConfirmationView';
import { TicketPreviewView } from './views/TicketPreviewView';
import { MyTicketsView } from './views/MyTicketsView';

export default function App() {
  const { activeTab, bookingStep, setBookingStep } = useAppStore();

  // Listen to browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.bookingStep) {
        useAppStore.setState({ bookingStep: e.state.bookingStep });
      } else {
        useAppStore.setState({ bookingStep: 'event-details' });
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const renderHomeContent = () => {
    switch (bookingStep) {
      case 'event-details':
        return <EventDetailsView />;
      case 'booking-form':
        return <BookingView />;
      case 'payment':
        return <PaymentView />;
      case 'whatsapp-verification':
        return <WhatsAppVerificationView />;
      case 'confirmation':
        return <ConfirmationView />;
      case 'ticket-preview':
        return <TicketPreviewView />;
      default:
        return <EventDetailsView />;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return renderHomeContent();
      case 'tickets':
        return bookingStep === 'ticket-preview' ? <TicketPreviewView /> : <MyTicketsView />;
      default:
        return renderHomeContent();
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1D1D1F] flex flex-col font-body selection:bg-blue-500 selection:text-white">
      {/* Main Top Header */}
      <Header />

      {/* Container max-width for Desktop/Tablet responsiveness */}
      <main className="flex-1 w-full max-w-md md:max-w-xl mx-auto pt-4 transition-all">
        {renderTabContent()}
      </main>

      {/* Subtle DSG Engine Footer */}
      <Footer />

      {/* Floating Native iOS Bottom Navigation Bar */}
      <BottomNav />
    </div>
  );
}

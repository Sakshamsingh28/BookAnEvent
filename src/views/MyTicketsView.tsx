import React from 'react';
import { Ticket, Clock, CheckCircle2, ChevronRight, Calendar, MapPin, QrCode } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const MyTicketsView: React.FC = () => {
  const { userTickets, setCurrentTicketToPreview, setBookingStep } = useAppStore();

  const handleTicketClick = (ticket: any) => {
    setCurrentTicketToPreview(ticket);
    setBookingStep('ticket-preview');
  };

  return (
    <div className="pb-32 space-y-5 animate-fadeIn max-w-md mx-auto px-4 pt-2">
      {/* Title */}
      <div>
        <h2 className="font-heading font-extrabold text-2xl text-[#1D1D1F]">
          My Event Tickets
        </h2>
        <p className="font-body text-xs text-[#6E6E73]">
          Your registered passes & digital event passes
        </p>
      </div>

      {userTickets.length > 0 ? (
        <div className="space-y-3">
          {userTickets.map((t) => (
            <div
              key={t.ticketId}
              onClick={() => handleTicketClick(t)}
              className="ios-card p-4 space-y-3 cursor-pointer hover:border-blue-300 active:scale-98 transition-all"
            >
              {/* Header Row */}
              <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                    <Ticket className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#6E6E73] font-num font-semibold uppercase block">Pass ID</span>
                    <span className="font-num font-bold text-xs text-[#1D1D1F]">{t.ticketId}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-semibold font-num">
                  <Clock className="w-3 h-3 text-amber-600 animate-spin-slow" />
                  <span>{t.status}</span>
                </div>
              </div>

              {/* Event Title & Details */}
              <div>
                <h4 className="font-heading font-bold text-base text-[#1D1D1F]">
                  {t.eventTitle}
                </h4>
                <div className="mt-2 space-y-1 text-xs text-[#6E6E73]">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{t.eventDate} ({t.eventTime})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span className="truncate">{t.venue}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="pt-2 border-t border-[#EAEAEA] flex items-center justify-between">
                <div className="text-[11px] font-num">
                  <span className="text-[#6E6E73]">Attendee: </span>
                  <strong className="text-[#1D1D1F]">{t.attendeeName}</strong>
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold text-blue-600">
                  <span>View Pass</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="ios-card p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <Ticket className="w-6 h-6" />
          </div>
          <h4 className="font-heading font-semibold text-sm text-[#1D1D1F]">
            No Booked Tickets Yet
          </h4>
          <p className="font-body text-xs text-[#6E6E73]">
            Browse trending events and book your seat in under 60 seconds!
          </p>
        </div>
      )}
    </div>
  );
};

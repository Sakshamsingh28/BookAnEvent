export type TabType = 'home' | 'tickets';

export type BookingStep = 
  | 'event-details' 
  | 'booking-form' 
  | 'payment' 
  | 'whatsapp-verification' 
  | 'confirmation' 
  | 'ticket-preview';

export type TicketStatus = 'Pending Verification' | 'Verified' | 'Completed';

export interface Speaker {
  id: string;
  name: string;
  title: string;
  organization: string;
  avatar: string;
  bio?: string;
}

export interface ScheduleItem {
  time: string;
  title: string;
  description?: string;
  speaker?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ReviewItem {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  userAvatar?: string;
}

export interface EventItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  date: string;
  dateISO: string;
  time: string;
  venue: string;
  city: string;
  address: string;
  category: string;
  registrationFee: number;
  originalPrice?: number;
  currency: string;
  bannerImage: string;
  galleryImages: string[];
  isFeatured?: boolean;
  highlights: string[];
  schedule: ScheduleItem[];
  speakers: Speaker[];
  faqs: FAQItem[];
  reviews: ReviewItem[];
  rating: number;
  totalReviews: number;
  organizerName: string;
  whatsappNumber: string;
  upiId: string;
}

export interface BookingFormData {
  fullName: string;
  mobileNumber: string;
  emailAddress: string;
  city: string;
  profession: string;
  ticketType: 'Premium Pass' | 'VIP Access' | 'Standard Pass';
  price: number;
}

export interface UserTicket {
  ticketId: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  city: string;
  attendeeName: string;
  attendeePhone: string;
  attendeeEmail: string;
  ticketType: string;
  seat?: string;
  amountPaid: number;
  status: TicketStatus;
  bookedAt: string;
  qrCodeValue: string;
}

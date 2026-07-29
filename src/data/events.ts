import { EventItem } from '../types';

export const FEATURED_EVENT_ID = 'korean-beauty-seminar-2026';

export const EVENTS_DATA: EventItem[] = [
  {
    id: 'korean-beauty-seminar-2026',
    title: 'Korean Beauty Seminar 2026',
    tagline: 'Clinical Techniques • Modern Technology • Traditional Naturopathy',
    description: 'Discover the future of professional skincare through Korean beauty innovations. This intensive one-day seminar combines clinical beauty techniques, advanced beauty technology, and traditional naturopathy to help beauty professionals upgrade their skills, attract premium clients, and grow their business.',
    date: '12 August 2026',
    dateISO: '2026-08-12T10:00:00',
    time: '10:00 AM – 4:00 PM',
    venue: 'Hotel Aurtus',
    city: 'Amravati',
    address: 'Rajapeth Square, Madhokar Peth, Amravati, Maharashtra 444605',
    category: 'Beauty',
    registrationFee: 499,
    originalPrice: 4999,
    currency: '₹',
    bannerImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: true,
    highlights: [
      'Full-Day Seminar Access',
      'Expert Learning Sessions',
      'Networking Opportunity',
      'Certificate of Participation',
      'Access to Presentations & Demonstrations'
    ],
    schedule: [
      { time: '10:00 AM', title: 'Registration & Welcome', description: 'Check-in and collection of seminar kit.' },
      { time: '11:00 AM', title: 'Clinical Techniques & Tech', description: 'Advanced K-Beauty skincare innovations & tech demonstration.', speaker: 'Nilu Singh' },
      { time: '01:00 PM', title: 'Networking & Interactive Session', description: 'Connect with industry peers and experts.' },
      { time: '02:00 PM', title: 'Traditional Naturopathy & Growth', description: 'Integrating naturopathy into professional beauty services.', speaker: 'Deepshikha Dagur' },
      { time: '03:30 PM', title: 'Q&A & Certificate Distribution', description: 'Interactive Q&A session and handover of Certificates of Participation.' }
    ],
    speakers: [
      {
        id: 'sp-1',
        name: 'Dt. Nilu Singh',
        title: 'Dietician | Clinical Cosmetologist | BNYS | MSW',
        organization: 'Founder & Director, Rays Aesthetic Clinic & Wellness Centre',
        avatar: 'https://res.cloudinary.com/qfg97bge/image/upload/v1785346367/Screenshot_2026-07-29_230208_q9o2xx.png'
      },
      {
        id: 'sp-2',
        name: 'Deepshikha Dagur',
        title: 'M.Tech | Korean Business Analyst',
        organization: 'International Business Mentor',
        avatar: 'https://res.cloudinary.com/qfg97bge/image/upload/v1785346367/Screenshot_2026-07-29_230224_oeqoo9.png'
      }
    ],
    faqs: [
      {
        question: 'Who should attend this seminar?',
        answer: 'This seminar is designed for beauty professionals, salon owners, beauticians, cosmetologists, and skincare enthusiasts wanting to learn advanced K-Beauty clinical techniques.'
      },
      {
        question: 'Is a certificate provided?',
        answer: 'Yes! All participants will receive an official Certificate of Participation upon completing the seminar.'
      },
      {
        question: 'How do I receive my verified ticket?',
        answer: 'After making the ₹499 UPI payment, click the WhatsApp verification button to send your payment screenshot. Your ticket will be issued immediately.'
      }
    ],
    reviews: [],
    rating: 4.9,
    totalReviews: 86,
    organizerName: 'Korean Beauty Seminar',
    whatsappNumber: '919930091230',
    upiId: 'singhk984@icici'
  }
];

export const CITIES_LIST = ['Amravati'];
export const CATEGORIES_LIST = ['Beauty'];

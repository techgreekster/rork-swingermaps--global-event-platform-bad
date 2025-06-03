export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio?: string;
  rating: number;
  isHost: boolean;
  joinedDate: string;
  preferences?: {
    notifications: boolean;
    darkMode: boolean;
    language: string;
  };
  paymentMethods?: PaymentMethod[];
};

export type PaymentMethod = {
  id: string;
  type: 'card' | 'paypal';
  last4?: string;
  expiryDate?: string;
  isDefault: boolean;
};

export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: {
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  price: number;
  capacity: number;
  attendees: number;
  hostId: string;
  hostName: string;
  hostRating: number;
  images: string[];
  isFree: boolean;
  isPrivate: boolean;
  tags: string[];
  rating: number;
  reviews: Review[];
};

export type Review = {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
};

export type Ticket = {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  userId: string;
  purchaseDate: string;
  price: number;
  status: 'pending' | 'approved' | 'rejected' | 'attended';
  qrCode?: string;
};

export type HostRequest = {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  eventId: string;
  eventTitle: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
};
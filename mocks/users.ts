import { User } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    bio: 'Adventurous couple looking for fun experiences',
    rating: 4.8,
    isHost: true,
    joinedDate: '2023-01-15',
    preferences: {
      notifications: true,
      darkMode: false,
      language: 'en',
    },
  },
  {
    id: '2',
    name: 'Jamie & Sam',
    email: 'jamie.sam@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    bio: 'Fun-loving couple from NYC',
    rating: 4.5,
    isHost: false,
    joinedDate: '2023-03-22',
  },
  {
    id: '3',
    name: 'Taylor Smith',
    email: 'taylor@example.com',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    bio: 'Event organizer with 5+ years of experience',
    rating: 4.9,
    isHost: true,
    joinedDate: '2022-11-05',
  },
];

export const currentUser: User = mockUsers[0];
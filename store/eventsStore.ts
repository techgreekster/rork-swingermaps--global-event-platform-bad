import { create } from 'zustand';
import { Event } from '@/types';
import { mockEvents } from '@/mocks/events';

interface EventsState {
  events: Event[];
  favoriteEventIds: string[];
  isLoading: boolean;
  error: string | null;
  fetchEvents: () => Promise<void>;
  fetchEventById: (id: string) => Promise<Event | undefined>;
  toggleFavorite: (eventId: string) => void;
  searchEvents: (query: string) => Promise<Event[]>;
  filterEvents: (filters: EventFilters) => Promise<Event[]>;
}

export interface EventFilters {
  date?: string;
  location?: string;
  price?: 'free' | 'paid' | 'all';
  tags?: string[];
}

export const useEventsStore = create<EventsState>((set, get) => ({
  events: [],
  favoriteEventIds: [],
  isLoading: false,
  error: null,
  
  fetchEvents: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set({ events: mockEvents, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch events. Please try again.", isLoading: false });
    }
  },
  
  fetchEventById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const event = mockEvents.find(e => e.id === id);
      set({ isLoading: false });
      return event;
    } catch (error) {
      set({ error: "Failed to fetch event details. Please try again.", isLoading: false });
      return undefined;
    }
  },
  
  toggleFavorite: (eventId) => {
    set(state => {
      const isFavorite = state.favoriteEventIds.includes(eventId);
      
      if (isFavorite) {
        return {
          favoriteEventIds: state.favoriteEventIds.filter(id => id !== eventId)
        };
      } else {
        return {
          favoriteEventIds: [...state.favoriteEventIds, eventId]
        };
      }
    });
  },
  
  searchEvents: async (query) => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const lowercaseQuery = query.toLowerCase();
      const filteredEvents = mockEvents.filter(event => 
        event.title.toLowerCase().includes(lowercaseQuery) ||
        event.description.toLowerCase().includes(lowercaseQuery) ||
        event.location.city.toLowerCase().includes(lowercaseQuery) ||
        event.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      );
      
      set({ isLoading: false });
      return filteredEvents;
    } catch (error) {
      set({ error: "Search failed. Please try again.", isLoading: false });
      return [];
    }
  },
  
  filterEvents: async (filters) => {
    set({ isLoading: true });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredEvents = [...mockEvents];
      
      if (filters.date) {
        filteredEvents = filteredEvents.filter(event => event.date === filters.date);
      }
      
      if (filters.location) {
        const location = filters.location.toLowerCase();
        filteredEvents = filteredEvents.filter(event => 
          event.location.city.toLowerCase().includes(location) ||
          event.location.state.toLowerCase().includes(location) ||
          event.location.country.toLowerCase().includes(location)
        );
      }
      
      if (filters.price) {
        if (filters.price === 'free') {
          filteredEvents = filteredEvents.filter(event => event.isFree);
        } else if (filters.price === 'paid') {
          filteredEvents = filteredEvents.filter(event => !event.isFree);
        }
      }
      
      if (filters.tags && filters.tags.length > 0) {
        filteredEvents = filteredEvents.filter(event => 
          filters.tags!.some(tag => event.tags.includes(tag))
        );
      }
      
      set({ isLoading: false });
      return filteredEvents;
    } catch (error) {
      set({ error: "Filtering failed. Please try again.", isLoading: false });
      return [];
    }
  },
}));
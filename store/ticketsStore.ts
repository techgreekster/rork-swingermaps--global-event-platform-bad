import { create } from 'zustand';
import { Ticket, HostRequest } from '@/types';
import { mockTickets, hostRequests } from '@/mocks/tickets';

interface TicketsState {
  tickets: Ticket[];
  hostRequests: HostRequest[];
  isLoading: boolean;
  error: string | null;
  fetchUserTickets: (userId: string) => Promise<void>;
  fetchHostRequests: (hostId: string) => Promise<void>;
  requestTicket: (eventId: string, userId: string) => Promise<void>;
  approveRequest: (requestId: string) => Promise<void>;
  rejectRequest: (requestId: string) => Promise<void>;
  generateTicketQR: (ticketId: string) => Promise<string>;
}

export const useTicketsStore = create<TicketsState>((set, get) => ({
  tickets: [],
  hostRequests: [],
  isLoading: false,
  error: null,
  
  fetchUserTickets: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userTickets = mockTickets.filter(ticket => ticket.userId === userId);
      set({ tickets: userTickets, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch tickets. Please try again.", isLoading: false });
    }
  },
  
  fetchHostRequests: async (hostId) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Cast the hostRequests to ensure type safety
      const typedHostRequests = hostRequests as HostRequest[];
      set({ hostRequests: typedHostRequests, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch host requests. Please try again.", isLoading: false });
    }
  },
  
  requestTicket: async (eventId, userId) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would create a request in the database
      set({ isLoading: false });
    } catch (error) {
      set({ error: "Failed to request ticket. Please try again.", isLoading: false });
    }
  },
  
  approveRequest: async (requestId) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => ({
        hostRequests: state.hostRequests.map(request => 
          request.id === requestId 
            ? { ...request, status: 'approved' as const } 
            : request
        ),
        isLoading: false
      }));
    } catch (error) {
      set({ error: "Failed to approve request. Please try again.", isLoading: false });
    }
  },
  
  rejectRequest: async (requestId) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      set(state => ({
        hostRequests: state.hostRequests.map(request => 
          request.id === requestId 
            ? { ...request, status: 'rejected' as const } 
            : request
        ),
        isLoading: false
      }));
    } catch (error) {
      set({ error: "Failed to reject request. Please try again.", isLoading: false });
    }
  },
  
  generateTicketQR: async (ticketId) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would generate a QR code on the server
      const qrCode = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAYAAABRRIOnAAAAAklEQVR4AewaftIAAAOPSURBVO3BQY4cSRLAQDLQ//8yV0c/JZCoain2xgj+wRj/OMYKx1jjGGscY41jrHGMNY6xxjHWOMYax1jjGGscY41jrHGMNY6xxjHWuHg4kfxNFU8kU8UTSU8xJVMVTyR/U8WTY6xxjDWOscbFl1XxTZKniieSnmJKpormm0m+qeKbjrHGMdY4xhoXPyaZKp5IpooeyVTRJFNFj2Sq6JH0FD2SqaJH8pOKn3SMNY6xxjHWuPhlkqmiR9JU9Eh6iieSnqJJpooeSU/xm0l+02OscYw1jrHGxS+T9BQ9kp6iSaYqeiRTRZNMFU0yVTTJVNEkeYqf9BhrHGONY6xx8WOSv6miR9JTNMlU0STTX5L8TcdY4xhrHGONiy+r+E2SnqJJpooeSU/RJD1Fk0wVTyRTxZNkqvimY6xxjDWOscbFw4nkJ1X0SHqKJpkqeiRTRY+kp2iSqaJH0lM0yVTRJFPFk2Sq+EnHWOMYaxxjjYt/XEWTTBVNMlU0yVTRJFNFk0wVTTJV9Eimih5JT9Ek/0/HWOMYaxxjjYuHE0lP0SRTRY+kp2iSqaJJpooeSU/RJFNFk0wVTTJVNMlU0SRTRY+kp2iSqeKbjrHGMdY4xhoXDyeSqaJH0lM0yVTRJFNFk/QUTTJVNMlU0SRTRY+kp2iSqaJJpooeSU/RJD1Fk0wVT46xxjHWOMYaFw8nkp6iSaaKJukpmmSqaJKpokl6iiaZKppkqmiSqaJJpooeSU/RJD1Fk0wVTTJV9Eh6im86xhrHWOMYa1z8WEWTTBVNMlU0yVTRJFNFk0wVTTJV9Eh6iiaZKnokU0WTTBU9kp6iSaaKJpkqeiRTxZNjrHGMNY6xxsXDiWSquKtokqmiSaaKJpkqmmSqaJKpokmmih5JT9EkU0WTTBU9kp6iSaaKJpkqnhxjjWOscYw1Lh5OJH9TRY+kp2iSqaJJpooeSU/RJD1Fk0wVTTJV9Eimih5JT9EkU8U3HWONYyxwjDUuvqyKb5L0FE0yVTTJVNEkU0WTTBU9kp6iSaaKJpkqeiRTRZNMFU+SqeKbjrHGMdY4xhoXPyaZKp5IpooeSU/RJD1Fk0wVPZKpokl6iiaZKnokPUWTTBU/6RhrHGONY6xx8cskU0WPpKdokqmiR9JTNMlU0SRTRY+kp2iSqaJH0lP8pGOscYw1jrHGxS+T9BRNMlU0yVTRI+kpmmSqaJKpokl6iiaZKppkqmiSqeInHWONY6xxjDUufkzym1X0SHqKJpkqeiQ9RZP0FE0yVTTJVPEkmSq+6RhrHGONY6xx8WUV/0+SnqJJpooeSU/RJD1Fk0wVTTJVNMlU8U3HWOMYaxxjjX/8A/u/URgJzKYnAAAAAElFTkSuQmCC';
      
      set({ isLoading: false });
      return qrCode;
    } catch (error) {
      set({ error: "Failed to generate QR code. Please try again.", isLoading: false });
      return '';
    }
  },
}));
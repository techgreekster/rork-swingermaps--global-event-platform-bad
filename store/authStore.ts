import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types';
import { mockUsers } from '@/mocks/users';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithSocial: (provider: 'facebook' | 'google') => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock authentication
          const user = mockUsers.find(u => u.email === email);
          
          if (user) {
            set({ user, isAuthenticated: true, isLoading: false });
          } else {
            set({ error: "Invalid email or password", isLoading: false });
          }
        } catch (error) {
          set({ error: "Login failed. Please try again.", isLoading: false });
        }
      },
      
      loginWithSocial: async (provider) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Mock social authentication
          const user = mockUsers[0]; // Just use the first mock user
          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ error: `${provider} login failed. Please try again.`, isLoading: false });
        }
      },
      
      signup: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Create a new user
          const newUser: User = {
            id: `user-${Date.now()}`,
            name,
            email,
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            rating: 0,
            isHost: false,
            joinedDate: new Date().toISOString().split('T')[0],
          };
          
          set({ user: newUser, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ error: "Signup failed. Please try again.", isLoading: false });
        }
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      
      updateProfile: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          set(state => ({
            user: state.user ? { ...state.user, ...userData } : null,
            isLoading: false
          }));
        } catch (error) {
          set({ error: "Profile update failed. Please try again.", isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
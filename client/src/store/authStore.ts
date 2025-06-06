import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      login: async (token: string) => {
        set({ isLoading: true, error: null });
        try {
          // In a real app, validate the token on the server
          localStorage.setItem('token', token);
          set({ token, isAuthenticated: true, isLoading: false });
          await get().fetchUser();
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to login', 
            isLoading: false 
          });
        }
      },
      
      logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, isAuthenticated: false });
      },
      
      fetchUser: async () => {
        const { token } = get();
        if (!token) return;
        
        set({ isLoading: true, error: null });
        try {
          // In a real app, fetch user data from API
          // Mock user data for now
          const mockUser: User = {
            id: '1',
            name: 'Test User',
            email: 'test@example.com',
            avatar: 'https://i.pravatar.cc/150?u=test@example.com',
          };
          
          set({ user: mockUser, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch user', 
            isLoading: false 
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token }),
    }
  )
);

export default useAuthStore;
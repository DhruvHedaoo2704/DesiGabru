import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import * as api from '../services/api';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      loading: false,

      setAuth: (user, token) => {
        localStorage.setItem('token', token);
        set({ user, token });
      },

      login: async (email, password) => {
        set({ loading: true });
        try {
          const { data } = await api.login({ email, password });
          get().setAuth(data.user, data.token);
          return { success: true };
        } catch (err) {
          return { success: false, message: err.response?.data?.message || 'Login failed' };
        } finally {
          set({ loading: false });
        }
      },

      register: async (name, email, password) => {
        set({ loading: true });
        try {
          const { data } = await api.register({ name, email, password });
          get().setAuth(data.user, data.token);
          return { success: true };
        } catch (err) {
          return { success: false, message: err.response?.data?.message || 'Registration failed' };
        } finally {
          set({ loading: false });
        }
      },

      fetchUser: async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
          const { data } = await api.getMe();
          set({ user: data.user, token });
        } catch {
          get().logout();
        }
      },

      logout: async () => {
        try {
          await api.logout();
        } catch {
          /* ignore */
        }
        localStorage.removeItem('token');
        set({ user: null, token: null });
      },
    }),
    { name: 'auth-storage', partialize: (s) => ({ token: s.token, user: s.user }) }
  )
);

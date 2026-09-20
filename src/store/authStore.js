import { create } from 'zustand';

const UNAUTHENTICATED = {
  user: null,
  isAuthenticated: false,
  token: null,
  loading: false,
};

const isTokenExpired = (token) => {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64));
    return typeof payload?.exp === 'number' && payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

const loadAuthState = () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return { ...UNAUTHENTICATED };

    if (isTokenExpired(token)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return { ...UNAUTHENTICATED };
    }

    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return { user, isAuthenticated: true, token, loading: false };
  } catch {
    return { ...UNAUTHENTICATED };
  }
};

export const useAuthStore = create((set, get) => ({
  ...loadAuthState(),

  loginSuccess: ({ user, token }) => {
    set({
      user,
      token: token ?? null,
      isAuthenticated: true,
      loading: false,
    });
    try {
      if (token) localStorage.setItem('token', token);
      if (user != null) localStorage.setItem('user', JSON.stringify(user));
    } catch {
      // ignore storage failures
    }
  },

  logout: () => {
    set({ ...UNAUTHENTICATED });
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch {
      // ignore
    }
  },

  setLoading: (loading) => set({ loading }),

  updateUser: (patch) => {
    const next = { ...get().user, ...patch };
    set({ user: next });
    try {
      localStorage.setItem('user', JSON.stringify(next));
    } catch {
      // ignore
    }
  },
}));

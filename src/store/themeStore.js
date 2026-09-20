import { create } from 'zustand';

const DEFAULT_PRIMARY = '#3B82F6';

const getSavedTheme = () => {
  try {
    return localStorage.getItem('theme') || 'light';
  } catch {
    return 'light';
  }
};

const applyModeToDom = (mode) => {
  document.documentElement.classList.toggle('dark', mode === 'dark');
};

const applyPrimaryColor = (color) => {
  document.documentElement.style.setProperty('--color-primary', color);
};

const initialMode = getSavedTheme();
applyModeToDom(initialMode);
applyPrimaryColor(DEFAULT_PRIMARY);

export const useThemeStore = create((set, get) => ({
  mode: initialMode,
  primaryColor: DEFAULT_PRIMARY,

  toggleTheme: () => {
    const mode = get().mode === 'light' ? 'dark' : 'light';
    set({ mode });
    try {
      localStorage.setItem('theme', mode);
    } catch {
      // ignore
    }
    applyModeToDom(mode);
  },

  setTheme: (mode) => {
    set({ mode });
    try {
      localStorage.setItem('theme', mode);
    } catch {
      // ignore
    }
    applyModeToDom(mode);
  },

  setPrimaryColor: (primaryColor) => {
    set({ primaryColor });
    applyPrimaryColor(primaryColor);
  },
}));

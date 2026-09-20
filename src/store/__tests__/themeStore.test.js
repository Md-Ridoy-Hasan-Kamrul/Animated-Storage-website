import { useThemeStore } from '../themeStore';

beforeEach(() => {
  localStorage.clear();
  useThemeStore.setState({ mode: 'light', primaryColor: '#3B82F6' });
  document.documentElement.classList.remove('dark');
});

describe('themeStore', () => {
  describe('toggleTheme', () => {
    it('switches light → dark', () => {
      useThemeStore.getState().toggleTheme();
      expect(useThemeStore.getState().mode).toBe('dark');
      expect(localStorage.getItem('theme')).toBe('dark');
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('switches dark → light', () => {
      useThemeStore.setState({ mode: 'dark' });
      useThemeStore.getState().toggleTheme();
      expect(useThemeStore.getState().mode).toBe('light');
      expect(localStorage.getItem('theme')).toBe('light');
    });
  });

  describe('setTheme', () => {
    it('sets mode to dark', () => {
      useThemeStore.getState().setTheme('dark');
      expect(useThemeStore.getState().mode).toBe('dark');
    });

    it('sets mode to light', () => {
      useThemeStore.setState({ mode: 'dark' });
      useThemeStore.getState().setTheme('light');
      expect(useThemeStore.getState().mode).toBe('light');
    });
  });

  describe('setPrimaryColor', () => {
    it('updates the primary color', () => {
      useThemeStore.getState().setPrimaryColor('#FF0000');
      expect(useThemeStore.getState().primaryColor).toBe('#FF0000');
    });
  });
});

import { useAuthStore } from '../authStore';

const unauthenticated = {
  user: null,
  isAuthenticated: false,
  token: null,
  loading: false,
};

beforeEach(() => {
  localStorage.clear();
  useAuthStore.setState({ ...unauthenticated });
});

describe('authStore', () => {
  describe('loginSuccess', () => {
    it('sets user, token, and isAuthenticated', () => {
      useAuthStore.getState().loginSuccess({
        user: { id: 1, email: 'a@b.com' },
        token: 'access.token',
      });
      const state = useAuthStore.getState();
      expect(state.isAuthenticated).toBe(true);
      expect(state.token).toBe('access.token');
      expect(state.user).toEqual({ id: 1, email: 'a@b.com' });
      expect(state.loading).toBe(false);
      expect(localStorage.getItem('token')).toBe('access.token');
    });
  });

  describe('logout', () => {
    it('clears user, token, and isAuthenticated', () => {
      useAuthStore.setState({
        user: { id: 42, email: 'user@example.com' },
        isAuthenticated: true,
        token: 'some.jwt.token',
        loading: false,
      });
      useAuthStore.getState().logout();
      const state = useAuthStore.getState();
      expect(state.isAuthenticated).toBe(false);
      expect(state.token).toBeNull();
      expect(state.user).toBeNull();
      expect(localStorage.getItem('token')).toBeNull();
    });
  });

  describe('setLoading', () => {
    it('sets loading to true and false', () => {
      useAuthStore.getState().setLoading(true);
      expect(useAuthStore.getState().loading).toBe(true);
      useAuthStore.getState().setLoading(false);
      expect(useAuthStore.getState().loading).toBe(false);
    });
  });

  describe('updateUser', () => {
    it('merges new fields into existing user', () => {
      useAuthStore.setState({
        user: { id: 42, email: 'user@example.com' },
        isAuthenticated: true,
        token: 't',
        loading: false,
      });
      useAuthStore.getState().updateUser({ name: 'Jane' });
      expect(useAuthStore.getState().user).toEqual({
        id: 42,
        email: 'user@example.com',
        name: 'Jane',
      });
    });
  });
});

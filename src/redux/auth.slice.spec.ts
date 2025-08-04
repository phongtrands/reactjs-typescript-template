import authSlice from './auth.slice';

const { actions, reducer } = authSlice;

describe('authSlice', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should return the initial state', () => {
    const initialState = reducer(undefined, { type: '' });
    expect(initialState.isAuthenticated).toBe(false);
    expect(initialState.user).toEqual({
      id: '',
      name: '',
      email: '',
      roles: '',
      tenantId: '',
    });
    expect(initialState.token).toBeNull();
  });

  it('should handle login and store token in localStorage', () => {
    const token = 'fake-token';

    const newState = reducer(undefined, actions.login(token));

    expect(newState.token).toBe(token);
    expect(localStorage.getItem('token')).toBe(token);
  });

  it('should handle logout and remove token from localStorage', () => {
    const stateWithToken = { ...reducer(undefined, { type: '' }), token: 'fake-token' };
    localStorage.setItem('token', 'fake-token');

    const newState = reducer(stateWithToken, actions.logout());

    expect(newState.token).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
  });
});

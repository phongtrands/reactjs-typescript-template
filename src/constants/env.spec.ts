import { API_BASE_URL } from './env';

describe('env constants', () => {
  it('should return mocked API_BASE_URL', () => {
    expect(API_BASE_URL).toBe('https://mock-api.example.com');
  });
});

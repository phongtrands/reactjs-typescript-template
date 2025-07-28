import { PublicClientApplication, type AuthenticationResult } from '@azure/msal-browser';
import { jwtDecode } from 'jwt-decode';

import { loginRequest, msalConfig } from '~/configs/auth.config';

interface JwtPayload {
  exp: number;
}

const msalInstance = new PublicClientApplication(msalConfig);

export const getValidAccessToken = async (): Promise<string> => {
  const account = msalInstance.getAllAccounts()[0];
  if (!account) {
    throw new Error('No active account');
  }

  try {
    const response: AuthenticationResult = await msalInstance.acquireTokenSilent({
      ...loginRequest,
      account,
    });

    const token = response.accessToken;

    if (isTokenExpired(token)) {
      throw new Error('Token expired');
    }

    return token;
  } catch (error) {
    console.warn('Token fetch failed, redirecting login');
    await msalInstance.loginRedirect(loginRequest);
    throw error;
  }
};

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;
  } catch {
    return true;
  }
};

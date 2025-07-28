export interface User {
  id?: string;
  name?: string;
  email?: string;
  roles?: string;
  tenantId?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

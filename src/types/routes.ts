export type Role = 'admin' | 'researcher' | 'customer';

export interface RouteConfig {
  path: string;
  component?: string;
  authority: Role[];
  routes?: RouteConfig[];
}

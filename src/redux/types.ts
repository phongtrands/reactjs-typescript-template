export interface InitialState {
  original: {
    home: {
      customer: string | null;
      total: number | null;
    };
    user: {
      name: string | null;
      role: string | null;
    };
  };
  updated: {
    home: {
      customer: string | null;
      total: number | null;
    };
    user: {
      name: string | null;
      role: string | null;
    };
  };
  token: '';
}

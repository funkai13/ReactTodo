export interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

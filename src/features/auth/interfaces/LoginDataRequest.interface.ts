export interface LoginDataRequest {
  email: string;
}

export interface LoginResponse {
  data: Login;
  token: string;
}

export interface Login {
  token: string;
}

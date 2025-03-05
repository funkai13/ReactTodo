export interface LoginDataRequest {
  email: string;
}

export interface ILoginRespose {
  data: ILogin;
}

export interface ILogin {
  token: string;
}

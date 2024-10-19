type AuthFormRequest = {
  username: string;
  password: string;
}

type AuthFormResponse = {
  success: boolean;
  token?: string;
}

export type { AuthFormRequest, AuthFormResponse };
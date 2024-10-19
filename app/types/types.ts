// For zustand
type User = {
  username: string,
  password: string
}

type AuthFormRequest = {
  username: string;
  password: string;
}

type AuthFormResponse = {
  success: boolean;
  token?: string;
}

type PasswordChange = { 
  oldPassword: string;
  newPassword: string;
}

export type { AuthFormRequest, AuthFormResponse, PasswordChange };
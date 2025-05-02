import { EGender, User } from "./model";

export interface LoginCredentials {
    email: string
    password: string
  }
export interface RegisterFormData {
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    birthday: string;
    gender: EGender;
}

export type UserAuth = Omit<User, 'phoneNumber' | 'birthday'>
export type Token = {
  accessToken: string
  refreshToken: string
}

export interface AuthResponse {
  tokens: Token
  user: UserAuth
}

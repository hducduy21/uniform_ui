import { CategoryDetailType, EGender, ProductStatus, ProductVariantType, SizesType, User } from './model';

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
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

export type UserAuth = Omit<User, 'phoneNumber' | 'birthday'>;
export type Token = {
  accessToken: string;
  refreshToken: string;
};

export interface AuthResponse {
  tokens: Token;
  user: UserAuth;
}

export type CategoryRequest = Pick<CategoryDetailType, 'name' | 'description' | 'status'> & {
  parent: number;
};

export type SizeRequest = Omit<SizesType, 'id'>;

export type ProductRequest = {
  code: string;
  name: string;
  material?: string;
  description?: string;
  status?: ProductStatus;
  price: number;
  sizeTypeId: number;
  hexColors?: string[];
  categoryIds: number[];
};

export type UserFilter = {
  email?: string;
  phoneNumber?: string;
  enabled?: boolean;
  locked?: boolean;
};

export type PagingParams = {
  page: number;
  size: number;
};

export type QueryParams = {
  filters: Object;
  pagination?: { page: number; size: number };
};

export type ProductVariantRequest = Pick<ProductVariantType, 'id' | 'costPrice'> 

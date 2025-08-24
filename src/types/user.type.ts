
export type TUserRole = "SUPER_ADMIN" | "ADMIN" | "SENDER" | "RECEIVER";

export type IsActive = 'ACTIVE' | 'INACTIVE' | 'BLOCKED';

export interface AuthProvider {
  provider: "google" | "credentials";
  providerId: string;
};

export interface IUserPackage {
  _id: string
  name: string
  email: string
  password?: string
  phone?: string
  picture?: string
  address?: string
  isVerified?: boolean
  isActive?: IsActive
  isBlocked?: boolean
  isDeleted?: string
  role: TUserRole
  auths: AuthProvider[]
  createdAt?: Date
};
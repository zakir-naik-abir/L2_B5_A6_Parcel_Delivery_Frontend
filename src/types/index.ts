import type { ComponentType } from "react";

export type { ISendOtp, IVerifyOtp, ILogin } from './auth.type';

export type { IParcelPackage } from "./parcel.type"

export interface IResponse<T>{
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
};

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[]
};

export type TUserRole = "SUPER_ADMIN" | "ADMIN" | "SENDER" | "RECEIVER";

type ZodIssue = {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
};

type ErrorSource = {
  path: string;
  message: string;
};

export interface IErrorResponse {
  success: boolean;
  message: string;
  errorSources?: ErrorSource[];
  err?: {
    issues: ZodIssue[];
    name: string;
  };
  stack?: string
};
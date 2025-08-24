import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TUserRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TUserRole) => {
  return function AuthWrapper() {
    const { data , isLoading } = useUserInfoQuery(undefined);

    if(!isLoading && !data?.data?.email){
      return <Navigate to={'/unauthorized'}/>
    }

    if(requiredRole && !isLoading && requiredRole !== data?.data?.role){
      return <Navigate to={'/unauthorized'}/>
    }
    
    return <Component/>
  }
};
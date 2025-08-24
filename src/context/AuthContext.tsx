// // src/context/AuthContext.tsx
// import React, { createContext, useState, useContext, type ReactNode,  } from 'react';
// import { type TUserRole } from '../types';

// interface AuthContextType {
//   role: TUserRole;
//   setRole: (role: TUserRole) => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [role, setRole] = useState<TUserRole>('SUPER_ADMIN'); // Default role

//   return (
//     <AuthContext.Provider value={{ role, setRole }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
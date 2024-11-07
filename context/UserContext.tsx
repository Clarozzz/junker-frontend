// UserContext.tsx
import { createContext, useContext, ReactNode } from "react";

interface UserContextType {
  userData: Usuario | undefined;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};

export function UserProvider({
  children,
  userData,
  loading,
}: {
  children: ReactNode;
  userData: Usuario | undefined;
  loading: boolean;
}) {
  return (
    <UserContext.Provider value={{ userData, loading }}>
      {children}
    </UserContext.Provider>
  );
}

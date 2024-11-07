'use client'

import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getUser } from "@/app/api/usuarios";

export const UserContext = createContext<{
  userData: Usuario | null;
  setUserData: React.Dispatch<React.SetStateAction<Usuario | null>>;
}>({
  userData: null,
  setUserData: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<Usuario | null>(null);

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token && !userData) {
      const loadUserData = async () => {
        try {
          const data = await getUser(token);
          setUserData(data);
        } catch {
          setUserData(null);
        }
      };
      loadUserData();
    }
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

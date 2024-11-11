'use client'

import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getUser } from "@/app/api/usuarios";

export const UserContext = createContext<{
  userData: Usuario | null;
  setUserData: React.Dispatch<React.SetStateAction<Usuario | null>>;
  loading: boolean;
}>({
  userData: null,
  setUserData: () => {},
  loading: true,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token && !userData) {
      const loadUserData = async () => {
        try {
          const data = await getUser(token);
          setUserData(data);
        } catch {
          setUserData(null);
        } finally {
          setLoading(false);
        }
      };
      loadUserData();
    } else {
      setLoading(false);
    }
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, setUserData, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

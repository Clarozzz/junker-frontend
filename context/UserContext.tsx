'use client';

import React, { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "@/app/api/usuarios";
import { readUser } from "@/app/api/server";

export const UserContext = createContext<{
  userData: Usuario | null;
  setUserData: React.Dispatch<React.SetStateAction<Usuario | null>>;
  loading: boolean;
}>({
  userData: null,
  setUserData: () => { },
  loading: true,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const { data: { user } } = await readUser()
        if (!user) {
          throw new Error("Error al obtener el usuario");
        }

        const usuario = await getUser(user.id)
        if (usuario) {
          setUserData(usuario)
        }
      } catch {
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);


'use client'

import { useEffect, useState } from "react";
import DangerZone from "../components/danger-zone";
import PassChange from "../components/pass-change";
import { readUser } from "@/app/api/server";
import { getUser } from "@/app/api/usuarios";

export default function Password() {
  const [userData, setUserData] = useState<Usuario | null>(null);

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
          }
      };

      loadUserData();
  }, []);
  
  return (
    <div className="space-y-8">
      <PassChange id={userData?.id ?? ''} />
      <DangerZone />
    </div>
  )
}
import { useEffect } from "react";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/keep-alive`;

const useKeepAlive = () => {
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
        } else {
          console.error("Error al llamar al servicio:", response.statusText);
        }
      } catch (error) {
        console.error("Error en la conexión:", error);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);
};

export default useKeepAlive;

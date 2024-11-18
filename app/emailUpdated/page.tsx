'use client'

import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

export default function EmailUpdated() {
  return (
    <>
      <div className="relative h-screen w-full overflow-hidden bg-gray-100">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/2 -left-1/4 h-[800px] w-[800px] rounded-full bg-blue-300 blur-3xl opacity-40"
            animate={{
              scale: [1, 1.2, 1],
              y: ["0%", "-50%", "-100%", "-25%", "0%"],
              x: ["0%", "50%", "75%", "100%", "50%", "0%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute -right-1/4 bottom-1/2 h-[800px] w-[800px] rounded-full bg-purple-300 blur-3xl opacity-40"
            animate={{
              scale: [1, 1.2, 1],
              y: ["0%", "50%", "100%", "50%", "0%"], // Movimiento en el eje Y
              x: ["0%", "-50%", "-75%", "-100%", "-50%", "0%"], // Movimiento en el eje X
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }}
          />
        </div>
        <div className="relative z-10 flex flex-col space-y-4 h-full items-center justify-center">
          <div className="text-4xl font-semibold text-green-500">
            <FaCheckCircle size={100} />
          </div>
          <p className="text-xl font-bold montserrat">
            Tu correo ha sido actualizado exitosamente!
          </p>
          <div className="text-md text-gray-700">
            Ya puedes cerrar esta ventana
          </div>
        </div>
      </div>
    </>
  )
}

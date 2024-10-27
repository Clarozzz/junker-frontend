
import { Card } from "@/components/ui/card";
import { useState } from "react";

export default function Categorias() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const items = [
    { title: "Accesorios internos", description: "Rendimiento optimizado para una experiencia rápida", image: "/images/landing3.jpg" },
    { title: "Iluminación", description: "Almacenamiento seguro en la nube para tus datos", image: "/images/landing3.jpg" },
    { title: "Motor y transmisión", description: "Protección avanzada contra amenazas", image: "/images/landing3.jpg" },
    { title: "Frenos y discos", description: "Experiencia perfecta en dispositivos móviles", image: "/images/landing3.jpg" },
    { title: "Neumaticos y llantas", description: "Conecta con usuarios de todo el mundo", image: "/images/landing3.jpg" },
    { title: "Carrocería", description: "Asistencia 24/7 para todas tus necesidades", image: "/images/landing3.jpg" },
  ];

  return (
    <div className="w-full mx-auto lg:px-28 2xl:px-56 px-6 bg-custom-beige py-12 text-custom-blue">
      <div className="grid space-y-4 mb-12">
        <h1 className="text-5xl montserrat font-bold">
          Características
        </h1>
        <h2 className="text-2xl">
          Explora produtos por categorías
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <Card
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`group overflow-hidden relative transition-all duration-300 ease-in-out hover:shadow-lg ${index % 3 === 0
              ? "lg:col-span-2 lg:row-span-2 h-[375]"
              : "h-[250]"
              } cursor-pointer ${hoveredIndex !== null && hoveredIndex !== index ? "blur-sm scale-[0.98]" : ""
              }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${item.image})` }}
            ></div>

            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-80 transition-opacity duration-300"></div>

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

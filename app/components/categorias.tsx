import { FocusCards } from "@/components/ui/cards-categorias";

export default function Categorias() {
  const cards = [
    {
      title: "Accesorios Internos",
      src: "/images/rines.webp",
    },
    {
      title: "Accesorios Externos",
      src: "/images/rines.webp",
    },
    {
      title: "Motor y transmision",
      src: "/images/rines.webp",
    },
    {
      title: "Frenos y suspensión",
      src: "/images/rines.webp",
    },
    {
      title: "Neumaticos y Llantas",
      src: "/images/rines.webp",
    },
    {
      title: "Otros",
      src: "/images/rines.webp",
    },
  ];

  return <FocusCards cards={cards} />;
}

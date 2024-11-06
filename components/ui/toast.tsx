import { ToastContainer, toast, ToastOptions, ToastContainerProps } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ToastVariant = "info" | "success" | "warning" | "error" | "destructive";

interface ToastProps {
  title: string;
  description: string;
  variant?: ToastVariant;
}

export const useToast = () => {
  const showToast = ({ title, description, variant = "info" }: ToastProps) => {
    const toastOptions: ToastOptions = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    };

    // Aquí se personalizan los estilos según el tipo de variante
    switch (variant) {
      case "success":
        toast.success(<><strong>{title}</strong><br />{description}</>, toastOptions);
        break;
      case "warning":
        toast.warn(<><strong>{title}</strong><br />{description}</>, toastOptions);
        break;
      case "error":
        toast.error(<><strong>{title}</strong><br />{description}</>, toastOptions);
        break;
      case "destructive":
        toast.error(<><strong>{title}</strong><br />{description}</>, {
          ...toastOptions,
          className: "bg-red-600 text-white", // Personaliza la clase para el toast destructivo
        });
        break;
      default:
        toast.info(<><strong>{title}</strong><br />{description}</>, toastOptions);
        break;
    }
  };

  return { showToast };
};

// Este componente se monta en el root para manejar los toasts
const ToastProvider: React.FC<ToastContainerProps> = (props) => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      {...props}
    />
  );
};

export { ToastProvider };
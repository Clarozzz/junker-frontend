
import axios from 'axios'

export const getUser = async (user_id: string): Promise<Usuario> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/usuarios/getUser/${user_id}`;

    try {
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        throw new Error(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
};

export const registerUser = async (userData: { id: string, nombre: string, apellido: string, email: string }): Promise<string> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/register`;

    try {
        const res = await axios.post(url, userData);
        return res.data.message;
    } catch (error) {
        throw new Error(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
};

export const updateUser = async (id: string, userData: object): Promise<Usuario> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/usuarios/updateUser/${id}`;

    try {
        const res = await axios.put(url, userData);
        return res.data;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
};

export const updateDescripcion = async (id: string, descripcion: string) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/usuarios/updateDescripcion/${id}`;

    try {
        const res = await axios.put(url, { descripcion },);
        return res.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.detail || "Error enviando el correo")
        } else {
            throw new Error("Ocurrio algo inesperado")
        }
    }
}

export async function uploadAvatarUser({ file }: { file: File }) {
    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append(
            "upload_preset",
            process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? ""
        );
        formData.append(
            "cloud_name",
            process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? ""
        );

        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
            }/image/upload`,
            formData
        );

        return response.data.secure_url;
    } catch (error) {
        console.error("Error al subir a cloudinary:", error);
        throw error;
    }
}

export async function getProductosVendedor(id: string, limit: number, offset: number) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/usuarios/getProductosVendedor/${id}?limit=${limit}&offset=${offset}`;

    try {
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        throw new Error(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
}

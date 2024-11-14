import axios from 'axios'

export const getUser = async (token: string): Promise<Usuario> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/usuarios/getUser`;

    try {
        const res = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        return res.data;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
};

export const updateUser = async (id: string, token: string, userData: object): Promise<Usuario> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/usuarios/updateUser/${id}`;

    try {
        const res = await axios.put(url, userData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
};

export const updateEmail = async (id: string, token: string, email: string) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/usuarios/updateEmail/${id}`;

    try {
        const res = await axios.put(url, { email }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.detail || "Error enviando el correo")
        } else {
            throw new Error("Ocurrio algo inesperado")
        }
    }
}

export const updateDescripcion = async (id: string, token: string, descripcion: string) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/usuarios/updateDescripcion/${id}`;

    try {
        const res = await axios.put(url, { descripcion }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
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

export const verifyPass = async (id: string, token: string, updatePass: UpdatePassword) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/usuarios/verifyPassword/${id}`;

    try {
        const res = await axios.post(url, updatePass , {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.detail || "Error verificando la contrasena")
        } else {
            throw new Error("Ocurrio algo inesperado")
        }
    }
}
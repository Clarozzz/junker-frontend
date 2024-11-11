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
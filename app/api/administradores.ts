
import axios from 'axios'
import { readUser } from './server';


export const getUsuario = async (user_id: string): Promise<UsuarioRoles> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/usuarios/roles/${user_id}`;

    try {
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        throw new Error(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
};

export const updateUser = async (id: string, userData: object): Promise<UsuarioRoles> => {
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



export const getUsuarios = async (
  page: number, 
  limit: number, 
  nombre: string | null = null, 
  apellido: string | null = null, 
  email: string | null = null, 
  rol: string | null = null, 
  search_query: string = "", 
  sort_asc: boolean | null = null
): Promise<UsuariosResponse> => {
    try {
      const response = await axios.get<UsuariosResponse>(`${process.env.NEXT_PUBLIC_API_URL}/usuarios/filter`, {
        params: {
          page,
          limit,
          nombre,
          apellido,
          rol,
          email,
          search_query,
          sort_asc
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error en getUsuarios:", error);
      throw error;
    }
  };


  export async function getPermissionsAndUser ({
    rolNecesario
  }: {
    rolNecesario: RolesPermissons
  }) {
    // Comprobar si hay una sesión activa
    const {
      data: { user }
    } = await readUser()
    if (!user) {
      return {
        permissions: false,
        message: 'No hay sesión activa',
        errorCode: 401
      }
    }
  
    const usuario = await getUsuario(user.id )
  
    if (!usuario) {
      return {
        permissions: false,
        message: 'No se encontró el usuario',
        errorCode: 404
      }
    }
  
    const permiso = usuario.roles_usuarios.some((rolUsuario) =>
        rolNecesario.includes(rolUsuario.roles.nombre as RolesPermissons)
      );
  
    if (!permiso) {
      return {
        permissions: false,
        message: 'No tienes permisos para acceder a esta página',
        errorCode: 403
      }
    }
  
    // Si todo está bien, devolvemos el usuario
    return {
      permissions: true,
      message: 'Cuenta con los permisos',
      errorCode: 200,
      usuario
    }
  }


  export const getRoles = async (): Promise<Roles[]> => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/roles`);
      return response.data;
    } catch (error) {
      console.error("Error en getRoles:", error);
      throw error; 
    }
  };

  export const asignarRol = async (RolData: AsignarRol): Promise<string> => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/rol`;

    try {
        const response = await axios.post(url, RolData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return response.data.message;
    } catch (error) {
        throw new Error(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
};
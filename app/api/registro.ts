
import axios from 'axios';
import Cookies from 'js-cookie';

interface RegisterData {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  message: string;
  access_token: string;
  refresh_token: string;
}

interface ValidationError {
  detail: Array<{
    type: string;
    loc: string[];
    msg: string;
    input: string;
    ctx: {
      error: Record<string, unknown>;
    };
  }>;
}

interface SupabaseError {
  detail: string;
}

export const registro = async (userData: RegisterData): Promise<RegisterResponse> => {
  try {
    const response = await axios.post<RegisterResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const { access_token, refresh_token } = response.data;
    Cookies.set('access_token', access_token, { expires: 7 });
    Cookies.set('refresh_token', refresh_token, { expires: 7 });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // * Manejo de error 400
      if (error.response.status === 400) {
        const errorData = error.response.data as SupabaseError;
        throw new Error(errorData.detail.replace('Supabase error: ', ''));
      }
      
      // * Manejo para error 422
      const errorData = error.response.data as ValidationError;
      if (errorData.detail && Array.isArray(errorData.detail) && errorData.detail.length > 0) {
        const errorMessage = errorData.detail[0].msg
          .replace('Value error, ', '')
          .replace('Value error,', '')
          .replace('Value error', '');
        const cleanMessage = errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
        throw new Error(cleanMessage);
      }
    }
    throw new Error('Error en el registro');
  }
};
/* eslint-disable @typescript-eslint/no-explicit-any */

// resetPassword.ts
import axios from 'axios';

interface ResetPasswordResponse {
  message: string;
}

export const resetPassword = async (email: string): Promise<ResetPasswordResponse> => {
  try {
    const response = await axios.post<ResetPasswordResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/new-reset`,
      { email },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.detail || 'Error al cambiar la contraseña';
    throw new Error(errorMessage);
  }
};

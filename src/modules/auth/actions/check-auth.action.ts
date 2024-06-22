import { tesloApi } from "@/api/tesloApi";
import type { LoginError, LoginSuccess } from "@/modules/common/interfaces/auth.interface";
import type { AuthResponse } from "../interfaces";
import { isAxiosError } from "axios";


export const checkAuthAction = async (): Promise<LoginSuccess | LoginError> => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return {
                ok: false,
                message: 'No token found',
            };
        }
        const { data } = await tesloApi.get<AuthResponse>('/auth/check-status');
        return {
            ok: true,
            user: data.user,
            token: data.token,
        };
    }
    catch (error) {
        if (isAxiosError(error) && error.response?.status === 401) {
            return {
                ok: false,
                message: error.response?.data.message,
            };
        }
        throw new Error('An error occurred while checking the authentication status');
    }
}
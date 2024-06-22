import { tesloApi } from "@/api/tesloApi";
import { isAxiosError } from "axios";
import type { AuthResponse } from "../interfaces";



export const registerAction = async (name: string, email: string, password: string) => {
    try {
        const { data } = await tesloApi.post<AuthResponse>('/auth/register', { fullName: name, email, password });
        return {
            ok: true,
            user: data.user,
            token: data.token
        };
    }
    catch (error) {
        if (isAxiosError(error) && error.response?.status === 400) {
            return {

                ok: false,
                message: error.response.data.message.join(',')
            }
        }
        throw new Error('An error occurred while trying to register');
    }
}
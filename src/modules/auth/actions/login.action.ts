import { tesloApi } from "@/api/tesloApi"
import type { AuthResponse, User } from "../interfaces";
import { isAxiosError } from "axios";
import type { LoginError, LoginSuccess } from "@/modules/common/interfaces/auth.interface";




export const loginAction = async (email: string, password: string): Promise<LoginSuccess | LoginError> => {
    try {        
        const { data } = await tesloApi.post<AuthResponse>('/auth/login', { email, password });
        return {
            ok: true,
            user: data.user,
            token: data.token
        };
    }
    catch (error) {                
        if (isAxiosError(error) && error.response?.status === 401) {            
            return {
                ok: false,
                message: 'Invalid credentials'
            }
        }
        throw new Error('An error occurred while trying to login');


    }

}
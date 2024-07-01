import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { AuthStatus, type User } from "../interfaces";
import { checkAuthAction, loginAction } from "../actions";
import { useLocalStorage } from "@vueuse/core";
import { registerAction } from "../actions/register.action";
import type { LoginSuccess } from "@/modules/common/interfaces/auth.interface";



export const useAuthStore = defineStore('auth', () => {
    const authStatus = ref<AuthStatus>(AuthStatus.Checking)
    const user = ref<User | undefined>(undefined);
    const token = ref(useLocalStorage("token", ""));

    const logOut = () => {
        localStorage.removeItem("token");
        authStatus.value = AuthStatus.Unauthenticated;
        user.value = undefined;
        token.value = "";

    }
    const register = async (name: string, email: string, password: string) => {
        try {
            const registerResponse = await registerAction(name, email, password);
            if (!registerResponse.ok) {
                return { ok: false, mensaje: registerResponse.message };
            }
            const respSuccess = registerResponse as LoginSuccess;
            authStatus.value = AuthStatus.Authenticated;
            user.value = respSuccess.user;
            token.value = respSuccess.token;
            return { ok: true, mensaje: "Usuario registrado correctamente" };
        } catch (error) {
            logOut();
            return { ok: false, mensaje: "Error al registrar usuario" };
        }
    }

    const logIn = async (email: string, password: string) => {
        try {
            const loginResponse = await loginAction(email, password);
            if (!loginResponse.ok) {
                authStatus.value = AuthStatus.Unauthenticated;
                logOut();
                return false;

            }
            const respSuccess = loginResponse as LoginSuccess;
            authStatus.value = AuthStatus.Authenticated;
            user.value = respSuccess.user;
            token.value = respSuccess.token;
            return true

        } catch (error) {
            logOut();
            return false;
        }
    }

    const checkAuthStatus = async (): Promise<boolean> => {
        try {
            const statusResponse = await checkAuthAction();
            if (!statusResponse.ok) {
                authStatus.value = AuthStatus.Unauthenticated;
                logOut();
                return false;
            }
            authStatus.value = AuthStatus.Authenticated;
            const res = statusResponse as LoginSuccess;
            user.value = res.user;
            token.value = res.token;
            return true;

        } catch (error) {
            authStatus.value = AuthStatus.Unauthenticated;
            logOut();
            return false;
        }

    }

    return {
        user,
        token,
        authStatus,
        //
        isChecking: computed(() => authStatus.value === AuthStatus.Checking),
        isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),
        isUnauthenticated: computed(() => authStatus.value === AuthStatus.Unauthenticated),
        username: computed(() => user.value?.fullName),
        logIn,
        logOut,
        register,
        checkAuthStatus,
        isAdmin: computed(() => user.value?.roles.includes("admin") ?? false)

    }

});
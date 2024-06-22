import type { User } from "@/modules/auth/interfaces";

export interface LoginError {
    ok: boolean;
    message: string;
}

export interface LoginSuccess {
    ok: boolean;
    user: User;
    token: string;
}
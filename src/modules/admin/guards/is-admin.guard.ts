
import { useAuthStore } from '@/modules/auth/store/auth.store';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';


const isAdminGuard = async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
) => {
    const authStore = useAuthStore();
    await authStore.checkAuthStatus();

    return (!authStore.isAdmin) ? next({ name: 'home' }) : next();

};

export default isAdminGuard;



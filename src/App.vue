<template>
  <Spinner v-if="authStore.isChecking" />
  <RouterView v-else />
  <VueQueryDevtools />
</template>

<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { useAuthStore } from '@/modules/auth/store/auth.store';
import { AuthStatus } from './modules/auth/interfaces';
import { useRoute, useRouter } from 'vue-router';
import Spinner from './icons/Spinner.vue';


const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

authStore.$subscribe((_, state) => {
  if (state.authStatus == AuthStatus.Checking) {
    authStore.checkAuthStatus();
    return;
  }
  if (route.path.includes('/auth') && state.authStatus === AuthStatus.Authenticated) {
    router.replace({ name: 'home' });
    return;
  }
  if (state.authStatus === AuthStatus.Unauthenticated) {
    router.replace({ name: 'login' });
    return;
  }


}, { immediate: true });
</script>
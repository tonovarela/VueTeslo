<template>
  <h1 class="text-2xl font-semibold mb-4">Login</h1>
  <form action="#" @submit.prevent="onLogin">
    <!-- Username Input -->
    <div class="mb-4">
      <label for="username" ref="emailInputRef" class="block text-gray-600">Correo</label>
      <input type="text" ref="emailInputRef" v-model="formLogin.email" id="username" name="username"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off" />
    </div>
    <!-- Password Input -->
    <div class="mb-4">
      <label for="password" class="block text-gray-600">Contraseña</label>
      <input type="password" ref="passwordInputRef" v-model="formLogin.password" id="password" name="password"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off" />
    </div>
    <!-- Remember Me Checkbox -->
    <div class="mb-4 flex items-center">
      <input type="checkbox" v-model="formLogin.rememberme" id="remember" name="remember" class="text-blue-500" />
      <label for="remember" class="text-gray-600 ml-2">Recordar usuario</label>
    </div>
    <!-- Forgot Password Link -->
    <div class="mb-6 text-blue-500">
      <a href="#" class="hover:underline">Olvidaste la contraseña?</a>
    </div>
    <!-- Login Button -->
    <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">
      Ingresar
    </button>
  </form>
  <!-- Sign up  Link -->
  <div class="mt-6 text-blue-500 text-center">
    <RouterLink :to="{ name: 'register' }" class="hover:underline">Registrarse</RouterLink>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watchEffect } from 'vue';

import { useAuthStore } from '../store/auth.store';
import { useToast } from 'vue-toastification';
const authStore = useAuthStore();

const toast = useToast();
const formLogin = reactive({
  email: '',
  password: '',
  rememberme: false,
});
const emailInputRef = ref<HTMLInputElement | null>(null);
const passwordInputRef = ref<HTMLInputElement | null>(null);

watchEffect(() => {
  const email = localStorage.getItem('email');
  if (email) {

    formLogin.email = email;
    formLogin.rememberme = true;
  }
});

const onLogin = async () => {
  if (formLogin.email.length === 0) {
    emailInputRef.value?.focus();
    return;
  }
  if (formLogin.password.length === 0) {
    passwordInputRef.value?.focus();
    return;
  }
  if (formLogin.rememberme) {
    localStorage.setItem('email', formLogin.email);
  } else {
    localStorage.removeItem('email');
  }

  const ok = await authStore.logIn(formLogin.email, formLogin.password);
  if (!ok) {
    toast.error('Usuario o contraseña incorrectos');
    return;
  }


};


</script>

<template>
  <h1 class="text-2xl font-semibold mb-4">Nueva cuenta</h1>
  <form @submit.prevent="onRegister">
    <!-- Username Input -->
    <div class="mb-4">
      <label for="name" class="block text-gray-600">Nombre</label>
      <input type="text" v-model="formLogin.name" id="name" name="name"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off" />
    </div>

    <!-- Username Input -->
    <div class="mb-4">
      <label for="username" class="block text-gray-600">Email</label>
      <input type="text" v-model="formLogin.email" id="username" name="username"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off" />
    </div>
    <!-- Password Input -->
    <div class="mb-4">
      <label for="password" class="block text-gray-600">Password</label>
      <input type="password" v-model="formLogin.password" id="password" name="password"
        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autocomplete="off" />
    </div>
    <!-- Login Button -->
    <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">
      Registrarse
    </button>
  </form>
  <!-- Sign up  Link -->
  <div class="mt-6 text-blue-500 text-center">
    <RouterLink :to="{ name: 'login' }" class="hover:underline">Tienes una cuenta?, click aqui</RouterLink>
  </div>
</template>
<script setup lang="ts">
import { useToast } from 'vue-toastification';
import { useAuthStore } from '../store/auth.store';
import { reactive, ref } from 'vue';
const authStore = useAuthStore();
const toast = useToast();
const formLogin = reactive({
  name: '',
  email: '',
  password: '',

});
const emailInputRef = ref<HTMLInputElement | null>(null);
const passwordInputRef = ref<HTMLInputElement | null>(null);


const onRegister = async () => {
  if (formLogin.name.length === 0) {
    emailInputRef.value?.focus();
    return;
  }
  if (formLogin.email.length === 0) {
    emailInputRef.value?.focus();
    return;
  }
  if (formLogin.password.length === 0) {
    passwordInputRef.value?.focus();
    return;
  }

  const { ok, mensaje } = await authStore.register(formLogin.name, formLogin.email, formLogin.password);
  if (!ok) {
    toast.error(mensaje);
    return;
  }

}

</script>
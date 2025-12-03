<script setup>
import NavbarComp from './components/NavbarComp.vue';
import { useAuthStore } from './stores/authStore';
const auth = useAuthStore()

</script>

<template>
  <div class="bg-[hsl(0,0%,95%)] w-screen h-screen max-h-dvh flex flex-col justify-center items-center relative">
    <NavbarComp />
    <RouterView />
    <button class="border-2 absolute bottom-4 right-4 px-4 p-1 rounded text-sm" @click="auth.logout">
      Logout
      <i class="fa-solid fa-power-off ml-1"></i>
    </button>
  </div>
</template>

<style scoped></style>

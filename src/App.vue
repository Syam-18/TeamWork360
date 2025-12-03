<script setup>
import NavbarComp from './components/NavbarComp.vue';
import { useAuthStore } from './stores/authStore';
const auth = useAuthStore()

</script>

<template>
  <div class="bg-[hsl(0,0%,95%)] w-screen min-h-dvh flex flex-col justify-center items-center relative py-10 pb-20">
    <RouterView />
    <NavbarComp />
  </div>
</template>

<style scoped></style>

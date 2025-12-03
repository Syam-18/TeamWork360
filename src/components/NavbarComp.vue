<script setup>
import router from '@/router';
import { useRoute } from 'vue-router';
const Route = useRoute()

</script>
<template>
  <nav class="fixed left-0 h-screen">
    <ul class="flex flex-col p-2 py-8 bg-[hsl(36,50%,90%)]">
      <li @click="router.push('/dashboard')" class="p-2 hover:bg-[hsl(36,95%,82%)] hover:text-black" :class="{'bg-[hsl(36,95%,82%)] text-black': Route.path === '/dashboard'}">
        <i class="fa-solid fa-line-chart"></i>
      </li>
      <li @click="router.push('/projects')" class="p-2 hover:bg-[hsl(36,95%,82%)] hover:text-black" :class="{'bg-[hsl(36,95%,82%)] text-black': Route.path === '/projects'}">
        <i class="fa-solid fa-folder"></i>
      </li>
    </ul>
  </nav>
</template>

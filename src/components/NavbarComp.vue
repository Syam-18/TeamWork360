<script setup>
import router from '@/router';
import { useRoute } from 'vue-router';
const Route = useRoute()

</script>
<template>
  <nav class="fixed top-2 md:left-0 h-screen rounded" :class="{'hidden' : Route.path === '/login'}">
    <ul class="flex md:flex-col md:p-2 md:py-8 bg-[hsl(30,20%,85%)] rounded overflow-hidden ">
      <li @click="router.push('/dashboard')" class="p-2 px-4 md:px-2 hover:bg-[hsl(36,95%,82%)] hover:text-black" :class="{'bg-[hsl(36,95%,82%)] text-[hsl(36,100%,50%)]': Route.path === '/dashboard'}">
        <i class="fa-solid fa-line-chart"></i>
      </li>
      <li @click="router.push('/projects')" class="p-2 px-4 md:px-2 hover:bg-[hsl(36,95%,82%)] hover:text-black" :class="{'bg-[hsl(36,95%,82%)] text-[hsl(36,100%,50%)]': Route.path === '/projects' || Route.name === 'ProjectDetails'}">
        <i class="fa-solid fa-folder"></i>
      </li>
      <li @click="router.push('/login')" class="p-2 px-4 md:px-2 hover:bg-[hsl(36,95%,82%)] hover:text-red-600 text-red-400">
        <i class="fa-solid fa-power-off"></i>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import router from '@/router'
import { useRoute } from 'vue-router'
const Route = useRoute()
</script>
<template>
  <nav
    class="fixed top-2 md:bottom-0 md:top-0 md:left-0 rounded flex items-center"
    :class="{ hidden: Route.name === 'LoginPage' }"
  >
    <ul
      class="flex md:flex-col md:pl-2 pt-2 md:pt-0 md:py-8 bg-[hsl(30,20%,85%)] rounded overflow-hidden"
    >
      <li
        v-tooltip="'Dashboard'"
        @click="router.push('/dashboard')"
        class="p-2 cursor-pointer  px-8 md:px-2 md:py-20 hover:bg-[hsl(36,95%,82%)] hover:text-black"
        :class="{
          'bg-[hsl(0,0%,95%)] text-[hsl(36,100%,50%)] rounded-t md:rounded-t-0 md:rounded-l':
            Route.path === '/dashboard',
        }"
      >
        <i class="fa-solid fa-line-chart"></i>
      </li>
      <li
        v-tooltip="'Projects'"
        @click="router.push('/projects')"
        class="p-2 cursor-pointer  px-8 md:px-2 md:py-20 hover:bg-[hsl(36,95%,82%)] hover:text-black"
        :class="{
          'bg-[hsl(0,0%,95%)] text-[hsl(36,100%,50%)] rounded-t md:rounded-t-0 md:rounded-l':
            Route.path === '/projects' || Route.name === 'ProjectDetails',
        }"
      >
        <i class="fa-solid fa-folder"></i>
      </li>
      <li
      v-tooltip="'Logout'"
        @click="router.push('/')"
        class="p-2 cursor-pointer  px-8 md:px-2 md:py-20 hover:bg-red-400 hover:text-black text-red-400 rounded-t md:rounded-t-0 md:rounded-l"
      >
        <i class="fa-solid fa-power-off"></i>
      </li>
    </ul>
  </nav>
</template>

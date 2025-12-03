<script setup>
import { useRouter } from 'vue-router'
import ModalComp from '../ui/ModalComp.vue'
import { ref } from 'vue'
const router = useRouter()
defineProps(['project'])
const activeModal = ref(false)
const openMenu = () => {
  activeModal.value = true
}
const handleClose = () => {
  activeModal.value = false
}
</script>
<template>
  <div
    class="bg-white p-4 rounded border-[hsl(0,0%,80%)] border cursor-pointer shadow-md relative flex flex-col"
    @click="router.push(`/project/${project.id}`)"
  >
    <h1 class="font-medium">{{ project.name }}</h1>
    <p class="text-[hsl(0,0%,30%)] text-sm mt-1 mb-2 grow">{{ project.description }}</p>
    <p class="text-sm">{{ project.date }}</p>
    <div class="absolute bottom-0 left-0 h-1 bg-black" style="width: 100%"></div>
    <div
      class="absolute top-2 right-2 p-2 rounded hover:bg-[hsl(0,0%,90%)]"
      @click.stop="openMenu"
    >
      <i class="fa-solid fa-ellipsis-vertical text-sm"></i>
    </div>
    <ModalComp v-if="activeModal" @close-modal="handleClose" @click.stop :project  />
  </div>
</template>

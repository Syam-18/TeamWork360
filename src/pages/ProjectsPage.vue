<script setup>
import ModalComp from '@/components/ui/ModalComp.vue';
import { useProjectStore } from '@/stores/projectStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const projectStore = useProjectStore()
const {projects} = storeToRefs(projectStore)
const {loadProjects} = projectStore
onMounted(() => {
  loadProjects()
})

const activeModal = ref(false)
const createProject = () => {
  activeModal.value = true
}
const handleClose = () => {
  activeModal.value = false
}
</script>
<template>
  <div class="w-[80vw] min-h-screen py-8 relative">
    <h1 class="text-xl font-medium mb-4">Projects</h1>
    <button @click="createProject" class="absolute top-8 right-8 bg-black text-white px-4 p-1 rounded">Create</button>
    <div class="grid grid-cols-6 gap-4">
      <div v-for="project in projects" :key="project.id" class="bg-white p-4 rounded border-[hsl(0,0%,80%)] border cursor-pointer shadow-sm" @click="router.push(`/project/${project.id}`)">
        <p class="font-medium">{{ project.name }}</p>
        <p>{{ project.date }}</p>
      </div>
    </div>
  </div>
  <ModalComp v-if="activeModal" @close-modal = 'handleClose'/>
</template>

<script setup>
import ProjectCard from '@/components/project/ProjectCard.vue';
import ModalComp from '@/components/ui/ModalComp.vue';
import { useProjectStore } from '@/stores/projectStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { ref } from 'vue';

const projectStore = useProjectStore()
const {projects} = storeToRefs(projectStore)
const {loadProjects} = projectStore
onMounted(() => {
  if(!projects.value.length){
    loadProjects()
  }
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
  <div class="w-[85vw] h-[80vh] py-8 relative overscroll-auto">
    <h1 class="text-xl font-medium mb-4">Projects</h1>
    <button @click="createProject" class="absolute right-2 top-8 md:right-8 bg-black text-white px-4 p-1 rounded cursor-pointer">Create</button>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
      <ProjectCard v-for="project in projects" :key="project.id" :project />
    </div>
    <h1
        v-if="!projects.length"
        class="text-2xl tracking-tighter text-[hsl(0,0%,20%)] font-medium absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2"
      >
        No projects created
      </h1>
  </div>
  <ModalComp v-if="activeModal" @close-modal = 'handleClose'/>
</template>

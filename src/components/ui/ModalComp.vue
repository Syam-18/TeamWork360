<script setup>
import { addProject, deleteProject, updateProject } from '@/services/projectServices'
import { useProjectStore } from '@/stores/projectStore'
import { ref } from 'vue'
const props = defineProps(['project'])
const name = ref(props.project?.name || '')
const description = ref(props.project?.description || '')
const date = ref(props.project?.date || new Date().toISOString().slice(0, 10))
const showError = ref(false)
const error = ref('')

const emit = defineEmits(['closeModal'])
const projectStore = useProjectStore()
const closeModal = () => {
  emit('closeModal')
}

const createProject = async () => {
  if (name.value.trim() && description.value.trim()) {
    const data = {
      name: name.value,
      description: description.value,
      date: date.value,
    }
    if (props.project) {
      await updateProject(props.project.id, data)
    }
    else{
      await addProject(data)
    }
    projectStore.loadProjects()
    closeModal()
  } else {
    showError.value = true
    error.value = 'All fields are req'
  }
}

const removeProject = async () => {
  await deleteProject(props.project.id)
  projectStore.loadProjects()
  closeModal()
}
</script>
<template>
  <div class="fixed inset-0 flex flex-col justify-center items-center cursor-default">
    <div class="z-10 md:w-[30vw] w-[80vw] min-h-[30vh] relative p-4 bg-white/90 flex flex-col">
      <h1 class="text-2xl text-center mb-8">Project</h1>
      <label class="mb-1">Name</label>
      <input
        type="text"
        v-model="name"
        class="border border-[hsl(0,0%,60%)] px-4 p-1 mb-2 text-gray-800 rounded"
        placeholder="name"
      />
      <label class="mb-1">Description</label>
      <textarea
        v-model="description"
        class="border border-[hsl(0,0%,60%)] px-4 p-1 mb-2 text-gray-800 rounded"
        placeholder="description"
      ></textarea>
      <label class="mb-1">Deadline</label>
      <input
        type="date"
        v-model="date"
        class="border border-[hsl(0,0%,60%)] px-4 p-1 mb-2 text-gray-800 rounded"
      />
      <p v-if="showError" class="text-red-400 text-sm">{{ error }}</p>
      <button
        @click="createProject"
        class="mt-4 mb-2 bg-black text-white rounded px-4 p-1 cursor-pointer"
      >
        {{ project ? 'Update' : 'Create' }}
      </button>
      <button @click="removeProject" v-if="project" class="mb-4 border-2 text-black rounded px-4 p-1 cursor-pointer">
        Delete
      </button>
      <div class="absolute top-4 right-4 p-2 cursor-pointer" @click="closeModal">
        <i class="fa-solid fa-xmark"></i>
      </div>
    </div>
    <div class="absolute inset-0 z-0 bg-black/10 backdrop-blur-md" @click="closeModal"></div>
  </div>
</template>

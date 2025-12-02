<script setup>
import { addProject } from '@/services/projectServices'
import { useProjectStore } from '@/stores/projectStore'
import { ref } from 'vue'
const name = ref('')
const description = ref('')
const date = ref(new Date().toISOString().slice(0, 10))
const showError = ref(false)
const error = ref('')
const emit = defineEmits(['closeModal'])
const projectStore = useProjectStore()
const closeModal = () => {
  emit('closeModal')
}

const createProject = async() => {
  if (name.value.trim() && description.value.trim()) {
    const data = {
      name: name.value,
      description: description.value,
      date: date.value,
    }
    await addProject(data)
    projectStore.loadProjects()
    closeModal()
  } else {
    showError.value = true
    error.value = 'All fields are req'
  }
}
</script>
<template>
  <div class="fixed inset-0 flex flex-col justify-center items-center">
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
        class="my-4 bg-black text-white rounded px-4 p-1 cursor-pointer"
      >
        Create
      </button>
    </div>
    <div class="absolute inset-0 z-0 bg-black/10 backdrop-blur-md" @click="closeModal"></div>
  </div>
</template>

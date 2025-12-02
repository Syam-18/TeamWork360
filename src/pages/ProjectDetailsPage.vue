<script setup>
import TaskModal from '@/components/task/TaskModal.vue'
import { getProject } from '@/services/projectServices'
import { deleteTask } from '@/services/taskServices'
import { useTaskStore } from '@/stores/taskStore'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const project = ref([])
const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)
onMounted(async () => {
  const response = await getProject(route.params.id)
  project.value = response.data
  taskStore.loadTasks(project.value.id)
})
const projectTimeLeft = computed(() => {
  const timeNow = new Date()
  const deadline = new Date(project.value.date)
  const timeDifferenceInMs = deadline - timeNow
  const timeDifferenceInDays = Math.ceil(timeDifferenceInMs / (1000 * 60 * 60 * 24))
  return timeDifferenceInDays
})
const activeModal = ref(false)
const createTask = () => {
  activeModal.value = true
}
const handleClose = () => {
  activeModal.value = false
}
</script>
<template>
  <div class="flex flex-col md:flex-row gap-2 p-8 w-[90vw] min-h-dvh">
    <div class="top-0 sticky bg-white p-4 border border-[hsl(0,0%,80%)] rounded h-min grow">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="font-medium text-2xl">{{ project.name }}</h1>
          <p class="text-gray-600 text-sm">{{ projectTimeLeft }} days left</p>
        </div>
        <div class="p-2 cursor-pointer">
          <i class="fa-solid fa-pen"></i>
        </div>
      </div>
      <p class="mt-4 text-sm">{{ project.description }}</p>
    </div>
    <div class="bg-white p-4 border border-[hsl(0,0%,80%)] rounded overflow-auto grow-8 relative">
      <div v-for="task in tasks" :key="task.id" class="flex flex-col gap-2 w-min">
        <p>{{ task.title }}</p>
        <button @click="deleteTask(task.id)">Delete</button>
      </div>
      <button
        class="absolute top-4 right-4 bg-black text-white rounded px-4 p-1 cursor-pointer"
        @click="createTask"
      >
        Add Task
      </button>
      <TaskModal v-if="activeModal" :projectId="project.id" @close-modal="handleClose" />
    </div>
  </div>
</template>

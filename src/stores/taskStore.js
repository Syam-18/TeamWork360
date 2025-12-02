import { getTasks } from '@/services/taskServices'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTaskStore = defineStore('taskstore', () => {
  const tasks = ref([])
  const loadTasks = async (projectId) => {
    const response = await getTasks(projectId)
    tasks.value = response.data
  }
  return { tasks, loadTasks }
})

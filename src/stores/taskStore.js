import { deleteTask, getTasks, getAllTasks } from '@/services/taskServices'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTaskStore = defineStore('taskstore', () => {
  const tasks = ref([])
  const loadAllTasks = async () => {
    const response = await getAllTasks()
    tasks.value = response.data
  }
  const loadTasks = async (projectId) => {
    const response = await getTasks(projectId)
    tasks.value = response.data
  }
  const removeTask = async (id, projectId) => {
    await deleteTask(id)
    loadTasks(projectId)
  }
  return { tasks, loadAllTasks, loadTasks, removeTask }
})

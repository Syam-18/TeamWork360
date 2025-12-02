import { api } from "./api";

const getTasks = (projectId) => {
  return api.get(`/tasks?projectId=${projectId}`)
}

const getTask = (id) => {
  return api.get(`/tasks/${id}`)
}

const addTask = (data) => {
  return api.post('/tasks', data)
}

const updateTask = (id, data) => {
  return api.put(`/tasks/${id}`, data)
}

const deleteTask = (id) => {
  return api.delete(`/tasks/${id}`)
}

export {getTasks, getTask, addTask, updateTask, deleteTask}

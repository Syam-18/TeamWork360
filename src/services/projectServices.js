import { api } from "./api";

const getProjects = () => {
  return api.get("/projects")
}

const getProject = (id) => {
  return api.get(`/projects/${id}`)
}

const addProject = (data) => {
  return api.post('/projects', data)
}

const updateProject = (id, data) => {
  return api.put(`/projects/${id}`, data)
}

const deleteProject = (id) => {
  return api.delete(`/projects/${id}`)
}

export {getProjects, getProject, addProject, updateProject, deleteProject}

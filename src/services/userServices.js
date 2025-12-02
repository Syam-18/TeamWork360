import { api } from './api'

const getUsers = () => {
  return api.get('/users')
}

const getUser = (id) => {
  return api.get(`/users/${id}`)
}

const addUser = (data) => {
  return api.post('/users', data)
}

const updateUser = (id, data) => {
  return api.put(`/users/${id}`, data)
}

const deleteUser = (id) => {
  return api.delete(`/users/${id}`)
}

export { getUsers, getUser, addUser, updateUser, deleteUser }

import router from "@/router"
import { useAuthStore } from "@/stores/authStore"
import axios from "axios"

export const api = axios.create({
  baseURL: 'http://localhost:5000',
})

api.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  if(!authStore.user){
    alert('User not authorized!')
    router.push('/login')
  }

  return config;
})

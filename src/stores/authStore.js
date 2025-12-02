import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  const login = (email, password) => {
    if(email.trim() === 'team@gmail.com' && password.trim() === 'teamwork360'){
      user.value = {email}
      localStorage.setItem('user', JSON.stringify(user.value))
      return true
    }
    return false
  }
  const logout = () => {
    user.value = null
    localStorage.removeItem('user')
  }
  return {user, login, logout}
})

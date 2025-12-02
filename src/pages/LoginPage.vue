<script setup>
import { useAuthStore } from '@/stores/authStore'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const mail = ref('')
const password = ref('')
const auth = useAuthStore()
const router = useRouter()
const error = ref('')
const handleLogin = () => {
  if (auth.login(mail.value, password.value)) {
    error.value = ''
    return router.push('/dashboard')
  }
  error.value = 'Invalid credentials'
}
</script>
<template>
  <form class="md:w-[25%] w-[80%] flex flex-col justify-center">
    <h1 class="text-center mb-8 text-2xl">Team Work 360 Login</h1>
    <label class="text-gray-800 text-sm mb-1">Email</label>
    <input
      type="email"
      v-model="mail"
      class="border border-[hsl(0,0%,60%)] px-4 p-1 mb-2 text-gray-800 rounded"
      placeholder="email"
    />
    <label class="text-gray-800 text-sm mb-1">Password</label>
    <input
      type="password"
      v-model="password"
      class="border border-[hsl(0,0%,60%)] px-4 p-1 mb-2 text-gray-800 rounded"
      placeholder="password"
    />
    <p v-if="error" class="text-red-400 text-sm mb-3">{{ error }}</p>
    <button
      type="submit"
      @click="handleLogin"
      class="bg-[hsl(206,100%,43%)] text-white px-4 p-1 rounded-md cursor-pointer mt-4 font-medium"
    >
      Login
    </button>
  </form>
</template>

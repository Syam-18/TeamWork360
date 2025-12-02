<script setup>
// import { getProjects } from '@/services/projectServices';
// import { getTasks } from '@/services/tasksServices';
import { getUsers } from '@/services/userServices';
import { useAuthStore } from '@/stores/authStore';
import { onBeforeMount, ref } from 'vue';
const auth = useAuthStore()
const projects = ref([])
onBeforeMount(async() => {
  const response = await getUsers()
  projects.value = response.data
  console.log(projects.value)
})
</script>
<template>
  <p>{{ auth.user }}</p>

</template>

<script setup>
// import { getProjects } from '@/services/projectServices';
// import { getTasks } from '@/services/tasksServices';
// import ModalComp from '@/components/ui/ModalComp.vue';
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
  <!-- <ModalComp/> -->
</template>

<script setup>
import { getProject } from '@/services/projectServices';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const project = ref([])
onMounted(async () => {
  const response = await getProject(route.params.id)
  project.value = response.data
})
</script>
<template>
  {{ project.name }}
</template>

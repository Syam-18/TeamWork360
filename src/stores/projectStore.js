import { getProjects } from "@/services/projectServices";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProjectStore = defineStore('projectstore',() => {
  const projects = ref([])
  const loadProjects = async () => {
    const response = await getProjects()
    projects.value = response.data
  }
  return {projects, loadProjects}
})

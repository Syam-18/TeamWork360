<script setup>
import { useProjectStore } from '@/stores/projectStore'
import { useTaskStore } from '@/stores/taskStore'
import { storeToRefs } from 'pinia'
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue'
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js'
import router from '@/router'

Chart.register(DoughnutController, ArcElement, Tooltip, Legend)

const chartRef = ref(null)
let chartInstance = null

const top3Deadlines = ref([])

const projectStore = useProjectStore()
const taskStore = useTaskStore()

const { projects } = storeToRefs(projectStore)
const { loadProjects } = projectStore
const { tasks } = storeToRefs(taskStore)
const { loadAllTasks } = taskStore

onBeforeMount(() => {
  if (!projects.value.length) {
    loadProjects()
  }
  if (!tasks.value.length) {
    loadAllTasks()
  }
})
const createChart = () => {
  if (chartInstance) chartInstance.destroy()

  chartInstance = new Chart(chartRef.value, {
    type: 'doughnut',
    data: {
      labels: ['Completed', 'Pending'],
      datasets: [
        {
          data: [completedTasksLength.value, tasks.value.length - completedTasksLength.value],
          backgroundColor: [
            'rgba(34,197,94,0.7)', // green
            'rgba(239,68,68,0.7)', // red
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' },
      },
    },
  })
}
onMounted(() => {
  createChart()
  top3Deadlines.value = getTop3Deadlines()
})
watch(tasks, () => {
  createChart()
  top3Deadlines.value = getTop3Deadlines()
})
const completedTasksLength = computed(() => {
  return tasks.value.filter((task) => task.status === 'Done').length
})
const progressBar = computed(() => {
  return (completedTasksLength.value * 100) / tasks.value.length + '%'
})
const getTop3Deadlines = () => {
  return [...tasks.value]
    .sort((a, b) => new Date(a.date) - new Date(b.date)) // ascending by deadline
    .slice(0, 3) // take first 3
}
</script>
<template>
  <div class="flex flex-col w-[90vw] h-screen max-h-dvh p-8 overflow-hidden gap-4">
    <h1 class="text-xl font-medium">Dashboard</h1>
    <div class="flex flex-col">
      <h1 class="font-medium text-[hsl(0,0%,20%)] mb-2">Summary</h1>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white p-4 border border-[hsl(0,0%,80%)] rounded flex flex-col items-center">
          <p class="font-medium">{{ projects.length }}</p>
          <p class="tracking-tight text-sm text-[hsl(0,0%,30%)]">Total projects</p>
        </div>
        <div class="bg-white p-4 border border-[hsl(0,0%,80%)] rounded flex flex-col items-center">
          <p class="font-medium">{{ tasks.length }}</p>
          <p class="tracking-tight text-sm text-[hsl(0,0%,30%)]">Total tasks</p>
        </div>
        <div class="bg-white p-4 border border-[hsl(0,0%,80%)] rounded flex flex-col items-center">
          <p class="font-medium">{{ completedTasksLength }}</p>
          <p class="tracking-tight text-sm text-[hsl(0,0%,30%)]">Completed tasks</p>
        </div>
        <div class="bg-white p-4 border border-[hsl(0,0%,80%)] rounded flex flex-col items-center">
          <p class="font-medium">{{ tasks.length - completedTasksLength }}</p>
          <p class="tracking-tight text-sm text-[hsl(0,0%,30%)]">Pending Tasks</p>
        </div>
      </div>
    </div>
    <div class="flex flex-col">
      <h1 class="font-medium text-[hsl(0,0%,20%)] mb-2">Analytics</h1>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white p-4 border border-[hsl(0,0%,80%)] rounded flex flex-col items-center">
          <h1 class="self-start text-sm">Tasks</h1>
          <canvas ref="chartRef"></canvas>
        </div>
        <div class="col-span-3 flex flex-col gap-4">
          <div
            class="bg-white p-4 border border-[hsl(0,0%,80%)] rounded flex justify-around items-center"
          >
            <div
              class="bg-[hsl(200,2%,89%)] w-[90%] rounded flex items-start"
              :class="{ 'blur-xs': !tasks.length }"
            >
              <div class="bg-[hsl(240,52%,74%)] p-1 rounded" :style="{ width: progressBar }"></div>
            </div>
            <h1 class="text-sm" :class="{ 'blur-xs': !tasks.length }">{{ progressBar }}</h1>
          </div>
          <div
            class="bg-white p-4 border border-[hsl(0,0%,80%)] rounded flex flex-col items-center h-full"
          >
            <h1 class="self-start font-medium mb-4">Deadlines</h1>
            <ul class="flex flex-col gap-2 w-full">
              <li
                v-for="task in top3Deadlines"
                :key="task.id"
                @click="router.push(`/project/${task.projectId}`)"
                class="flex items-center justify-between gap-2 py-1 pb-2 border-[hsl(0,0%,90%)] border-b-2 rounded cursor-pointer"
              >
                <h1 class="text-sm ">{{ task.title }}</h1>
                <p>{{ task.date }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

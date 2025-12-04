<script setup>
import TaskList from '@/components/task/TaskList.vue'
import TaskModal from '@/components/task/TaskModal.vue'
import ModalComp from '@/components/ui/ModalComp.vue'
import { getProject } from '@/services/projectServices'
import { useTaskStore } from '@/stores/taskStore'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const project = ref([])
const Priority = ref('All')
const Status = ref('All')
const taskStore = useTaskStore()
const { loadTasks, removeTask } = taskStore
const { tasks } = storeToRefs(taskStore)
onMounted(async () => {
  const response = await getProject(route.params.id)
  project.value = response.data
  loadTasks(project.value.id)
})
const projectTimeLeft = computed(() => {
  const timeNow = new Date()
  const deadline = new Date(project.value.date)
  const timeDifferenceInMs = deadline - timeNow
  if (timeDifferenceInMs < 0) return 'Deadline: ' + project.value.date
  const timeDifferenceInDays = Math.ceil(timeDifferenceInMs / (1000 * 60 * 60 * 24))
  return timeDifferenceInDays + ' days left'
})
const filteredTasks = computed(() => {
  console.log(tasks.value)
  return tasks.value.filter((task) => {
    if(Priority.value === 'All' && Status.value === "All"){
      return true
    }
    else if(Priority.value === 'All'){
      return task.status === Status.value
    }
    else if(Status.value === 'All'){
      return task.priority === Priority.value
    }
    else {
      return task.status === Status.value && task.priority === Priority.value
    }
  })
})
const activeModal = ref(false)
const projectModal = ref(false)
const createTask = () => {
  activeModal.value = true
}
const handleClose = () => {
  activeModal.value = false
}
const progressBar = computed(() => {
  if (tasks.value.length == 0) return '67%'
  const completedTasks = tasks.value.filter((task) => task.status === 'Done')
  return Math.floor((completedTasks.length / tasks.value.length) * 100) + '%'
})

const editProject = () => {
  projectModal.value = true
}
const closeProjectModal = async () => {
  projectModal.value = false
  const response = await getProject(route.params.id)
  project.value = response.data
}
</script>
<template>
  <div class="flex flex-col md:flex-row gap-2 p-8 w-screen md:w-[90vw] h-[80vh] overflow-auto">
    <div class="top-0 sticky w-full md:w-[30%] lg:w-[20%]">
      <div class="flex flex-col gap-2 md:gap-4">
        <div class="bg-white p-4 border border-[hsl(0,0%,80%)] rounded h-min">
          <div class="flex justify-between items-center">
            <div>
              <h1 class="font-medium text-2xl">{{ project.name }}</h1>
              <p class="text-gray-600 text-sm">{{ projectTimeLeft }}</p>
            </div>
            <div class="p-2 cursor-pointer" @click="editProject">
              <i class="fa-solid fa-pen text-[hsl(240,52%,54%)]"></i>
            </div>
          </div>
          <p class="mt-4 text-sm">{{ project.description }}</p>
        </div>
        <div
          class="bg-white p-4 border border-[hsl(0,0%,80%)] rounded h-min flex justify-center items-center gap-2"
        >
          <div
            class="bg-[hsl(200,2%,89%)] w-[90%] rounded flex items-start"
            :class="{ 'blur-xs': !tasks.length }"
          >
            <div class="bg-[hsl(240,52%,74%)] p-1 rounded" :style="{ width: progressBar }"></div>
          </div>
          <h1 class="text-sm" :class="{ 'blur-xs': !tasks.length }">{{ progressBar }}</h1>
        </div>
      </div>
    </div>
    <div class="bg-white p-4 border border-[hsl(0,0%,80%)] rounded overflow-auto grow-8 relative flex flex-col">
      <h1
        v-if="!tasks.length"
        class="text-2xl tracking-tighter text-[hsl(0,0%,20%)] font-medium absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2"
      >
        No tasks added
      </h1>
      <div class="flex gap-2">
        <div class="flex flex-col">
          <!-- <label class="text-sm hidden md:inline">Priority</label> -->
          <select v-model="Priority" class="border border-[hsl(0,0%,60%)] md:px-4 p-1 mb-2 text-gray-800 rounded">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="All">All</option>
        </select>
        </div>
        <div class="flex flex-col">
          <!-- <label class="text-sm hidden md:inline">Status</label> -->
          <select v-model="Status" class="border border-[hsl(0,0%,60%)] md:px-4 p-1 mb-2 text-gray-800 rounded">
          <option value="Todo">Todo</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
          <option value="All">All</option>
        </select>
        </div>
      </div>
      <TaskList :tasks="filteredTasks" :projectId="project.id" :removeTask="removeTask" :loadTasks />
      <button
        class="absolute top-4 right-4 bg-[hsl(240,75%,45%)] text-white rounded px-4 p-1 cursor-pointer"
        @click="createTask"
      >
        Add Task
      </button>
      <TaskModal v-if="activeModal" :projectId="project.id" @close-modal="handleClose" />
    </div>
    <ModalComp v-if="projectModal" @close-modal="closeProjectModal" :project="project" />
  </div>
</template>

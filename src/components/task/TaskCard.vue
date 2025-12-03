<script setup>
import { computed, ref } from 'vue'
import TaskModal from './TaskModal.vue'
import { updateTask } from '@/services/taskServices'

const statusColor = {
  "Low": 'bg-[hsl(150,60%,80%)] text-black',
  "Medium": 'bg-[hsl(50,50%,40%)] text-white',
  "High": 'bg-[hsl(344,51%,50%)] text-white'
}
const props = defineProps(['task', 'projectId', 'removeTask', 'loadTasks'])
const taskTimeLeft = computed(() => {
  const timeNow = new Date()
  const deadline = new Date(props.task.date)
  const timeDifferenceInMs = deadline - timeNow
  if (timeDifferenceInMs < 0) return props.task.date
  const timeDifferenceInDays = Math.ceil(timeDifferenceInMs / (1000 * 60 * 60 * 24))
  return timeDifferenceInDays + ' days left'
})
const activeModal = ref(false)
const openMenu = () => {
  activeModal.value = true
}
const handleClose = () => {
  activeModal.value = false
}
const toggleTask = async () => {
  const toggleValue = props.task.status === "Done" ? "Doing" : "Done"
  const data = {...props.task, status: toggleValue}
  await updateTask(props.task.id, data)
  props.loadTasks(props.projectId)
}
</script>
<template>
  <li
    class="flex items-center gap-2 p-2 py-1 pb-4 border-[hsl(0,0%,90%)] border-b-2 rounded cursor-pointer"
    @click="openMenu"
  >
    <div class="group flex justify-center items-center mr-2 border rounded-full w-6 h-6" @click.stop="toggleTask">
      <div class="hidden group-hover:inline" :class="{'inline' : task.status == 'Done'}">
        <i class="fa-solid fa-check"></i>
      </div>
    </div>
    <div class="flex flex-col gap-1 mr-auto">
      <p class="font-medium text-sm">{{ task.title }}</p>
      <div class="flex items-baseline gap-4">
        <p class="text-xs"><span class="hidden md:inline">Deadline: </span>{{ taskTimeLeft }}</p>
        <div
          class="flex md:flex-row flex-col items-baseline gap-1 md:gap-2 p-1 py-0 rounded text-[hsl(30,10%,30%)]"
        >
          <div class="hidden md:inline p-0">
            <i class="text-xs fa-solid fa-user"></i>
          </div>
          <p class="text-xs">{{ task.assigne }}</p>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-2 md:gap-4">
      <div class="flex lg:flex-row-reverse flex-col items-center gap-1 lg:gap-2">
        <p :class="`${statusColor[task.priority]}`" class="p-1 py-0 rounded text-xs">
          {{ task.priority }}
        </p>
        <p class="text-xs font-medium">
          {{ task.status }}
        </p>
      </div>
      <button @click="removeTask(task.id, projectId)" class="p-1 cursor-pointer" @click.stop>
        <i class="text-sm fa-solid fa-trash"></i>
      </button>
    </div>
  </li>
  <TaskModal v-if="activeModal" @close-modal="handleClose" @click.stop :task :projectId="projectId" />
</template>

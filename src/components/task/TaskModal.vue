<script setup>
import { addTask, deleteTask, updateTask } from '@/services/taskServices'
import { useTaskStore } from '@/stores/taskStore'
import { ref } from 'vue'

const props = defineProps(['task', 'projectId'])
const title = ref(props.task?.title || '')
const description = ref(props.task?.description || '')
const assigne = ref(props.task?.assigne || '')
const priority = ref(props.task?.priority || 'Medium')
const status = ref(props.task?.status || 'Doing')
const date = ref(props.task?.date || new Date().toISOString().slice(0, 10))
const showError = ref(false)
const error = ref('')

const emit = defineEmits(['closeModal'])
const taskStore = useTaskStore()
const closeModal = () => {
  emit('closeModal')
}

const createTask = async () => {
  if (title.value.trim() && description.value.trim() && assigne.value.trim()) {
    const data = {
      projectId: props.projectId,
      title: title.value,
      description: description.value,
      assigne: assigne.value,
      priority: priority.value,
      status: status.value,
      date: date.value,
    }
    if (props.task) {
      await updateTask(props.task.id, data)
    } else {
      await addTask(data)
    }
    taskStore.loadTasks(props.projectId)
    closeModal()
  } else {
    showError.value = true
    error.value = 'All fields are req'
  }
}

const removeTask = async () => {
  await deleteTask(props.task.id)
  taskStore.loadTasks()
  closeModal()
}

</script>
<template>
  <div class="fixed inset-0 flex flex-col justify-center items-center cursor-default">
    <div class="z-10 md:w-[30vw] w-[80vw] min-h-[30vh] relative p-4 bg-white/90 flex flex-col">
      <h1 class="text-2xl text-center mb-8">Task</h1>
      <label class="mb-1">Title</label>
      <input
        type="text"
        v-model="title"
        class="border border-[hsl(0,0%,60%)] px-4 p-1 mb-2 text-gray-800 rounded"
        placeholder="title"
      />
      <label class="mb-1">Description</label>
      <textarea
        v-model="description"
        class="border border-[hsl(0,0%,60%)] px-4 p-1 mb-2 text-gray-800 rounded"
        placeholder="description"
      ></textarea>
      <label class="mb-1">Assigne</label>
      <input
        type="text"
        v-model="assigne"
        class="border border-[hsl(0,0%,60%)] px-4 p-1 mb-2 text-gray-800 rounded"
        placeholder="Assigne"
      />
      <label class="mb-1">Priority</label>
      <select
        v-model="priority"
        class="border border-[hsl(0,0%,60%)] px-4 p-1 mb-2 text-gray-800 rounded"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <label class="mb-1">Status</label>
      <select
        v-model="status"
        class="border border-[hsl(0,0%,60%)] px-4 p-1 mb-2 text-gray-800 rounded"
      >
        <option value="Todo">Todo</option>
        <option value="Doing">Doing</option>
        <option value="Done">Done</option>
      </select>
      <label class="mb-1">Deadline</label>
      <input
        type="date"
        v-model="date"
        class="border border-[hsl(0,0%,60%)] px-4 p-1 mb-2 text-gray-800 rounded"
      />
      <p v-if="showError" class="text-red-400 text-sm">{{ error }}</p>
      <button
        @click="createTask"
        class="mt-4 mb-2 bg-black text-white rounded px-4 p-1 cursor-pointer"
      >
        {{ task ? 'Update' : 'Create' }}
      </button>
      <button
        @click="removeTask"
        v-if="task"
        class="mb-4 border-2 text-black rounded px-4 p-1 cursor-pointer"
      >
        Delete
      </button>
      <div class="absolute top-4 right-4 p-2 cursor-pointer" @click="closeModal">
        <i class="fa-solid fa-xmark"></i>
      </div>
    </div>
    <div class="absolute inset-0 z-0 bg-black/10 backdrop-blur-md" @click="closeModal"></div>
  </div>
</template>

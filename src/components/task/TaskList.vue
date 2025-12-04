<script setup>
import TaskCard from './TaskCard.vue';

  defineProps(['tasks', 'removeTask', 'projectId', 'loadTasks'])
</script>
<template>
  <ul class="flex flex-col gap-2 mt-4 w-full">
    <TaskCard v-for="task in tasks" :key="task.id" :task :removeTask  :projectId :loadTasks/>
  </ul>
</template>

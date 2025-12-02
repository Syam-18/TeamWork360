<script setup>
import { useAuthStore } from '@/stores/authStore';
const auth = useAuthStore()

</script>
<template>
  <p>{{ auth.user }}</p>
</template>

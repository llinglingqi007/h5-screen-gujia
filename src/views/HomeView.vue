<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import api from '@/api'
api.getTheme().then((res) => {
  console.log(res)
})
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>

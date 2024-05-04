<template>
  <component :is="quizComponent" />
</template>

<script setup>
//========== IMPORTS ==========
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useQuizStore } from '@/stores/quizzes'
//========== STORES ==========
const quizStore = useQuizStore()
//========== VARIABLES ==========
const route = useRoute()
//========== COMPUTED ==========
const quizComponent = computed(() => {
  return quizStore.quizzes[route.params.id - 1].component
})
//========== VARIABLES ==========

//========== METHODS ==========

//========== ON MOUNTED ==========

//========== WATCH ==========

</script>

<style scoped></style>

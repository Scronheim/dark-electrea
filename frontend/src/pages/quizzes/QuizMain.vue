<template>
  <v-card title="Список викторин">
    <v-card-text>
      <v-row v-for="(chunk, chunkIndex) in chunkedQuizzes" :key="chunkIndex">
        <v-col v-for="quiz in chunk" :key="quiz.id">
          <v-card :title="quiz.title" :to="`/quizzes/${quiz.id}`">
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
//========== IMPORTS ==========
import { computed } from 'vue'
import { chunk } from 'lodash'

import { useQuizStore } from '@/stores/quizzes'
//========== STORES ==========
const quizStore = useQuizStore()
//========== VARIABLES ==========

//========== COMPUTED ==========
const chunkedQuizzes = computed(() => {
  return chunk(quizStore.quizzes, 3)
})
//========== VARIABLES ==========

//========== METHODS ==========

//========== ON MOUNTED ==========

//========== WATCH ==========

</script>

<style scoped></style>

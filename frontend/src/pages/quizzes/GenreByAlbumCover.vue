<template>
  <v-card title="Жанр по обложке альбома" :loading="albumStore.albumIsLoading">
    <v-card-text>
      <v-row>
        <v-col>
          <v-img max-width="600" :src="albumStore.currentAlbum.cover" />
        </v-col>
        <v-col>
          <v-text-field v-model="selectedGenre" @keydown.enter="checkAnswer" />
          <v-btn block color="success" :disabled="selectedGenre === ''" @click="checkAnswer">Подтвердить</v-btn>
          <v-btn block color="info" @click="runQuiz">Пропустить</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
//========== IMPORTS ==========
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'

import { useAlbumStore } from '@/stores/album'
import { useUsersStore } from '@/stores/users'

//========== STORES ==========
const albumStore = useAlbumStore()
const usersStore = useUsersStore()
const toast = useToast()
//========== VARIABLES ==========
const selectedGenre = ref('')
//========== COMPUTED ==========

//========== VARIABLES ==========

//========== METHODS ==========
const checkAnswer = async () => {
  if (albumStore.currentAlbum.genre.toLowerCase().indexOf(selectedGenre.value.toLowerCase()) > -1) {
    toast.success('Правильный ответ!')
    const userQuiz = usersStore.user.quizzes.find(q => q.quizId === 2)
    if (userQuiz) {
      userQuiz.correctAnswers++
    } else {
      usersStore.user.quizzes.push({
        quizId: 2,
        correctAnswers: 1,
      })
    }
    usersStore.updateMe()
  } else {
    toast.error('Не правильный ответ!')
  }
  selectedGenre.value = ''
  await runQuiz()
}
const runQuiz = async () => {
  await albumStore.getRandomAlbum(true)
}
//========== ON MOUNTED ==========
onMounted(() => {
  runQuiz()
})
//========== WATCH ==========

</script>

<style scoped></style>

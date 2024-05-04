<template>
  <v-card title="Страна по фото" :loading="bandsStore.bandIsLoading">
    <v-card-text>
      <v-row>
        <v-col>
          <v-img max-width="600" :src="bandsStore.currentBand.logoUrl" />
          <v-img max-width="600" :src="bandsStore.currentBand.photoUrl" />
        </v-col>
        <v-col>
          <CountryAutocomplete :value="selectedCountry" @updateValue="updateSelectedCountry" />
          <v-btn block color="success" :disabled="selectedCountry === ''" @click="checkAnswer">Подтвердить</v-btn>
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

import { useBandsStore } from '@/stores/bands'
import { useUsersStore } from '@/stores/users'

import CountryAutocomplete from '@/components/inputs/CountryAutocomplete'
//========== STORES ==========
const bandsStore = useBandsStore()
const usersStore = useUsersStore()
const toast = useToast()
//========== VARIABLES ==========
const selectedCountry = ref('')
//========== COMPUTED ==========

//========== VARIABLES ==========

//========== METHODS ==========
const checkAnswer = async () => {
  if (bandsStore.currentBand.country === selectedCountry.value) {
    toast.success('Правильный ответ!')
    const userQuiz = usersStore.user.quizzes.find(q => q.quizId === 1)
    if (userQuiz) {
      userQuiz.correctAnswers++
    } else {
      usersStore.user.quizzes.push({
        quizId: 1,
        correctAnswers: 1,
      })
    }
    usersStore.updateMe()
  } else {
    toast.error('Не правильный ответ!')
  }
  selectedCountry.value = ''
  await runQuiz()
}
const updateSelectedCountry = (country) => {
  selectedCountry.value = country
}
const runQuiz = async () => {
  await bandsStore.getRandomBand(true)
}
//========== ON MOUNTED ==========
onMounted(() => {
  runQuiz()
})
//========== WATCH ==========

</script>

<style scoped></style>

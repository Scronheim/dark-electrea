<template>
  <v-container fluid class="fill-height d-flex justify-center">
    <v-row justify="center" align="center" class="fill-height">
      <v-col align="center">
        <div class="text-h1 mb-4">
          <span class="text-grey-darken-1">Metal </span>
          <span class="text-blue-lighten-1">Library</span>
        </div>

        <div style="max-width: 600px">
          <SearchInput/>

          <v-expansion-panels class="mt-3">
            <v-expansion-panel title="Случайная группа">
              <v-expansion-panel-text>
                <RandomForm :filter="bandsStore.filters"/>
                <v-btn variant="outlined" class="mt-4" color="info" :loading="randomBandIsLoading" @click="getRandomBand">Случайная группа</v-btn>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>

        <div v-if="!usersStore.isLoggedIn" class="mt-4">
          <v-btn to="/login" variant="outlined" class="mr-4">Войти</v-btn>
          <v-btn to="/register" variant="outlined">Регистрация</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
//========== IMPORTS ==========
import { ref } from 'vue'
import { useUsersStore } from '@/stores/users'
import { useBandsStore } from '@/stores/bands'

import RandomForm from '@/components/RandomForm'
import SearchInput from '@/components/SearchInput'
import router from '@/router'
//========== STORES ==========
const usersStore = useUsersStore()
const bandsStore = useBandsStore()
//========== VARIABLES ==========
const randomBandIsLoading = ref(false)
//========== COMPUTED ==========

//========== VARIABLES ==========

//========== METHODS ==========
const getRandomBand = async () => {
  randomBandIsLoading.value = true
  await bandsStore.getRandomBand()
  randomBandIsLoading.value = false
  router.push(`/bands/${bandsStore.currentBand._id}`)
}
//========== ON MOUNTED ==========

//========== WATCH ==========

</script>

<style scoped></style>

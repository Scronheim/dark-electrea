<template>
  <v-container fluid class="fill-height">
    <v-row justify="center" align="center" class="fill-height">
      <v-col align="center">
        <p class="text-h1">
          <span class="text-grey-darken-1">Metal </span>
          <span class="text-blue-lighten-1">Library</span>
        </p>
        <SearchInput />
        <v-expansion-panels class="mt-3">
          <v-expansion-panel title="Случайная группа">
            <v-expansion-panel-text>
              <v-row>
                <v-col>
                  <CountryAutocomplete :value="bandsStore.randomBandFilters.country" @updateValue="updateCountry" />
                </v-col>
                <v-col>
                  <v-text-field label="Жанр" v-model="bandsStore.randomBandFilters.genre" />
                </v-col>
                <v-col>
                  <StatusSelect :value="bandsStore.randomBandFilters.status" @updateValue="updateStatus" />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn color="info" :loading="randomBandIsLoading" @click="getRandomBand">Случайная группа</v-btn>
                </v-col>
              </v-row>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
        <template v-if="!usersStore.isLoggedIn">
          <v-btn to="/login">Войти</v-btn>
          <v-btn to="/register">Регистрация</v-btn>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
//========== IMPORTS ==========
import { ref } from 'vue'

import { useUsersStore } from '@/stores/users'
import { useBandsStore } from '@/stores/bands'

import SearchInput from '@/components/SearchInput'
import CountryAutocomplete from '@/components/inputs/CountryAutocomplete.vue'
import StatusSelect from '@/components/inputs/StatusSelect.vue'
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
const updateStatus = (eventStatus) => {
  bandsStore.randomBandFilters.status = eventStatus
}
const updateCountry = (eventCountry) => {
  bandsStore.randomBandFilters.country = eventCountry
}
//========== ON MOUNTED ==========

//========== WATCH ==========

</script>

<style scoped></style>

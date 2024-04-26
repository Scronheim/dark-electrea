<template>
  <v-list nav rounded>
    <v-list-item title="Главная" prepend-icon="mdi-home" to="/" />
    <v-list-item title="Случайная группа" prepend-icon="mdi-account-convert" @click="searchRandomBand">
      <template #append>
        <v-btn icon="mdi-cog" color="info" size="smaller" :loading="randomBandIsLoading"
          @click.stop="randomBandDialog = true" />
      </template>
    </v-list-item>
    <v-list-item title="Группы" prepend-icon="mdi-account-group" to="/bands" />
    <v-list-item title="Альбомы" prepend-icon="mdi-album" to="/albums" />
  </v-list>

  <v-dialog width="700" v-model="randomBandDialog">
    <v-card title="Фильтры поиска">
      <v-card-text>
        <v-row>
          <v-col>
            <CountryAutocomplete :value="bandsStore.randomBandFilters.country" @updateValue="updateSelectedCountry" />
          </v-col>
          <v-col>
            <v-text-field label="Жанр" v-model="bandsStore.randomBandFilters.genre" />
          </v-col>
          <v-col>
            <YearsAutocomplete :value="bandsStore.randomBandFilters.formedIn" @updateValue="updateFormedIn" />
          </v-col>
          <v-col>
            <v-select label="Статус" :items="utilStore.statuses" v-model="bandsStore.randomBandFilters.status" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="error" @click="clearRandomFilters">Очистить</v-btn>
        <v-btn color="success" @click="searchRandomBand">Поиск</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
//========== IMPORTS ==========
import { ref } from 'vue'
import { onKeyStroke } from '@vueuse/core'

import { useBandsStore } from '@/stores/bands'
import { useUtilStore } from '@/stores/util'

import router from '@/router'

import CountryAutocomplete from '@/components/inputs/CountryAutocomplete'
import YearsAutocomplete from '@/components/inputs/YearsAutocomplete'
//========== STORES ==========
const bandsStore = useBandsStore()
const utilStore = useUtilStore()
//========== COMPUTED ==========

//========== VARIABLES ==========
const randomBandDialog = ref(false)
const randomBandIsLoading = ref(false)
//========== METHODS ==========
const clearRandomFilters = () => {
  bandsStore.randomBandFilters.country = ''
  bandsStore.randomBandFilters.genre = ''
  bandsStore.randomBandFilters.status = ''
  bandsStore.randomBandFilters.formedIn = ''
}
const searchRandomBand = async () => {
  randomBandIsLoading.value = true
  await bandsStore.getRandomBand()
  randomBandDialog.value = false
  randomBandIsLoading.value = false
  router.push(`/bands/${bandsStore.currentBand._id}`)
}

const updateFormedIn = (formedIn) => {
  bandsStore.randomBandFilters.formedIn = formedIn
}
const updateSelectedCountry = (country) => {
  bandsStore.randomBandFilters.country = country
}

onKeyStroke(['r', 'к'], async () => {
  await searchRandomBand()
})
onKeyStroke(['R', 'К'], () => {
  randomBandDialog.value = true
})
//========== ON MOUNTED ==========

//========== WATCH ==========

</script>

<style scoped></style>

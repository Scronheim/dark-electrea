<template>
  <v-row>
    <v-col>
      <v-text-field label="Название" v-model="bandsStore.currentBand.title" />
    </v-col>
    <v-col>
      <YearsAutocomplete :value="bandsStore.currentBand.formedIn" @updateValue="updateFormedIn" />
    </v-col>
    <v-col>
      <v-select label="Статус" :items="utilStore.statuses" v-model="bandsStore.currentBand.status" />
    </v-col>
    <v-col>
      <CountryAutocomplete :value="bandsStore.currentBand.country" @updateValue="updateCountry" />
    </v-col>
    <v-col>
      <v-text-field label="Город" v-model="bandsStore.currentBand.city" />
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-text-field label="Жанр" :value="bandsStore.currentBand.genre" @updateValue="updateGenres" />
    </v-col>
    <v-col>
      <v-text-field label="Темы текстов" v-model="bandsStore.currentBand.lyricsTheme" />
    </v-col>
    <v-col>
      <v-text-field label="Лейбл" :value="bandsStore.currentBand.label" @updateValue="updateLabel" />
    </v-col>
    <v-col>
      <v-text-field label="Ссылка на лого" v-model="bandsStore.currentBand.logoUrl" />
    </v-col>
    <v-col>
      <v-text-field label="Ссылка на фото" v-model="bandsStore.currentBand.photoUrl" />
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-textarea label="Описание" v-model="bandsStore.currentBand.description" />
    </v-col>
  </v-row>
</template>

<script setup>
//========== IMPORTS ==========
import { useBandsStore } from '@/stores/bands'
import { useUtilStore } from '@/stores/util'
import YearsAutocomplete from '@/components/inputs/YearsAutocomplete'
import CountryAutocomplete from '@/components/inputs/CountryAutocomplete'
//========== STORES ==========
const bandsStore = useBandsStore()
const utilStore = useUtilStore()
//========== COMPUTED ==========

//========== VARIABLES ==========

//========== METHODS ==========
const updateGenres = (genre) => {
  bandsStore.currentBand.genre = genre
}
const updateLabel = (label) => {
  bandsStore.currentBand.label = label
}
const updateCountry = (country) => {
  bandsStore.currentBand.country = country
}
const updateFormedIn = (year) => {
  bandsStore.currentBand.formedIn = year
}
//========== ON MOUNTED ==========

</script>

<style scoped></style>

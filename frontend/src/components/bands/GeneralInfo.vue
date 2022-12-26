<template>
  <v-row>
    <v-col>
      <v-text-field label="Title" v-model="bandsStore.currentBand.title"/>
    </v-col>
    <v-col>
      <YearsAutocomplete :value="bandsStore.currentBand.formedIn" @updateValue="updateFormedIn"/>
    </v-col>
    <v-col>
      <CountryAutocomplete :value="bandsStore.currentBand.countryOfOrigin" @updateValue="updateCountry"/>
    </v-col>
    <v-col>
      <v-text-field label="City"
                    v-model="bandsStore.currentBand.city"
      />
    </v-col>
    <v-col>
      <v-select label="Status"
                :items="utilStore.statuses"
                v-model="bandsStore.currentBand.status"
      />
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <GenresAutocomplete :value="bandsStore.currentBand.genres" @updateValue="updateGenres"/>
    </v-col>
    <v-col>
      <v-text-field label="Lyrics theme" v-model="bandsStore.currentBand.lyricsTheme"/>
    </v-col>
    <v-col>
      <LabelAutocomplete :value="bandsStore.currentBand.label" @updateValue="updateLabel"/>
    </v-col>
    <v-col>
      <v-text-field label="Link to logo" v-model="bandsStore.currentBand.logo"/>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-textarea label="Description" v-model="bandsStore.currentBand.description"/>
    </v-col>
  </v-row>
</template>

<script setup>
//========== IMPORTS ==========
import { useBandsStore } from '@/stores/bands'
import { useUtilStore } from '@/stores/util'
import YearsAutocomplete from '@/components/inputs/YearsAutocomplete'
import CountryAutocomplete from '@/components/inputs/CountryAutocomplete'
import LabelAutocomplete from '@/components/inputs/LabelAutocomplete'
import GenresAutocomplete from '@/components/inputs/GenresAutocomplete'
//========== STORES ==========
const bandsStore = useBandsStore()
const utilStore = useUtilStore()
//========== COMPUTED ==========

//========== VARIABLES ==========

//========== METHODS ==========
const updateGenres = (genres) => {
  bandsStore.currentBand.genres = genres
}
const updateLabel = (label) => {
  bandsStore.currentBand.label = label
}
const updateCountry = (country) => {
  bandsStore.currentBand.countryOfOrigin = country
}
const updateFormedIn = (year) => {
  bandsStore.currentBand.formedIn = year
}
//========== ON MOUNTED ==========

</script>

<style scoped>

</style>

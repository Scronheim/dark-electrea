<template>
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
</template>

<script setup>
//========== IMPORTS ==========
import { useBandsStore } from '@/stores/bands'
import { useUtilStore } from '@/stores/util'

import CountryAutocomplete from '@/components/inputs/CountryAutocomplete'
import YearsAutocomplete from '@/components/inputs/YearsAutocomplete'
//========== STORES ==========
const bandsStore = useBandsStore()
const utilStore = useUtilStore()
//========== COMPUTED ==========

//========== VARIABLES ==========
//========== METHODS ==========

const updateFormedIn = (formedIn) => {
  bandsStore.randomBandFilters.formedIn = formedIn
}
const updateSelectedCountry = (country) => {
  bandsStore.randomBandFilters.country = country
}
//========== ON MOUNTED ==========

//========== WATCH ==========

</script>

<style scoped></style>

<template>
  <div class="d-flex flex-column mt-4" style="gap: 12px">
    <div class="input_wrapper">
      <CountryAutocomplete :value="bandsStore.randomBandFilters.country" @updateValue="updateSelectedCountry" />
      <v-text-field label="Жанр" v-model="bandsStore.randomBandFilters.genre" />
    </div>
    <div class="input_wrapper">
    <YearsAutocomplete :value="bandsStore.randomBandFilters.formedIn" @updateValue="updateFormedIn" />
    <v-select label="Статус" :items="utilStore.statuses" v-model="bandsStore.randomBandFilters.status" />
    </div>
  </div>
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

<style scoped>

.input_wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
@media (max-width: 600px) {
  .input_wrapper {
    flex-direction: column;
  }
}
</style>

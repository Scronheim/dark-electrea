<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field label="Название" v-model="bandsStore.filters.title" />
        </v-col>
        <v-col>
          <v-text-field label="Жанр" v-model="bandsStore.filters.genre" />
        </v-col>
        <v-col>
          <CountryAutocomplete :value="bandsStore.filters.country" @updateValue="updateSelectedCountry" />
        </v-col>
        <v-col>
          <YearsAutocomplete :value="bandsStore.filters.formedIn" @updateValue="updateSelectedYear" />
        </v-col>
        <v-col cols="2">
          <SearchButton @click="searchBandsByFilters" />
          <FilterRemoveButton @click="removeFilters" />
        </v-col>
      </v-row>
      <v-row v-if="isLoading" justify="center">
        <v-col align="center">
          <VueSpinnerOval size="64" />
        </v-col>
      </v-row>
      <v-row v-else v-for="(chunk, index) in chunkedBands" :key="`band${index}`">
        <v-col v-for="band in chunk" :key="band.title">
          <v-card :title="`${band.title} (${band.country})`" @click="goToBandPage(band)">
            <v-card-text>
              <v-img height="100" :src="band.logoUrl" />
              <v-img height="200" :src="band.photoUrl" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
//========== IMPORTS ==========
import { computed, onMounted, ref } from 'vue'
import { chunk } from 'lodash'
import { VueSpinnerOval } from 'vue3-spinners'
import { useBandsStore } from '@/stores/bands'
import router from '@/router'
import CountryAutocomplete from '@/components/inputs/CountryAutocomplete'
import YearsAutocomplete from '@/components/inputs/YearsAutocomplete'
import FilterRemoveButton from '@/components/buttons/FilterRemoveButton'
import SearchButton from '@/components/buttons/SearchButton'
//========== STORES ==========
const bandsStore = useBandsStore()
//========== VARIABLES ==========
const isLoading = ref(false)
//========== COMPUTED ==========
const chunkedBands = computed(() => {
  return chunk(bandsStore.foundedBands, 4)
})
//========== METHODS ==========
const removeFilters = () => {
  bandsStore.filters.label = undefined
  bandsStore.filters.country = undefined
  bandsStore.filters.formedIn = undefined
  bandsStore.filters.title = undefined
  bandsStore.filters.genre = undefined
}
const searchBandsByFilters = async () => {
  isLoading.value = true
  await bandsStore.searchBandsByFilters()
  isLoading.value = false
}
const updateSelectedYear = (year) => {
  bandsStore.filters.formedIn = year
}
const updateSelectedCountry = (country) => {
  bandsStore.filters.country = country
}
const goToBandPage = (band) => {
  router.push(`/bands/${band._id}`)
}
//========== ON MOUNTED ==========
onMounted(async () => {
  if (Object.values(bandsStore.filters).some(v => v !== undefined)) {
    await bandsStore.searchBandsByFilters()
  }
})
</script>

<style scoped></style>

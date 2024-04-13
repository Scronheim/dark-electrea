<template>
  <v-container fluid>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field label="Genre" v-model="bandsStore.filters.genre" />
          </v-col>
          <v-col>
            <CountryAutocomplete :value="bandsStore.filters.country" @updateValue="updateSelectedCountry" />
          </v-col>
          <v-col>
            <YearsAutocomplete :value="bandsStore.filters.formedIn" @updateValue="updateSelectedYear" />
          </v-col>
          <v-col>
            <LabelAutocomplete :value="bandsStore.filters.label" @updateValue="updateSelectedLabel" />
          </v-col>
          <v-col cols="1">
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
          <v-col cols="3" v-for="band in chunk" :key="band.title">
            <v-card :title="band.title" @click="goToBandPage(band)">
              <v-card-text>
                <v-img :src="band.logo" />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
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
import LabelAutocomplete from '@/components/inputs/LabelAutocomplete'
import FilterRemoveButton from '@/components/buttons/FilterRemoveButton'
import SearchButton from '@/components/buttons/SearchButton'
//========== STORES ==========
const bandsStore = useBandsStore()
//========== VARIABLES ==========
const isLoading = ref(false)
const bands = ref([])
//========== COMPUTED ==========
const chunkedBands = computed(() => {
  return chunk(bands.value, 4)
})
//========== METHODS ==========
const removeFilters = () => {
  bandsStore.filters.label = undefined
  bandsStore.filters.country = undefined
  bandsStore.filters.formedIn = undefined
  bandsStore.filters.genres.$in = []
}
const searchBandsByFilters = async () => {
  isLoading.value = true
  const { data } = await bandsStore.searchBandsByFilters()
  bands.value = data.data
  isLoading.value = false
}

const updateSelectedLabel = (label) => {
  bandsStore.filters.label = label
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
</script>

<style scoped></style>

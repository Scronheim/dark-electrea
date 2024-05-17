<template>
  <div class="d-flex flex-column mt-4" style="gap: 12px">
    <div class="input_wrapper">
      <CountryAutocomplete v-if="showCountry" :value="props.filter.country" @updateValue="updateSelectedCountry" />
      <v-text-field v-if="showGenre" label="Жанр" v-model="props.filter.genre" />
    </div>
    <div class="input_wrapper">
    <YearsAutocomplete v-if="props.showYears" :value="props.filter.formedIn" @updateValue="updateFormedIn" />
    <v-select v-if="props.showStatus" label="Статус" :items="utilStore.statuses" v-model="props.filter.status" />
    </div>
  </div>
</template>

<script setup>
//========== IMPORTS ==========
import { useUtilStore } from '@/stores/util'

import CountryAutocomplete from '@/components/inputs/CountryAutocomplete'
import YearsAutocomplete from '@/components/inputs/YearsAutocomplete'
//========== STORES ==========
const utilStore = useUtilStore()
//========== PROPS ==========
const props = defineProps({
  filter: {
    type: Object,
  },
  showCountry: {
    type: Boolean,
    default: true,
  },
  showGenre: {
    type: Boolean,
    default: true,
  },
  showYears: {
    type: Boolean,
    default: true,
  },
  showStatus: {
    type: Boolean,
    default: true,
  }
})
//========== COMPUTED ==========

//========== VARIABLES ==========
//========== METHODS ==========

const updateFormedIn = (formedIn) => {
  props.filter.formedIn = formedIn
}
const updateSelectedCountry = (country) => {
  props.filter.country = country
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

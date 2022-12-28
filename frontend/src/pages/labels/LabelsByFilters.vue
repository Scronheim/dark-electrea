<template>
  <v-container fluid>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col>
            <CountryAutocomplete :value="labelsStore.filters.country" @updateValue="updateSelectedCountry"/>
          </v-col>
        </v-row>
        <v-row v-if="isLoading" justify="center">
          <v-col align="center">
            <VueSpinnerOval size="64"/>
          </v-col>
        </v-row>
        <v-row v-else v-for="(chunk, index) in chunkedLabels" :key="`label${index}`">
          <v-col cols="3" v-for="label in chunk" :key="label.title">
            <v-card :title="label.title" @click="goToLabelPage(label)">
              <v-card-text>
                <v-img :src="label.logo"/>
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
import { computed, onMounted, ref, watch } from 'vue'
import { chunk } from 'lodash'
import { VueSpinnerOval } from 'vue3-spinners'
import { useLabelsStore } from '@/stores/labels'
import router from '@/router'
import CountryAutocomplete from '@/components/inputs/CountryAutocomplete'
//========== STORES ==========
const labelsStore = useLabelsStore()
//========== VARIABLES ==========
const isLoading = ref(false)
const labels = ref([])
//========== COMPUTED ==========
const chunkedLabels = computed(() => {
  return chunk(labels.value, 4)
})
//========== WATCH ==========
watch(labelsStore.filters, () => {
  searchLabelsByFilters()
}, { deep: true })
//========== METHODS ==========
const searchLabelsByFilters = async () => {
  isLoading.value = true
  const { data } = await labelsStore.searchLabelsByFilters()
  labels.value = data.data
  isLoading.value = false
}
const updateSelectedCountry = (country) => {
  labelsStore.filters.country = country
}
const goToLabelPage = (label) => {
  labelsStore.currentLabel = label
  router.push(`/labels/${label._id}`)
}
//========== ON MOUNTED ==========
onMounted(() => {
  searchLabelsByFilters()
})
</script>

<style scoped>

</style>

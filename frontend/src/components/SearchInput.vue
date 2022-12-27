<template>
  <v-autocomplete
    autofocus
    autocomplete="off"
    density="default"
    variant="solo"
    v-model="model"
    v-model:search="search"
    :items="bandsStore.foundedBands"
    :loading="isLoading"
    clearable
    hide-no-data
    hide-selected
    item-title="title"
    item-value="_id"
    label="Search"
    placeholder="type something..."
    append-inner-icon="mdi-database-search"
    return-object
    @update:modelValue="selectBand"
    @click:clear.prevent="clearFoundedBands"
  />
</template>

<script setup>
//========== IMPORTS ==========
import { ref, watch } from 'vue'
import { useBandsStore } from '@/stores/bands'
import { useUtilStore } from '@/stores/util'
import router from '@/router'
//========== STORES ==========
const bandsStore = useBandsStore()
const utilStore = useUtilStore()
//========== COMPUTED ==========

//========== VARIABLES ==========
const isLoading = ref(false)
const search = ref(null)
const model = ref('')
//========== METHODS ==========
const clearFoundedBands = () => {
  bandsStore.foundedBands = []
}
const selectBand = (band) => {
  bandsStore.currentBand = band
  router.push(`/bands/${band._id}`)
}
//========== ON MOUNTED ==========

//========== WATCH ==========
watch(search, (value) => {
  if (!value) return
  // Items have already been requested
  if (isLoading.value) return

  isLoading.value = true
  try {
    bandsStore.searchBand(value)
  } catch (e) {
    utilStore.axiosErrorHandler(e)
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>

</style>

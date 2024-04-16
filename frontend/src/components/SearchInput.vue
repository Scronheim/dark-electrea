<template>
  <v-text-field autofocus autocomplete="off" density="default" variant="solo" v-model="search" :loading="isLoading"
    clearable label="Поиск группы" return-object @click:clear.prevent="clearFoundedBands" @click:append="searchBand"
    append-icon="mdi-magnify" @keyup.enter="searchBand" />
</template>

<script setup>
//========== IMPORTS ==========
import { ref } from 'vue'
import { useBandsStore } from '@/stores/bands'
import router from '@/router'
//========== STORES ==========
const bandsStore = useBandsStore()
//========== COMPUTED ==========

//========== VARIABLES ==========
const isLoading = ref(false)
const search = ref(null)
//========== METHODS ==========
const clearFoundedBands = () => {
  bandsStore.foundedBands = []
}
const searchBand = async () => {
  await bandsStore.searchBand(search.value)
  router.push('/bands')
}
//========== ON MOUNTED ==========

</script>

<style scoped></style>

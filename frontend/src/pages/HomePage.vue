<template>
  <v-container fluid class="fill-height">
    <v-row justify="center" align="center" class="fill-height">
      <v-col align="center">
        <p class="text-h1">
          <span class="text-grey-darken-1">Dark </span>
          <span class="text-blue-lighten-1">Electrea</span>
        </p>
        <v-autocomplete
          density="default"
          variant="solo"
          v-model="model"
          v-model:search="search"
          :items="artistStore.foundedArtists"
          :loading="isLoading"
          hide-no-data
          hide-selected
          item-title="title"
          item-value="_id"
          label="Search"
          placeholder="type something..."
          append-inner-icon="mdi-database-search"
          return-object
          @update:modelValue="selectArtist"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
//========== IMPORTS ==========
import { ref, watch } from 'vue'
import { useArtistStore } from '@/stores/artist'
import { useUtilStore } from '@/stores/util'
import router from '@/router'
//========== STORES ==========
const artistStore = useArtistStore()
const utilStore = useUtilStore()

//========== COMPUTED ==========

//========== VARIABLES ==========
const isLoading = ref(false)
const search = ref('')
const model = ref('')
//========== METHODS ==========
const selectArtist = (artist) => {
  router.push(`/artists/${artist._id}`)
}
//========== ON MOUNTED ==========

//========== WATCH ==========
watch(search, (value) => {
  if (value === '') return
  // Items have already been requested
  if (isLoading.value) return

  isLoading.value = true
  try {
    artistStore.searchArtist(value)
  } catch (e) {
    utilStore.axiosErrorHandler(e)
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>

</style>

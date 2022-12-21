<template>
  <v-container fluid>

  </v-container>
</template>

<script setup>
//========== IMPORTS ==========
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useArtistStore } from '@/stores/artist'
//========== STORES ==========
const artistStore = useArtistStore()
//========== COMPUTED ==========

//========== VARIABLES ==========
const route = useRoute()
//========== METHODS ==========

//========== ON MOUNTED ==========
onMounted(() => {
  artistStore.getArtistInfo(route.params.id)
})
</script>

<style scoped>

</style>

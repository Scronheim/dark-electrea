<template>
  <v-container fluid>
    <v-card>
      <v-card-title>Bands created in {{ selectedCountry }}</v-card-title>
      <v-card-text>
        <v-row v-for="(chunk, index) in chunkedArtists" :key="`artist${index}`">
          <v-col cols="3" v-for="artist in chunk" :key="artist.title">
            <v-card :title="artist.title" @click="goToArtistPage(artist)">
              <v-card-text>
                <v-img :src="artist.logo"/>
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
import { useRoute } from 'vue-router'
import { chunk } from 'lodash'
import { useBandsStore } from '@/stores/bands'
import router from '@/router'
//========== STORES ==========
const bandsStore = useBandsStore()
//========== COMPUTED ==========
const chunkedArtists = computed(() => {
  return chunk(artists.value, 4)
})
const selectedCountry = computed(() => {
  return route.params.country.charAt(0).toUpperCase() + route.params.country.slice(1)
})
//========== VARIABLES ==========
const artists = ref([])
const route = useRoute()
//========== METHODS ==========
const goToArtistPage = (artist) => {
  router.push(`/bands/${artist._id}`)
}
//========== ON MOUNTED ==========
onMounted(async () => {
  const { data } = await bandsStore.getArtistsByCountry(route.params.country)
  artists.value = data.data
})
</script>

<style scoped>

</style>

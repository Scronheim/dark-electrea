<template>
  <v-card-title>Socials</v-card-title>
  <v-row>
    <v-col v-for="type in socialTypes" :key="type.value">
      <v-text-field :label="type.title" v-model="artistStore.currentArtist.social[type.value]"/>
    </v-col>
  </v-row>
</template>

<script setup>
//========== IMPORTS ==========
import { useArtistStore } from '@/stores/artist'
//========== STORES ==========
const artistStore = useArtistStore()
//========== COMPUTED ==========

//========== VARIABLES ==========
const socialTypes = [
  { title: 'Official site', value: 'officialSite' },
  { title: 'Facebook', value: 'facebook' },
  { title: 'Youtube', value: 'youtube' },
  { title: 'Discogs', value: 'discogs' },
  { title: 'Bandcamp', value: 'bandcamp' },
]
//========== METHODS ==========

//========== ON MOUNTED ==========

</script>

<style scoped>

</style>

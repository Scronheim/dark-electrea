<template>
  <v-container fluid>
    <v-card title="Add artist">
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field label="Title" v-model="artistStore.currentArtist.title"/>
          </v-col>
          <v-col>
            <v-autocomplete label="Formed in"
                            :items="years"
                            v-model.number="artistStore.currentArtist.formedIn"
            />
          </v-col>
          <v-col>
            <v-autocomplete label="Country"
                      :items="countries"
                      v-model="artistStore.currentArtist.countryOfOrigin">
            </v-autocomplete>
          </v-col>
          <v-col>
            <v-text-field label="City"
                          v-model="artistStore.currentArtist.city"
            />
          </v-col>
          <v-col>
            <v-select label="Status"
                      :items="statuses"
                      v-model="artistStore.currentArtist.status"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-autocomplete label="Genres" multiple
                            :items="genres"
                            v-model="artistStore.currentArtist.genres"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
//========== IMPORTS ==========
import { computed } from 'vue'
import { useArtistStore } from '@/stores/artist'
//========== STORES ==========
const artistStore = useArtistStore()
//========== COMPUTED ==========
const years = computed(() => {
  const now = new Date().getUTCFullYear()
  return Array(now - (now - 30)).fill('').map((v, idx) => now - idx)
})
//========== VARIABLES ==========
const genres = [
  { title: 'Dark Electro', value: 'dark-electro' },
  { title: 'EBM', value: 'ebm' },
  { title: 'Aggrotech', value: 'aggrotech' },
]
const statuses = [
  { title: 'Active', value: 'active' },
  { title: 'Split-up', value: 'splitUp' },
  { title: 'On hold', value: 'onHold' },
  { title: 'Unknown', value: 'unknown' },
]
const countries = [
  { title: 'Russia', value: 'russia', countryCode: 'ru' },
  { title: 'USA', value: 'usa', countryCode: 'us' },
  { title: 'Germany', value: 'germany', countryCode: 'de' },
  { title: 'Mexico', value: 'mexico', countryCode: 'mx' },
]
//========== METHODS ==========

//========== ON MOUNTED ==========

</script>

<style scoped>

</style>

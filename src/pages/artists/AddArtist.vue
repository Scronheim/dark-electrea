<template>
  <v-container fluid>
    <v-card title="Add artist">
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field label="Title" v-model="artistStore.currentArtist.title"/>
          </v-col>
          <v-col>
            <v-autocomplete label="Country"
                      :items="countries"
                      v-model="artistStore.currentArtist.countryOfOrigin">
            </v-autocomplete>
          </v-col>
          <v-col>
            <v-autocomplete label="Formed in"
                            :items="years"
                            v-model.number="artistStore.currentArtist.formedIn"
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

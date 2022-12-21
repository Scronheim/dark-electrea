<template>
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
                      :items="utilStore.countries"
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
                :items="utilStore.statuses"
                v-model="artistStore.currentArtist.status"
      />
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-autocomplete label="Genres" multiple
                      :items="utilStore.genres"
                      v-model="artistStore.currentArtist.genres"
      />
    </v-col>
    <v-col>
      <v-text-field label="Lyrics theme" v-model="artistStore.currentArtist.lyricsTheme"/>
    </v-col>
    <v-col>
      <v-text-field label="Label" v-model="artistStore.currentArtist.label">
        <template #append>
          <v-checkbox-btn label="Independent" @update:modelValue="updateLabel"/>
        </template>
      </v-text-field>
    </v-col>
    <v-col>
      <v-text-field label="Link to logo" v-model="artistStore.currentArtist.logo"/>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-textarea label="Description" v-model="artistStore.currentArtist.description"/>
    </v-col>
  </v-row>
</template>

<script setup>
//========== IMPORTS ==========
import { computed } from 'vue'
import { useArtistStore } from '@/stores/artist'
import { useUtilStore } from '@/stores/util'
//========== STORES ==========
const artistStore = useArtistStore()
const utilStore = useUtilStore()
//========== COMPUTED ==========
const years = computed(() => {
  const now = new Date().getUTCFullYear()
  return Array(now - (now - 30)).fill('').map((v, idx) => now - idx)
})
//========== VARIABLES ==========

//========== METHODS ==========
const updateLabel = (value) => {
  if (value) {
    artistStore.currentArtist.label = 'Independent'
  } else {
    artistStore.currentArtist.label = ''
  }
}
//========== ON MOUNTED ==========

</script>

<style scoped>

</style>

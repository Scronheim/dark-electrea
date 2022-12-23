<template>
  <v-row>
    <v-col>
      <v-text-field label="Title" v-model="bandsStore.currentBand.title"/>
    </v-col>
    <v-col>
      <v-autocomplete label="Formed in"
                      :items="years"
                      v-model.number="bandsStore.currentBand.formedIn"
      />
    </v-col>
    <v-col>
      <v-autocomplete label="Country"
                      :items="utilStore.countries"
                      v-model="bandsStore.currentBand.countryOfOrigin">
      </v-autocomplete>
    </v-col>
    <v-col>
      <v-text-field label="City"
                    v-model="bandsStore.currentBand.city"
      />
    </v-col>
    <v-col>
      <v-select label="Status"
                :items="utilStore.statuses"
                v-model="bandsStore.currentBand.status"
      />
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-autocomplete label="Genres" multiple
                      :items="utilStore.genres"
                      v-model="bandsStore.currentBand.genres"
      />
    </v-col>
    <v-col>
      <v-text-field label="Lyrics theme" v-model="bandsStore.currentBand.lyricsTheme"/>
    </v-col>
    <v-col>
      <v-text-field label="Label" v-model="bandsStore.currentBand.label">
        <template #append>
          <v-checkbox-btn label="Independent" @update:modelValue="updateLabel"/>
        </template>
      </v-text-field>
    </v-col>
    <v-col>
      <v-text-field label="Link to logo" v-model="bandsStore.currentBand.logo"/>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-textarea label="Description" v-model="bandsStore.currentBand.description"/>
    </v-col>
  </v-row>
</template>

<script setup>
//========== IMPORTS ==========
import { computed } from 'vue'
import { useBandsStore } from '@/stores/bands'
import { useUtilStore } from '@/stores/util'
//========== STORES ==========
const bandsStore = useBandsStore()
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
    bandsStore.currentBand.label = 'Independent'
  } else {
    bandsStore.currentBand.label = ''
  }
}
//========== ON MOUNTED ==========

</script>

<style scoped>

</style>

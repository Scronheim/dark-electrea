<template>
  <v-card-title>
    Lineup<PlusButton text="Add member" @click="lineupDialog = true"/>
  </v-card-title>
  <v-row v-for="(chunk, index) in chunkedLineup" :key="`personChunk${index}`">
    <v-col v-for="(person, personIndex) in chunk" :key="`personIndex${personIndex}`">
      <v-card>
        <v-card-title>
          {{ person.fullName }} - {{ person.instruments }}
          <DeleteButton text="Delete member" @click="deletePerson(person._id)"/>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>

  <v-dialog max-width="50%" v-model="lineupDialog">
    <LineupDialog/>
  </v-dialog>
</template>

<script setup>
//========== IMPORTS ==========
import { computed, ref } from 'vue'
import { chunk } from 'lodash'
import { useArtistStore } from '@/stores/artist'
import { useUtilStore } from '@/stores/util'
import PlusButton from '@/components/buttons/PlusButton'
import DeleteButton from '@/components/buttons/DeleteButton'
import LineupDialog from '@/components/artists/LineupDialog'
//========== STORES ==========
const artistStore = useArtistStore()
const utilStore = useUtilStore()
//========== COMPUTED ==========
const chunkedLineup = computed(() => {
  return chunk(artistStore.currentArtist.lineup, 4)
})
//========== VARIABLES ==========
const lineupDialog = ref(false)
//========== METHODS ==========
const deletePerson = (personId) => {
  const personIndex = artistStore.currentArtist.lineup.findIndex(p => {
    return p._id === personId
  })
  if (personIndex > -1) {
    artistStore.currentArtist.lineup.splice(personIndex)
  }
}
//========== ON MOUNTED ==========

</script>

<style scoped>

</style>

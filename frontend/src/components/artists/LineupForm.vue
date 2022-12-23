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
import { useBandsStore } from '@/stores/bands'
import PlusButton from '@/components/buttons/PlusButton'
import DeleteButton from '@/components/buttons/DeleteButton'
import LineupDialog from '@/components/artists/LineupDialog'
//========== STORES ==========
const bandsStore = useBandsStore()
//========== COMPUTED ==========
const chunkedLineup = computed(() => {
  return chunk(bandsStore.currentBand.lineup, 4)
})
//========== VARIABLES ==========
const lineupDialog = ref(false)
//========== METHODS ==========
const deletePerson = (personId) => {
  const personIndex = bandsStore.currentBand.lineup.findIndex(p => {
    return p._id === personId
  })
  if (personIndex > -1) {
    bandsStore.currentBand.lineup.splice(personIndex)
  }
}
//========== ON MOUNTED ==========

</script>

<style scoped>

</style>

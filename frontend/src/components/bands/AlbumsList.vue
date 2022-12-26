<template>
  <v-card>
    <v-card-title class="pb-0">
      Albums of {{ bandsStore.currentBand.title }}
      <PlusButton text="Add album" @click="addNewAlbum"/>
    </v-card-title>
    <v-card-text class="pt-0">
      <v-expansion-panels>
        <v-expansion-panel v-for="(album, index) in bandsStore.currentBand.albums" :key="index">
          <v-expansion-panel-title>
            {{ album.title }} ({{ new Date(album.releaseDate).getFullYear() }}) - {{ album.type }}
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <AlbumForm :is-edit="true" :album="album"/>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
  </v-card>
</template>

<script setup>
//========== IMPORTS ==========
import { ref } from 'vue'
import { useBandsStore } from '@/stores/bands'
import AlbumForm from '@/components/albums/AlbumForm'
import PlusButton from '@/components/buttons/PlusButton'
//========== STORES ==========
const bandsStore = useBandsStore()
//========== COMPUTED ==========

//========== VARIABLES ==========
const newAlbum = ref({
  title: 'new album',
  band: bandsStore.currentBand._id,
  cover: '',
  type: 'Full length',
  tracks: '',
  releaseDate: '',
  label: '63a9aa0a8562ab12bcddd78b',
  catalogId: '',
  format: 'CD',
  limitations: null,
  lineup: [],
  description: '',
  links: {
    youtube: '',
    facebook: '',
    bandcamp: '',
    officialSite: '',
  },
  userAdded: '',
})
//========== METHODS ==========
const addNewAlbum = async () => {
  bandsStore.currentBand.albums.push(newAlbum.value)
}
//========== ON MOUNTED ==========

</script>

<style scoped>

</style>

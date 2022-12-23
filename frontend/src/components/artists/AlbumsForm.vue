<template>
  <v-card-title>
    Albums<PlusButton text="Add album" @click="addNewAlbum"/>
  </v-card-title>
  <v-row v-for="(chunk, index) in chunkedAlbums" :key="`albumChunk${index}`">
    <v-col v-for="(album, albumIndex) in chunk" :key="`albumIndex${albumIndex}`">
      <v-card>
        <v-card-title>
          {{ album.title }} ({{ new Date(album.releaseDate).getFullYear() }})
          <DeleteButton/>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>

  <v-dialog max-width="50%" v-model="albumDialog">
    <AlbumForm
      :is-edit="false"
      :album="newAlbum">
      <template #actions>
        <v-btn color="red" @click="albumDialog = false">Close</v-btn>
        <v-btn color="success" @click="pushNewAlbum">Save</v-btn>
      </template>
    </AlbumForm>
  </v-dialog>
</template>

<script setup>
//========== IMPORTS ==========
import { computed, ref } from 'vue'
import { chunk } from 'lodash'
import AlbumForm from '@/components/albums/AlbumForm'
import PlusButton from '@/components/buttons/PlusButton'
import DeleteButton from '@/components/buttons/DeleteButton'
import { useBandsStore } from '@/stores/bands'
//========== STORES ==========
const bandsStore = useBandsStore()
//========== COMPUTED ==========
const chunkedAlbums = computed(() => {
  return chunk(bandsStore.currentBand.albums, 4)
})
//========== VARIABLES ==========
const newAlbum = ref({
  title: '',
  cover: '',
  type: 'fullLength',
  tracks: '',
  releaseDate: '',
  label: '',
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
})
const albumDialog = ref(false)
//========== METHODS ==========
const pushNewAlbum = () => {
  bandsStore.currentBand.albums.push(newAlbum.value)
  albumDialog.value = false
}
const addNewAlbum = () => {
  newAlbum.value = {
    title: '',
    cover: '',
    type: 'fullLength',
    releaseDate: '',
    label: '',
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
  }
  albumDialog.value = true
}
//========== ON MOUNTED ==========

</script>

<style scoped>

</style>

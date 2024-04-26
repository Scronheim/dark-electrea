<template>
  <v-card>
    <v-card-title class="pb-0">
      Альбомы группы {{ bandsStore.currentBand.title }}
      <PlusButton text="Добавить альбом" @click="addNewAlbum" />
    </v-card-title>
    <v-card-text class="pt-0">
      <v-expansion-panels>
        <v-expansion-panel v-for="(album, index) in bandsStore.currentBand.albums" :key="index">
          <v-expansion-panel-title style="min-height: 47px">
            {{ album.title }} {{ formatReleaseDate(album.releaseDate) }} - {{ album.type }}
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <AlbumForm :is-edit="true" :album="album" />
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card-text>
  </v-card>
</template>

<script setup>
//========== IMPORTS ==========
import { ref } from 'vue'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

import { useBandsStore } from '@/stores/bands'
import { useUtilStore } from '@/stores/util'

import AlbumForm from '@/components/albums/AlbumForm'
import PlusButton from '@/components/buttons/PlusButton'
//========== STORES ==========
const bandsStore = useBandsStore()
const utilStore = useUtilStore()
//========== COMPUTED ==========

//========== VARIABLES ==========
const newAlbum = ref({
  title: 'Новый альбом',
  band: bandsStore.currentBand._id,
  cover: '',
  type: 'Full length',
  genre: '',
  tracks: [],
  releaseDate: '',
  label: '',
  catalogId: '',
  format: '',
  limitations: null,
  lineup: [],
  exLineup: [],
  description: '',
  links: {
    youtube: '',
    facebook: '',
    bandcamp: '',
    officialSite: '',
    download: [],
  },
  userAdded: '',
})
//========== METHODS ==========
const formatReleaseDate = (realeaseDate) => {
  const date = utilStore.formattedAlbumYear(realeaseDate)
  if (date) return `(${date})`
  return
}
const addNewAlbum = async () => {
  bandsStore.currentBand.albums.push(Object.assign({}, newAlbum.value))
}
//========== ON MOUNTED ==========

</script>

<style scoped></style>

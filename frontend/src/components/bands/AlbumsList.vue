<template>
  <v-card>
    <v-card-title class="pb-0">
      Albums of {{ bandsStore.currentBand.title }}
      <PlusButton text="Add album" @click="addNewAlbum"/>
    </v-card-title>
    <v-card-text class="pt-0">
      <AlbumForm v-for="(album, index) in bandsStore.currentBand.albums" :is-edit="true" :album="album" :key="index"/>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <slot name="actions"/>
    </v-card-actions>
  </v-card>
</template>

<script setup>
//========== IMPORTS ==========
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useUsersStore } from '@/stores/users'
import { useBandsStore } from '@/stores/bands'
import { useAlbumStore } from '@/stores/album'
import AlbumForm from '@/components/albums/AlbumForm'
import PlusButton from '@/components/buttons/PlusButton'
//========== STORES ==========
const bandsStore = useBandsStore()
const albumStore = useAlbumStore()
const usersStore = useUsersStore()
//========== COMPUTED ==========

//========== VARIABLES ==========
const newAlbum = ref({
  title: '',
  band: '',
  cover: '',
  type: 'Full length',
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
  userAdded: '',
})
const route = useRoute()
//========== METHODS ==========
const addNewAlbum = async () => {
  bandsStore.currentBand.albums.push(newAlbum.value)
  // newAlbum.value.band = bandsStore.currentBand._id
  // newAlbum.value.userAdded = usersStore.user._id
  // await albumStore.addAlbum(newAlbum.value)
  // await bandsStore.getBandInfo(route.params.id)
}
//========== ON MOUNTED ==========

</script>

<style scoped>

</style>

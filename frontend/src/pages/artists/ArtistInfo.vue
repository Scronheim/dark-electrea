<template>
  <v-card>
    <v-img :src="artist.logo" cover height="300"/>
    <v-card-title>
      {{ artist.title }}
      <EditButton @click="editDialog = true"/>
    </v-card-title>
    <v-card-subtitle>
      <v-row>
        <v-col>
          Country of origin: <v-btn color="primary" @click="goToArtistByCountryPage(artist.countryOfOrigin)">{{ artist.countryOfOrigin }}</v-btn><br/>
          Location: <v-btn color="primary">{{ artist.city }}</v-btn><br/>
          Status: <v-btn :color="statusColor">{{ artist.status }}</v-btn><br/>
          Formed in: <v-btn color="info">{{ artist.formedIn }}</v-btn><br/>
          Years active: <v-btn color="info">{{ artist.yearsActive }}</v-btn><br/>
        </v-col>
        <v-col>
          Genre: <v-btn color="primary" v-for="genre in artist.genres" :key="genre">{{ genre }}</v-btn><br/>
          Lyrical themes: <v-btn color="info">{{ artist.lyricsTheme }}</v-btn><br/>
          Current label: <v-btn color="info">{{ artist.label }}</v-btn><br/>
        </v-col>
      </v-row>
    </v-card-subtitle>
    <v-card-text>
      <v-tabs slider-color="yellow" v-model="tab">
        <v-tab value="albums">Albums</v-tab>
        <v-tab value="description">Description</v-tab>
        <v-tab value="photos">Photos</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item value="albums">
          <v-row v-for="(chunk, index) in chunkedAlbums" :key="`chunk${index}`">
            <v-col cols="3" v-for="album in chunk" :key="album.title">
              <v-hover v-slot="{ isHovering, props }">
                <v-card v-bind="props" :elevation="isHovering ? 12 : 0" @click="goToAlbumPage(album)">
                  <v-card-title>{{ album.title }} ({{ dayjs(album.releaseDate).format('YYYY') }})</v-card-title>
                  <v-img :src="album.cover"/>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-window-item>
        <v-window-item value="description">
          {{ artist.description }}
        </v-window-item>
        <v-window-item value="photos">
          <v-row v-for="(chunk, index) in chunkedPhotos" :key="`photo${index}`">
            <v-col cols="3" v-for="photo in chunk" :key="photo">
              <v-img :src="photo"/>
            </v-col>
          </v-row>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>

  <v-dialog fullscreen v-model="editDialog">
    <v-card :title="`Edit ${artist.title}`">
      <v-card-text>
        <GeneralInfo/>
        <LineupForm/>
        <AlbumsForm/>
        <VideosForm/>
        <SocialsForm/>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="red" @click="editDialog = false">Close</v-btn>
        <v-btn color="success" @click="updateBand">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
//========== IMPORTS ==========
import { onMounted, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { chunk } from 'lodash'
import dayjs from 'dayjs'
import router from '@/router'
import { useBandsStore } from '@/stores/bands'
import { useUsersStore } from '@/stores/users'
import EditButton from '@/components/buttons/EditButton'
import GeneralInfo from '@/components/artists/GeneralInfo'
import LineupForm from '@/components/artists/LineupForm'
import AlbumsForm from '@/components/artists/AlbumsForm'
import VideosForm from '@/components/artists/VideosForm'
import SocialsForm from '@/components/artists/SocialsForm'
//========== STORES ==========
const usersStore = useUsersStore()
const bandsStore = useBandsStore()
//========== COMPUTED ==========
const chunkedPhotos = computed(() => {
  return chunk(artist.value.photos, 4)
})
const chunkedAlbums = computed(() => {
  return chunk(artist.value.albums, 4)
})
const statusColor = computed(() => {
  if (artist.value.status === 'active') {
    return 'success'
  } else if (artist.value.status === 'splitUp') {
    return 'red'
  } else if (artist.value.status === 'holdOn') {
    return 'blue'
  } else if (artist.value.status === 'unknown') {
    return 'grey'
  }
  return 'primary'
})
const artist = computed(() => {
  return bandsStore.currentBand
})
//========== VARIABLES ==========
const editDialog = ref(false)
const tab = ref('albums')
const route = useRoute()
//========== METHODS ==========
const updateBand = () => {
  bandsStore.updateBand()
  editDialog.value = false
}
const goToArtistByCountryPage = (country) => {
  router.push(`/country/${country}`)
}
const goToAlbumPage = (album) => {
  router.push(`/albums/${album._id}`)
}
//========== ON MOUNTED ==========
onMounted(() => {
  bandsStore.getBandInfo(route.params.id)
})
</script>

<style scoped>

</style>

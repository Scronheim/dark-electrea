<template>
  <v-card>
    <v-img :src="artist.logo" cover height="300"/>
    <v-card-title>
      {{ artist.title }}
    </v-card-title>
    <v-card-subtitle>
      <v-row>
        <v-col>
          Country of origin: <v-btn color="primary">{{ artist.countryOfOrigin }}</v-btn><br/>
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
    </v-card-text>
  </v-card>
</template>

<script setup>
//========== IMPORTS ==========
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { chunk } from 'lodash'
import dayjs from 'dayjs'
import { useArtistStore } from '@/stores/artist'
import router from '@/router'
//========== STORES ==========
const artistStore = useArtistStore()
//========== COMPUTED ==========
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
  return artistStore.currentArtist
})
//========== VARIABLES ==========
const route = useRoute()
//========== METHODS ==========
const goToAlbumPage = (album) => {
  router.push(`../albums/${album.title}`)
}
//========== ON MOUNTED ==========
onMounted(() => {
  artistStore.getArtistInfo(route.params.id)
})
</script>

<style scoped>

</style>

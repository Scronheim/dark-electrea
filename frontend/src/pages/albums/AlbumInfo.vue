<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        {{ album.title }}
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="2">
            <v-img :src="album.cover"/>
          </v-col>
          <v-col>
            <v-list>
              <v-list-item>Band: <v-btn color="info" @click="goToBandPage(album.band)">{{ album.band.title }}</v-btn></v-list-item>
              <v-list-item>Album: <v-btn color="primary">{{ album.title }}</v-btn></v-list-item>
              <v-list-item>
                Genre: <v-btn color="info" v-for="genre in album.genres" :key="genre" @click="goToAlbumsByFiltersPage('genres', genre)">{{ genre }}</v-btn>
              </v-list-item>
              <v-list-item>Release date: <v-btn color="primary">{{ formattedReleaseDate }}</v-btn></v-list-item>
              <v-list-item>Type: <v-btn color="primary">{{ album.type }}</v-btn></v-list-item>
              <v-list-item>Label:
                <v-btn color="info" @click="goToAlbumsByFiltersPage('label')">
                  {{ album.label.title }}
                </v-btn>
                <template v-if="album.catalogId">
                  Catalog ID: {{ album.catalogId }}
                </template>
                <template v-if="album.limitations">| Limitations: {{ album.limitations }}</template>
              </v-list-item>
              <v-list-item>Format: <v-btn color="primary">{{ album.format }}</v-btn></v-list-item>
            </v-list>
          </v-col>
          <v-col>
            <p class="font-weight-bold">Tracklist:</p>
            <v-table style="overflow-y: scroll; height: 35vh">
              <thead>
                <tr>
                  <th>№</th>
                  <th>Title</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(track, index) in album.tracks" :key="track.title">
                  <td>{{ index + 1 }}</td>
                  <td>{{ track.title }}</td>
                  <td>{{ track.duration }}</td>
                </tr>
                <tr>
                  <td align="right" colspan="2">Total:</td>
                  <td>{{ totalAlbumDuration }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-col>
          <v-col>
            <p class="font-weight-bold">Lineup:</p>
            <v-list>
              <v-list-item v-for="person in album.lineup" :key="person._id">
                {{ person.realName }} - {{ person.instruments }}
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <DownloadButton v-for="link in album.links.download" target="_blank" :key="link.src" :href="link.src"/>
            <YaMusicButton v-if="album.links.yaMusic" :href="album.links.yaMusic"/>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
//========== IMPORTS ==========
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { add, str } from 'timelite/time'
import router from '@/router'
import { useAlbumStore } from '@/stores/album'
import { useBandsStore } from '@/stores/bands'
import DownloadButton from '@/components/buttons/DownloadButton'
import YaMusicButton from '@/components/buttons/YaMusicButton'
//========== STORES ==========
const albumStore = useAlbumStore()
const bandsStore = useBandsStore()
//========== COMPUTED ==========
const totalAlbumDuration = computed(() => {
  const allDurations = albumStore.currentAlbum.tracks.map(t => t.duration)
  return str(add(allDurations))
  // return albumStore.currentAlbum.tracks.reduce((accumulator, current) => {
  //   console.log(current.duration, dayjs.duration(current.duration, 'minutes'))
  //   return accumulator + dayjs.duration(current.duration).asMinutes()
  // }, 0)
})
const formattedReleaseDate = computed(() => {
  return dayjs(albumStore.currentAlbum.releaseDate).format('DD.MM.YYYY')
})
const album = computed(() => {
  return albumStore.currentAlbum
})
//========== VARIABLES ==========
dayjs.extend(duration)
const route = useRoute()
//========== METHODS ==========
const goToAlbumsByFiltersPage = (param, genre) => {
  albumStore.goToAlbumsByFiltersPage(param, genre)
}
const goToBandPage = (band) => {
  bandsStore.currentBand = band
  router.push(`/bands/${band._id}`)
}
//========== ON MOUNTED ==========
onMounted(() => {
  albumStore.getAlbumById(route.params.id)
})
</script>

<style scoped>

</style>

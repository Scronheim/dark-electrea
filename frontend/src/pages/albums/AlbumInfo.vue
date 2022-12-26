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
              <v-list-item>Band: <v-btn color="info" @click="goToBandPage(album.band._id)">{{ album.band.title }}</v-btn></v-list-item>
              <v-list-item>Release date: <v-btn>{{ formattedReleaseDate }}</v-btn></v-list-item>
              <v-list-item>Type: <v-btn>{{ album.type }}</v-btn></v-list-item>
              <v-list-item>Label:
                <v-btn color="info" @click="goToBandsByFiltersPage">
                  {{ album.label.title }}
                </v-btn>
                Catalog ID: {{ album.catalogId }}
                <template v-if="album.limitations">| Limitations: {{ album.limitations }}</template>
              </v-list-item>
              <v-list-item>Format: <v-btn>{{ album.format }}</v-btn></v-list-item>
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
import router from '@/router'
import { useAlbumStore } from '@/stores/album'
import { useBandsStore } from '@/stores/bands'
import DownloadButton from '@/components/buttons/DownloadButton'
import YaMusicButton from '@/components/buttons/YaMusicButton'
//========== STORES ==========
const albumStore = useAlbumStore()
const bandsStore = useBandsStore()
//========== COMPUTED ==========
const formattedReleaseDate = computed(() => {
  return dayjs(albumStore.currentAlbum.releaseDate).format('DD.MM.YYYY')
})
const album = computed(() => {
  return albumStore.currentAlbum
})
//========== VARIABLES ==========
const route = useRoute()
//========== METHODS ==========
const goToBandsByFiltersPage = () => {
  bandsStore.filters.label = album.value.label._id
  router.push('/bands')
}
const goToBandPage = (bandId) => {
  router.push(`/bands/${bandId}`)
}
//========== ON MOUNTED ==========
onMounted(() => {
  albumStore.getAlbumById(route.params.id)
})
</script>

<style scoped>

</style>

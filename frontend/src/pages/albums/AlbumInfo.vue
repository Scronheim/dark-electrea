<template>
  <v-card>
    <v-card-title>
      {{ album.band.title }} - {{ album.title }}
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="3">
          <v-img :src="album.cover" />
        </v-col>
        <v-col>
          <v-list>
            <v-list-item>Группа: <v-btn color="info" @click="goToBandPage(album.band)">{{
              album.band.title }}</v-btn></v-list-item>
            <v-list-item>Альбом: <v-btn color="primary">{{ album.title }}</v-btn></v-list-item>
            <v-list-item v-if="album.genre">Жанр: <v-btn color="primary">{{ album.genre }}</v-btn></v-list-item>

            <v-list-item>Дата релиза: <v-btn color="primary">{{ formatAlbumYear(album.releaseDate)
                }}</v-btn></v-list-item>
            <v-list-item>Тип: <v-btn color="primary">{{ album.type }}</v-btn></v-list-item>
            <v-list-item>Лейбл:
              <v-btn color="primary" @click="goToAlbumsByFiltersPage('label')">
                {{ album.label }}
              </v-btn>
              <template v-if="album.catalogId">
                Каталог ID: {{ album.catalogId }}
              </template>
            </v-list-item>
            <v-list-item v-if="album.limitations">Лимит: <v-btn color="primary">{{ album.limitations }}
                шт.</v-btn></v-list-item>
            <v-list-item>Формат: <v-btn color="primary">{{ album.format }}</v-btn></v-list-item>
          </v-list>
        </v-col>
        <v-col style="overflow-y: auto; height: 500px">
          <p class="font-weight-bold">Треклист:</p>
          <p v-for="(track, index) in album.tracks" :key="index">
            {{ index !== album.tracks.length - 1 ? track : track.includes('.') ? track : `Общая длительность:
            ${track}` }}
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <DownloadButton v-for="link in album.links.download" target="_blank" :key="link.src" :link="link" />
          <YaMusicButton v-if="album.links.yaMusic" :href="album.links.yaMusic" />
          <SpotifyButton v-if="album.links.spotify" :href="album.links.spotify" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
//========== IMPORTS ==========
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

import router from '@/router'
import { useAlbumStore } from '@/stores/album'
import { useBandsStore } from '@/stores/bands'
import { useUtilStore } from '@/stores/util'

import DownloadButton from '@/components/buttons/DownloadButton'
import YaMusicButton from '@/components/buttons/YaMusicButton'
import SpotifyButton from '@/components/buttons/SpotifyButton'
//========== STORES ==========
const albumStore = useAlbumStore()
const bandsStore = useBandsStore()
const utilStore = useUtilStore()
//========== COMPUTED ==========
const album = computed(() => {
  return albumStore.currentAlbum
})
//========== VARIABLES ==========
const route = useRoute()
//========== METHODS ==========
const formatAlbumYear = (releaseDate) => {
  return utilStore.formattedAlbumYear(releaseDate)
}
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

<style scoped></style>

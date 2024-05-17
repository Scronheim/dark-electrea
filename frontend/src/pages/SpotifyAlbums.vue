<template>
  <v-card title="Поиск альбомов для онлайн прослушивания">
    <v-card-text>
      <v-row>
        <v-col>
          <RandomForm :filter="albumsStore.filters" :show-country="false" :show-years="false" :show-status="false" />
          <v-row>
            <v-col align="center">
              <v-btn block @click="searchAlbum">Найти</v-btn>
              <SpotifyPlayer :spotify-album-link="albumsStore.currentAlbum.links.spotify" />
            </v-col>
          </v-row>
        </v-col>
        <v-col>
          <v-card v-if="currentAlbum._id" :title="currentAlbum.title" :subtitle="currentAlbum.band.title">
            <v-card-text>
              <v-row>
                <v-col>
                  <p class="font-weight-bold">Страна:</p> {{ currentAlbumBandCountry }}
                  <p class="font-weight-bold">Жанр:</p> {{ currentAlbum.genre }}
                  <p class="font-weight-bold">Дата релиза:</p> {{ currentAlbum.releaseDate }}
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="info" :to="currentAlbumLink">Страница альбома</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'

import { useAlbumStore } from '@/stores/album'
import { useUtilStore } from '@/stores/util'

import RandomForm from '@/components/RandomForm.vue'
import SpotifyPlayer from '@/components/SpotifyPlayer.vue'

const albumsStore = useAlbumStore()
const utilStore = useUtilStore()

const currentAlbum = computed(() => {
  return albumsStore.currentAlbum
})

const currentAlbumLink = computed(() => {
  return `/albums/${albumsStore.currentAlbum._id}`
})

const currentAlbumBandCountry = computed(() => {
  const country = utilStore.countries.find(c => c.value === albumsStore.currentAlbum.band.country)
  return country.title
})

const searchAlbum = async () => {
  albumsStore.getRandomAlbum(true, true)
}
</script>
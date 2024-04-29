<template>
  <v-card>
    <v-card-title>
      {{ album.band.title }} - {{ album.title }}
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="3" align="center">
          <v-img :src="album.cover" class="mb-3" />
          <p v-if="album.ratings.length">Средний рейтинг: <span class="font-weight-black">{{ averageAlbumRating
              }}</span>
            | Оценок: <span class="font-weight-black">{{ album.ratings.length }}</span>
          </p>
          <v-rating v-if="usersStore.isLoggedIn" :item-labels="labels" half-increments hover v-model="rating"
            @update:model-value="setAlbumRating">
            <template v-slot:item-label="props">
              <span :class="`text-${colors[props.index]}`" class="font-weight-black">
                {{ props.label }}
              </span>
            </template>
          </v-rating>
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
          <DownloadButton v-for="link in album.links.download" :key="link.src" :link="link" />
          <YaMusicButton v-if="album.links.yaMusic" :href="album.links.yaMusic" />
          <SpotifyButton v-if="album.links.spotify" :href="album.links.spotify" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn :disabled="!prevAlbum" prepend-icon="mdi-arrow-left" @click="goToPrevAlbum">Предыдущий</v-btn>
      <v-spacer />
      <v-btn :disabled="!nextAlbum" append-icon="mdi-arrow-right" @click="goToNextAlbum">Следующий</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
//========== IMPORTS ==========
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
import { onKeyStroke } from '@vueuse/core'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

import router from '@/router'
import { useAlbumStore } from '@/stores/album'
import { useBandsStore } from '@/stores/bands'
import { useUtilStore } from '@/stores/util'
import { useUsersStore } from '@/stores/users'
import { useRatingsStore } from '@/stores/ratings'

import DownloadButton from '@/components/buttons/DownloadButton'
import YaMusicButton from '@/components/buttons/YaMusicButton'
import SpotifyButton from '@/components/buttons/SpotifyButton'
//========== STORES ==========
const albumStore = useAlbumStore()
const bandsStore = useBandsStore()
const utilStore = useUtilStore()
const usersStore = useUsersStore()
const ratingsStore = useRatingsStore()
//========== COMPUTED ==========
const averageAlbumRating = computed(() => {
  const sumRating = album.value.ratings.reduce((acc, rating) => {
    return acc + rating.rating
  }, 0)
  return sumRating / album.value.ratings.length
})
const prevAlbum = computed(() => {
  const index = album.value.band.albums.findIndex(a => a._id === album.value._id)
  return albumStore.currentAlbum.band.albums[index - 1]
})
const nextAlbum = computed(() => {
  const index = album.value.band.albums.findIndex(a => a._id === album.value._id)
  return albumStore.currentAlbum.band.albums[index + 1]
})
const album = computed(() => {
  return albumStore.currentAlbum
})
//========== VARIABLES ==========
const route = useRoute()
const toast = useToast()
const rating = ref(0)
const colors = ['red', 'orange', 'grey', 'cyan', 'green']
const labels = ['1', '2', '3', '4', '5']
//========== METHODS ==========
const fillRating = () => {
  const albumRating = albumStore.currentAlbum.ratings.find((rating) => {
    return rating.album === albumStore.currentAlbum._id && rating.user === usersStore.user._id
  })
  if (albumRating) {
    rating.value = albumRating.rating
  } else {
    rating.value = 0
  }
}
const setAlbumRating = async () => {
  await ratingsStore.setAlbumRating(rating.value)
  toast.success('Рейтинг обновлён')
}
const goToPrevAlbum = async () => {
  await albumStore.getAlbumById(prevAlbum.value._id)
  router.push(`/albums/${album.value._id}`)
}
const goToNextAlbum = async () => {
  await albumStore.getAlbumById(nextAlbum.value._id)
  router.push(`/albums/${album.value._id}`)
}
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
//========== WATCH ==========
watch(album, () => {
  fillRating()
})
//========== ON MOUNTED ==========
onKeyStroke(['ArrowRight'], async () => {
  await goToNextAlbum()
})
onKeyStroke(['ArrowLeft'], async () => {
  await goToPrevAlbum()
})

onMounted(async () => {
  await albumStore.getAlbumById(route.params.id)
  fillRating()
})
</script>

<style scoped></style>

<template>
  <v-card>
    <v-card-title>
      {{ album.band.title }} - {{ album.title }}
    </v-card-title>
    <v-card-text>
      <template v-if="$vuetify.display.mobile">
        <v-row>
          <v-col align="center">
            <v-img :src="album.cover" />
            <AlbumRating :album="album" />
            <LikeButton :is-liked="albumIsLiked" @click="toggleLikeAlbum" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <AlbumInfoList :album="album" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <AlbumTracklist :album="album" />
          </v-col>
        </v-row>
      </template>
      <v-row v-else>
        <v-col align="center">
          <v-img :src="album.cover" class="mb-3" />
          <AlbumRating :album="album" />
          <LikeButton :is-liked="albumIsLiked" @click="toggleLikeAlbum" />
        </v-col>
        <v-col>
          <AlbumInfoList :album="album" />
        </v-col>
        <v-col style="overflow-y: auto; height: 500px">
          <AlbumTracklist :album="album" />
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
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
import { onKeyStroke } from '@vueuse/core'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

import router from '@/router'
import { useAlbumStore } from '@/stores/album'
import { useUsersStore } from '@/stores/users'

import DownloadButton from '@/components/buttons/DownloadButton'
import YaMusicButton from '@/components/buttons/YaMusicButton'
import SpotifyButton from '@/components/buttons/SpotifyButton'
import LikeButton from '@/components/buttons/LikeButton.vue'
import AlbumInfoList from '@/components/albums/AlbumInfoList.vue'
import AlbumTracklist from '@/components/albums/AlbumTracklist.vue'
import AlbumRating from '@/components/albums/AlbumRating.vue'
//========== STORES ==========
const albumStore = useAlbumStore()
const usersStore = useUsersStore()

//========== COMPUTED ==========
const album = computed(() => {
  return albumStore.currentAlbum
})
const albumIsLiked = computed(() => {
  return usersStore.user.likedAlbums.findIndex(likedAlbum => likedAlbum._id === album.value._id) > -1
})
const prevAlbum = computed(() => {
  const index = album.value.band.albums.findIndex(a => a._id === album.value._id)
  return albumStore.currentAlbum.band.albums[index - 1]
})
const nextAlbum = computed(() => {
  const index = album.value.band.albums.findIndex(a => a._id === album.value._id)
  return albumStore.currentAlbum.band.albums[index + 1]
})
//========== VARIABLES ==========
const route = useRoute()
const toast = useToast()
//========== METHODS ==========
const toggleLikeAlbum = async () => {
  if (albumIsLiked.value) {
    const albumIndex = usersStore.user.likedAlbums.findIndex(likedAlbum => likedAlbum._id === album.value._id)
    usersStore.user.likedAlbums.splice(albumIndex)
    toast.success('Альбом убран из любимых')
  } else {
    usersStore.user.likedAlbums.push(album.value._id)
    toast.success('Альбом добавлен в любимые')
  }
  await usersStore.updateMe()
}
const goToPrevAlbum = async () => {
  await albumStore.getAlbumById(prevAlbum.value._id)
  router.push(`/albums/${album.value._id}`)
}
const goToNextAlbum = async () => {
  await albumStore.getAlbumById(nextAlbum.value._id)
  router.push(`/albums/${album.value._id}`)
}

//========== WATCH ==========

//========== ON MOUNTED ==========
// onKeyStroke(['ArrowRight'], async () => {
//   await goToNextAlbum()
// })
// onKeyStroke(['ArrowLeft'], async () => {
//   await goToPrevAlbum()
// })

onMounted(async () => {
  await albumStore.getAlbumById(route.params.id)
})
</script>

<style scoped></style>

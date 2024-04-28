<template>
  <v-list v-if="usersStore.isAdmin" nav rounded>
    <v-list-item v-if="isAlbumPage" title="Редактировать альбом" @click="$emit('openAlbumEditDialog')">
      <template #prepend>
        <v-icon icon="mdi-pencil" color="info" />
      </template>
    </v-list-item>
    <template v-if="isBandPage">
      <v-list-item title="Редактировать группу" @click="$emit('openEditDialog')">
        <template #prepend>
          <v-icon icon="mdi-pencil" color="info" />
        </template>
      </v-list-item>
      <v-list-item title="Редактировать альбомы" @click="$emit('openAlbumsListDialog')">
        <template #prepend>
          <v-icon icon="mdi-album" color="info" />
        </template>
      </v-list-item>
      <v-list-item title="Редактировать состав" @click="$emit('openLineupDialog')">
        <template #prepend>
          <v-icon icon="mdi-account-group" color="info" />
        </template>
      </v-list-item>
      <v-list-item title="Редактировать фото" @click="$emit('openPhotosDialog')">
        <template #prepend>
          <v-icon icon="mdi-image-multiple" color="info" />
        </template>
      </v-list-item>
    </template>
  </v-list>
  <iframe v-if="route.name === 'Album info page' && currentAlbum.links.spotify" style="border-radius:12px"
    :src="spotifyEmbededLink" width="100%" height="460" frameBorder="0" allowfullscreen=""
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
  <iframe v-if="route.name === 'Album info page' && currentAlbum.links.yaMusic" frameborder="0"
    style="border-radius: 12px;width:100%;height:450px;" width="100%" height="450"
    :src="yandexMusicEmbededLink"></iframe>
</template>

<script setup>
//========== IMPORTS ==========
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { useUsersStore } from '@/stores/users'
import { useAlbumStore } from '@/stores/album'

//========== STORES ==========
const usersStore = useUsersStore()
const albumStore = useAlbumStore()
//========== EMITS ==========
defineEmits(['openAlbumEditDialog', 'openEditDialog', 'openAlbumsListDialog', 'openLineupDialog', 'openPhotosDialog'])
//========== COMPUTED ==========
const currentAlbum = computed(() => {
  return albumStore.currentAlbum
})
const yandexMusicEmbededLink = computed(() => {
  return albumStore.currentAlbum.links.yaMusic.replace('https://music.yandex.ru/', 'https://music.yandex.ru/iframe/')
})
const spotifyEmbededLink = computed(() => {
  return albumStore.currentAlbum.links.spotify.replace('open.', 'embed.')
})
const isBandPage = computed(() => {
  return route.name === 'Band info page'
})
const isAlbumPage = computed(() => {
  return route.name === 'Album info page'
})
//========== VARIABLES ==========
const route = useRoute()
//========== METHODS ==========

//========== ON MOUNTED ==========

//========== WATCH ==========

</script>

<style scoped></style>

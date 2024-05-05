<template>
  <v-list>
    <v-list-item>Группа: <v-btn color="info" @click="goToBandPage(props.album.band)">{{
      props.album.band.title }}</v-btn></v-list-item>
    <v-list-item>Альбом: <v-btn color="primary">{{ props.album.title }}</v-btn></v-list-item>
    <v-list-item v-if="album.genre">Жанр: <v-btn color="primary">{{ props.album.genre }}</v-btn></v-list-item>

    <v-list-item>Дата релиза: <v-btn color="primary">{{ formatAlbumYear(props.album.releaseDate)
        }}</v-btn></v-list-item>
    <v-list-item>Тип: <v-btn color="primary">{{ props.album.type }}</v-btn></v-list-item>
    <v-list-item>Лейбл:
      <v-btn color="primary" @click="goToAlbumsByFiltersPage('label')">
        {{ props.album.label }}
      </v-btn>
      <template v-if="props.album.catalogId">
        Каталог ID: {{ props.album.catalogId }}
      </template>
    </v-list-item>
    <v-list-item v-if="props.album.limitations">Лимит: <v-btn color="primary">{{ props.album.limitations }}
        шт.</v-btn></v-list-item>
    <v-list-item>Формат: <v-btn color="primary">{{ props.album.format }}</v-btn></v-list-item>
  </v-list>
</template>

<script setup>
//========== IMPORTS ==========
import { useAlbumStore } from '@/stores/album'
import { useBandsStore } from '@/stores/bands'
import { useUtilStore } from '@/stores/util'

import router from '@/router'
//========== STORES ==========
const albumStore = useAlbumStore()
const bandsStore = useBandsStore()
const utilStore = useUtilStore()
//========== PROPS ==========
const props = defineProps({
  album: {
    type: Object,
    required: true,
  }
})
//========== COMPUTED ==========

//========== VARIABLES ==========

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

//========== WATCH ==========

</script>

<style scoped></style>

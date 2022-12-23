<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        {{ album.title }} ({{ formattedReleaseDate }})
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>

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
import { useAlbumStore } from '@/stores/album'
//========== STORES ==========
const albumStore = useAlbumStore()
//========== COMPUTED ==========
const formattedReleaseDate = computed(() => {
  return dayjs(albumStore.currentAlbum.releaseDate).format('YYYY')
})
const album = computed(() => {
  return albumStore.currentAlbum
})
//========== VARIABLES ==========
const route = useRoute()
//========== METHODS ==========

//========== ON MOUNTED ==========
onMounted(() => {
  albumStore.getAlbumById(route.params.id)
})
</script>

<style scoped>

</style>

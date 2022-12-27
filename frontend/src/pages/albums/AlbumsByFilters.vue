<template>
  <v-container fluid>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col>
            <GenresAutocomplete :value="albumStore.filters.genres.$in" @updateValue="updateSelectedGenres"/>
          </v-col>
          <v-col>
            <YearsAutocomplete label="Release year" :value="albumStore.filters.releaseDate" @updateValue="updateSelectedYear"/>
          </v-col>
          <v-col>
            <LabelAutocomplete :value="albumStore.filters.label" @updateValue="updateSelectedLabel"/>
          </v-col>
          <v-col cols="1">
            <FilterRemoveButton @click="removeFilters"/>
          </v-col>
        </v-row>
        <v-row v-if="isLoading" justify="center">
          <v-col align="center">
            <VueSpinnerOval size="64"/>
          </v-col>
        </v-row>
        <v-row v-else v-for="(chunk, index) in chunkedAlbums" :key="`album${index}`">
          <v-col cols="3" v-for="album in chunk" :key="album.title">
            <v-card :title="album.title" @click="goToAlbumPage(album)">
              <v-card-text>
                <v-img :src="album.cover"/>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
//========== IMPORTS ==========
import { computed, onMounted, ref, watch } from 'vue'
import { chunk } from 'lodash'
import { VueSpinnerOval } from 'vue3-spinners'
import { useAlbumStore } from '@/stores/album'
import router from '@/router'
import YearsAutocomplete from '@/components/inputs/YearsAutocomplete'
import LabelAutocomplete from '@/components/inputs/LabelAutocomplete'
import GenresAutocomplete from '@/components/inputs/GenresAutocomplete'
import FilterRemoveButton from '@/components/buttons/FilterRemoveButton'
//========== STORES ==========
const albumStore = useAlbumStore()
//========== VARIABLES ==========
const isLoading = ref(false)
const albums = ref([])
//========== COMPUTED ==========
const chunkedAlbums = computed(() => {
  return chunk(albums.value, 4)
})
//========== WATCH ==========
watch(albumStore.filters, () => {
  searchAlbumsByFilters()
}, { deep: true })
//========== METHODS ==========
const removeFilters = () => {
  albumStore.filters.label = undefined
  albumStore.filters.releaseDate = undefined
  albumStore.filters.genres.$in = []
}
const searchAlbumsByFilters = async () => {
  isLoading.value = true
  const { data } = await albumStore.searchAlbumsByFilters()
  albums.value = data.data
  isLoading.value = false
}
const updateSelectedGenres = (genres) => {
  albumStore.filters.genres.$in = genres
}
const updateSelectedLabel = (label) => {
  albumStore.filters.label = label
}
const updateSelectedYear = (year) => {
  albumStore.filters.releaseDate = year
}
const goToAlbumPage = (album) => {
  albumStore.currentAlbum = album
  router.push(`/albums/${album._id}`)
}
//========== ON MOUNTED ==========
onMounted(() => {
  searchAlbumsByFilters()
})
</script>

<style scoped>

</style>

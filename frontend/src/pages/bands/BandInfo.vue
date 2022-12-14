<template>
  <v-card>
    <v-img :src="band.logo" cover height="300"/>
    <v-card-text>
      <v-tabs slider-color="yellow" v-model="tab">
        <v-tab value="about">About</v-tab>
        <v-tab value="albums">Albums</v-tab>
        <v-tab value="lineup">Lineup</v-tab>
        <v-tab value="description">Description</v-tab>
        <v-tab value="photos">Photos</v-tab>
        <v-tab value="links">Links</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item value="about">
          <v-row>
            <v-col>
              Band: <v-btn color="primary">{{ band.title }}</v-btn><br/>
              Country: <v-btn color="info" @click="goToBandsByFiltersPage('country')">{{ band.country }}</v-btn><br/>
              Location: <v-btn color="primary">{{ band.city }}</v-btn><br/>
              Status: <v-btn :color="statusColor">{{ band.status }}</v-btn><br/>
              Formed in: <v-btn color="info" @click="goToBandsByFiltersPage('formedIn')">{{ band.formedIn }}</v-btn><br/>
            </v-col>
            <v-col>
              Genre: <v-btn color="info" v-for="genre in band.genres" :key="genre" @click="goToBandsByFiltersPage('genres', genre)">{{ genre }}</v-btn><br/>
              Lyrical themes: <v-btn color="primary">{{ band.lyricsTheme }}</v-btn><br/>
              Current label: <v-btn color="info" @click="goToBandsByFiltersPage('label')">{{ band.label.title }}</v-btn><br/>
            </v-col>
          </v-row>
        </v-window-item>
        <v-window-item value="albums">
          <v-row>
            <v-col>
              <GenresAutocomplete :value="filters.genres" @updateValue="updateSelectedGenres"/>
            </v-col>
            <v-col>
              <AlbumTypeAutocomplete :value="filters.type" @updateValue="updateSelectedAlbumType"/>
            </v-col>
            <v-col>
              <YearsAutocomplete label="Release year" :value="filters.releaseDate" @updateValue="updateSelectedReleaseYear"/>
            </v-col>
            <v-col>
              <LabelAutocomplete :value="filters.label" @updateValue="updateSelectedLabel"/>
            </v-col>
            <v-col cols="1">
              <FilterRemoveButton @click="clearFilters"/>
            </v-col>
          </v-row>
          <v-row v-for="(chunk, index) in chunkedAlbums" :key="`chunk${index}`">
            <v-col cols="3" v-for="album in chunk" :key="album.title">
              <v-hover v-slot="{ isHovering, props }">
                <v-card v-bind="props" :elevation="isHovering ? 12 : 0" @click="goToAlbumPage(album)">
                  <v-card-title>{{ album.title }} ({{ new Date(album.releaseDate).getFullYear() }})</v-card-title>
                  <img style="width: 100%; height: 420px" :src="album.cover"/>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-window-item>
        <v-window-item value="lineup">
          <v-list>
            <v-list-item v-for="(person, index) in band.lineup" :key="`person${index}`">
              <v-btn color="info">{{ person.realName }}</v-btn> - {{ person.instruments }}
            </v-list-item>
          </v-list>
        </v-window-item>
        <v-window-item value="description">
          {{ band.description }}
        </v-window-item>
        <v-window-item value="photos">
          <v-carousel>
            <v-carousel-item v-for="photo in band.photos" :key="photo"
                             :src="photo"
            />
          </v-carousel>
        </v-window-item>
        <v-window-item value="links">
          <v-row>
            <v-col>
              <v-btn v-if="band.socials.officialSite" :href="band.socials.officialSite" target="_blank">Official site</v-btn>
              <v-btn v-if="band.socials.bandcamp" :href="band.socials.bandcamp" target="_blank">
                <v-icon color="yellow">mdi-campfire</v-icon>
                Bandcamp
              </v-btn>
              <v-btn v-if="band.socials.discogs" :href="band.socials.discogs" target="_blank">
                <v-icon>mdi-album</v-icon>
                Discogs
              </v-btn>
              <v-btn v-if="band.socials.youtube" :href="band.socials.youtube" target="_blank">
                <v-icon color="red">mdi-youtube</v-icon>
                Youtube
              </v-btn>
              <v-btn v-if="band.socials.facebook" :href="band.socials.facebook" target="_blank">
                <v-icon color="info">mdi-facebook</v-icon>
                Facebook
              </v-btn>
            </v-col>
          </v-row>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<script setup>
//========== IMPORTS ==========
import { onMounted, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { chunk } from 'lodash'
import router from '@/router'
import { useBandsStore } from '@/stores/bands'
import GenresAutocomplete from '@/components/inputs/GenresAutocomplete'
import YearsAutocomplete from '@/components/inputs/YearsAutocomplete'
import LabelAutocomplete from '@/components/inputs/LabelAutocomplete'
import AlbumTypeAutocomplete from '@/components/inputs/AlbumTypeAutocomplete'
import FilterRemoveButton from '@/components/buttons/FilterRemoveButton'
//========== STORES ==========
const bandsStore = useBandsStore()
//========== COMPUTED ==========
const filteredAlbums = computed(() => {
  return bandsStore.currentBand.albums.filter(a => {
    if (filters.value.genres.length > 0) {
      return filters.value.genres.some(g => a.genres.includes(g))
    }
    if (filters.value.type) {
      if (a.type !== filters.value.type) return false
    }
    if (filters.value.releaseDate) {
      if (new Date(a.releaseDate).getFullYear() !== filters.value.releaseDate) return false
    }
    if (filters.value.label) {
      if (a.label._id !== filters.value.label) return false
    }
    return true
  })
})
const chunkedAlbums = computed(() => {
  return chunk(filteredAlbums.value, 4)
})
const statusColor = computed(() => {
  if (band.value.status === 'Active') {
    return 'success'
  } else if (band.value.status === 'Split-up') {
    return 'red'
  } else if (band.value.status === 'On hold') {
    return 'yellow'
  } else if (band.value.status === 'Unknown') {
    return 'grey'
  } else if (band.value.status === 'Changed name') {
    return 'blue'
  }
  return 'primary'
})
const band = computed(() => {
  return bandsStore.currentBand
})
//========== VARIABLES ==========
const filters = ref({
  genres: [],
  type: undefined,
  releaseDate: undefined,
  label: undefined,
})
const tab = ref('about')
const route = useRoute()
//========== METHODS ==========
const clearFilters = () => {
  filters.value = {
    genres: [],
    type: undefined,
    releaseDate: undefined,
    label: undefined,
  }
}
const updateSelectedGenres = (genres) => {
  filters.value.genres = genres
}
const updateSelectedAlbumType = (type) => {
  filters.value.type = type
}
const updateSelectedReleaseYear = (year) => {
  filters.value.releaseDate = year
}
const updateSelectedLabel = (label) => {
  filters.value.label = label
}

const goToBandsByFiltersPage = (param, genre) => {
  bandsStore.goToBandsByFiltersPage(param, genre)
}
const goToAlbumPage = (album) => {
  router.push(`/albums/${album._id}`)
}
//========== ON MOUNTED ==========
onMounted(() => {
  bandsStore.getBandInfo(route.params.id)
})
</script>

<style scoped>

</style>

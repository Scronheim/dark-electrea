<template>
  <v-card>
<!--    <v-img :src="band.logo" cover height="300"/>-->
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
//========== STORES ==========
const bandsStore = useBandsStore()
//========== COMPUTED ==========
const chunkedAlbums = computed(() => {
  return chunk(band.value.albums, 4)
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
const tab = ref('about')
const route = useRoute()
//========== METHODS ==========
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

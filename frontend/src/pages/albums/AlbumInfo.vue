<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        {{ album.title }}
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="2">
            <v-img :src="album.cover"/>
          </v-col>
          <v-col>
            <v-list>
              <v-list-item>Band: <v-btn color="info" @click="goToBandPage(album.band._id)">{{ album.band.title }}</v-btn></v-list-item>
              <v-list-item>Release date: <v-btn>{{ formattedReleaseDate }}</v-btn></v-list-item>
              <v-list-item>Type: <v-btn>{{ album.type }}</v-btn></v-list-item>
              <v-list-item>Label:
                <v-btn color="info">
                  {{ album.label.title }}
                </v-btn>
                Catalog ID: {{ album.catalogId }}
                <template v-if="album.limitations">| Limitations: {{ album.limitations }}</template>
              </v-list-item>
              <v-list-item>Format: <v-btn>{{ album.format }}</v-btn></v-list-item>
            </v-list>
          </v-col>
          <v-col>
            <p class="font-weight-bold">Tracklist:</p>
            {{ album.tracks }}
          </v-col>
          <v-col>
            <p class="font-weight-bold">Lineup:</p>
            <v-list>
              <v-list-item v-for="person in album.lineup" :key="person._id">
                {{ person.fullName }} - {{ person.instruments }}
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <DownloadButton v-for="link in album.links.download" :key="link" :href="link"/>
            <YaMusicButton v-if="album.links.yaMusic" :href="album.links.yaMusic"/>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-dialog width="50%" v-model="editDialog">
      <AlbumForm :is-edit="true" :album="album">
        <template #actions>
          <v-btn color="red" @click="editDialog = false">Close</v-btn>
          <v-btn color="success" @click="updateAlbum">Save</v-btn>
        </template>
      </AlbumForm>
    </v-dialog>
  </v-container>
</template>

<script setup>
//========== IMPORTS ==========
import { onMounted, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import { useAlbumStore } from '@/stores/album'
import router from '@/router'
import DownloadButton from '@/components/buttons/DownloadButton'
import YaMusicButton from '@/components/buttons/YaMusicButton'
import EditButton from '@/components/buttons/EditButton'
import AlbumForm from '@/components/albums/AlbumForm'
//========== STORES ==========
const albumStore = useAlbumStore()
//========== COMPUTED ==========
const formattedReleaseDate = computed(() => {
  return dayjs(albumStore.currentAlbum.releaseDate).format('DD.MM.YYYY')
})
const album = computed(() => {
  return albumStore.currentAlbum
})
//========== VARIABLES ==========
const editDialog = ref(false)
const route = useRoute()
//========== METHODS ==========
const updateAlbum = () => {
  albumStore.updateAlbum()
}
const goToBandPage = (bandId) => {
  router.push(`/bands/${bandId}`)
}
//========== ON MOUNTED ==========
onMounted(() => {
  albumStore.getAlbumById(route.params.id)
})
</script>

<style scoped>

</style>

<template>
  <v-card>
    <v-img :src="band.logo" cover height="300"/>
    <v-card-title>
      {{ band.title }}
    </v-card-title>
    <v-card-text>
      <v-tabs slider-color="yellow" v-model="tab">
        <v-tab value="about">About</v-tab>
        <v-tab value="albums">Albums</v-tab>
        <v-tab value="lineup">Lineup</v-tab>
        <v-tab value="description">Description</v-tab>
        <v-tab value="photos">Photos</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item value="about">
          <v-row>
            <v-col>
              Country: <v-btn color="info" @click="goToBandsByFiltersPage('country')">{{ band.country }}</v-btn><br/>
              Location: <v-btn color="primary">{{ band.city }}</v-btn><br/>
              Status: <v-btn :color="statusColor">{{ band.status }}</v-btn><br/>
              Formed in: <v-btn color="info" @click="goToBandsByFiltersPage('formedIn')">{{ band.formedIn }}</v-btn><br/>
              Years active: <v-btn color="primary">{{ band.yearsActive }}</v-btn><br/>
            </v-col>
            <v-col>
              Genre: <v-btn color="info" v-for="genre in band.genres" :key="genre" @click="goToBandsByFiltersPage('genres', genre)">{{ genre }}</v-btn><br/>
              Lyrical themes: <v-btn color="primary">{{ band.lyricsTheme }}</v-btn><br/>
              Current label: <v-btn color="info" @click="goToBandsByFiltersPage('label')">{{ band.label.title }}</v-btn><br/>
            </v-col>
          </v-row>
        </v-window-item>
        <v-window-item value="albums">
          <v-row no-gutters v-for="(chunk, index) in chunkedAlbums" :key="`chunk${index}`">
            <v-col cols="3" v-for="album in chunk" :key="album.title">
              <v-hover v-slot="{ isHovering, props }">
                <v-card v-bind="props" :elevation="isHovering ? 12 : 0" @click="goToAlbumPage(album)">
                  <v-card-title>{{ album.title }} ({{ dayjs(album.releaseDate).format('YYYY') }})</v-card-title>
                  <v-img :src="album.cover"/>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-window-item>
        <v-window-item value="lineup">
          <v-row>
            <v-col>
              <PlusButton text="Add person" @click="openLineupDialog"/>
            </v-col>
          </v-row>
          <v-list>
            <v-list-item v-for="(person, index) in band.lineup" :key="`person${index}`">
              <v-btn color="info">{{ person.stageName }}</v-btn> - {{ person.instruments }}
            </v-list-item>
          </v-list>
        </v-window-item>
        <v-window-item value="description">
          {{ band.description }}
        </v-window-item>
        <v-window-item value="photos">
          <v-row v-for="(chunk, index) in chunkedPhotos" :key="`photo${index}`">
            <v-col cols="3" v-for="photo in chunk" :key="photo">
              <v-img :src="photo"/>
            </v-col>
          </v-row>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>

  <v-bottom-navigation v-if="usersStore.isAdmin" color="primary">
    <v-btn @click="editDialog = true">
      <v-icon color="info">mdi-pencil</v-icon>
      <span>Edit about</span>
    </v-btn>
    <v-btn @click="albumsDialog = true">
      <v-icon color="info">mdi-album</v-icon>
      <span>Edit albums</span>
    </v-btn>
  </v-bottom-navigation>

  <v-dialog width="60%" v-model="albumsDialog">
    <AlbumsList>
      <template #actions>
        <v-btn color="red" @click="albumsDialog = false">Close</v-btn>
        <v-btn color="success" @click="updateBand">Save</v-btn>
      </template>
    </AlbumsList>
  </v-dialog>

  <v-dialog width="50%" v-model="lineupDialog">
    <PersonForm :person="newPerson">
      <template #actions>
        <v-btn color="success" @click="addNewPerson">Add</v-btn>
      </template>
    </PersonForm>
  </v-dialog>

  <v-dialog width="70%" v-model="editDialog">
    <v-card :title="`Edit ${band.title}`">
      <v-card-text>
        <GeneralInfo/>
        <SocialsForm/>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="red" @click="editDialog = false">Close</v-btn>
        <v-btn color="success" @click="updateBand">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
//========== IMPORTS ==========
import { onMounted, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { chunk } from 'lodash'
import dayjs from 'dayjs'
import router from '@/router'
import { useBandsStore } from '@/stores/bands'
import { useUsersStore } from '@/stores/users'
import GeneralInfo from '@/components/bands/GeneralInfo'
import SocialsForm from '@/components/bands/SocialsForm'
import PlusButton from '@/components/buttons/PlusButton'
import PersonForm from '@/components/bands/PersonForm'
import AlbumsList from '@/components/bands/AlbumsList'
//========== STORES ==========
const bandsStore = useBandsStore()
const usersStore = useUsersStore()
//========== COMPUTED ==========
const chunkedPhotos = computed(() => {
  return chunk(band.value.photos, 4)
})
const chunkedAlbums = computed(() => {
  return chunk(band.value.albums, 4)
})
const statusColor = computed(() => {
  if (band.value.status === 'active') {
    return 'success'
  } else if (band.value.status === 'splitUp') {
    return 'red'
  } else if (band.value.status === 'holdOn') {
    return 'blue'
  } else if (band.value.status === 'unknown') {
    return 'grey'
  }
  return 'primary'
})
const band = computed(() => {
  return bandsStore.currentBand
})
//========== VARIABLES ==========
const newPerson = ref({
  realName: '',
  stageName: '',
  bands: [],
  sex: 'Man',
  birthdate: '',
  birthCountry: '',
  instruments: '',
  photo: '',
})
const albumsDialog = ref(false)
const lineupDialog = ref(false)
const editDialog = ref(false)
const tab = ref('about')
const route = useRoute()
//========== METHODS ==========
const addNewPerson = () => {
  bandsStore.addNewPerson(newPerson.value)
}
const updateBand = () => {
  bandsStore.updateBand()
  editDialog.value = false
  albumsDialog.value = false
}
const openLineupDialog = () => {
  newPerson.value = {
    realName: '',
    stageName: '',
    bands: [],
    sex: 'Man',
    birthdate: '',
    birthCountry: '',
    instruments: '',
    photo: '',
  }
  lineupDialog.value = true
}
const goToBandsByFiltersPage = (param, genre) => {
  if (param === 'label') {
    bandsStore.filters.label = bandsStore.currentBand.label._id
  } else if (param === 'genres') {
    bandsStore.filters.genres.$in = genre
  } else {
    bandsStore.filters[param] = bandsStore.currentBand[param]
  }
  router.push('/bands')
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

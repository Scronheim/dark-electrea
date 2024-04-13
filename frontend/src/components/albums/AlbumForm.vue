<template>
  <v-card color="#303030" class="mb-3">
    <v-card-title>{{ isEdit? album.title : `New album of ${bandsStore.currentBand.title}` }}</v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field label="Title" v-model="album.title"/>
        </v-col>
        <v-col>
          <v-select label="Type"
                    :items="albumStore.types"
                    v-model="album.type"
          />
        </v-col>
        <v-col>
          <v-text-field label="Release date" type="date" v-model="album.releaseDate"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select label="Format"
                    :items="albumFormats"
                    v-model="album.format"
          />
        </v-col>
        <v-col>
          <LabelAutocomplete :value="album.label" @updateValue="updateLabel"/>
        </v-col>
        <v-col>
          <v-text-field label="Catalog ID" v-model="album.catalogId"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <GenresAutocomplete :value="album.genres" @updateValue="updateGenres"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field label="URL to cover" v-model="album.cover"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-title style="min-height: 47px">Tracklist</v-expansion-panel-title>
              <v-expansion-panel-text>
                <PlusButton text="Add track (hotkey: Insert)" @click="addTrack"/>
                <v-row v-for="(track, index) in album.tracks" :key="`track${index}`">
                  <v-col>
                    <v-text-field label="Title" autocomplete="off" v-model="track.title">
                      <template #prepend>
                        {{ index + 1 }}
                      </template>
                    </v-text-field>
                  </v-col>
                  <v-col cols="2">
                    <v-text-field label="Duration" type="time" v-model="track.duration"/>
                  </v-col>
                  <v-col cols="1">
                    <DeleteButton text="Remove track" @click="removeTrack(index)"/>
                  </v-col>
                </v-row>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-title style="min-height: 47px">Lineup</v-expansion-panel-title>
              <v-expansion-panel-text>
                <LineupForm :lineup="album.lineup"/>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-title style="min-height: 47px">Links</v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-row>
                  <v-col cols="4">
                    <v-select label="Links" :items="linkTypes" v-model="selectedLinkType"/>
                  </v-col>
                  <v-col>
                    <template v-if="selectedLinkType !== 'download'">
                      <v-text-field label="Link" v-model="album.links[selectedLinkType]"/>
                    </template>
                    <template v-else>
                      <PlusButton text="Add download link" @click="addDownloadLink"/>
                      <template v-for="(link, index) in album.links.download" :key="index">
                        <v-row>
                          <v-col>
                            <v-text-field autofocus label="Link" v-model="album.links.download[index].src"/>
                          </v-col>
                          <v-col cols="3">
                            <v-text-field label="Bitrate" type="number" suffix="kbps" :min="192" :max="320" v-model.number="album.links.download[index].bitrate"/>
                          </v-col>
                          <v-col cols="1">
                            <DeleteButton text="Delete link" @click="deleteDownloadLink(index)"/>
                          </v-col>
                        </v-row>
                      </template>
                    </template>
                  </v-col>
                </v-row>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn color="red" @click="deleteAlbum">Delete</v-btn>
      <v-spacer/>
      <v-btn v-if="album._id" color="success" @click="updateAlbum">Save</v-btn>
      <v-btn v-else color="success" @click="addAlbum">Add</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
//========== IMPORTS ==========
import { ref } from 'vue'
import { onKeyStroke } from '@vueuse/core'
import { useBandsStore } from '@/stores/bands'
import { useAlbumStore } from '@/stores/album'
import { useUsersStore } from '@/stores/users'
import LabelAutocomplete from '@/components/inputs/LabelAutocomplete'
import DeleteButton from '@/components/buttons/DeleteButton.vue'
import PlusButton from '@/components/buttons/PlusButton.vue'
import LineupForm from '@/components/bands/lineup/LineupForm'
import GenresAutocomplete from '@/components/inputs/GenresAutocomplete'
//========== STORES ==========
const bandsStore = useBandsStore()
const albumStore = useAlbumStore()
const usersStore = useUsersStore()
//========== COMPUTED ==========

//========== VARIABLES ==========
const selectedLinkType = ref('download')
const linkTypes = [
  { title: 'Download', value: 'download' },
  { title: 'Yandex Music', value: 'yaMusic' },
  { title: 'Spotify', value: 'spotify' },
  { title: 'Discogs', value: 'discogs' },
  { title: 'Bandcamp', value: 'bandcamp' },
]
const albumFormats = [
  { title: 'Digital', value: 'digital' },
  { title: 'CD', value: 'cd' },
  { title: 'Tape', value: 'tape' },
  { title: 'Vinyl', value: 'vinyl' },
  { title: 'Cassette', value: 'cassette' },
]
const props = defineProps({
  album: {
    type: Object,
  },
  isEdit: {
    type: Boolean,
    default: false,
  }
})
//========== METHODS ==========
const deleteAlbum = () => {
  if (confirm(`Do you really want to delete ${props.album.title}?`)) {
    albumStore.deleteAlbum(props.album)
  }
}
const deleteDownloadLink = (linkIndex) => {
  props.album.links.download.splice(linkIndex, 1)
}
const addDownloadLink = () => {
  props.album.links.download.push({
    src: '',
    bitrate: 320,
  })
}
const addTrack = () => {
  props.album.tracks.push({
    title: '',
    duration: '00:00:01'
  })
}
const removeTrack = (trackIndex) => {
  props.album.tracks.splice(trackIndex, 1)
}
const addAlbum = async () => {
  props.album.band = bandsStore.currentBand._id
  props.album.userAdded = usersStore.user._id
  await albumStore.addAlbum(props.album)
  await bandsStore.getBandInfo(bandsStore.currentBand._id)
}
const updateAlbum = () => {
  albumStore.updateAlbum(props.album)
}
const updateGenres = (genres) => {
  props.album.genres = genres
}
const updateLabel = (label) => {
  props.album.label = label
}
//========== ON MOUNTED ==========

// ========== EVENT LISTENERS ==========
onKeyStroke('Insert', () => {
  addTrack()
})
</script>

<style scoped>

</style>

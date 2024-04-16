<template>
  <v-card color="#303030" class="mb-3">
    <v-card-title>{{ isEdit ? album.title : `Новый альбом группы ${bandsStore.currentBand.title}` }}</v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field label="Название" v-model="album.title" />
        </v-col>
        <v-col>
          <v-select label="Тип" :items="albumStore.types" v-model="album.type" />
        </v-col>
        <v-col>
          <v-text-field label="Дата релиза" type="date" v-model="album.releaseDate" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field label="Формат" v-model="album.format" />
        </v-col>
        <v-col>
          <v-text-field :value="album.label" @updateValue="updateLabel" />
        </v-col>
        <v-col>
          <v-text-field label="Каталог ID" v-model="album.catalogId" />
        </v-col>
      </v-row>
      <!-- <v-row>
        <v-col>
          <v-text-field :value="album.genre" @updateValue="updateGenres" />
        </v-col>
      </v-row> -->
      <v-row>
        <v-col>
          <v-text-field label="URL обложки" v-model="album.cover" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-title style="min-height: 47px">Треклист</v-expansion-panel-title>
              <v-expansion-panel-text>
                <PlusButton text="Добавить трек (хоткей: Insert)" @click="addTrack" />
                <v-row v-for="(track, index) in album.tracks" :key="`track${index}`">
                  <v-col>
                    <v-text-field v-if="index === album.tracks.length - 1" label="Общее время альбома"
                      autocomplete="off" v-model="album.tracks[index]" />
                    <v-text-field v-else label="Название" autocomplete="off" v-model="album.tracks[index]">
                      <template #prepend>
                        {{ index + 1 }}
                      </template>
                    </v-text-field>
                  </v-col>
                  <!-- <v-col cols="2">
                    <v-text-field label="Длительность" type="time" v-model="track.duration" />
                  </v-col> -->
                  <v-col v-if="index !== album.tracks.length - 1" cols="1">
                    <DeleteButton text="Удалить трек" @click="removeTrack(index)" />
                  </v-col>
                </v-row>
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-title style="min-height: 47px">Состав</v-expansion-panel-title>
              <v-expansion-panel-text>
                <LineupForm :lineup="album.lineup" />
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-title style="min-height: 47px">Ссылки</v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-row>
                  <v-col cols="4">
                    <v-select label="Ссылки" :items="linkTypes" v-model="selectedLinkType" />
                  </v-col>
                  <v-col>
                    <template v-if="selectedLinkType !== 'download'">
                      <v-text-field label="Ссылка" v-model="album.links[selectedLinkType]" />
                    </template>
                    <template v-else>
                      <PlusButton text="Добавить ссылки для скачивания" @click="addDownloadLink" />
                      <template v-for="(link, index) in album.links.download" :key="index">
                        <v-row>
                          <v-col>
                            <v-text-field autofocus label="Ссылка" v-model="album.links.download[index].src" />
                          </v-col>
                          <v-col cols="3">
                            <v-text-field label="Битрейт" type="number" suffix="kbps" :min="192" :max="320"
                              v-model.number="album.links.download[index].bitrate" />
                          </v-col>
                          <v-col cols="1">
                            <DeleteButton text="Удалить ссылку" @click="deleteDownloadLink(index)" />
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
      <v-spacer />
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
import DeleteButton from '@/components/buttons/DeleteButton.vue'
import PlusButton from '@/components/buttons/PlusButton.vue'
import LineupForm from '@/components/bands/lineup/LineupForm'
//========== STORES ==========
const bandsStore = useBandsStore()
const albumStore = useAlbumStore()
const usersStore = useUsersStore()
//========== COMPUTED ==========

//========== VARIABLES ==========
const selectedLinkType = ref('download')
const linkTypes = [
  { title: 'Скачать', value: 'download' },
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

<style scoped></style>

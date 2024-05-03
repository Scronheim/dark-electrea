<template>
  <v-card color="#303030" class="mb-3">
    <v-card-title>{{ isEdit ? album.title : `Новый альбом группы ${bandsStore.currentBand.title}` }}</v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field label="Название" v-model="album.title" />
        </v-col>
        <v-col>
          <v-text-field label="Жанр" v-model="album.genre" />
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
          <v-select label="Формат" :items="albumFormats" v-model="album.format" />
        </v-col>
        <v-col>
          <v-text-field label="Лейбл" v-model="album.label" />
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
                    <template v-if="selectedLinkType === 'spotify'">
                      <v-text-field label="Ссылка" v-model="album.links[selectedLinkType]">
                        <template #append>
                          <v-icon icon="mdi-magnify" @click="searchAlbumOnSpotify" />
                        </template>
                      </v-text-field>
                    </template>
                    <template v-else-if="selectedLinkType === 'download'">
                      <PlusButton text="Добавить ссылки для скачивания" @click="addDownloadLink" />
                      <template v-for="(link, index) in album.links.download" :key="index">
                        <v-row>
                          <v-col>
                            <v-text-field autofocus label="Ссылка" v-model="album.links.download[index].src" />
                          </v-col>
                          <v-col cols="3">
                            <v-text-field label="Битрейт" type="number" suffix="kbps" :min="192" :max="320"
                              :disabled="album.links.download[index].flac"
                              v-model.number="album.links.download[index].bitrate" />
                          </v-col>
                          <v-col cols="2">
                            <v-checkbox-btn v-bind="props" label="FLAC" v-model="album.links.download[index].flac" />
                          </v-col>
                          <v-col cols="1">
                            <DeleteButton text="Удалить ссылку" @click="deleteDownloadLink(index)" />
                          </v-col>
                        </v-row>
                      </template>
                    </template>
                    <template v-else>
                      <v-text-field label="Ссылка" v-model="album.links[selectedLinkType]" />
                    </template>
                  </v-col>
                </v-row>
                <v-row v-if="albumStore.foundedOnSpotify.length">
                  <v-col v-for="spotifyAlbum in albumStore.foundedOnSpotify" :key="spotifyAlbum.id">
                    <v-card :title="spotifyAlbum.name" :subtitle="spotifyAlbum.artists[0].name"
                      @click="setAlbumSpotifyUrl(spotifyAlbum.external_urls.spotify)">
                      <v-img :src="spotifyAlbum.images[0].url" />
                    </v-card>
                  </v-col>
                </v-row>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn color="red" @click="deleteAlbum">Удалить</v-btn>
      <v-spacer />
      <v-btn v-if="album._id" color="success" @click="updateAlbum">Сохранить</v-btn>
      <v-btn v-else color="success" @click="addAlbum">Добавить</v-btn>
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
import { onMounted } from 'vue'
import { watch } from 'vue'
//========== STORES ==========
const bandsStore = useBandsStore()
const albumStore = useAlbumStore()
const usersStore = useUsersStore()
//========== COMPUTED ==========
watch(selectedLinkType, () => {
  if (selectedLinkType.value === 'spotify') {
    searchAlbumOnSpotify()
  }
})
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
  { title: 'Цифровой', value: 'digital' },
  { title: 'CD', value: 'cd' },
  { title: 'Кассета', value: 'tape' },
  { title: 'Винил', value: 'vinyl' },
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
const setAlbumSpotifyUrl = (spotifyLink) => {
  props.album.links.spotify = spotifyLink
}
const searchAlbumOnSpotify = async () => {
  albumStore.searchAlbumOnSpotify(`${props.album.band.title} - ${props.album.title}`)
}
const deleteAlbum = () => {
  if (confirm(`Вы действительно хотите удалить альбом ${props.album.title}?`)) {
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
  props.album.tracks.push('')
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
//========== ON MOUNTED ==========
onMounted(() => {
  albumStore.foundedOnSpotify = []
})
// ========== EVENT LISTENERS ==========
onKeyStroke('Insert', () => {
  addTrack()
})
</script>

<style scoped></style>

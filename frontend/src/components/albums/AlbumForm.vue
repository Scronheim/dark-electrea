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
                    :items="albumTypes"
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
          <v-text-field label="URL to cover" v-model="album.cover"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-textarea label="Tracklist" v-model="album.tracks"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select label="Links" :items="linkTypes" v-model="selectedLinkType"/>
        </v-col>
        <v-col>
          <v-text-field v-if="selectedLinkType" label="Link" v-model="album.links[selectedLinkType]"/>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
//========== IMPORTS ==========
import { ref } from 'vue'
import { useBandsStore } from '@/stores/bands'
import LabelAutocomplete from '@/components/inputs/LabelAutocomplete'
//========== STORES ==========
const bandsStore = useBandsStore()
//========== COMPUTED ==========

//========== VARIABLES ==========
const selectedLinkType = ref('')
const linkTypes = [
  { title: 'Download', value: 'download' },
  { title: 'Yandex Music', value: 'yaMusic' },
  { title: 'Youtube', value: 'youtube' },
  { title: 'Discogs', value: 'discogs' },
  { title: 'Bandcamp', value: 'bandcamp' },
]
const albumFormats = [
  { title: 'Digital', value: 'digital' },
  { title: 'CD', value: 'cd' },
  { title: 'Tape', value: 'tape' },
  { title: 'Vinyl', value: 'vinyl' },
]
const albumTypes = ['Full length', 'Single', 'EP', 'Demo']
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
const updateLabel = (label) => {
  props.album.label = label
}
//========== ON MOUNTED ==========

</script>

<style scoped>

</style>

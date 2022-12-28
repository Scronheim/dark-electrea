<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        {{ label.title }}
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="2">
            <v-img :src="label.logo"/>
          </v-col>
          <v-col>
            <v-list>
              <v-list-item>Country: <v-btn color="info" @click="labelsStore.goToLabelsByFiltersPage('country')">{{ label.country }}</v-btn></v-list-item>
              <v-list-item>Address: <v-btn color="primary">{{ label.address }}</v-btn></v-list-item>
              <v-list-item>Email: <v-btn color="info" :href="`mailto:${label.email}`">{{ label.email }}</v-btn></v-list-item>
              <v-list-item>Phone: <v-btn color="primary">{{ label.phone }}</v-btn></v-list-item>
            </v-list>
            <v-btn v-if="label.links.officialSite" :href="label.links.officialSite" target="_blank">Official site</v-btn>
            <v-btn v-if="label.links.bandcamp" :href="label.links.bandcamp" target="_blank">
              <v-icon color="yellow">mdi-campfire</v-icon>
              Bandcamp
            </v-btn>
            <v-btn v-if="label.links.discogs" :href="label.links.discogs" target="_blank">
              <v-icon>mdi-album</v-icon>
              Discogs
            </v-btn>
            <v-btn v-if="label.links.youtube" :href="label.links.youtube" target="_blank">
              <v-icon color="red">mdi-youtube</v-icon>
              Youtube
            </v-btn>
            <v-btn v-if="label.links.twitter" :href="label.links.twitter" target="_blank">
              <v-icon color="info">mdi-twitter</v-icon>
              Twitter
            </v-btn>
            <v-btn v-if="label.links.facebook" :href="label.links.facebook" target="_blank">
              <v-icon color="#3229B1">mdi-facebook</v-icon>
              Facebook
            </v-btn>
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
import { useLabelsStore } from '@/stores/labels'
//========== STORES ==========
const labelsStore = useLabelsStore()
//========== COMPUTED ==========
const label = computed(() => {
  return labelsStore.currentLabel
})
//========== VARIABLES ==========
const route = useRoute()
//========== METHODS ==========

//========== ON MOUNTED ==========
onMounted(() => {
  labelsStore.getLabelById(route.params.id)
})
</script>

<style scoped>

</style>

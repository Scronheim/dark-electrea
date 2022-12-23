<template>
  <v-container fluid>
    <v-card title="General Info">
      <v-card-text>
        <GeneralInfo/>
        <LineupForm/>
        <AlbumsForm/>
        <VideosForm/>
        <SocialsForm/>
      </v-card-text>
    </v-card>

    <v-bottom-navigation color="primary" class="fixedMenu">
      <v-btn color="success" @click="bandsStore.addBand">
        <v-icon color="success">mdi-plus</v-icon>
        <span>Add artist</span>
      </v-btn>
    </v-bottom-navigation>
  </v-container>
</template>

<script setup>
//========== IMPORTS ==========
import { useBandsStore } from '@/stores/bands'
import LineupForm from '@/components/artists/LineupForm'
import GeneralInfo from '@/components/artists/GeneralInfo'
import AlbumsForm from '@/components/artists/AlbumsForm'
import VideosForm from '@/components/artists/VideosForm'
import SocialsForm from '@/components/artists/SocialsForm'
//========== STORES ==========
const bandsStore = useBandsStore()
//========== COMPUTED ==========

//========== VARIABLES ==========

//========== METHODS ==========

//========== ON MOUNTED ==========

</script>

<style scoped>
.fixedMenu {
  position: fixed;
  z-index: 1
}
</style>

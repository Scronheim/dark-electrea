<template>
  <v-container fluid>
    <v-card title="General Info">
      <v-card-text>
        <GeneralInfo/>
        <SocialsForm/>
      </v-card-text>
    </v-card>

    <v-bottom-navigation color="primary" class="fixedMenu">
      <v-btn color="success" @click="bandsStore.addBand">
        <v-icon color="success">mdi-plus</v-icon>
        <span>Add band</span>
      </v-btn>
    </v-bottom-navigation>
  </v-container>
</template>

<script setup>
//========== IMPORTS ==========
import { useBandsStore } from '@/stores/bands'
import GeneralInfo from '@/components/bands/GeneralInfo'
import SocialsForm from '@/components/bands/SocialsForm'
//========== STORES ==========
const bandsStore = useBandsStore()
//========== COMPUTED ==========

//========== VARIABLES ==========

//========== METHODS ==========

//========== ON MOUNTED ==========

</script>

<style scoped>

</style>

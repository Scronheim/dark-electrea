<template>
  <v-container fluid>
    <v-card title="General Info">
      <v-card-text>
        <GeneralInfo/>
        <SocialsForm/>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
//========== IMPORTS ==========
import { onMounted } from 'vue'
import { useBandsStore } from '@/stores/bands'
import GeneralInfo from '@/components/bands/GeneralInfo'
import SocialsForm from '@/components/bands/SocialsForm'
//========== STORES ==========
const bandsStore = useBandsStore()
//========== COMPUTED ==========

//========== VARIABLES ==========

//========== METHODS ==========

//========== ON MOUNTED ==========
onMounted(() => {
  bandsStore.$reset()
})
</script>

<style scoped>

</style>

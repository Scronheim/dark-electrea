<template>
  <v-card title="Общая информация">
    <v-card-text>
      <GeneralInfo />
      <SocialsForm />
    </v-card-text>
  </v-card>
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

<style scoped></style>

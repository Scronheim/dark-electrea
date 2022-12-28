<template>
  <v-container fluid>
    <LabelForm/>
  </v-container>
</template>

<script setup>
//========== IMPORTS ==========
import { onMounted } from 'vue'
import { useLabelsStore } from '@/stores/labels'
import LabelForm from '@/components/labels/LabelForm'
//========== STORES ==========
const labelsStore = useLabelsStore()
//========== COMPUTED ==========

//========== VARIABLES ==========

//========== METHODS ==========

//========== ON MOUNTED ==========
onMounted(() => {
  labelsStore.$reset()
})
</script>

<style scoped>

</style>

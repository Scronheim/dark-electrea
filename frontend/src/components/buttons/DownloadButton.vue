<template>
  <v-btn color="info"
         :disabled="disabled"
         :loading="loading"
         :class="cssClass"
         :href="href"
         target="_blank"
         @click="$emit('click')">
    <v-icon>mdi-download</v-icon>
    {{ text }}
  </v-btn>
</template>

<script setup>
//========== IMPORTS ==========

//========== STORES ==========

//========== COMPUTED ==========

//========== VARIABLES ==========
defineProps({
  href: {
    type: String,
  },
  text: {
    type: String,
    default: 'Download'
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  cssClass: {
    type: String,
    default: '',
  },
})
//========== METHODS ==========

//========== ON MOUNTED ==========

</script>

<style scoped>

</style>

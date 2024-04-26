<template>
  <v-tooltip location="top" :disabled="disabled">
    <template #activator="{ props }">
      <v-btn v-bind="props" color="success" :disabled="disabled" :loading="loading" :class="cssClass" :href="href"
        target="_blank" @click="$emit('click')">
        <v-icon size="35">mdi-spotify</v-icon>
        {{ text }}
      </v-btn>
    </template>
    <span>Слушать на Spotify</span>
  </v-tooltip>
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
    default: 'Spotify'
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

<style scoped></style>

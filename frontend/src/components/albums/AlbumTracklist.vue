<template>
  <p class="font-weight-bold">Треклист:</p>
  <p v-for="(track, index) in props.album.tracks" :key="index">
    {{ index !== album.tracks.length - 1 ? track : track.includes('.') ? track : `Общая длительность:
    ${track}` }}
  </p>
</template>

<script setup>
//========== IMPORTS ==========

//========== STORES ==========

//========== PROPS ==========
const props = defineProps({
  album: {
    type: Object,
    required: true,
  }
})
//========== COMPUTED ==========

//========== VARIABLES ==========

//========== METHODS ==========


//========== ON MOUNTED ==========

//========== WATCH ==========

</script>

<style scoped></style>

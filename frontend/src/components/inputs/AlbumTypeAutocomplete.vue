<template>
  <v-autocomplete label="Тип" clearable :items="albumStore.types" :model-value="value"
    @update:modelValue="$emit('updateValue', $event)" />
</template>

<script setup>
//========== IMPORTS ==========
import { useAlbumStore } from '@/stores/album'
//========== STORES ==========
const albumStore = useAlbumStore()
//========== COMPUTED ==========

//========== VARIABLES ==========
defineProps({
  value: String,
})
//========== METHODS ==========

//========== ON MOUNTED ==========

</script>

<style scoped></style>

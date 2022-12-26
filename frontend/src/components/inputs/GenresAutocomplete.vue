<template>
  <v-autocomplete label="Genres" multiple clearable
                  :items="utilStore.genres"
                  :model-value="value"
                  @update:modelValue="$emit('updateValue', $event)"
  />
</template>

<script setup>
//========== IMPORTS ==========
import { useUtilStore } from '@/stores/util'
//========== STORES ==========
const utilStore = useUtilStore()
//========== COMPUTED ==========

//========== VARIABLES ==========
defineProps({
  value: Array,
})
//========== METHODS ==========

//========== ON MOUNTED ==========

</script>

<style scoped>

</style>

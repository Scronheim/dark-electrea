<template>
  <v-autocomplete label="Country" clearable
                  :items="utilStore.countries"
                  :model-value="value"
                  @click:clear="$emit('updateValue', undefined)"
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
  value: String,
})
//========== METHODS ==========

//========== ON MOUNTED ==========

</script>

<style scoped>

</style>

<template>
  <v-autocomplete label="Label"
                  item-value="_id" item-title="title"
                  :items="utilStore.labels"
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
  value: [String, Object]
})
//========== METHODS ==========

//========== ON MOUNTED ==========

</script>

<style scoped>

</style>

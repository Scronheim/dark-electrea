<template>
  <v-autocomplete label="Лейбл" clearable item-value="_id" item-title="title" :items="labelsStore.labels"
    :model-value="value" @update:modelValue="$emit('updateValue', $event)" />
</template>

<script setup>
//========== IMPORTS ==========
import { useLabelsStore } from '@/stores/labels'
//========== STORES ==========
const labelsStore = useLabelsStore()
//========== COMPUTED ==========

//========== VARIABLES ==========
defineProps({
  value: [String, Object]
})
//========== METHODS ==========

//========== ON MOUNTED ==========

</script>

<style scoped></style>

<template>
  <v-autocomplete :label="label" clearable :items="years" :model-value="value"
    @update:modelValue="$emit('updateValue', $event)" />
</template>

<script setup>
//========== IMPORTS ==========
import { computed } from 'vue'
//========== STORES ==========

//========== COMPUTED ==========
const years = computed(() => {
  const now = new Date().getUTCFullYear()
  return Array(now - (now - 30)).fill('').map((v, idx) => now - idx)
})
//========== VARIABLES ==========
defineProps({
  label: {
    type: String,
    default: 'Год образования',
  },
  value: [Number, String]
})
//========== METHODS ==========

//========== ON MOUNTED ==========

</script>

<style scoped></style>

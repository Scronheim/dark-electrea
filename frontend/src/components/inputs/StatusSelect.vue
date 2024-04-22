<template>
  <v-select label="Статус" :items="utilStore.statuses" :model-value="value"
    @update:modelValue="$emit('updateValue', $event)" />
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

<style scoped></style>

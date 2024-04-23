<template>
  <v-autocomplete label="Страна" :items="utilStore.sortedCountries" :model-value="value"
    @update:modelValue="$emit('updateValue', $event)">
    <template #item="{ props, item }">
      <v-list-item v-bind="props" :title="item.raw.title">
        <template #append>
          <CountryFlag :country="item.raw.code" size="normal" style="margin-bottom: 0px;" />
        </template>
      </v-list-item>
    </template>
  </v-autocomplete>
</template>

<script setup>
//========== IMPORTS ==========
import CountryFlag from 'vue-country-flag-next'
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

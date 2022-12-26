<template>
  <v-tooltip location="top" :disabled="disabled">
    <template #activator="{props}">
      <v-btn v-bind="props"
             color="info"
             :disabled="disabled"
             :loading="loading"
             :class="cssClass"
             :href="href"
             target="_blank"
             @click="$emit('click')">
        <v-icon>mdi-download</v-icon>
        {{ hrefHostname }}
      </v-btn>
    </template>
    <span>Download album</span>
  </v-tooltip>
</template>

<script setup>
//========== IMPORTS ==========
import { computed } from 'vue'
//========== STORES ==========

//========== COMPUTED ==========
const hrefHostname = computed(() => {
  return new URL(props.href).hostname
})
//========== VARIABLES ==========
const props = defineProps({
  href: {
    type: String,
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

<style scoped>

</style>

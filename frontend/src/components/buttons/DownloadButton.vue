<template>
  <v-tooltip location="top" :disabled="disabled">
    <template #activator="{ props }">
      <v-btn v-bind="props" color="info" :disabled="disabled" :loading="loading" :class="cssClass" :href="link.href"
        target="_blank" @click="$emit('click')">
        <v-icon>mdi-download</v-icon>
        {{ srcHostname }}
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
const srcHostname = computed(() => {
  const hostname = props.link.src ? new URL(props.link.src).hostname.replace('www.', '') : ''

  return props.link.flac ? `${hostname} (FLAC)` : `${hostname} (${props.link.bitrate}kbps)`
})
//========== VARIABLES ==========
const props = defineProps({
  link: {
    type: Object,
    default: function name() {
      return {
        href: ''
      }
    }
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

<style scoped></style>

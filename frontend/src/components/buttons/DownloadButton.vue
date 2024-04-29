<template>
  <v-tooltip location="top" :disabled="disabled">
    <template #activator="{ props }">
      <v-btn v-bind="props" color="info" :disabled="disabled" :loading="loading" :class="cssClass" :href="link.src"
        prepend-icon="mdi-download" target="_blank">
        {{ srcHostname }}
      </v-btn>
    </template>
    <span>Скачать альбом</span>
  </v-tooltip>
  <v-tooltip v-if="usersStore.isLoggedIn" location="top" :disabled="disabled">
    <template #activator="{ props }">
      <v-btn v-bind="props" color="error" size="small" icon="mdi-link-off" @click="addBrokenLink" />
    </template>
    <span>Ссылка не работает</span>
  </v-tooltip>
</template>

<script setup>
//========== IMPORTS ==========
import { computed } from 'vue'

import { useAlbumStore } from '@/stores/album'
import { useUsersStore } from '@/stores/users'
//========== STORES ==========
const albumStore = useAlbumStore()
const usersStore = useUsersStore()
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
const addBrokenLink = () => {
  albumStore.addBrokenLink(props.link.src)
}
//========== ON MOUNTED ==========

</script>

<style scoped></style>

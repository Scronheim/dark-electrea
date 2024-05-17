<template>
<iframe v-if="props.spotifyAlbumLink" style="border-radius:12px"
    :src="spotifyEmbededLink" width="100%" height="460" frameBorder="0" allowfullscreen=""
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  spotifyAlbumLink: {
    type: String,
    required: true,
  }
})



const spotifyEmbededLink = computed(() => {
  return props.spotifyAlbumLink.replace('open.', 'embed.')
})
</script>
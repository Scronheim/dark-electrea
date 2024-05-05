<template>
  <p v-if="props.album.ratings.length">Средний рейтинг: <span class="font-weight-black">{{ averageAlbumRating
      }}</span>
    | Оценок: <span class="font-weight-black">{{ props.album.ratings.length }}</span>
  </p>
  <v-rating v-if="usersStore.isLoggedIn" :item-labels="labels" half-increments hover v-model="rating"
    @update:model-value="setAlbumRating">
    <template v-slot:item-label="props">
      <span :class="`text-${colors[props.index]}`" class="font-weight-black">
        {{ props.label }}
      </span>
    </template>
  </v-rating>
</template>

<script setup>
//========== IMPORTS ==========
import { ref, computed, watch } from 'vue'
import { useToast } from 'vue-toastification'

import { useUsersStore } from '@/stores/users'
import { useRatingsStore } from '@/stores/ratings'
import { useAlbumStore } from '@/stores/album'
//========== STORES ==========
const usersStore = useUsersStore()
const ratingsStore = useRatingsStore()
const albumStore = useAlbumStore()
const toast = useToast()
//========== PROPS ==========
const props = defineProps({
  album: {
    type: Object,
    required: true,
  }
})
//========== COMPUTED ==========
const averageAlbumRating = computed(() => {
  const sumRating = props.album.ratings.reduce((acc, rating) => {
    return acc + rating.rating
  }, 0)
  return sumRating / props.album.ratings.length
})
//========== VARIABLES ==========
const rating = ref(0)
const colors = ['red', 'orange', 'grey', 'cyan', 'green']
const labels = ['1', '2', '3', '4', '5']
//========== METHODS ==========
const setAlbumRating = async () => {
  await ratingsStore.setAlbumRating(rating.value)
  toast.success('Рейтинг обновлён')
}
const fillRating = () => {
  const albumRating = albumStore.currentAlbum.ratings.find((rating) => {
    return rating.album === albumStore.currentAlbum._id && rating.user === usersStore.user._id
  })
  if (albumRating) {
    rating.value = albumRating.rating
  } else {
    rating.value = 0
  }
}
//========== ON MOUNTED ==========

//========== WATCH ==========
watch(props.album, () => {
  fillRating()
})
</script>

<style scoped></style>

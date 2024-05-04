<template>
  <!-- <v-tooltip location="top" :disabled="disabled">
    <template #activator="{ props }">
      <v-btn v-bind="props" :disabled="disabled" :loading="loading" :icon="likeIcon" color="red" :class="cssClass"
        @click="$emit('click')" />
    </template>
<span>{{ likeText }}</span>
</v-tooltip> -->
  <v-btn :color="likeColor" :prepend-icon="likeIcon" block>
    {{ likeText }}
  </v-btn>
</template>

<script setup>
//========== IMPORTS ==========
import { computed } from 'vue'
//========== STORES ==========

//========== PROPS ==========
const props = defineProps({
  isLiked: {
    type: Boolean,
    default: false,
    required: true,
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
//========== COMPUTED ==========
const likeColor = computed(() => {
  return props.isLiked ? 'red' : 'success'
})
const likeIcon = computed(() => {
  return props.isLiked ? 'mdi-heart' : 'mdi-heart-outline'
})
const likeText = computed(() => {
  return props.isLiked ? 'Убрать из любимых' : 'Добавить в любимые'
})
//========== VARIABLES ==========

//========== METHODS ==========

//========== ON MOUNTED ==========

</script>

<style scoped></style>

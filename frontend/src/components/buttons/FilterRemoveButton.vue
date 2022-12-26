<template>
  <v-tooltip location="top" :disabled="disabled">
    <template #activator="{props}">
      <v-btn v-bind="props"
             :disabled="disabled"
             :loading="loading"
             icon="mdi-filter-remove"
             color="red"
             :class="cssClass"
             @click="$emit('click')"/>
    </template>
    <span>{{ text }}</span>
  </v-tooltip>
</template>

<script setup>
//========== IMPORTS ==========

//========== STORES ==========

//========== COMPUTED ==========

//========== VARIABLES ==========
defineProps({
  text: {
    type: String,
    default: 'Remove filters'
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

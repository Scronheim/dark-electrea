<template>
  <v-tooltip v-if="usersStore.isAdmin" location="top" :disabled="disabled">
    <template #activator="{props}">
      <v-btn v-bind="props"
             :disabled="disabled"
             :loading="loading"
             icon="mdi-pencil"
             color="info"
             :class="cssClass"
             @click="$emit('click')"/>
    </template>
    <span>{{ text }}</span>
  </v-tooltip>
</template>

<script setup>
//========== IMPORTS ==========
import { useUsersStore } from '@/stores/users'
//========== STORES ==========
const usersStore = useUsersStore()
//========== COMPUTED ==========

//========== VARIABLES ==========
defineProps({
  text: {
    type: String,
    default: 'Edit'
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

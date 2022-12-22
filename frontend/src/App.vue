<template>
  <v-app>
    <v-app-bar v-if="route.path !== '/'">
      <v-btn @click="router.push('/')">Dark Electrea</v-btn>
      <v-text-field variant="solo" placeholder="type something..." v-model="search"/>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'

const search = ref('')
const route = useRoute()

</script>

<style>

</style>

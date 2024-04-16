<template>
  <v-container fluid class="fill-height">
    <v-row justify="center" align="center" class="fill-height">
      <v-col align="center">
        <p class="text-h1">
          <span class="text-grey-darken-1">Metal </span>
          <span class="text-blue-lighten-1">Archive</span>
        </p>
        <SearchInput />
        <template v-if="usersStore.isLoggedIn">
          <v-btn @click="usersStore.logout">Logout</v-btn>
        </template>
        <template v-else>
          <v-btn to="/login">Login</v-btn>
          <v-btn to="/register">Register</v-btn>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
//========== IMPORTS ==========
import { useUsersStore } from '@/stores/users'
import SearchInput from '@/components/SearchInput'
//========== STORES ==========
const usersStore = useUsersStore()
//========== COMPUTED ==========

//========== VARIABLES ==========

//========== METHODS ==========

//========== ON MOUNTED ==========

//========== WATCH ==========

</script>

<style scoped></style>

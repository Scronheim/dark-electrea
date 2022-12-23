<template>
  <v-app>
    <v-app-bar v-if="route.path !== '/'">
      <v-btn @click="router.push('/')">Dark Electrea</v-btn>
      <SearchInput/>
      <template v-if="usersStore.isLoggedIn">
        <v-menu location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props">
              <v-icon>mdi-account</v-icon>
              {{ usersStore.user.username }}
            </v-btn>
          </template>
          <v-list nav>
            <v-list-item link to="/profile">
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item>
            <v-list-item link @click="logout">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import { useUsersStore } from '@/stores/users'
import SearchInput from '@/components/SearchInput'
//========== STORES ==========
const usersStore = useUsersStore()
//========== VARIABLES ==========
const route = useRoute()
//========== METHODS ==========
const logout = () => {

}
//========== ON MOUNTED ==========
onMounted(() => {
  if (usersStore.token) {
    usersStore.aboutMe()
  }
})
</script>

<style>

</style>

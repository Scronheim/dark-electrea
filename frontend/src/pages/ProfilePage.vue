<template>
  <v-card :title="user.username">
    <v-card-text>
      <v-card class="mb-3" title="Любимые группы">
        <v-card-text>
          <v-slide-group show-arrows>
            <v-slide-group-item v-for="band in user.likedBands" :key="band._id">
              <v-card :title="band.title" :to="`/bands/${band._id}`">
                <v-card-text>
                  <v-img :src="band.logoUrl" />
                  <v-img :src="band.photoUrl" />
                </v-card-text>
              </v-card>
            </v-slide-group-item>
          </v-slide-group>
        </v-card-text>
      </v-card>
      <v-card title="Любимые альбомы">
        <v-card-text>
          <v-slide-group show-arrows>
            <v-slide-group-item v-for="album in user.likedAlbums" :key="album._id">
              <v-card :title="album.title" :subtitle="album.band.title" :to="`/albums/${album._id}`">
                <v-card-text>
                  <v-img :src="album.cover" />
                </v-card-text>
              </v-card>
            </v-slide-group-item>
          </v-slide-group>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script setup>
//========== IMPORTS ==========
import { computed } from 'vue'
import { useUsersStore } from '@/stores/users'
//========== STORES ==========
const usersStore = useUsersStore()
//========== COMPUTED ==========
const user = computed(() => {
  return usersStore.user
})
//========== VARIABLES ==========

//========== METHODS ==========

//========== ON MOUNTED ==========

</script>

<style scoped></style>

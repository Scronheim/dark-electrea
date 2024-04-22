<template>
  <v-container fluid>
    <v-card :title="user.username">
      <v-card-text>
        <v-row>
          <v-col>
            <p>Материалы пользователя</p>
            <v-list>
              <v-list-item>
                <v-list-item-title>
                  Группы: {{ user.addedMaterials.bands }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  Альбомы: {{ user.addedMaterials.albums }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  Видео: {{ user.addedMaterials.videos }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
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

<style scoped>

</style>

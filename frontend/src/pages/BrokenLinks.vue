<template>
  <v-card title="Список альбомов с неработающими ссылками">
    <v-card-text>
      <v-table>
        <thead>
          <tr>
            <th>Альбом</th>
            <th>Ссылка</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="link in albumsStore.brokenLinks" :key="link.link">
            <td>
              <v-btn :to="`/albums/${link.album._id}`">
                {{ link.album.band.title }} - {{ link.album.title }}
              </v-btn>
            </td>
            <td>{{ link.link }}</td>
            <td>
              <v-btn color="error" icon="mdi-delete" @click="deleteBrokenLink(link._id)" />
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>

<script setup>
//========== IMPORTS ==========
import { ref } from 'vue'
import { useAlbumStore } from '@/stores/album'
import { onMounted } from 'vue'

//========== STORES ==========
const albumsStore = useAlbumStore()
//========== VARIABLES ==========
const brokenLinksIsLoading = ref(false)
//========== COMPUTED ==========

//========== VARIABLES ==========

//========== METHODS ==========
const deleteBrokenLink = async (_id) => {
  await albumsStore.deleteBrokenLink(_id)
  await getBrokenLinks()
}
const getBrokenLinks = async () => {
  brokenLinksIsLoading.value = true
  await albumsStore.getBrokenLinks()
  brokenLinksIsLoading.value = false
}
//========== ON MOUNTED ==========
onMounted(() => {
  getBrokenLinks()
})
//========== WATCH ==========

</script>

<style scoped></style>

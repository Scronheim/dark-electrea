<template>
  <v-card title="Статистика">
    <v-card-text>
      <p>Всего групп: {{ utilStore.stats.bandsCount }}. Из них 
        <span class="text-success">{{ utilStore.stats.activeBandsCount }}</span> активны,
        <span class="text-yellow">{{ utilStore.stats.onHoldBandsCount }}</span> в заморозке,
        <span class="text-red">{{ utilStore.stats.splitUpBandsCount }}</span> распались,
        <span class="text-blue">{{ utilStore.stats.changeNameBandsCount }}</span> сменили название и
        <span class="text-grey">{{ utilStore.stats.unknownBandsCount }}</span> неизвестных
      </p>
      <p>Всего альбомов: {{ utilStore.stats.albumsCount }}</p>
    </v-card-text>
  </v-card>
</template>

<script setup>
//========== IMPORTS ==========
import { ref, onMounted } from 'vue'

import { useUtilStore } from '@/stores/util'

//========== STORES ==========
const utilStore = useUtilStore()
//========== VARIABLES ==========
const statsIsLoading = ref(false)
//========== COMPUTED ==========

//========== VARIABLES ==========

//========== METHODS ==========
const getStats = async () => {
  statsIsLoading.value = true
  await utilStore.getStats()
  statsIsLoading.value = false
}
//========== ON MOUNTED ==========
onMounted(() => {
  getStats()
})
//========== WATCH ==========

</script>

<style scoped></style>

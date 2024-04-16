<template>
  <v-autocomplete autocomplete="off" density="default" variant="solo" v-model="model" v-model:search="search"
    :items="personStore.foundPersons" :loading="isLoading" clearable hide-no-data hide-selected item-title="realName"
    item-value="_id" label="Поиск музыкантов" placeholder="type something..." append-inner-icon="mdi-database-search"
    return-object @update:modelValue="selectPerson" @click:clear.prevent="clearFoundedPersons" />
</template>

<script setup>
//========== IMPORTS ==========
import { ref, watch } from 'vue'
import { useBandsStore } from '@/stores/bands'
import { usePersonStore } from '@/stores/person'
import { useUtilStore } from '@/stores/util'
//========== STORES ==========
const bandsStore = useBandsStore()
const personStore = usePersonStore()
const utilStore = useUtilStore()
//========== COMPUTED ==========

//========== VARIABLES ==========
const isLoading = ref(false)
const search = ref('')
const model = ref('')
const props = defineProps({
  lineup: {
    type: Array,
    required: true,
  }
})
//========== METHODS ==========
const clearFoundedPersons = () => {
  personStore.foundPersons = []
}
const selectPerson = (person) => {
  props.lineup.push(person)
  search.value = ''
  model.value = ''
  personStore.foundPersons = []
}
//========== ON MOUNTED ==========

//========== WATCH ==========
watch(search, (value) => {
  if (!value) return
  // Items have already been requested
  if (isLoading.value) return

  isLoading.value = true
  try {
    personStore.searchPerson(value)
  } catch (e) {
    utilStore.axiosErrorHandler(e)
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped></style>

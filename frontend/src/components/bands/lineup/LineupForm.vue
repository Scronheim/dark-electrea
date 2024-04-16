<template>
  <PersonSearchInput :lineup="lineup" class="mb-3" />
  <v-expansion-panels>
    <v-expansion-panel v-for="(person, index) in lineup" :key="index">
      <v-expansion-panel-title>{{ person.realName }} - {{ person.instruments }}</v-expansion-panel-title>
      <v-expansion-panel-text>
        <PersonForm :person="person">
          <template #deletePersonButton>
            <v-btn color="red" block @click="deletePerson(index)">Удалить</v-btn>
          </template>
        </PersonForm>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
//========== IMPORTS ==========
import { useBandsStore } from '@/stores/bands'
import PersonForm from '@/components/bands/PersonForm'
import PersonSearchInput from '@/components/PersonSearchInput'
//========== STORES ==========
const bandsStore = useBandsStore()
//========== COMPUTED ==========

//========== VARIABLES ==========
const props = defineProps({
  lineup: {
    type: Array,
    required: true,
  }
})
//========== METHODS ==========
const deletePerson = (personIndex) => {
  props.lineup.splice(personIndex, 1)
}
//========== ON MOUNTED ==========

//========== WATCH ==========

</script>

<style scoped></style>

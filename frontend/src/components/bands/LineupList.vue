<template>
  <v-card>
    <v-card-title class="pb-0">
      Состав
      <PlusButton text="Добавить нового музыканта" @click="newPersonDialog = true" />
    </v-card-title>
    <v-card-text class="pt-0">
      <LineupForm :lineup="bandsStore.currentBand.lineup" />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <slot name="actions" />
    </v-card-actions>
  </v-card>

  <v-dialog width="50%" v-model="newPersonDialog">
    <v-card title="Новый музыкант">
      <v-card-text>
        <PersonForm :person="newPerson" />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="red" @click="newPersonDialog = false">Закрыть</v-btn>
        <v-btn color="success" @click="addNewPerson">Добавить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
//========== IMPORTS ==========
import { ref } from 'vue'
import { useBandsStore } from '@/stores/bands'
import { usePersonStore } from '@/stores/person'
import PersonForm from '@/components/bands/PersonForm'
import PlusButton from '@/components/buttons/PlusButton'
import LineupForm from '@/components/bands/lineup/LineupForm'
//========== STORES ==========
const bandsStore = useBandsStore()
const personStore = usePersonStore()
//========== COMPUTED ==========

//========== VARIABLES ==========
const newPersonDialog = ref(false)
const newPerson = ref({
  band: bandsStore.currentBand._id,
  realName: '',
  stageName: '',
  bands: [],
  sex: 'Man',
  birthdate: '',
  country: '',
  instruments: '',
  photo: '',
})
//========== METHODS ==========
const addNewPerson = () => {
  personStore.addNewPerson(newPerson.value)
}
//========== ON MOUNTED ==========

//========== WATCH ==========

</script>

<style scoped></style>

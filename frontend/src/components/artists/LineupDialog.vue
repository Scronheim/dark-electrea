<template>
  <v-card>
    <v-card-title>Lineup</v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field label="Full name" v-model="newMember.fullName"/>
        </v-col>
        <v-col>
          <v-select label="Gender" :items="['Male', 'Female']" v-model="newMember.gender"/>
        </v-col>
        <v-col>
          <v-text-field label="Birthdate" type="date" v-model="newMember.birthdate"/>
        </v-col>
        <v-col>
          <v-autocomplete label="Birth country"
                          :items="utilStore.countries"
                          v-model="newMember.birthCountry">
          </v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field label="Instruments" v-model="newMember.instruments"/>
        </v-col>
        <v-col>
          <v-text-field label="Link to photo" v-model="newMember.photo"/>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn color="success" @click="addNewMember">Add</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
//========== IMPORTS ==========
import { ref, onMounted } from 'vue'
import { useArtistStore } from '@/stores/artist'
import { useUtilStore } from '@/stores/util'
//========== STORES ==========
const artistStore = useArtistStore()
const utilStore = useUtilStore()
//========== COMPUTED ==========

//========== VARIABLES ==========
const newMember = ref({
  fullName: '',
  gender: 'Male',
  birthdate: '',
  birthCountry: '',
  instruments: '',
  photo: '',
})
//========== METHODS ==========
const addNewMember = () => {
  artistStore.addNewMember(newMember.value)
}
const clearForm = () => {
  newMember.value = {
    fullName: '',
    gender: 'Male',
    birthdate: '',
    birthCountry: '',
    instruments: '',
    photo: '',
  }
}
//========== ON MOUNTED ==========
onMounted(() => {
  clearForm()
})
</script>

<style scoped>

</style>

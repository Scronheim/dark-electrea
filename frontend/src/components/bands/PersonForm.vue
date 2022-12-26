<template>
  <v-card>
    <v-card-title>Person</v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field label="Real name" v-model="person.realName"/>
        </v-col>
        <v-col>
          <v-text-field label="Stage name" v-model="person.stageName"/>
        </v-col>
        <v-col>
          <v-select label="Sex" :items="['Man', 'Woman']" v-model="person.sex"/>
        </v-col>
        <v-col>
          <v-text-field label="Birthdate" type="date" v-model="person.birthdate"/>
        </v-col>
        <v-col>
          <v-autocomplete label="Birth country"
                          :items="utilStore.countries"
                          v-model="person.birthCountry">
          </v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field label="Instruments" v-model="person.instruments"/>
        </v-col>
        <v-col>
          <v-text-field label="Link to photo" v-model="person.photo"/>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <slot name="actions"/>
    </v-card-actions>
  </v-card>
</template>

<script setup>
//========== IMPORTS ==========
import { useBandsStore } from '@/stores/bands'
import { useUtilStore } from '@/stores/util'
//========== STORES ==========
const bandsStore = useBandsStore()
const utilStore = useUtilStore()
//========== COMPUTED ==========

//========== VARIABLES ==========
const props = defineProps({
  person: {
    type: Object,
    required: true,
  }
})
//========== METHODS ==========

//========== ON MOUNTED ==========

</script>

<style scoped>

</style>

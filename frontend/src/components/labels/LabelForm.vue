<template>
  <v-card title="General Info">
    <v-card-text>
      <v-row>
        <v-col>
          <v-text-field label="Title" v-model="labelsStore.currentLabel.title"/>
        </v-col>
        <v-col>
          <CountryAutocomplete :value="labelsStore.currentLabel.country" @updateValue="updateCountry"/>
        </v-col>
        <v-col>
          <v-text-field label="Address" v-model="labelsStore.currentLabel.address"/>
        </v-col>
        <v-col>
          <v-text-field label="Email" v-model="labelsStore.currentLabel.email"/>
        </v-col>
        <v-col>
          <v-text-field label="Phone" v-model="labelsStore.currentLabel.phone"/>
        </v-col>
      </v-row>
      <v-card-title>Links</v-card-title>
      <v-row>
        <v-col>
          <v-text-field label="Official site" v-model="labelsStore.currentLabel.links.officialSite"/>
        </v-col>
        <v-col>
          <v-text-field label="Bandcamp" v-model="labelsStore.currentLabel.links.bandcamp"/>
        </v-col>
        <v-col>
          <v-text-field label="Youtube" v-model="labelsStore.currentLabel.links.youtube"/>
        </v-col>
        <v-col>
          <v-text-field label="Facebook" v-model="labelsStore.currentLabel.links.facebook"/>
        </v-col>
        <v-col>
          <v-text-field label="Twitter" v-model="labelsStore.currentLabel.links.twitter"/>
        </v-col>
        <v-col>
          <v-text-field label="Instagram" v-model="labelsStore.currentLabel.links.instagram"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field label="URL to logo" v-model="labelsStore.currentLabel.logo"/>
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
import { useLabelsStore } from '@/stores/labels'
import CountryAutocomplete from '@/components/inputs/CountryAutocomplete'
//========== STORES ==========
const labelsStore = useLabelsStore()
//========== COMPUTED ==========

//========== VARIABLES ==========

//========== METHODS ==========
const updateCountry = (country) => {
  labelsStore.currentLabel.country = country
}
//========== ON MOUNTED ==========

</script>

<style scoped>

</style>

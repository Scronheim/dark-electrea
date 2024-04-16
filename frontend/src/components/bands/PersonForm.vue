<template>
  <v-row>
    <v-col>
      <v-text-field label="Настоящее имя" v-model="person.realName" />
    </v-col>
    <v-col>
      <v-text-field label="Сценическое имя" v-model="person.stageName" />
    </v-col>
    <v-col>
      <v-select label="Пол" :items="['Мужчина', 'Женщина']" v-model="person.sex" />
    </v-col>
    <v-col>
      <v-text-field label="Дата рождения" type="date" v-model="person.birthdate" />
    </v-col>
    <v-col>
      <v-autocomplete label="Страна" :items="utilStore.countries" v-model="person.country">
      </v-autocomplete>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-text-field label="Инструменты" v-model="person.instruments" />
    </v-col>
    <v-col>
      <v-text-field label="Ссылка на фото" v-model="person.photo" />
    </v-col>
  </v-row>
  <v-row>
    <v-col align="center">
      <slot name="deletePersonButton" />
    </v-col>
  </v-row>
</template>

<script setup>
//========== IMPORTS ==========
import { useUtilStore } from '@/stores/util'
//========== STORES ==========
const utilStore = useUtilStore()
//========== COMPUTED ==========

//========== VARIABLES ==========
defineProps({
  person: {
    type: Object,
    required: true,
  }
})
//========== METHODS ==========

//========== ON MOUNTED ==========

</script>

<style scoped></style>

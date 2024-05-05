<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-title>Форма входа</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form">
            <v-text-field :readonly="false" :hide-details="false" v-model="user.email" :rules="emailRules" label="Email"
              name="email" prepend-icon="mdi-email" type="text" />
            <v-text-field :readonly="false" :hide-details="false" v-model="user.password" :rules="passwordRules"
              id="password" label="Пароль" name="password" prepend-icon="mdi-lock"
              :append-inner-icon="showPasswords ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showPasswords = !showPasswords" :type="showPasswords ? 'text' : 'password'"
              @keydown.enter="login" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="login">Войти</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
//========== IMPORTS ==========
import { ref } from 'vue'
import { useUsersStore } from '@/stores/users'
//========== STORES ==========
const usersStore = useUsersStore()
//========== COMPUTED ==========

//========== VARIABLES ==========
const user = ref({
  password: '',
  email: '',
})
const passwordRules = [
  (value) => !!value || 'Введите пароль',
]
const emailRules = [
  v => !!v || 'Обязательное поле',
  v => /.+@.+\..+/.test(v) || 'E-mail должен быть валидным',
]

const showPasswords = ref(false)
//========== METHODS ==========
const login = async () => {
  await usersStore.login(user.value)
}
//========== ON MOUNTED ==========

</script>

<style scoped></style>

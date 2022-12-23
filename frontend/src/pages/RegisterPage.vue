<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Register form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                :readonly="false"
                :hide-details="false"
                v-model="user.username"
                :rules="usernameRules"
                label="Username"
                name="username"
                prepend-icon="mdi-account"
                type="text"
              />
              <v-text-field
                :readonly="false"
                :hide-details="false"
                v-model="user.email"
                :rules="emailRules"
                label="Email"
                name="email"
                prepend-icon="mdi-email"
                type="text"
              />

              <v-text-field
                :readonly="false"
                :hide-details="false"
                v-model="user.password"
                :rules="passwordRules"
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                :append-inner-icon="showPasswords ? 'mdi-eye-off': 'mdi-eye'"
                @click:append-inner="showPasswords = !showPasswords"
                :type="showPasswords? 'text': 'password'"
              />
              <v-text-field
                :readonly="false"
                :hide-details="false"
                v-model="user.password_confirmation"
                :rules="confirmPasswordRules"
                id="password_confirmation"
                label="Confirm password"
                name="password_confirmation"
                prepend-icon="mdi-lock"
                :type="showPasswords? 'text': 'password'"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="register">Register</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
  username: '',
  password: '',
  passwordConfirmation: '',
  email: '',
})
const passwordRules =  [
  (value) => !!value || 'Введите пароль',
]
const confirmPasswordRules = [
  (value) => !!value || 'Введите подтверждающий пароль',
  (value) => value === user.value.password || 'Пароли должны совпадать',
]
const emailRules = [
  v => !!v || 'Обязательное поле',
  v => /.+@.+\..+/.test(v) || 'E-mail должен быть валидным',
]
const usernameRules = [
  v => !!v || 'Обязательное поле',
]
const showPasswords = ref(false)
//========== METHODS ==========
const register = () => {
  usersStore.register(user.value)
}
//========== ON MOUNTED ==========

</script>

<style scoped>

</style>

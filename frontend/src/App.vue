<template>
  <v-app>
    <v-app-bar v-if="route.path !== '/'">
      <v-btn @click="router.push('/')">Dark Electrea</v-btn>
      <SearchInput />
      <template v-if="usersStore.isLoggedIn">
        <v-menu location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props">
              <v-icon>mdi-account</v-icon>
              {{ usersStore.user.username }}
            </v-btn>
          </template>
          <v-list nav>
            <v-list-item link to="/profile">
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item>
            <v-list-item link @click="logout">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <v-bottom-navigation v-if="usersStore.isAdmin" color="primary">
      <v-menu location="top">
        <template #activator="{ props }">
          <v-btn v-bind="props">
            <v-icon color="success">mdi-plus</v-icon>
            <span>Add</span>
          </v-btn>
        </template>
        <v-list nav>
          <v-list-item title="Add band" link to="/bands/add" prepend-icon="mdi-account-music">
            <v-list-item-media></v-list-item-media>
          </v-list-item>
          <v-list-item title="Add label" link to="/labels/add" prepend-icon="mdi-currency-usd" />
        </v-list>
      </v-menu>
      <v-btn v-if="route.name === 'Bands add page'" @click="addBand">
        <v-icon color="success">mdi-content-save</v-icon>
        <span>Save band</span>
      </v-btn>
      <v-btn v-if="route.name === 'Label add page'" @click="addLabel">
        <v-icon color="success">mdi-content-save</v-icon>
        <span>Save label</span>
      </v-btn>
      <template v-if="route.name === 'Band info page'">
        <v-btn @click="editDialog = true">
          <v-icon color="info">mdi-pencil</v-icon>
          <span>Edit about</span>
        </v-btn>
        <v-btn @click="albumsDialog = true">
          <v-icon color="info">mdi-album</v-icon>
          <span>Edit albums</span>
        </v-btn>
        <v-btn @click="lineupDialog = true">
          <v-icon color="info">mdi-account-group</v-icon>
          <span>Edit lineup</span>
        </v-btn>
        <v-btn @click="photosDialog = true">
          <v-icon color="info">mdi-image-multiple</v-icon>
          <span>Edit photos</span>
        </v-btn>
      </template>
      <template v-if="route.name === 'Label info page'">
        <v-btn @click="editLabelDialog = true">
          <v-icon color="info">mdi-pencil</v-icon>
          <span>Edit label</span>
        </v-btn>
      </template>
    </v-bottom-navigation>

    <v-dialog width="70%" v-model="editLabelDialog">
      <LabelForm>
        <template #actions>
          <v-btn color="red" @click="editLabelDialog = false">Close</v-btn>
          <v-btn color="success" @click="updateLabel">Save</v-btn>
        </template>
      </LabelForm>
    </v-dialog>

    <v-dialog width="40%" v-model="photosDialog">
      <v-card>
        <v-card-title>
          Photos
          <PlusButton text="Add photo" @click="addPhoto" />
        </v-card-title>
        <v-card-text>
          <v-row v-for="(photo, index) in bandsStore.currentBand.photos" :key="`photo${index}`">
            <v-col>
              <v-text-field label="Link" v-model="bandsStore.currentBand.photos[index]" />
            </v-col>
            <v-col cols="1">
              <DeleteButton text="Delete photo" @click="deletePhoto(index)" />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="red" @click="photosDialog = false">Close</v-btn>
          <v-btn color="success" @click="updateBand">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog width="60%" v-model="albumsDialog">
      <AlbumsList />
    </v-dialog>

    <v-dialog width="50%" v-model="lineupDialog">
      <LineupList>
        <template #actions>
          <v-btn color="red" @click="lineupDialog = false">Close</v-btn>
          <v-btn color="success" @click="updateBand">Save</v-btn>
        </template>
      </LineupList>
    </v-dialog>

    <v-dialog width="80%" v-model="editDialog">
      <v-card :title="`Edit ${bandsStore.currentBand.title}`">
        <v-card-text>
          <GeneralInfo />
          <SocialsForm />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="red" @click="editDialog = false">Close</v-btn>
          <v-btn color="success" @click="updateBand">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import { useBandsStore } from '@/stores/bands'
import { useLabelsStore } from '@/stores/labels'
import { useUsersStore } from '@/stores/users'
import SearchInput from '@/components/SearchInput'
import GeneralInfo from '@/components/bands/GeneralInfo'
import SocialsForm from '@/components/bands/SocialsForm'
import AlbumsList from '@/components/bands/AlbumsList'
import LineupList from '@/components/bands/LineupList'
import PlusButton from '@/components/buttons/PlusButton'
import DeleteButton from '@/components/buttons/DeleteButton'
import LabelForm from '@/components/labels/LabelForm'
//========== STORES ==========
const bandsStore = useBandsStore()
const labelsStore = useLabelsStore()
const usersStore = useUsersStore()
//========== VARIABLES ==========
const route = useRoute()
const editLabelDialog = ref(false)
const photosDialog = ref(false)
const albumsDialog = ref(false)
const lineupDialog = ref(false)
const editDialog = ref(false)
//========== METHODS ==========
const addLabel = async () => {
  await labelsStore.addLabel()
  await router.push(`/labels/${labelsStore.currentLabel._id}`)
}
const addBand = async () => {
  await bandsStore.addBand()
  await router.push(`/bands/${bandsStore.currentBand._id}`)
}
const deletePhoto = (photoIndex) => {
  bandsStore.currentBand.photos.splice(photoIndex, 1)
}
const addPhoto = () => {
  bandsStore.currentBand.photos.push('')
}
const updateLabel = () => {
  labelsStore.updateLabel()
}
const updateBand = () => {
  bandsStore.updateBand()
  editDialog.value = false
  albumsDialog.value = false
}
const logout = () => {
  usersStore.logout()
}
//========== ON MOUNTED ==========
onMounted(() => {
  if (usersStore.token) {
    usersStore.aboutMe()
  }
})
</script>

<style>
.v-list-item__prepend>.v-icon {
  margin-inline-end: 16px;
}
</style>

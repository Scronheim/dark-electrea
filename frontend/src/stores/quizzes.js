import { defineStore } from 'pinia'
import { markRaw } from 'vue'
import { useToast } from 'vue-toastification'

import CountryByPhoto from '@/pages/quizzes/CountryByPhoto.vue'
import GenreByAlbumCover from '@/pages/quizzes/GenreByAlbumCover.vue'

const toast = useToast()

export const useQuizStore = defineStore({
  id: 'quizStore',
  state: () => ({
    quizzes: [
      { id: 1, title: 'Угадай страну группы по фото', component: markRaw(CountryByPhoto) },
      { id: 2, title: 'Угадай жанр по обложке альбома', component: markRaw(GenreByAlbumCover) },
    ]
  }),
  actions: {
    // ---------------------------------------GET---------------------------------------

    // ---------------------------------------PATCH---------------------------------------

  }
})

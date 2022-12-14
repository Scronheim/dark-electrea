import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useArtistStore = defineStore({
  id: 'artistStore',
  state: () => ({
    currentArtist: {
      title: '',
      countryOfOrigin: '',
      city: '',
      formedIn: null,
      yearsActive: '',
      status: 'Active',
      genres: [],
      lyricsTheme: '',
      currentLabel: '',
      description: '',
      albums: [],
      members: [],
      social: {
        facebook: '',
        youtube: '',
      },
      logo: '',
      photos: [],
    }
  }),
  actions: {

  }
})

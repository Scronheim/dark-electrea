import { defineStore } from 'pinia'
import axios from 'axios'
import { useToast } from 'vue-toastification'

import { useUtilStore } from '@/stores/util'

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
      label: '',
      description: '',
      albums: [],
      lineup: [],
      social: {
        officialSite: undefined,
        bandcamp: undefined,
        facebook: undefined,
        youtube: undefined,
      },
      logo: '',
      photos: [],
    }
  }),
  actions: {
    async addNewMember(person) {
      const { data } = await axios.post('/api/people', person)
      this.currentArtist.lineup.push(data.data)
    },
    async addArtist() {
      const utilStore = useUtilStore()
      try {
        await axios.post('/api/artists', this.currentArtist)
        toast.success(`Artist ${this.currentArtist.title} added successfully`)
      } catch (e) {
        utilStore.axiosErrorHandler(e)
      }
    },
    async getArtistInfo(id) {
      const { data } = await axios.get(`/api/artists?id=${id}`)
      this.currentArtist = data.data
    }
  }
})

import { defineStore } from 'pinia'
import axios from 'axios'
import { useToast } from 'vue-toastification'

import { useUtilStore } from '@/stores/util'

const toast = useToast()

export const useBandsStore = defineStore({
  id: 'bandsStore',
  state: () => ({
    foundedBands: [],
    currentBand: {
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
      socials: {
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
    // ---------------------------------------GET---------------------------------------
    async searchBand(bandTitle) {
      const { data } = await axios.get(`/api/search?q=${bandTitle}`)
      this.foundedBands = data.data
    },
    async getBandInfo(id) {
      const { data } = await axios.get(`/api/bands?id=${id}`)
      this.currentBand = data.data
    },
    async getBandsByCountry(country) {
      return await axios.get(`/api/search?country=${country}`)
    },
    // ---------------------------------------POST---------------------------------------
    async addNewMember(person) {
      const { data } = await axios.post('/api/people', person)
      this.currentBand.lineup.push(data.data)
    },
    async addBand() {
      const utilStore = useUtilStore()
      try {
        await axios.post('/api/bands', this.currentBand)
        toast.success(`Band ${this.currentBand.title} added successfully`)
      } catch (e) {
        utilStore.axiosErrorHandler(e)
      }
    },
    // ---------------------------------------PATCH---------------------------------------
    async updateBand() {
      const { data } = await axios.patch('/api/bands', this.currentBand)
      toast.success(`Band ${this.currentBand.title} updated successfully`)
      this.currentBand = data.data
    }
  }
})

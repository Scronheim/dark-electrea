import { defineStore } from 'pinia'
import axios from 'axios'
import { useToast } from 'vue-toastification'

import { useUtilStore } from '@/stores/util'
import { useUsersStore } from '@/stores/users'

const toast = useToast()

export const useBandsStore = defineStore({
  id: 'bandsStore',
  state: () => ({
    filters: {
      genres: { $in: [] },
      country: undefined,
      formedIn: undefined,
      label: undefined,
    },
    foundedBands: [],
    currentBand: {
      _id: '',
      title: '',
      country: '',
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
      userAdded: '',
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
    // ---------------------------------------POST---------------------------------------
    async searchBandsByFilters() {
      const filters = Object.assign({}, this.filters)
      if (filters.genres.$in.length === 0) delete filters.genres
      return await axios.post('/api/search', filters)
    },
    async addNewPerson(person) {
      person.band = this.currentBand._id
      const { data } = await axios.post('/api/people', person)
      this.currentBand.lineup.push(data.data)
      toast.success(`Person ${person.stageName} added to band ${this.currentBand.title}`)
    },
    async addBand() {
      const utilStore = useUtilStore()
      const usersStore = useUsersStore()
      this.currentBand.userAdded = usersStore.user._id
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

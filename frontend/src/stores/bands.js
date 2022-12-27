import { defineStore } from 'pinia'
import axios from 'axios'
import { useToast } from 'vue-toastification'

import { useUtilStore } from '@/stores/util'
import { useUsersStore } from '@/stores/users'
import router from '@/router'

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
      title: '',
      country: '',
      city: '',
      formedIn: null,
      yearsActive: '',
      status: 'Active',
      genres: [],
      lyricsTheme: '',
      label: '63a9aa0a8562ab12bcddd78b',
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
    goToBandsByFiltersPage(param, genre) {
      if (param === 'label') {
        this.filters.label = this.currentBand.label._id
      } else if (param === 'genres') {
        this.filters.genres.$in.push(genre)
      } else {
        this.filters[param] = this.currentBand[param]
      }
      router.push('/bands')
    },
    // ---------------------------------------GET---------------------------------------
    async searchBand(bandTitle) {
      const { data } = await axios.get(`/api/search/bands?q=${bandTitle}`)
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
      return await axios.post('/api/search/bands', filters)
    },
    async addBand() {
      const utilStore = useUtilStore()
      const usersStore = useUsersStore()
      this.currentBand.userAdded = usersStore.user._id
      try {
        const { data } = await axios.post('/api/bands', this.currentBand)
        this.currentBand = data.data
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

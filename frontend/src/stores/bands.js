import { defineStore } from 'pinia'
import axios from 'axios'
import { useToast } from 'vue-toastification'

import { useUtilStore } from '@/stores/util'
import { useAlbumStore } from '@/stores/album'
import router from '@/router'

const toast = useToast()

export const useBandsStore = defineStore({
  id: 'bandsStore',
  state: () => ({
    filters: {
      title: '',
      genre: '',
      country: '',
      status: '',
      formedIn: '',
    },
    randomBandFilters: {
      genre: '',
      country: '',
      status: '',
      formedIn: '',
    },
    foundedBands: [],
    currentBand: {
      title: '',
      country: 'Unknown',
      city: '',
      formedIn: null,
      yearsActive: '',
      status: 'Active',
      genre: '',
      lyricsTheme: '',
      label: '',
      description: '',
      albums: [],
      lineup: [],
      exLineup: [],
      socials: {
        officialSite: undefined,
        bandcamp: undefined,
        facebook: undefined,
        youtube: undefined,
        downloads: undefined,
      },
      logoUrl: '',
      photoUrl: '',
      photos: [],
      userAdded: '',
    },
    bandIsLoading: false,
  }),
  actions: {
    goToBandsByFiltersPage(param, genre) {
      if (param === 'label') {
        this.filters.label = this.currentBand.label._id
      } else if (param === 'genres') {
        this.filters.genre = genre
      } else {
        this.filters[param] = this.currentBand[param]
      }
      router.push('/bands')
    },
    // ---------------------------------------GET---------------------------------------
    async getRandomBand(withPhoto = '') {
      const filters = new URLSearchParams(this.filters).toString()
      this.bandIsLoading = true
      const albumStore = useAlbumStore()
      const band = await axios.get(`/api/search/bands/random?${filters}&withPhoto=${withPhoto}`)
      this.bandIsLoading = false
      this.currentBand = band.data.data
      albumStore.clearCurrentAlbum()
    },
    async searchBand(bandTitle) {
      this.filters.title = bandTitle
      const { data } = await axios.get(`/api/search/bands?q=${bandTitle}`)
      this.foundedBands = data.data
    },
    async getBandInfo(id) {
      const albumStore = useAlbumStore()
      const { data } = await axios.get(`/api/bands?id=${id}`)
      albumStore.clearCurrentAlbum()
      Object.assign(this.currentBand, data.data)
    },
    // ---------------------------------------POST---------------------------------------
    async searchBandsByFilters() {
      const filters = Object.assign({}, this.filters)
      filters.genre = { $regex: filters.genre || '', $options: 'i' }
      filters.title = { $regex: filters.title || '', $options: 'i' }
      const { data } = await axios.post('/api/search/bands', filters)
      this.foundedBands = data.data
    },
    async addBand() {
      const utilStore = useUtilStore()
      try {
        const { data } = await axios.post('/api/bands', this.currentBand)
        this.currentBand = data.data
        toast.success(`Группа ${this.currentBand.title} добавлена успешно`)
      } catch (e) {
        utilStore.axiosErrorHandler(e)
      }
    },
    // ---------------------------------------PATCH---------------------------------------
    async updateBand() {
      const { data } = await axios.patch('/api/bands', this.currentBand)
      toast.success(`Группа ${this.currentBand.title} успешно обновлена`)
      Object.assign(this.currentBand, data.data)
    }
  }
})

import { defineStore } from 'pinia'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import router from '@/router'
import { useBandsStore } from '@/stores/bands'

const toast = useToast()

export const useAlbumStore = defineStore({
  id: 'albumStore',
  state: () => ({
    types: ['Full length', 'Single', 'EP', 'Demo', 'Compilation', 'Split'],
    filters: {
      genres: { $in: [] },
      releaseDate: undefined,
      label: undefined,
    },
    currentAlbum: {
      band: {},
      label: {},
      tracks: [],
      lineup: [],
      exLineup: [],
      links: {
        download: []
      },
    },
  }),
  actions: {
    goToAlbumsByFiltersPage(param, genre) {
      if (param === 'label') {
        this.filters.label = this.currentAlbum.label._id
      } else if (param === 'genres') {
        this.filters.genres.$in.push(genre)
      } else {
        this.filters[param] = this.currentAlbum[param]
      }
      router.push('/albums')
    },
    // ---------------------------------------GET---------------------------------------
    async getAlbumById(id) {
      const { data } = await axios.get(`/api/albums?id=${id}`)
      this.currentAlbum = data.data
    },
    // ---------------------------------------POST---------------------------------------
    async searchAlbumsByFilters() {
      const filters = Object.assign({}, this.filters)
      if (filters.genres.$in.length === 0) delete filters.genres
      return await axios.post('/api/search/albums', filters)
    },
    async addAlbum(album) {
      await axios.post('/api/albums', album)
      toast.success(`Album ${album.title} added successfully`)
    },
    // ---------------------------------------PATCH---------------------------------------
    async updateAlbum(album) {
      if (!album) {
        album = this.currentAlbum
      }
      const { data } = await axios.patch('/api/albums', album)
      album = data.data
      toast.success(`Album ${album.title} updated successfully`)
    },
    // ---------------------------------------DELETE---------------------------------------
    async deleteAlbum(album) {
      const bandStore = useBandsStore()
      const { data } = await axios.delete('/api/albums', { data: album })
      bandStore.currentBand = data.data
      toast.success(`Album ${album.title} deleted successfully`)
    }
  }
})

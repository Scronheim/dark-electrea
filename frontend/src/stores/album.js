import { defineStore } from 'pinia'
import axios from 'axios'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useAlbumStore = defineStore({
  id: 'albumStore',
  state: () => ({
    currentAlbum: {
      band: {},
      label: {},
      links: {
        download: []
      },
    },
  }),
  actions: {
    // ---------------------------------------GET---------------------------------------
    async getAlbumById(id) {
      const { data } = await axios.get(`/api/albums?id=${id}`)
      this.currentAlbum = data.data
    },
    // ---------------------------------------POST---------------------------------------
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
    }
  }
})

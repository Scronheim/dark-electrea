import { defineStore } from 'pinia'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import router from '@/router'

import { useBandsStore } from '@/stores/bands'
import { useUsersStore } from '@/stores/users'

const toast = useToast()

export const useAlbumStore = defineStore({
  id: 'albumStore',
  state: () => ({
    types: ['Full length', 'Single', 'EP', 'Demo', 'Compilation', 'Split'],
    filters: {
      genre: '',
      releaseDate: '',
      label: '',
    },
    currentAlbum: {
      _id: '',
      band: {
        _id: '',
        title: '',
        albums: [],
      },
      genre: '',
      label: {},
      tracks: [],
      lineup: [],
      exLineup: [],
      links: {
        spotify: '',
        yaMusic: '',
        download: []
      },
      ratings: [],
      cover: '',
    },
    brokenLinks: [],
    foundedOnSpotify: [],
    albumIsLoading: false,
    spotifyAlbums: [],
  }),
  actions: {
    async searchAlbumsWithSpotify() {
      const payload = {
        'links.spotify': { $ne: '' }
      }
      const { data } = await axios.post('/api/search/albums', payload)
      this.spotifyAlbums = data.data
    },
    clearCurrentAlbum() {
      this.currentAlbum = {
        band: {
          albums: [],
        },
        label: {},
        tracks: [],
        lineup: [],
        exLineup: [],
        links: {
          spotify: '',
          yaMusic: '',
          download: []
        },
        ratings: [],
      }
    },
    async addBrokenLink(link) {
      const userStore = useUsersStore()
      const payload = {
        album: this.currentAlbum._id,
        link,
        userAdded: userStore.user._id
      }
      const { data } = await axios.post('/api/broken_links', payload)
      if (data.success) {
        toast.success('Сообщение о неработающей ссылке отправлено')
      } else {
        toast.warning(data.error)
      }
    },
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
    async getRandomAlbum(withCover = '', withSpotify = '') {
      const filters = new URLSearchParams(this.filters).toString()
      this.albumIsLoading = true
      const album = await axios.get(`/api/search/albums/random?${filters}&withCover=${withCover}&withSpotify=${withSpotify}`)
      this.albumIsLoading = false
      this.currentAlbum = album.data.data
    },
    async searchAlbumOnSpotify(bandAndAlbumName) {
      const { data } = await axios.get(`/api/search/albums/spotify?q=${bandAndAlbumName}`)
      this.foundedOnSpotify = data.data
    },
    async getBrokenLinks() {
      const { data } = await axios.get('/api/broken_links')
      this.brokenLinks = data.data
    },
    async getAlbumById(id) {
      const { data } = await axios.get(`/api/albums?_id=${id}`)
      this.currentAlbum = data.data
    },
    // ---------------------------------------POST---------------------------------------
    async searchAlbumsByFilters() {
      const filters = Object.assign({}, this.filters)
      if (filters.genre === '') delete filters.genres
      return await axios.post('/api/search/albums', filters)
    },
    async addAlbum(album) {
      await axios.post('/api/albums', album)
      toast.success(`Альбом ${album.title} успешно добавлен`)
    },
    // ---------------------------------------PATCH---------------------------------------
    async updateAlbum(album) {
      if (!album) {
        album = this.currentAlbum
      }
      const { data } = await axios.patch('/api/albums', album)
      album = data.data
      toast.success(`Альбом ${album.title} успешно обновлён`)
    },
    // ---------------------------------------DELETE---------------------------------------
    async deleteAlbum(album) {
      const bandStore = useBandsStore()
      const { data } = await axios.delete('/api/albums', { data: album })
      bandStore.currentBand = data.data
      toast.success(`Альбом ${album.title} успешно удалён`)
    },
    async deleteBrokenLink(_id) {
      await axios.delete(`/api/broken_links?_id=${_id}`)
      toast.success('Ссылка удалена')
    }
  }
})

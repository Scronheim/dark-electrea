import { defineStore } from 'pinia'
import axios from 'axios'
import { useAlbumStore } from '@/stores/album'

export const useRatingsStore = defineStore({
  id: 'ratingsStore',
  state: () => ({

  }),
  actions: {
    // ---------------------------------------GET---------------------------------------

    // ---------------------------------------POST---------------------------------------

    // ---------------------------------------PATCH---------------------------------------
    async setAlbumRating(rating) {
      const albumStore = useAlbumStore()
      const payload = {
        albumId: albumStore.currentAlbum._id,
        rating
      }
      const { data } = await axios.patch('/api/albums/rating', payload)
      albumStore.currentAlbum = data.data
    }
    // ---------------------------------------DELETE---------------------------------------

  }
})

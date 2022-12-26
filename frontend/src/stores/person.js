import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import axios from 'axios'

import { useBandsStore } from '@/stores/bands'

const toast = useToast()

export const usePersonStore = defineStore({
  id: 'personStore',
  state: () => ({
    foundPersons: [],
  }),
  actions: {
    // ---------------------------------------GET---------------------------------------
    async searchPerson(query) {
      const { data } = await axios.get(`/api/people?q=${query}`)
      this.foundPersons = data.data
    },
    // ---------------------------------------POST---------------------------------------
    async addNewPerson(person) {
      const bandsStore = useBandsStore()
      person.band = bandsStore.currentBand._id
      const { data } = await axios.post('/api/people', person)
      bandsStore.currentBand.lineup.push(data.data)
      toast.success(`Person ${person.stageName} added to band ${bandsStore.currentBand.title}`)
    },
    // ---------------------------------------PATCH---------------------------------------

  }
})

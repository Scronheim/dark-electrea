import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import axios from 'axios'

const toast = useToast()

export const useUtilStore = defineStore({
  id: 'utilStore',
  state: () => ({
    labels: [],
    genres: ['Dark Electro', 'EBM', 'Aggrotech'],
    countries: [
      { title: 'Russia', value: 'russia', countryCode: 'ru' },
      { title: 'USA', value: 'usa', countryCode: 'us' },
      { title: 'Germany', value: 'germany', countryCode: 'de' },
      { title: 'Mexico', value: 'mexico', countryCode: 'mx' },
    ],
    statuses: [
      { title: 'Active', value: 'active' },
      { title: 'Split-up', value: 'splitUp' },
      { title: 'On hold', value: 'onHold' },
      { title: 'Unknown', value: 'unknown' },
    ]
  }),
  actions: {
    // ---------------------------------------GET---------------------------------------
    async getLabels() {
      const { data } = await axios.get('/api/labels')
      this.labels = data.data
    },
    // ---------------------------------------POST---------------------------------------
    async addLabel(label) {
      await axios.post('/api/label', label)
      toast.success(`Label ${label.title} added successfully`)
    },
    // ---------------------------------------PATCH---------------------------------------
    async updateLabel() {
      const { data } = await axios.patch('/api/label', this.currentLabel)
      this.currentLabel = data.data
      toast.success(`Label ${this.currentLabel.title} updated successfully`)
    },
    axiosErrorHandler(error) {
      toast.error(`Текст ошибки:\n${error.response.data.error}`)
    },
  }
})

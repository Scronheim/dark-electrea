import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import axios from 'axios'
import router from '@/router'

const toast = useToast()

export const useLabelsStore = defineStore({
  id: 'labelsStore',
  state: () => ({
    filters: {
      country: undefined,
    },
    labels: [],
    currentLabel: {
      title: '',
      country: '',
      address: '',
      email: '',
      phone: '',
      links: {
        officialSite: '',
        vk: '',
        youtube: '',
        facebook: '',
        twitter: '',
        bandcamp: '',
        instagram: '',
      },
      logo: '',
    },
  }),
  actions: {
    goToLabelsByFiltersPage(param) {
      this.filters[param] = this.currentLabel[param]
      router.push('/labels')
    },
    // ---------------------------------------GET---------------------------------------
    async getLabels() {
      const { data } = await axios.get('/api/labels')
      this.labels = data.data
    },
    async getLabelById(id) {
      const { data } = await axios.get(`/api/labels?id=${id}`)
      this.currentLabel = data.data
    },
    // ---------------------------------------POST---------------------------------------
    async searchLabelsByFilters() {
      const filters = Object.assign({}, this.filters)
      return await axios.post('/api/search/labels', filters)
    },
    async addLabel() {
      const { data } = await axios.post('/api/labels', this.currentLabel)
      this.currentLabel = data.data
      toast.success(`Label ${this.currentLabel.title} added successfully`)
    },
    // ---------------------------------------PATCH---------------------------------------
    async updateLabel() {
      const { data } = await axios.patch('/api/labels', this.currentLabel)
      this.currentLabel = data.data
      toast.success(`Label ${this.currentLabel.title} updated successfully`)
    },
  }
})

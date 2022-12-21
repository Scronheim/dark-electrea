import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useUtilStore = defineStore({
  id: 'utilStore',
  state: () => ({
    genres: [
      { title: 'Dark Electro', value: 'dark-electro' },
      { title: 'EBM', value: 'ebm' },
      { title: 'Aggrotech', value: 'aggrotech' },
    ],
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
    axiosErrorHandler(error) {
      if (error.response.data.errors instanceof Array) {
        error.response.data.errors.forEach((e) => {
          toast.error(`Код ответа: ${error.response.status}\nТекст ошибки:\n${e}`)
        })
      } else {
        toast.error(`Код ответа: ${error.response.status}\nТекст ошибки:\n${error.response.data.errors}`)
      }
    },
  }
})

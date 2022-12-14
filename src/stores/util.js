import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'

const toast = useToast()

export const useUtilStore = defineStore({
  id: 'utilStore',
  state: () => ({

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

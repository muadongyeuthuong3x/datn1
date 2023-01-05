
import useNotifications from '@/composables/useNotifications'
import type { DataLogin } from '@/type_interface/typedata'
import { loginProdcut } from '../apiClient/apiConfig'
export default {
  namespaced: true,
  state: {
  },
  actions: {
    async signInWithEmailAndPassword ( _: any ,data : DataLogin) {
      try {
        return await loginProdcut(data)
      } catch (error : any) {
        const { addNotification } = useNotifications();
        addNotification({ message: error.response.data.message, type: 'error' })
      }
      
    },
  },
}



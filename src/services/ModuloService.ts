import axios from 'axios'
import { useApiStore } from '@/stores/api'

export const ModuloService = {
  listar() {
    const { getUrl } = useApiStore()
    return axios.get(getUrl('/modulos'))
  },
  deletar(uuid: string) {
    const { getUrl } = useApiStore()
    return axios.delete(getUrl(`/modulos/${uuid}`))
  }
}

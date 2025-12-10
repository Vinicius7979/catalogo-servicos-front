import axios from 'axios'
import { useApiStore } from '@/stores/api'

export const ArmazenamentoService = {
  listar() {
    const { getUrl } = useApiStore()
    return axios.get(getUrl('/armazenamentos'))
  },
  deletar(uuid: string) {
    const { getUrl } = useApiStore()
    return axios.delete(getUrl(`/armazenamentos/${uuid}`))
  }
}

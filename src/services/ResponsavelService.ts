import axios from 'axios'
import { useApiStore } from '@/stores/api'

export const ResponsavelService = {
  listar() {
    const { getUrl } = useApiStore()
    return axios.get(getUrl('/responsavel'))
  },
  deletar(uuid: string) {
    const { getUrl } = useApiStore()
    return axios.delete(getUrl(`/responsavel/${uuid}`))
  }
}

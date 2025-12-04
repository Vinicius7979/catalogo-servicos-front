import axios from 'axios'
import { useApiStore } from '@/stores/api'

export const SegmentoService = {
  listar() {
    const { getUrl } = useApiStore()
    return axios.get(getUrl('/segmentos'))
  },
  salvar(dados: object) {
    const { getUrl } = useApiStore()
    return axios.post(getUrl('/segmentos'), dados)
  },
  buscarPorUuid(uuid: string) {
    const { getUrl } = useApiStore()
    return axios.get(getUrl(`/segmentos/${uuid}`))
  },
  atualizar(uuid: string, dados: object) {
    const { getUrl } = useApiStore()
    return axios.put(getUrl(`/segmentos/${uuid}`), dados)
  },
  deletar(uuid: string) {
    const { getUrl } = useApiStore()
    return axios.delete(getUrl(`/segmentos/${uuid}`))
  }
}

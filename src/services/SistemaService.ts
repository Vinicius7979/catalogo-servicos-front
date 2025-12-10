import axios from 'axios'
import { useApiStore } from '@/stores/api'

export const SistemaService = {
  listar() {
    const { getUrl } = useApiStore()
    return axios.get(getUrl('/sistemas'))
  },
  salvar(dados: object) {
    const { getUrl } = useApiStore()
    return axios.post(getUrl('/sistemas'), dados)
  },
  buscarPorUuid(uuid: string) {
    const { getUrl } = useApiStore()
    return axios.get(getUrl(`/sistemas/${uuid}`))
  },
  atualizar(uuid: string, dados: object) {
    const { getUrl } = useApiStore()
    return axios.put(getUrl(`/sistemas/${uuid}`), dados)
  },
  deletar(uuid: string) {
    const { getUrl } = useApiStore()
    return axios.delete(getUrl(`/sistemas/${uuid}`))
  }
}

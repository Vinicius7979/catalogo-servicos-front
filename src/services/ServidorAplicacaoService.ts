import axios from 'axios'
import { useApiStore } from '@/stores/api'

export const ServidorAplicacaoService = {
  listar() {
    const { getUrl } = useApiStore()
    return axios.get(getUrl('/servidores'))
  },
  salvar(dados: object) {
    const { getUrl } = useApiStore()
    return axios.post(getUrl('/servidores'), dados)
  },
  buscarPorUuid(uuid: string) {
    const { getUrl } = useApiStore()
    return axios.get(getUrl(`/servidores/${uuid}`))
  },
  atualizar(uuid: string, dados: object) {
    const { getUrl } = useApiStore()
    return axios.put(getUrl(`/servidores/${uuid}`), dados)
  },
  deletar(uuid: string) {
    const { getUrl } = useApiStore()
    return axios.delete(getUrl(`/servidores/${uuid}`))
  }
}

import axios from 'axios'
import { useApiStore } from '@/stores/api'

export const SetorService = {
  listar() {
    const { getUrl } = useApiStore()
    return axios.get(getUrl('/setores'))
  },
  salvar(dados: object) {
    const { getUrl } = useApiStore()
    return axios.post(getUrl('/setores'), dados)
  },
  buscarPorUuid(uuid: string) {
    const { getUrl } = useApiStore()
    return axios.get(getUrl(`/setores/${uuid}`))
  },
  atualizar(uuid: string, dados: object) {
    const { getUrl } = useApiStore()
    return axios.put(getUrl(`/setores/${uuid}`), dados)
  },
  deletar(uuid: string) {
    const { getUrl } = useApiStore()
    return axios.delete(getUrl(`/setores/${uuid}`))
  }
}

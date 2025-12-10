import axios from 'axios'
import { useApiStore } from '@/stores/api'

export const SistemaService = {
  listar() {
    const { getUrl } = useApiStore()
    return axios.get(getUrl('/linguagens'))
  },
  salvar(dados: object) {
    const { getUrl } = useApiStore()
    return axios.post(getUrl('/linguagens'), dados)
  },
  buscarPorUuid(uuid: string) {
    const { getUrl } = useApiStore()
    return axios.get(getUrl(`/linguagens/${uuid}`))
  },
  atualizar(uuid: string, dados: object) {
    const { getUrl } = useApiStore()
    return axios.put(getUrl(`/linguagens/${uuid}`), dados)
  },
  deletar(uuid: string) {
    const { getUrl } = useApiStore()
    return axios.delete(getUrl(`/linguagens/${uuid}`))
  }
}

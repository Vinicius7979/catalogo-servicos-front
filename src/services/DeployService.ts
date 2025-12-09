import axios from 'axios'
import { useApiStore } from '@/stores/api'

export const DeployService = {
  listar() {
    const { getUrl } = useApiStore()
    return axios.get(getUrl('/deploy'))
  },
  salvar(dados: object) {
    const { getUrl } = useApiStore()
    return axios.post(getUrl('/deploy'), dados)
  },
  buscarPorUuid(uuid: string) {
    const { getUrl } = useApiStore()
    return axios.get(getUrl(`/deploy/${uuid}`))
  },
  atualizar(uuid: string, dados: object) {
    const { getUrl } = useApiStore()
    return axios.put(getUrl(`/deploy/${uuid}`), dados)
  },
  deletar(uuid: string) {
    const { getUrl } = useApiStore()
    return axios.delete(getUrl(`/deploy/${uuid}`))
  }
}

import axios from 'axios'
import { useApiStore } from '@/stores/api'

export const AreaDeNegocioService = {
  listar() {
    const { getUrl } = useApiStore()
    return axios.get(getUrl('/areaDeNegocio'))
  },
  salvar(dados: object) {
    const { getUrl } = useApiStore()
    return axios.post(getUrl('/areaDeNegocio'), dados)
  },
  buscarPorUuid(uuid: string) {
    const { getUrl } = useApiStore()
    return axios.get(getUrl(`/areaDeNegocio/${uuid}`))
  },
  atualizar(uuid: string, dados: object) {
    const { getUrl } = useApiStore()
    return axios.put(getUrl(`/areaDeNegocio/${uuid}`), dados)
  },
  deletar(uuid: string) {
    const { getUrl } = useApiStore()
    return axios.delete(getUrl(`/areaDeNegocio/${uuid}`))
  }
}

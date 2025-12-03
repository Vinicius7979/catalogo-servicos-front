import axios from 'axios'
import { useApiStore } from '@/stores/api'

export const BancoDeDadosService = {
  listar() {
    const { getUrl } = useApiStore()
    return axios.get(getUrl('/bancoDeDados'))
  },
  salvar(dados: object) {
    const { getUrl } = useApiStore()
    return axios.post(getUrl('/bancoDeDados'), dados)
  },
  buscarPorUuid(uuid: string) {
    const { getUrl } = useApiStore()
    return axios.get(getUrl(`/bancoDeDados/${uuid}`))
  },
  atualizar(uuid: string, dados: object) {
    const { getUrl } = useApiStore()
    return axios.put(getUrl(`/bancoDeDados/${uuid}`), dados)
  },
  deletar(uuid: string) {
    const { getUrl } = useApiStore()
    return axios.delete(getUrl(`/bancoDeDados/${uuid}`))
  }
}

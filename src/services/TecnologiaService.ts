import axios from "axios";
import { useApiStore } from "@/stores/api";

export const TecnologiaService = {
  listar() {
    const { getUrl } = useApiStore()
    return axios.get(getUrl('/tecnologias'))
  },
  salvar(dados: object) {
    const { getUrl } = useApiStore()
    return axios.post(getUrl('/tecnologias'), dados)
  },
  buscarPorUuid(uuid: string) {
    const { getUrl } = useApiStore()
    return axios.get(getUrl(`/tecnologias/${uuid}`))
  },
  atualizar(uuid: string, dados: object) {
    const { getUrl } = useApiStore()
    return axios.put(getUrl(`/tecnologias/${uuid}`), dados)
  },
  deletar(uuid: string) {
    const { getUrl } = useApiStore()
    return axios.delete(getUrl(`/tecnologias/${uuid}`))
  }
}

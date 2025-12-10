export interface Modulo {
    uuid: string;
    descricao: string;
    documentacaoUrl: string
    url: string;
    porta: number;
    gitUrl: string;
    // List<ListaArmazenamentoDTO> listaArmazenamento // lista de objeto
    tipoTecnologia: string;  //enum
    tecnologiaUuid: string;
    ativo: boolean;
}
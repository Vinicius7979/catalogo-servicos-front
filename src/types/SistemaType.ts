export interface Sistema {
    uuid: string;
    descricao: string;
    versao: string;
    sigla: string;
    url: string;
    status: string; // enum
    autenticacao: string; // enum
    segmentoUuid: string;
    setorUuid: string;
    areaDeNegocioUuid: string;
    // responsavel: Responsavel; // objeto que cria
    ativo: boolean;
    // modulo: List<Modulo> // lista de objeto chamado modulo
}
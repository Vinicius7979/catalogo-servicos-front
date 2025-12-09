export interface ServidorAplicacao {
    uuid: string;
    descricao: string;
    versao: string;
    ip: string;
    ambiente: string;
    tipoServidor: string;
    orquestrador: string;
    url: string;
    porta: number;
    ipProxy: string;
    hostName: string;
    distribuicao: string;
    ativo: boolean;
}
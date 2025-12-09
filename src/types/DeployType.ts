export interface Deploy {
    uuid: string;
    versao: string;
    hash: string;
    plataforma: string;
    tipoPipeline: string;
    servidorAplicacaoUuid: string;
    moduloUuid: string;
    ativo: boolean;
}
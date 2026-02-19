import type { Armazenamento } from '@/types/ArmazenamentoType'

export interface Modulo {
    uuid: string;
    descricao: string;
    documentacaoUrl: string
    url: string;
    porta: number;
    gitUrl: string;
    armazenamento: string[]; // lista de objeto
    tipoTecnologia: string;  //enum
    tecnologiaUuid: string;
    ativo: boolean;
}
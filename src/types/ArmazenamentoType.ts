export interface Armazenamento {
    uuid: string;
    schema: string;
    dblink: boolean;
    bancoDeDadosUuid: string;
    ativo: boolean;
}
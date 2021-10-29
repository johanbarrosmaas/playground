
interface ICidade {
    nome: string;
    uf: string;
    ibgecod: string;
}

interface IEndereco {
    logradouro: string;
    complemento: string;
    cep: string;
    cidade: ICidade; 
}

/**
 * Busca cidade pelo CEP
 * @param cep 
 */
export function cidade(cep: string): ICidade;

/**
 * Busca cidade pelo UF e nome
 * @param uf
 * @param nome Nome da cidade buscada
 */
export function cidade(uf: string, nome?: string): ICidade {
    return {} as ICidade;
}

export function endereco(cep: string): IEndereco {
    return {} as IEndereco;
}

export default { cidade, endereco }
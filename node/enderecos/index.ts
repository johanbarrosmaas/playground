import fetch from "node-fetch";

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

function onlydigit(text: string) {
    if (text == null) throw new Error('Necessário informar um CEP válido');
    return text.replace(/\D/g, '');
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

async function enderecoViacep(cep: string) {         
    const cepdigit = onlydigit(cep);
    if (cep.length < 8) throw new Error('Cep precisa conter 8 dígitos');

    const viacep = await fetch(`https://viacep.com.br/ws/${cepdigit}/json`);

    if (viacep) {
        if (viacep.ok) {
            const { cep, logradouro, complemento, localidade: nome, uf, ibge: ibgecod }: any = await viacep.json();

            return {
                cep,
                logradouro,
                complemento,
                cidade: {
                    uf,
                    nome,
                    ibgecod
                }
            };
        } else {
            return Promise.reject(await viacep.json());
        }
    } else {
        return Promise.reject('Não foi possível acessar a api do Viacep');
    }
}

async function enderecoPostmon(cep: string) {
    const cepdigit = onlydigit(cep);
    if (cep.length < 8) throw new Error('Cep precisa conter 8 dígitos');

    const postmon = await fetch(`https://api.postmon.com.br/v1/cep/${cepdigit}`);

    if (postmon) {
        if (postmon.ok) {
            const { cep, logradouro }: any = await postmon.json();
            /**
             * Desestruturar conforme o objeto de retorno do postmon
             * {
                "bairro": "Taguatinga Norte (Taguatinga)",
                "cidade": "Brasília",
                "logradouro": "CNA 3",
                "estado_info": {
                    "area_km2": "5.779,999",
                    "codigo_ibge": "53",
                    "nome": "Distrito Federal"
                },
                "cep": "72110035",
                "cidade_info": {
                    "area_km2": "5779,999",
                    "codigo_ibge": "5300108"
                },
                "estado": "DF"
            }
            */
            return { cep, logradouro } as IEndereco;
        } else {
            return Promise.reject(await postmon.json());
        }
    } else {
        return Promise.reject('Não foi possível acessar a api do Postmon');
    }
}

export async function endereco(cep: string): Promise<IEndereco> {
    try {
        const cepdigit = onlydigit(cep);
        if (cep.length < 8) throw new Error('Cep precisa conter 8 dígitos');
    
        const postmon = enderecoPostmon(cep).catch();
        const viacep = enderecoViacep(cep).catch();
    
        // Promise race retorna a primeira promisse que resolver 
        return await Promise.race([postmon, viacep]);
    } catch (reason) {
        return Promise.reject(reason);
    }
}

export default { cidade, endereco }


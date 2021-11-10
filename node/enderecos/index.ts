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
export async function cidadeByCep(cep: string): Promise<ICidade> {
    const data = await endereco(cep)
    const nome = data.cidade.nome;
    const uf = data.cidade.uf;
    if (data) {
        return cidadeByName(nome, uf)
    } else {
        return Promise.reject('Não foi possível acessar as api do viacep e Postmon');
    }
};

/**
 * Busca cidade por UF e nome
 * @param uf
 * @param nome 
 */
export async function cidadeByName(uf: string, nome: string): Promise<ICidade> {
    var ibgeCodNew: any;

    if (uf == null) throw new Error("Necessário informar um estado!");
    if (nome == null) throw new Error("Necessário informar uma cidade!");

    var ibge = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);

    if (ibge) {
        if (ibge.ok) {
            const dado = await ibge.json();

            for (var i = 0; i < dado.length; i++) {
                if (dado[i].nome == nome) {
                    ibgeCodNew = dado[i].id;
                }
            };
            return {
                uf: uf,
                nome: nome,
                ibgecod: ibgeCodNew
            }
        } else {
            return Promise.reject(await ibge.json());
        }
    } else {
        return Promise.reject('Não foi possível acessar a api do IBGE ');
    }
}

async function enderecoViacep(cep: string): Promise<IEndereco> {
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
            const { cep, logradouro, complemento, cidade: nome, estado: uf, cidade_info: { codigo_ibge: ibgecod } }: any = await postmon.json();

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
        return await Promise.race([postmon, viacep]).catch(reason => {
            return {} as IEndereco;
        });
    } catch (reason) {
        return Promise.reject(reason);
    }
}

export default { cidadeByCep, cidadeByName, endereco }





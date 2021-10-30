
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
    this.local = {}
    //variável "cep" somente com dígitos
    cep.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {
             fetch('https://viacep.com.br/ws/' + cep + '/json')
            .then(response => response.json())
            .then(data => {
                this.local = {
                    cep: data.cep,
                    logradouro: data.logradouro,
                    complemento: data.complemento,
                    cidade: {
                        nome: data.localidade,
                        uf: data.uf,
                        ibgecod: data.ibge
                    }
                }

            }).catch((erro) => {
                this.local = {};
                return;
            });
    };
    return this.local as IEndereco;
}

export default { cidade, endereco }


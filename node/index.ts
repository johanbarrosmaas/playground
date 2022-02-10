////import { endereco, cidadeByCep } from "./enderecos";

import { verificaDoc, removeMascara,mascaraCnpj,mascaraCpf} from "./cnpj-cpf";




//endereco('89051-300').then(endereco => {
   // console.log(`Cidade retornada:`, [endereco.cidade]);
//});

//console.log(cidadeByCep('Blumenau'));

console.log( verificaDoc('123456789012349'));

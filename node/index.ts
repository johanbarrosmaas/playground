import { endereco, cidadeByCep } from "./enderecos";



endereco('89051-300').then(endereco => {
    console.log(`Cidade retornada:`, [endereco.cidade]);
});

console.log(cidadeByCep('Blumenau'));

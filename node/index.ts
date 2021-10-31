import { endereco } from "./enderecos";

endereco('89051300').then(endereco => {
    console.log(`Cidade retornada:`, [endereco.cidade]);
});

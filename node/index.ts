import { endereco, cidadeByCep, cidadeByName } from "./enderecos";



//endereco('89051-300').then(endereco => {
//console.log(`Cidade retornada:`, [endereco.cidade]);
//});

cidadeByCep('89051-300').then(x =>{
    console.log(x )

});
cidadeByName('sc', 'Florianópolis').then(x =>{
   // console.log(x)

});

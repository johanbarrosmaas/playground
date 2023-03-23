

function onlydigit(text: string) {
  const doc: any = text.replace(/\D/g, "");  
  return doc;
}

/**
 * Verifica cpf 
 * @param cpfDoc 
 */
 function verificaCpf(cpfDoc: any) {
  const cpf = cpfDoc;
  var soma = 0;
  var resto;
  for (let i = 1; i <= 9; i++)
    soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
  if (resto != parseInt(cpf.substring(9, 10))) return false;
     soma = 0;
  for (let i = 1; i <= 10; i++)
     soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
     resto = (soma * 10) % 11;
   if (resto == 10 || resto == 11) resto = 0;
   if (resto != parseInt(cpf.substring(10, 11) ) )  return false;
   
   return  true;
}

/**
 * Verifica cnpj 
 * @param cnpjDoc 
 */
function verificaCnpj(cnpjDoc: any) {
  const cnpj = cnpjDoc;
  if (cnpj) {
    var tamanho = cnpj.length - 2;
    var numeros = cnpj.substring(0, tamanho);
    var digitos = cnpj.substring(tamanho);
    var soma = 0;
    var pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    var resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(0)) {
      return false;
    }
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let k = tamanho; k >= 1; k--) {
      soma += numeros.charAt(tamanho - k) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(1)) {
      return false;
    }
  }
  return  true;
}
/**
 * Válida cpf
 * @param cpf
 */
function validaCpf(cpf: string) {
  
  if (cpf.length !== 11) throw new Error("Cpf precisa conter 11 dígitos");
  if (   
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999"
    )
    return false;

  return verificaCpf(cpf);
}

/**
 * Válida cnpj
 * @param cnpj 
 */
function validaCnpj(cnpj: string) {
  if (cnpj.length !== 14) throw new Error("CNPJ precisa conter 14 dígitos");
  if (
    cnpj == "00000000000000" ||
    cnpj == "11111111111111" ||
    cnpj == "22222222222222" ||
    cnpj == "33333333333333" ||
    cnpj == "44444444444444" ||
    cnpj == "55555555555555" ||
    cnpj == "66666666666666" ||
    cnpj == "77777777777777" ||
    cnpj == "88888888888888" ||
    cnpj == "99999999999999"
  )
    return false;

  return verificaCnpj(cnpj);
}

/**
 * Verifica documento
 * @param texto
 */
 export function verificaDoc(texto: string) {
 
   const doc: any =   onlydigit(texto);  
  if ((doc == null) || (doc == "") || (doc == undefined))throw new Error('Necessário informar um documento válido CPf ou CNPJ');
    if (doc.length === 14) {   
    return validaCnpj(doc);  };
  if (doc.length == 11) {    
    return validaCpf(doc);
  };
  if (( doc.length !== 11)||( doc.length !== 14)) throw new Error('CPF com 11 digitos numéricos ou CNPJ com 14 digitos numéricos !');
  return  false;
}

/**
 * Adiciona mascara no cpf
 * @param texto 
 */
export function mascaraCpf(texto:any) { 

  if(verificaDoc(texto)){
   return  texto.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4"); 
  }
  return false;
}

/**
 * Adiciona mascara no cnpj
 * @param texto 
 */
export function mascaraCnpj(texto:any) {

  if(verificaDoc(texto)){
    return texto.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5");
  }
  return false;
}

/**
 * Renove mascara do documento
 * @param texto 
 */
export function removeMascara(texto: any) { 

  if(verificaDoc(texto)){
    return texto.replace(/\D/g, "");
  }
   return false; 
}

export default { verificaDoc,mascaraCpf,removeMascara,mascaraCnpj }

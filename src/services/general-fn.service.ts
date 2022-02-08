import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {generate} from 'generate-password';
const CryptoJS = require('crypto-js');
@injectable({scope: BindingScope.TRANSIENT})
export class GeneralFnService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Add service methods here
   */
  generarPassword(): string {
    let pass = generate({
      length: 10,
      numbers: true,
      uppercase: true,
      lowercase: true
    });
    return pass;
  }
  cifrarTexto(texto: string): string {
    //Se encripta la clave con base en la llave que esta en config/keys.ts
    //let ciphertext = CryptoJS.AES.encrypt(texto, Llaves.EASKey).toString();
    let ciphertext = CryptoJS.MD5(texto);

    return ciphertext;

  }
}

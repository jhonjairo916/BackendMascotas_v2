import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Keys as llaves} from '../config/keys';
import {Usuario} from '../models';
var jwt = require("jsonwebtoken");
@injectable({scope: BindingScope.TRANSIENT})
export class JwtService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Service to create token with jsonwebtoken
   */
  CreateJwtoken(usuario: Usuario) {
    let claveSecreta = llaves.KeyToken;
    let tk = jwt.sign({
      exp: llaves.ExpTimeJWT,
      data: {
        id_user: usuario.id,
        name_user: usuario.username,
        rol_user: usuario.rolId
      }
    }, claveSecreta)
    return tk;
  }


}

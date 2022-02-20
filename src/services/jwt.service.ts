import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Keys as llaves} from '../config/keys';
import {Usuario} from '../models';
var jwt = require("jsonwebtoken");
@injectable({scope: BindingScope.TRANSIENT})
export class JwtService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Service to create token with jsonwebtoken and verify it with parse-bearer-token
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
  VerifyToken(token: string) {
    try {
      let decode = jwt.verify(token, llaves.KeyToken);
      return decode;
    } catch {
      return null;
    }
    /**if (decode) {
      return decode;
    }
    else {
      throw new HttpErrors[401]("Failed the verification of the token");
    }*/
  }


}

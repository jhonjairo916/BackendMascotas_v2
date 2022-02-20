import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {JwtService} from '../services';
/**
 * Package
 * npm i @loopback/authentication
 * npm install --save parse-bearer-token
 * npm i @loopback/security /Used to invoke the UserProfile/
 */

export class PersonaStrategy implements AuthenticationStrategy {
  name: string = 'persona';
  constructor(@service(JwtService)
  public jwtService: JwtService) {

  }
  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token = parseBearerToken(request);
    //If token doesnt exist
    if (!token) {
      throw new HttpErrors[401]("There is not token in the request");
    }
    let info = this.jwtService.VerifyToken(token);
    if (info) {
      //Se verifica si el rol de usuario es de administrador
      if (info.data.rol_user == "61f959bfaa4e5c7669765887") {
        let profile: UserProfile = Object.assign({
          id: info.data.id_user,
          name: info.data.name_user,
          rol: info.data.rol_user
        });
        return profile;
      }
      else {
        throw new HttpErrors[401]("The token sent is correct, but you don`t have permissions to execute this action ");
      }
    }
    else {
      throw new HttpErrors[401]("The token sent is not valid");
    }

  }
}

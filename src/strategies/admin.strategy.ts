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

export class AdminStrategy implements AuthenticationStrategy {
  name: string = 'admin';
  constructor(@service(JwtService)
  public jwtService: JwtService) {

  }
  async authenticate(request: Request): Promise<UserProfile | undefined> {
      console.log('This is the request'+request)
    try{
      const token = parseBearerToken(request);
      if (!token) {
        throw new HttpErrors[401]("There is not token in the request");
      }
      let info = this.jwtService.VerifyToken(token);
      console.log('Este es el info->'+info);
      if (info) {
        //Se verifica si el rol de usuario es de administrador

        if (info.data.rol_user == "61f3735e34c695141c9c7d8e") {
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
    }catch(error){
      console.log(+error.name)
    }

    //If token doesnt exist
    //console.log('Este es el token->'+token)


  }
}

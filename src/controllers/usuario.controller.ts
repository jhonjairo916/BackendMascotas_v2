import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Keys as llaves} from '../config/keys';
import {Credenciales, Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
import {GeneralFnService, JwtService, NotificationService} from '../services';

export class UsuarioController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
    @service(GeneralFnService)
    public fnService: GeneralFnService,
    @service(NotificationService)
    public notifyService: NotificationService,
    @service(JwtService)
    public jwtService: JwtService
  ) { }

  @post('/usuarios')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuario',
            exclude: ['id', 'clave'],
          }),
        },
      },
    })
    usuario: Omit<Usuario, 'id'>,
  ): Promise<Usuario> {
    let claveAleatoria = this.fnService.generarPassword();
    console.log(claveAleatoria);
    let claveCifrada = this.fnService.cifrarTexto(claveAleatoria);
    console.log(claveCifrada);
    usuario.clave = claveCifrada;
    /**
     * at this point the user is notified of his registration via email with sendgrid
     */
    let content = `<strong>Su usuario: ${usuario.username} have been registered succesfully</strong></ br>
    <ul>
      <li>Usuario: ${usuario.username}</li>
      <li>Clave: ${claveAleatoria}</li>
    </ul>
    <strong><a href="">mascotas.com<a><strong></br>
    Consigue lo que deseas para tu mascota, y pagalo como quieras
    `;
    let subject = 'User registration';
    this.notifyService.SendEmail(usuario.username, llaves.UserRegisterSubject, content);

    let usuarioAgregado = await this.usuarioRepository.create(usuario);
    return usuarioAgregado;
  }
  @post('identificar', {
    responses: {
      '200': {
        description: 'Identificacion de usuario'
      }
    }

  })
  async identificar(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credenciales),
        },
      },
    }) credenciales: Credenciales
  ): Promise<object> {
    let usuario = await this.usuarioRepository.findOne({where: {username: credenciales.name_user, clave: credenciales.pass_user}});
    if (usuario) {
      let tk = this.jwtService.CreateJwtoken(usuario);
      usuario.clave = '';
      return {
        user: usuario,
        token: tk
      }
    } else {
      throw new HttpErrors[401]("User or password incorrect.");
    }
  }
  @get('/usuarios/count')
  @response(200, {
    description: 'Usuario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.count(where);
  }

  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuario) filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.usuarioRepository.find(filter);
  }

  @patch('/usuarios')
  @response(200, {
    description: 'Usuario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.usuarioRepository.updateAll(usuario, where);
  }

  @get('/usuarios/{id}')
  @response(200, {
    description: 'Usuario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Usuario, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuario>
  ): Promise<Usuario> {
    return this.usuarioRepository.findById(id, filter);
  }

  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.updateById(id, usuario);
  }

  @put('/usuarios/{id}')
  @response(204, {
    description: 'Usuario PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuario: Usuario,
  ): Promise<void> {
    await this.usuarioRepository.replaceById(id, usuario);
  }

  @del('/usuarios/{id}')
  @response(204, {
    description: 'Usuario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuarioRepository.deleteById(id);
  }
}

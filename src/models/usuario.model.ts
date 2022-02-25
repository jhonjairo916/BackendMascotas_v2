import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Rol} from './rol.model';

@model()
export class Usuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  username: string;//*Must be an email*

  @property({
    type: 'string',
  })
  clave?: string;

  @property({
    type: 'number',
    required: false,
  })
  idPersona?: number;

  @property({
    type: 'string',
    required: true
  })
  telefono: string;

  @belongsTo(() => Rol)
  rolId: string;

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;

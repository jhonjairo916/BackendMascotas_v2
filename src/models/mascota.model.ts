import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {SolicitudAdopcion} from '.';
import {Ciudad} from './ciudad.model';
import {HistoriaMedica} from './historia-medica.model';
import {Raza} from './raza.model';
import {Vacuna} from './vacuna.model';
import {VacunasMascota} from './vacunas-mascota.model';

@model({
  settings: {
    foreignKeys: {
      fk_razas_mascotas_id: {
        name: 'fk_razas_mascotas_id',
        entity: 'Raza',
        entityKey: 'id',
        foreignKey: 'razaId',
      },
      fk_ciudad_mascotas_id: {
        name: 'fk_ciudad_mascotas_id',
        entity: 'Ciudad',
        entityKey: 'id',
        foreignKey: 'ciudadId',
      },
    },
  },
})

export class Mascota extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  identificador: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  fecha_nacimiento: string;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @property({
    type: 'string',
  })
  imagen?: string;

  @belongsTo(() => Raza)
  razaId: number;

  @hasMany(() => HistoriaMedica)
  historiaMedicas: HistoriaMedica[];

  @hasMany(() => SolicitudAdopcion)
  solicitudAdopciones: SolicitudAdopcion[];

  @belongsTo(() => Ciudad)
  ciudadId: number;

  @hasMany(() => Vacuna, {through: {model: () => VacunasMascota}})
  vacunas: Vacuna[];

  constructor(data?: Partial<Mascota>) {
    super(data);
  }
}

export interface MascotaRelations {
  // describe navigational properties here
}

export type MascotaWithRelations = Mascota & MascotaRelations;

import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Mascota} from './mascota.model';

@model({
  settings: {
    foreignKeys: {
      fk_mascota_id_solicitudAdopcion: {
        name: 'fk_mascota_id_solicitudAdopcion',
        entity: 'Mascota',
        entityKey: 'id',
        foreignKey: 'mascotaId',
      },
    },
  },
})

export class SolicitudAdopcion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => Mascota)
  mascotaId: number;

  constructor(data?: Partial<SolicitudAdopcion>) {
    super(data);
  }
}

export interface SolicitudAdopcionRelations {
  // describe navigational properties here
}

export type SolicitudAdopcionWithRelations = SolicitudAdopcion & SolicitudAdopcionRelations;

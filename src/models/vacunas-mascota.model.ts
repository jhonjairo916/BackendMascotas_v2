import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_mascota_id_vacunaMascota: {
        name: 'fk_mascota_id_vacunaMascota',
        entity: 'Mascota',
        entityKey: 'id',
        foreignKey: 'mascotaId',
      },
      fk_vacuna_id_vacunaMascota: {
        name: 'fk_vacuna_id_vacunaMascota',
        entity: 'Vacuna',
        entityKey: 'id',
        foreignKey: 'vacunaId',
      },
    },
  },
})
export class VacunasMascota extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  mascotaId?: number;

  @property({
    type: 'number',
  })
  vacunaId?: number;

  constructor(data?: Partial<VacunasMascota>) {
    super(data);
  }
}

export interface VacunasMascotaRelations {
  // describe navigational properties here
}

export type VacunasMascotaWithRelations = VacunasMascota & VacunasMascotaRelations;

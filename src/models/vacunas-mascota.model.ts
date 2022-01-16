import {Entity, model, property} from '@loopback/repository';

@model()
export class VacunasMascota extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;


  constructor(data?: Partial<VacunasMascota>) {
    super(data);
  }
}

export interface VacunasMascotaRelations {
  // describe navigational properties here
}

export type VacunasMascotaWithRelations = VacunasMascota & VacunasMascotaRelations;

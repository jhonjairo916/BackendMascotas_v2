import {Model, model, property} from '@loopback/repository';

@model()
export class ResetearPassword extends Model {
  @property({
    type: 'string',
    required: true,
  })
  correo: string;


  constructor(data?: Partial<ResetearPassword>) {
    super(data);
  }
}

export interface ResetearPasswordRelations {
  // describe navigational properties here
}

export type ResetearPasswordWithRelations = ResetearPassword & ResetearPasswordRelations;

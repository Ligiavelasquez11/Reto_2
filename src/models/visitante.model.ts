import {Entity, model, property, hasOne} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';

@model()
export class Visitante extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  numApto?: string;

  @hasOne(() => Vehiculo)
  vehiculo: Vehiculo;

  constructor(data?: Partial<Visitante>) {
    super(data);
  }
}

export interface VisitanteRelations {
  // describe navigational properties here
}

export type VisitanteWithRelations = Visitante & VisitanteRelations;

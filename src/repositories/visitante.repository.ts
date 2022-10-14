import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Visitante, VisitanteRelations, Vehiculo} from '../models';
import {VehiculoRepository} from './vehiculo.repository';

export class VisitanteRepository extends DefaultCrudRepository<
  Visitante,
  typeof Visitante.prototype.numApto,
  VisitanteRelations
> {

  public readonly vehiculo: HasOneRepositoryFactory<Vehiculo, typeof Visitante.prototype.numApto>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Visitante, dataSource);
    this.vehiculo = this.createHasOneRepositoryFactoryFor('vehiculo', vehiculoRepositoryGetter);
  }
}

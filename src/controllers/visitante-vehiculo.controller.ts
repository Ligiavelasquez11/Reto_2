import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Visitante,
  Vehiculo,
} from '../models';
import {VisitanteRepository} from '../repositories';

export class VisitanteVehiculoController {
  constructor(
    @repository(VisitanteRepository) protected visitanteRepository: VisitanteRepository,
  ) { }

  @get('/visitantes/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Visitante has one Vehiculo',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Vehiculo),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Vehiculo>,
  ): Promise<Vehiculo> {
    return this.visitanteRepository.vehiculo(id).get(filter);
  }

  @post('/visitantes/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Visitante model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Visitante.prototype.numApto,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {
            title: 'NewVehiculoInVisitante',
            exclude: ['tipo_modelo'],
            optional: ['visitanteId']
          }),
        },
      },
    }) vehiculo: Omit<Vehiculo, 'tipo_modelo'>,
  ): Promise<Vehiculo> {
    return this.visitanteRepository.vehiculo(id).create(vehiculo);
  }

  @patch('/visitantes/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Visitante.Vehiculo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {partial: true}),
        },
      },
    })
    vehiculo: Partial<Vehiculo>,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.visitanteRepository.vehiculo(id).patch(vehiculo, where);
  }

  @del('/visitantes/{id}/vehiculo', {
    responses: {
      '200': {
        description: 'Visitante.Vehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.visitanteRepository.vehiculo(id).delete(where);
  }
}

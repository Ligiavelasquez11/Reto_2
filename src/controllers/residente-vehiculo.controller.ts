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
  Residente,
  Vehiculo,
} from '../models';
import {ResidenteRepository} from '../repositories';

export class ResidenteVehiculoController {
  constructor(
    @repository(ResidenteRepository) protected residenteRepository: ResidenteRepository,
  ) { }

  @get('/residentes/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Array of Residente has many Vehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Vehiculo>,
  ): Promise<Vehiculo[]> {
    return this.residenteRepository.vehiculos(id).find(filter);
  }

  @post('/residentes/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Residente model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Residente.prototype.numApto,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculo, {
            title: 'NewVehiculoInResidente',
            exclude: ['tipo_modelo'],
            optional: ['residenteId']
          }),
        },
      },
    }) vehiculo: Omit<Vehiculo, 'tipo_modelo'>,
  ): Promise<Vehiculo> {
    return this.residenteRepository.vehiculos(id).create(vehiculo);
  }

  @patch('/residentes/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Residente.Vehiculo PATCH success count',
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
    return this.residenteRepository.vehiculos(id).patch(vehiculo, where);
  }

  @del('/residentes/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Residente.Vehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vehiculo)) where?: Where<Vehiculo>,
  ): Promise<Count> {
    return this.residenteRepository.vehiculos(id).delete(where);
  }
}

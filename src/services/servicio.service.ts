import {injectable, /* inject, */ BindingScope} from '@loopback/core';

@injectable({scope: BindingScope.TRANSIENT})
export class ServicioService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */
}

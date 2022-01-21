import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {SolicitudAdopcion, SolicitudAdopcionRelations, Mascota} from '../models';
import {MascotaRepository} from './mascota.repository';

export class SolicitudAdopcionRepository extends DefaultCrudRepository<
  SolicitudAdopcion,
  typeof SolicitudAdopcion.prototype.id,
  SolicitudAdopcionRelations
> {

  public readonly mascota: BelongsToAccessor<Mascota, typeof SolicitudAdopcion.prototype.id>;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(SolicitudAdopcion, dataSource);
    this.mascota = this.createBelongsToAccessorFor('mascota', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascota', this.mascota.inclusionResolver);
  }
}

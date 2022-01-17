import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {VacunasMascota, VacunasMascotaRelations} from '../models';

export class VacunasMascotaRepository extends DefaultCrudRepository<
  VacunasMascota,
  typeof VacunasMascota.prototype.id,
  VacunasMascotaRelations
> {
  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource,
  ) {
    super(VacunasMascota, dataSource);
  }
}

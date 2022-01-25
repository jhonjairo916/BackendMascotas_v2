import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqldsDataSource} from '../datasources';
import {Mascota, MascotaRelations, Raza, HistoriaMedica, Ciudad, SolicitudAdopcion, Vacuna, VacunasMascota} from '../models';
import {RazaRepository} from './raza.repository';
import {HistoriaMedicaRepository} from './historia-medica.repository';
import {CiudadRepository} from './ciudad.repository';
import {SolicitudAdopcionRepository} from './solicitud-adopcion.repository';
import {VacunasMascotaRepository} from './vacunas-mascota.repository';
import {VacunaRepository} from './vacuna.repository';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.id,
  MascotaRelations
> {

  public readonly raza: BelongsToAccessor<Raza, typeof Mascota.prototype.id>;

  public readonly historiaMedicas: HasManyRepositoryFactory<HistoriaMedica, typeof Mascota.prototype.id>;

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Mascota.prototype.id>;

  public readonly solicitudAdopciones: HasManyRepositoryFactory<SolicitudAdopcion, typeof Mascota.prototype.id>;

  public readonly vacunas: HasManyThroughRepositoryFactory<Vacuna, typeof Vacuna.prototype.id,
          VacunasMascota,
          typeof Mascota.prototype.id
        >;

  constructor(
    @inject('datasources.mysqlds') dataSource: MysqldsDataSource, @repository.getter('RazaRepository') protected razaRepositoryGetter: Getter<RazaRepository>, @repository.getter('HistoriaMedicaRepository') protected historiaMedicaRepositoryGetter: Getter<HistoriaMedicaRepository>, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('SolicitudAdopcionRepository') protected solicitudAdopcionRepositoryGetter: Getter<SolicitudAdopcionRepository>, @repository.getter('VacunasMascotaRepository') protected vacunasMascotaRepositoryGetter: Getter<VacunasMascotaRepository>, @repository.getter('VacunaRepository') protected vacunaRepositoryGetter: Getter<VacunaRepository>,
  ) {
    super(Mascota, dataSource);
    this.vacunas = this.createHasManyThroughRepositoryFactoryFor('vacunas', vacunaRepositoryGetter, vacunasMascotaRepositoryGetter,);
    this.registerInclusionResolver('vacunas', this.vacunas.inclusionResolver);
    this.solicitudAdopciones = this.createHasManyRepositoryFactoryFor('solicitudAdopciones', solicitudAdopcionRepositoryGetter,);
    this.registerInclusionResolver('solicitudAdopciones', this.solicitudAdopciones.inclusionResolver);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
    this.historiaMedicas = this.createHasManyRepositoryFactoryFor('historiaMedicas', historiaMedicaRepositoryGetter,);
    this.registerInclusionResolver('historiaMedicas', this.historiaMedicas.inclusionResolver);
    this.raza = this.createBelongsToAccessorFor('raza', razaRepositoryGetter,);
    this.registerInclusionResolver('raza', this.raza.inclusionResolver);
  }
}

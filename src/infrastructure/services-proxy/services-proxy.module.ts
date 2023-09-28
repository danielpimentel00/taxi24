import { DynamicModule, Module } from "@nestjs/common";
import { ConductorRepository } from "../repositories/conductor.repository";
import { ConductorService } from "src/application/services/conductor.service";
import { RepositoriesModule } from "../repositories/repositories.module";
import { PasajeroService } from "src/application/services/pasajero.service";
import { PasajeroRepository } from "../repositories/pasajero.repository";
import { ViajeRepository } from "../repositories/viaje.repository";
import { ViajeService } from "src/application/services/viaje.service";
import { FacturaRepository } from "../repositories/factura.repository";

@Module({
  imports: [RepositoriesModule],
})
export class ServicesProxyModule {
  static CONDUCTOR_SERVICE = "ConductorService";
  static PASAJERO_SERVICE = "PasajeroService";
  static VIAJE_SERVICE = "ViajeService";

  static register(): DynamicModule {
    return {
      module: ServicesProxyModule,
      providers: [
        {
          inject: [ConductorRepository],
          provide: this.CONDUCTOR_SERVICE,
          useFactory: (conductorRepository: ConductorRepository) =>
            new ConductorService(conductorRepository),
        },
        {
          inject: [PasajeroRepository],
          provide: this.PASAJERO_SERVICE,
          useFactory: (pasajeroRepository: PasajeroRepository) =>
            new PasajeroService(pasajeroRepository),
        },
        {
          inject: [ViajeRepository, FacturaRepository],
          provide: this.VIAJE_SERVICE,
          useFactory: (
            viajeRepository: ViajeRepository,
            facturaRepository: FacturaRepository,
          ) => new ViajeService(viajeRepository, facturaRepository),
        },
      ],
      exports: [
        this.CONDUCTOR_SERVICE,
        this.PASAJERO_SERVICE,
        this.VIAJE_SERVICE,
      ],
    };
  }
}

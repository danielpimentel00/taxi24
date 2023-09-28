import { Module } from "@nestjs/common";
import { ConductorRepository } from "./conductor.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Conductor } from "../entities/conductor.entity";
import { TypeOrmConfigModule } from "../typeorm/typeorm.module";
import { PasajeroRepository } from "./pasajero.repository";
import { Pasajero } from "../entities/pasajero.entity";
import { Viaje } from "../entities/viaje.entity";
import { ViajeRepository } from "./viaje.repository";
import { Factura } from "../entities/factura.entity";
import { FacturaRepository } from "./factura.repository";

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([Conductor, Pasajero, Viaje, Factura]),
  ],
  providers: [
    ConductorRepository,
    PasajeroRepository,
    ViajeRepository,
    FacturaRepository,
  ],
  exports: [
    ConductorRepository,
    PasajeroRepository,
    ViajeRepository,
    FacturaRepository,
  ],
})
export class RepositoriesModule {}

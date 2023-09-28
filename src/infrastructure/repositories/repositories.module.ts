import { Module } from "@nestjs/common";
import { ConductorRepository } from "./conductor.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Conductor } from "../entities/conductor.entity";
import { TypeOrmConfigModule } from "../typeorm/typeorm.module";
import { PasajeroRepository } from "./pasajero.repository";
import { Pasajero } from "../entities/pasajero.entity";
import { Viaje } from "../entities/viaje.entity";
import { ViajeRepository } from "./viaje.repository";

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([Conductor, Pasajero, Viaje]),
  ],
  providers: [ConductorRepository, PasajeroRepository, ViajeRepository],
  exports: [ConductorRepository, PasajeroRepository, ViajeRepository],
})
export class RepositoriesModule {}

import { Module } from "@nestjs/common";
import { ConductorRepository } from "./conductor.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Conductor } from "../entities/conductor.entity";
import { TypeOrmConfigModule } from "../typeorm/typeorm.module";
import { PasajeroRepository } from "./pasajero.repository";
import { Pasajero } from "../entities/pasajero.entity";

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([Conductor, Pasajero]),
  ],
  providers: [ConductorRepository, PasajeroRepository],
  exports: [ConductorRepository, PasajeroRepository],
})
export class RepositoriesModule {}

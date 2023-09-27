import { Module } from "@nestjs/common";
import { ConductorRepository } from "./conductor.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Conductor } from "../entities/conductor.entity";
import { TypeOrmConfigModule } from "../typeorm/typeorm.module";

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([Conductor])],
  providers: [ConductorRepository],
  exports: [ConductorRepository],
})
export class RepositoriesModule {}

import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IConductorRepository } from "src/domain/repositories/conductor-repository.interface";
import { Conductor } from "../entities/conductor.entity";
import { Repository } from "typeorm";
import { ConductorModel } from "src/domain/models/conductor.model";

@Injectable()
export class ConductorRepository implements IConductorRepository {
  constructor(
    @InjectRepository(Conductor)
    private readonly conductorRepository: Repository<Conductor>,
  ) {}

  async findAll(): Promise<ConductorModel[]> {
    const drivers = await this.conductorRepository.find();
    return drivers.map((driver) => this.toConductorModel(driver));
  }

  async findAvailableDrivers(): Promise<ConductorModel[]> {
    throw new Error("Method not implemented.");
  }

  async findById(id: number): Promise<ConductorModel> {
    throw new Error("Method not implemented.");
  }

  private toConductorModel(conductorEntity: Conductor): ConductorModel {
    const conductor = new ConductorModel();

    conductor.id = conductorEntity.id;
    conductor.fullname = conductorEntity.fullname;
    conductor.isAvailable = conductorEntity.isAvailable;
    conductor.latitude = conductorEntity.latitude;
    conductor.longitude = conductorEntity.longitude;

    return conductor;
  }
}

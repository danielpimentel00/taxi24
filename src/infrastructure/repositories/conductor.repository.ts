import { Injectable, NotFoundException } from "@nestjs/common";
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
    const drivers = await this.conductorRepository.findBy({
      isAvailable: true,
    });
    return drivers.map((driver) => this.toConductorModel(driver));
  }

  async findById(id: number): Promise<ConductorModel> {
    const driver = await this.conductorRepository.findOneBy({ id });

    if (!driver)
      throw new NotFoundException(
        `No existe un conductor registrado con id: ${id}`,
      );
    return this.toConductorModel(driver);
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

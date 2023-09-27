import { Injectable } from "@nestjs/common";
import { ConductorModel } from "src/domain/models/conductor.model";
import { IConductorRepository } from "src/domain/repositories/conductor-repository.interface";

@Injectable()
export class ConductorService {
  constructor(private readonly conductorRepository: IConductorRepository) {}

  async getAllDrivers(): Promise<ConductorModel[]> {
    return await this.conductorRepository.findAll();
  }
}

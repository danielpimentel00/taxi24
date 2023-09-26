import { ConductorModel } from "../models/conductor.model";

export interface IConductorRepository {
  findAll(): Promise<ConductorModel[]>;
  findAvailableDrivers(): Promise<ConductorModel[]>;
  findById(id: number): Promise<ConductorModel>;
}

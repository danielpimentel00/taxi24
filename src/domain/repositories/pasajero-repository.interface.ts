import { PasajeroModel } from "../models/pasajero.model";

export interface IPasajeroRepository {
  findAll(): Promise<PasajeroModel[]>;
  findById(id: number): Promise<PasajeroModel>;
}

import { Injectable } from "@nestjs/common";
import { PasajeroModel } from "src/domain/models/pasajero.model";
import { IPasajeroRepository } from "src/domain/repositories/pasajero-repository.interface";

@Injectable()
export class PasajeroService {
  constructor(private readonly pasajeroRepository: IPasajeroRepository) {}

  async getAllPassengers(): Promise<PasajeroModel[]> {
    return await this.pasajeroRepository.findAll();
  }

  async getPassengerById(id: number): Promise<PasajeroModel> {
    return await this.pasajeroRepository.findById(id);
  }
}

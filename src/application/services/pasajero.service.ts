import { Injectable } from "@nestjs/common";
import { IPasajeroRepository } from "../../domain/repositories/pasajero-repository.interface";
import { PasajeroModel } from "../../domain/models/pasajero.model";

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

import { InjectRepository } from "@nestjs/typeorm";
import { Pasajero } from "../entities/pasajero.entity";
import { Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { IPasajeroRepository } from "../../domain/repositories/pasajero-repository.interface";
import { PasajeroModel } from "../../domain/models/pasajero.model";

@Injectable()
export class PasajeroRepository implements IPasajeroRepository {
  constructor(
    @InjectRepository(Pasajero)
    private readonly pasajeroRepository: Repository<Pasajero>,
  ) {}

  async findAll(): Promise<PasajeroModel[]> {
    const passengers = await this.pasajeroRepository.find();
    return passengers.map((passenger) => this.toPasajeroModel(passenger));
  }

  async findById(id: number): Promise<PasajeroModel> {
    const passenger = await this.pasajeroRepository.findOneBy({ id });

    if (!passenger)
      throw new NotFoundException(
        `No existe un pasajero registrado con id: ${id}`,
      );
    return this.toPasajeroModel(passenger);
  }

  private toPasajeroModel(passengerEntity: Pasajero): PasajeroModel {
    const pasajero = new PasajeroModel();

    pasajero.id = passengerEntity.id;
    pasajero.fullname = passengerEntity.fullname;

    return pasajero;
  }
}

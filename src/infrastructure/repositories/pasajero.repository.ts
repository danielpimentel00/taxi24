import { InjectRepository } from "@nestjs/typeorm";
import { PasajeroModel } from "src/domain/models/pasajero.model";
import { IPasajeroRepository } from "src/domain/repositories/pasajero-repository.interface";
import { Pasajero } from "../entities/pasajero.entity";
import { Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";

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

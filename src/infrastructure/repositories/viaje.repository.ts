import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ViajeModel } from "src/domain/models/viaje.model";
import { IViajeRepository } from "src/domain/repositories/viaje-repository.interface";
import { Viaje } from "../entities/viaje.entity";
import { Repository } from "typeorm";
import { Conductor } from "../entities/conductor.entity";
import { Pasajero } from "../entities/pasajero.entity";

@Injectable()
export class ViajeRepository implements IViajeRepository {
  constructor(
    @InjectRepository(Viaje)
    private readonly viajeRepository: Repository<Viaje>,
    @InjectRepository(Conductor)
    private readonly conductorRepository: Repository<Conductor>,
    @InjectRepository(Pasajero)
    private readonly pasajeroRepository: Repository<Pasajero>,
  ) {}

  async insert(model: ViajeModel): Promise<ViajeModel> {
    const viajeEntity = await this.toViajeEntity(model);
    const insertedEntity = await this.viajeRepository.insert(viajeEntity);

    if (insertedEntity.identifiers && insertedEntity.identifiers.length > 0) {
      model.id = insertedEntity.identifiers[0].id;
    }

    return model;
  }

  async completeTrip(tripId: number): Promise<ViajeModel> {
    const trip = await this.viajeRepository
      .createQueryBuilder("viaje")
      .leftJoinAndSelect("viaje.conductor", "conductor")
      .leftJoinAndSelect("viaje.pasajero", "pasajero")
      .where("viaje.id = :id", { id: tripId })
      .getOne();

    trip.isActive = false;
    await this.viajeRepository.save(trip);

    const tripModel = this.toViajeModel(trip);
    return tripModel;
  }

  async findActiveTrips(): Promise<ViajeModel[]> {
    const trips = await this.viajeRepository
      .createQueryBuilder("viaje")
      .leftJoinAndSelect("viaje.conductor", "conductor")
      .leftJoinAndSelect("viaje.pasajero", "pasajero")
      .where("viaje.isActive = :isActive", { isActive: true })
      .getMany();

    return trips.map((trip) => {
      return this.toViajeModel(trip);
    });
  }

  private async toViajeEntity(viajeModel: ViajeModel): Promise<Viaje> {
    const viajeEntity = new Viaje();

    const conductor = await this.conductorRepository.findOneBy({
      id: viajeModel.idConductor,
    });
    if (!conductor) throw new Error("Conductor no encontrado");

    const pasajero = await this.pasajeroRepository.findOneBy({
      id: viajeModel.idPasajero,
    });
    if (!pasajero) throw new Error("Pasajero no encontrado");

    viajeEntity.id = viajeModel.id;
    viajeEntity.conductor = conductor;
    viajeEntity.pasajero = pasajero;
    viajeEntity.isActive = viajeModel.isActive;
    viajeEntity.monto = viajeModel.monto;

    return viajeEntity;
  }

  private toViajeModel(viajeEntity: Viaje): ViajeModel {
    const viajeModel = new ViajeModel();

    viajeModel.id = viajeEntity.id;
    viajeModel.idConductor = viajeEntity.conductor.id;
    viajeModel.idPasajero = viajeEntity.pasajero.id;
    viajeModel.isActive = viajeEntity.isActive;
    viajeModel.monto = Number(viajeEntity.monto);

    return viajeModel;
  }
}

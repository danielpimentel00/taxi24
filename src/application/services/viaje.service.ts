import { ViajeModel } from "src/domain/models/viaje.model";
import { IViajeRepository } from "src/domain/repositories/viaje-repository.interface";

export class ViajeService {
  constructor(private readonly viajeRepository: IViajeRepository) {}

  async createTrip(model: ViajeModel): Promise<ViajeModel> {
    model.isActive = true;

    const result = await this.viajeRepository.insert(model);
    return result;
  }

  async getActiveTrips(): Promise<ViajeModel[]> {
    const trips = await this.viajeRepository.findActiveTrips();
    return trips;
  }

  async completeTrip(tripId: number): Promise<ViajeModel> {
    const trip = await this.viajeRepository.completeTrip(tripId);
    return trip;
  }
}

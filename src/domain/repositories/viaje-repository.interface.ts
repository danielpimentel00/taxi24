import { ViajeModel } from "../models/viaje.model";

export interface IViajeRepository {
  insert(model: ViajeModel): Promise<ViajeModel>;
  completeTrip(tripId: number): Promise<ViajeModel>;
  findActiveTrips(): Promise<ViajeModel[]>;
}

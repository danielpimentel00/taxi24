import { ViajeModel } from "../models/viaje.model";

export interface IViajeRepository {
  insert(model: ViajeModel): Promise<ViajeModel>;
  completeTrip(): Promise<void>;
  findActiveTrips(): Promise<ViajeModel[]>;
}

import { FacturaModel } from "../models/factura.model";
import { ViajeModel } from "../models/viaje.model";

export class CompleteTripDto {
  viaje: ViajeModel;
  factura: FacturaModel;
}

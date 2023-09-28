import { FacturaModel } from "../models/factura.model";

export interface IFacturaRepository {
  createFactura(model: FacturaModel): Promise<FacturaModel>;
}

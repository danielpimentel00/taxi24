import { FacturaModel } from "../models/factura.model";

export interface IFacturaRepository {
  findAll(): Promise<FacturaModel[]>;
  findById(id: number): Promise<FacturaModel>;
}

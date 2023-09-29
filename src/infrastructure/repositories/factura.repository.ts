import { InjectRepository } from "@nestjs/typeorm";
import { Factura } from "../entities/factura.entity";
import { Repository } from "typeorm";
import { IFacturaRepository } from "../../domain/repositories/factura-repository.interface";
import { FacturaModel } from "../../domain/models/factura.model";

export class FacturaRepository implements IFacturaRepository {
  constructor(
    @InjectRepository(Factura)
    private readonly facturaRepository: Repository<Factura>,
  ) {}

  async createFactura(model: FacturaModel): Promise<FacturaModel> {
    const facturaEntity = this.toFacturaEntity(model);
    const insertedEntity = await this.facturaRepository.insert(facturaEntity);

    if (insertedEntity.identifiers && insertedEntity.identifiers.length > 0) {
      model.id = insertedEntity.identifiers[0].id;
    }

    return model;
  }

  private toFacturaEntity(facturaModel: FacturaModel): Factura {
    const facturaEntity = new Factura();

    facturaEntity.id = facturaModel.id;
    facturaEntity.idViaje = facturaModel.idViaje;
    facturaEntity.subTotal = facturaModel.subTotal;
    facturaEntity.totalItbis = facturaModel.totalItbis;
    facturaEntity.total = facturaModel.total;

    return facturaEntity;
  }
}

import { InjectRepository } from "@nestjs/typeorm";
import { FacturaModel } from "src/domain/models/factura.model";
import { IFacturaRepository } from "src/domain/repositories/factura-repository.interface";
import { Factura } from "../entities/factura.entity";
import { Repository } from "typeorm";

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

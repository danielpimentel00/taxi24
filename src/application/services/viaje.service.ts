import { CompleteTripDto } from "src/domain/DTO/complete-trip.dto";
import { FacturaModel } from "src/domain/models/factura.model";
import { ViajeModel } from "src/domain/models/viaje.model";
import { IFacturaRepository } from "src/domain/repositories/factura-repository.interface";
import { IViajeRepository } from "src/domain/repositories/viaje-repository.interface";

export class ViajeService {
  constructor(
    private readonly viajeRepository: IViajeRepository,
    private readonly facturaRepository: IFacturaRepository,
  ) {}

  async createTrip(model: ViajeModel): Promise<ViajeModel> {
    model.isActive = true;

    const result = await this.viajeRepository.insert(model);
    return result;
  }

  async getActiveTrips(): Promise<ViajeModel[]> {
    const trips = await this.viajeRepository.findActiveTrips();
    return trips;
  }

  async completeTrip(tripId: number): Promise<CompleteTripDto> {
    const trip = await this.viajeRepository.completeTrip(tripId);
    const factura = await this.generateInvoice(trip);

    const completedTrip = new CompleteTripDto();
    completedTrip.factura = factura;
    completedTrip.viaje = trip;

    return completedTrip;
  }

  private async generateInvoice(trip: ViajeModel): Promise<FacturaModel> {
    const { monto, id } = trip;
    const subTotal = monto;
    const totalItbis = subTotal * 0.18;
    const total = subTotal + totalItbis;

    const newFactura = new FacturaModel();

    newFactura.idViaje = id;
    newFactura.subTotal = subTotal;
    newFactura.totalItbis = parseFloat(totalItbis.toFixed(2));
    newFactura.total = parseFloat(total.toFixed(2));

    const createdFactura =
      await this.facturaRepository.createFactura(newFactura);
    return createdFactura;
  }
}

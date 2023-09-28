import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ViajeService } from "src/application/services/viaje.service";
import { ViajeModel } from "src/domain/models/viaje.model";
import { ServicesProxyModule } from "src/infrastructure/services-proxy/services-proxy.module";

@Controller("viajes")
export class ViajesController {
  constructor(
    @Inject(ServicesProxyModule.VIAJE_SERVICE)
    private readonly viajeService: ViajeService,
  ) {}

  @Post()
  async createTrip(@Body() model: ViajeModel) {
    const result = await this.viajeService.createTrip(model);
    return result;
  }

  @Get("activos")
  async getActiveTrips() {
    const result = await this.viajeService.getActiveTrips();
    return result;
  }

  @Patch("complete-trip/:tripId")
  async completeTrip(@Param("tripId") tripId: number) {
    const result = await this.viajeService.completeTrip(tripId);
    return result;
  }
}

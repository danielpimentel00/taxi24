import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { ViajeService } from "src/application/services/viaje.service";
import { ViajeModel } from "src/domain/models/viaje.model";
import { ServicesProxyModule } from "src/infrastructure/services-proxy/services-proxy.module";

@Controller("viajes")
export class ViajesController {
  private readonly logger = new Logger(ViajesController.name);

  constructor(
    @Inject(ServicesProxyModule.VIAJE_SERVICE)
    private readonly viajeService: ViajeService,
  ) {}

  @Post()
  async createTrip(@Body() model: ViajeModel) {
    try {
      const result = await this.viajeService.createTrip(model);
      return result;
    } catch (error) {
      this.logger.error(error);

      if (error instanceof InternalServerErrorException)
        throw new InternalServerErrorException("Error en el servidor");

      throw error;
    }
  }

  @Get("activos")
  async getActiveTrips() {
    try {
      const result = await this.viajeService.getActiveTrips();
      return result;
    } catch (error) {
      this.logger.error(error);

      if (error instanceof InternalServerErrorException)
        throw new InternalServerErrorException("Error en el servidor");

      throw error;
    }
  }

  @Patch("complete-trip/:tripId")
  async completeTrip(@Param("tripId", ParseIntPipe) tripId: number) {
    try {
      const result = await this.viajeService.completeTrip(tripId);
      return result;
    } catch (error) {
      this.logger.error(error);

      if (error instanceof InternalServerErrorException)
        throw new InternalServerErrorException("Error en el servidor");

      throw error;
    }
  }
}

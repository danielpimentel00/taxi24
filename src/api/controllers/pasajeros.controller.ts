import {
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Param,
  ParseFloatPipe,
  ParseIntPipe,
  Query,
} from "@nestjs/common";
import { ServicesProxyModule } from "../../infrastructure/services-proxy/services-proxy.module";
import { PasajeroService } from "../../application/services/pasajero.service";
import { ConductorService } from "../../application/services/conductor.service";

@Controller("pasajeros")
export class PasajerosController {
  private readonly logger = new Logger(PasajerosController.name);

  constructor(
    @Inject(ServicesProxyModule.PASAJERO_SERVICE)
    private readonly pasajeroService: PasajeroService,
    @Inject(ServicesProxyModule.CONDUCTOR_SERVICE)
    private readonly conductorService: ConductorService,
  ) {}

  @Get()
  async getAll() {
    try {
      const passengers = await this.pasajeroService.getAllPassengers();
      return passengers;
    } catch (error) {
      this.logger.error(error);

      if (error instanceof InternalServerErrorException)
        throw new InternalServerErrorException("Error en el servidor");

      throw error;
    }
  }

  @Get("conductores-cercanos")
  async getClosestDrivers(
    @Query("latitud", ParseFloatPipe) latitude: number,
    @Query("longitud", ParseFloatPipe) longitude: number,
  ) {
    try {
      const drivers = await this.conductorService.getClosestDrivers(
        latitude,
        longitude,
        undefined,
        3,
      );
      return drivers;
    } catch (error) {
      this.logger.error(error);

      if (error instanceof InternalServerErrorException)
        throw new InternalServerErrorException("Error en el servidor");

      throw error;
    }
  }

  @Get(":id")
  async getById(@Param("id", ParseIntPipe) id: number) {
    try {
      const passenger = await this.pasajeroService.getPassengerById(id);
      return passenger;
    } catch (error) {
      this.logger.error(error);

      if (error instanceof InternalServerErrorException)
        throw new InternalServerErrorException("Error en el servidor");

      throw error;
    }
  }
}

import {
  BadRequestException,
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
import { ConductorService } from "../../application/services/conductor.service";

@Controller("conductores")
export class ConductoresController {
  private readonly logger = new Logger(ConductoresController.name);

  constructor(
    @Inject(ServicesProxyModule.CONDUCTOR_SERVICE)
    private readonly conductorService: ConductorService,
  ) {}

  @Get()
  async getAll() {
    try {
      const drivers = await this.conductorService.getAllDrivers();
      return drivers;
    } catch (error) {
      this.logger.error(error);

      if (error instanceof InternalServerErrorException)
        throw new InternalServerErrorException("Error en el servidor");

      throw error;
    }
  }

  @Get("disponibles")
  async getAvailableDrivers() {
    try {
      const drivers = await this.conductorService.getAvailableDrivers();
      return drivers;
    } catch (error) {
      this.logger.error(error);

      if (error instanceof InternalServerErrorException)
        throw new InternalServerErrorException("Error en el servidor");

      throw error;
    }
  }

  @Get("disponibles/cercanos")
  async getDriversWithin3Km(
    @Query("latitud", ParseFloatPipe) latitude: number,
    @Query("longitud", ParseFloatPipe) longitude: number,
  ) {
    try {
      const drivers = await this.conductorService.getClosestDrivers(
        latitude,
        longitude,
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
      const driver = await this.conductorService.getDriverById(id);
      return driver;
    } catch (error) {
      this.logger.error(error);

      if (error instanceof InternalServerErrorException)
        throw new InternalServerErrorException("Error en el servidor");

      throw error;
    }
  }
}

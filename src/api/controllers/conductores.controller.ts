import { Controller, Get, Inject, Param, Query } from "@nestjs/common";
import { ConductorService } from "src/application/services/conductor.service";
import { ConductorModel } from "src/domain/models/conductor.model";
import { ServicesProxyModule } from "src/infrastructure/services-proxy/services-proxy.module";

@Controller("conductores")
export class ConductoresController {
  constructor(
    @Inject(ServicesProxyModule.CONDUCTOR_SERVICE)
    private readonly conductorService: ConductorService,
  ) {}

  @Get()
  async getAll() {
    const drivers = await this.conductorService.getAllDrivers();
    return drivers;
  }

  @Get("disponibles")
  async getAvailableDrivers() {
    const drivers = await this.conductorService.getAvailableDrivers();
    return drivers;
  }

  @Get("cercanos")
  async getDriversWithin3Km(
    @Query("latitud") latitude: number,
    @Query("longitud") longitude: number,
  ) {
    if (!latitude) throw new Error("Bad Request");
    if (!longitude) throw new Error("Bad Request");

    const drivers = await this.conductorService.getDriversWithin3Km(
      latitude,
      longitude,
    );
    return drivers;
  }

  @Get(":id")
  async getById(@Param("id") id: number) {
    const driver = await this.conductorService.getDriverById(id);
    return driver;
  }
}

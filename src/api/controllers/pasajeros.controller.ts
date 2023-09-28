import { Controller, Get, Inject, Param, Query } from "@nestjs/common";
import { ConductorService } from "src/application/services/conductor.service";
import { PasajeroService } from "src/application/services/pasajero.service";
import { ServicesProxyModule } from "src/infrastructure/services-proxy/services-proxy.module";

@Controller("pasajeros")
export class PasajerosController {
  constructor(
    @Inject(ServicesProxyModule.PASAJERO_SERVICE)
    private readonly pasajeroService: PasajeroService,
    @Inject(ServicesProxyModule.CONDUCTOR_SERVICE)
    private readonly conductorService: ConductorService,
  ) {}

  @Get()
  async getAll() {
    const passengers = await this.pasajeroService.getAllPassengers();
    return passengers;
  }

  @Get("conductores-cercanos")
  async getClosestDrivers(
    @Query("latitud") latitude: number,
    @Query("longitud") longitude: number,
  ) {
    if (!latitude) throw new Error("Bad Request");
    if (!longitude) throw new Error("Bad Request");

    const drivers = await this.conductorService.getClosestDrivers(
      latitude,
      longitude,
      undefined,
      3,
    );
    return drivers;
  }

  @Get(":id")
  async getById(@Param("id") id: number) {
    const passenger = await this.pasajeroService.getPassengerById(id);
    return passenger;
  }
}

import { Controller, Get, Inject } from "@nestjs/common";
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
}

import { Module } from "@nestjs/common";
import { ServicesProxyModule } from "src/infrastructure/services-proxy/services-proxy.module";
import { ConductoresController } from "./conductores.controller";
import { ConductorService } from "src/application/services/conductor.service";
import { PasajerosController } from "./pasajeros.controller";

@Module({
  imports: [ServicesProxyModule.register()],
  providers: [],
  controllers: [ConductoresController, PasajerosController],
})
export class ControllersModule {}

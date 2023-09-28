import { Module } from "@nestjs/common";
import { ServicesProxyModule } from "src/infrastructure/services-proxy/services-proxy.module";
import { ConductoresController } from "./conductores.controller";
import { PasajerosController } from "./pasajeros.controller";
import { ViajesController } from "./viajes.controller";

@Module({
  imports: [ServicesProxyModule.register()],
  providers: [],
  controllers: [ConductoresController, PasajerosController, ViajesController],
})
export class ControllersModule {}

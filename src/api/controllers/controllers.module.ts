import { Module } from "@nestjs/common";
import { ConductoresController } from "./conductores.controller";
import { PasajerosController } from "./pasajeros.controller";
import { ViajesController } from "./viajes.controller";
import { ServicesProxyModule } from "../../infrastructure/services-proxy/services-proxy.module";

@Module({
  imports: [ServicesProxyModule.register()],
  providers: [],
  controllers: [ConductoresController, PasajerosController, ViajesController],
})
export class ControllersModule {}

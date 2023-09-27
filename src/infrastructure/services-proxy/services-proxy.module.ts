import { DynamicModule, Module } from "@nestjs/common";
import { ConductorRepository } from "../repositories/conductor.repository";
import { ConductorService } from "src/application/services/conductor.service";
import { RepositoriesModule } from "../repositories/repositories.module";

@Module({
  imports: [RepositoriesModule],
})
export class ServicesProxyModule {
  static CONDUCTOR_SERVICE = "ConductorService";

  static register(): DynamicModule {
    return {
      module: ServicesProxyModule,
      providers: [
        {
          inject: [ConductorRepository],
          provide: this.CONDUCTOR_SERVICE,
          useFactory: (conductorRepository: ConductorRepository) =>
            new ConductorService(conductorRepository),
        },
      ],
      exports: [this.CONDUCTOR_SERVICE],
    };
  }
}

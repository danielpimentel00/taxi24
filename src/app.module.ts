import { Module } from "@nestjs/common";
import { TypeOrmConfigModule } from "./infrastructure/typeorm/typeorm.module";
import { EnvironmentConfigModule } from "./infrastructure/config/environment-config.module";
import { ServicesProxyModule } from "./infrastructure/services-proxy/services-proxy.module";
import { RepositoriesModule } from "./infrastructure/repositories/repositories.module";
import { ControllersModule } from "./api/controllers/controllers.module";

@Module({
  imports: [
    TypeOrmConfigModule,
    EnvironmentConfigModule,
    ServicesProxyModule,
    RepositoriesModule,
    ControllersModule,
    ServicesProxyModule.register(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

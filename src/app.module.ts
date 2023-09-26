import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { TypeOrmConfigModule } from "./infrastructure/typeorm/typeorm.module";
import { EnvironmentConfigModule } from "./infrastructure/config/environment-config.module";

@Module({
  imports: [TypeOrmConfigModule, EnvironmentConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { EnvironmentConfigModule } from "../config/environment-config.module";

@Module({
  imports: [
    EnvironmentConfigModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [join(__dirname, "**", "*.entity.{ts,js}")],
      synchronize: true,
    }),
  ],
})
export class TypeOrmConfigModule {}

import { Module } from "@nestjs/common"
import { JwtConfig } from "./jwt.config"

const JWT_CONFIG: JwtConfig = {
  secretKey: "secret",
  accessTokenLifetime: 1200,
}

@Module({
  providers: [{ provide: JwtConfig, useValue: JWT_CONFIG }],
  exports: [JwtConfig],
})
export class ConfigModule {}

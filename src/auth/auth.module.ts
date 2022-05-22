import { ConfigModule, JwtConfig } from "@app/config"
import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"
import { AuthService } from "./auth/auth.service"
import { JwtAuthGuard } from "./guards/jwt-auth.guard"
import { JwtStrategy } from "./strategies/jwt/jwt.strategy"
import { TokenResolver } from "./token/token.resolver"

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [JwtConfig],
      useFactory: (config: JwtConfig) => ({
        secret: config.secretKey,
        signOptions: { expiresIn: config.accessTokenLifetime },
        verifyOptions: { ignoreExpiration: false },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, TokenResolver, JwtAuthGuard],
  exports: [JwtAuthGuard],
})
export class AuthModule {}

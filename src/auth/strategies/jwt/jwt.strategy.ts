import { JwtClaims } from "@app/auth/auth/jwt-claims"
import { User } from "@app/auth/auth/user.model"
import { JwtConfig } from "@app/config/jwt.config"
import { error } from "@app/core/errors"
import { Injectable } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { JwtPayload } from "jsonwebtoken"
import {
  ExtractJwt,
  Strategy as PassportJwtStrategy,
  StrategyOptions,
} from "passport-jwt"

/**
 * Authentication strategy that retrieves an access token from the value of the
 * `Authorization` HTTP header sent with requests.
 * That token is then decoded and verified.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(PassportJwtStrategy, "jwt") {
  constructor(config: JwtConfig) {
    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.secretKey,
    }
    super(options)
  }

  /**
   * Retrieves user information from the decoded JWT payload.
   */
  validate(payload: JwtPayload & JwtClaims): User {
    return {
      id: payload.sub ?? error("Expected JWT sub to be defined"),
      email: payload.email,
    }
  }
}

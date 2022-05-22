import { JwtConfig } from "@app/config/jwt.config"
import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { AccessToken } from "../token/access-token.model"
import { JwtClaims } from "./jwt-claims"
import { User } from "./user.model"

const USER: User & { password: string } = {
  id: "77ac580d-9aa2-4875-a874-f21b800658aa",
  email: "admin@app.com",
  password: "P@ssw0rd",
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: JwtConfig
  ) {}

  /**
   * Attempts to authenticate a user given its credentials.
   * @param email Email address that's been used to create an account.
   * @param password Secret passphrase associated with the account.
   * @returns Details of the authenticated user, or `undefined`if credentials
   * are invalid.
   */
  async validateUser(
    email: string,
    password: string
  ): Promise<User | undefined> {
    if (email === USER.email && password === USER.password) {
      return {
        id: USER.id,
        email: USER.email,
      }
    }
    return undefined
  }

  /**
   * Generates an access token to be used by a given user.
   * @param user Details of the user that'll receive the access token.
   */
  async generateAccessToken(user: User): Promise<AccessToken> {
    const payload: JwtClaims = {
      email: user.email,
    }
    const accessToken = await this.jwt.signAsync(payload, {
      subject: user.id,
    })
    return {
      accessToken,
      expiresIn: this.config.accessTokenLifetime,
    }
  }
}

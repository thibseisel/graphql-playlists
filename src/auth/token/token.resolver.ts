import { UnauthorizedException } from "@nestjs/common"
import { Args, Mutation, Resolver } from "@nestjs/graphql"
import { AuthService } from "../auth/auth.service"
import { AccessToken } from "./access-token.model"
import { PasswordCredentialsInput } from "./password-credentials.input"

@Resolver()
export class TokenResolver {
  constructor(private readonly auth: AuthService) {}

  @Mutation(() => AccessToken, {
    description: "Generates a new access token given user credentials.",
  })
  async authenticate(
    @Args("credentials") credentials: PasswordCredentialsInput
  ): Promise<AccessToken> {
    const user = await this.auth.validateUser(
      credentials.email,
      credentials.password
    )
    if (!user) {
      throw new UnauthorizedException()
    }
    return this.auth.generateAccessToken(user)
  }
}

import { User } from "@app/auth/auth/user.model"
import { JwtConfig } from "@app/config/jwt.config"
import { Test } from "@nestjs/testing"
import { JwtStrategy } from "./jwt.strategy"

const TEST_CONFIG: Readonly<JwtConfig> = {
  secretKey: "test-secret",
  accessTokenLifetime: 60,
}

describe("JwtStrategy", () => {
  let strategy: JwtStrategy

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [JwtStrategy, { provide: JwtConfig, useValue: TEST_CONFIG }],
    }).compile()

    strategy = module.get(JwtStrategy)
  })

  describe("validate", () => {
    it("returns user info from JWT payload", () => {
      const user = strategy.validate({
        sub: "191e7982-9709-4982-b89e-c94b5ecec57e",
        iat: 1653244334,
        exp: 1653244394,
        userId: "191e7982-9709-4982-b89e-c94b5ecec57e",
        email: "jon.snow@got.com",
      })

      expect(user).toEqual<User>({
        id: "191e7982-9709-4982-b89e-c94b5ecec57e",
        email: "jon.snow@got.com",
      })
    })
  })
})

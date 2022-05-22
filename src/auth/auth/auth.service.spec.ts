import { JwtConfig } from "@app/config/jwt.config"
import { JwtService, JwtSignOptions } from "@nestjs/jwt"
import { Test } from "@nestjs/testing"
import { AccessToken } from "../token/access-token.model"
import { AuthService } from "./auth.service"
import { User } from "./user.model"

const TEST_CONFIG: Readonly<JwtConfig> = {
  secretKey: "test-secret",
  accessTokenLifetime: 60,
}

const mockJwt: jest.MockedObject<Pick<JwtService, "signAsync">> = {
  signAsync: jest.fn(),
}

describe("AuthService", () => {
  let service: AuthService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwt },
        { provide: JwtConfig, useValue: TEST_CONFIG },
      ],
    }).compile()

    service = module.get(AuthService)
  })

  describe("validateUser", () => {
    it("only validates a specific user", async () => {
      const user = await service.validateUser("admin@app.com", "P@ssw0rd")

      expect(user).toEqual<User>({
        id: "77ac580d-9aa2-4875-a874-f21b800658aa",
        email: "admin@app.com",
      })
    })

    it("returns undefined given invalid credentials", async () => {
      const user = await service.validateUser("jon.snow@got.com", "P@ssw0rd")

      expect(user).toBeUndefined()
    })
  })

  describe("generateAccessToken", () => {
    it("generates an access token for specified user", async () => {
      mockJwt.signAsync.mockResolvedValue("valid.access.token")

      const token = await service.generateAccessToken({
        id: "191e7982-9709-4982-b89e-c94b5ecec57e",
        email: "jon.snow@got.com",
      })

      expect(token).toEqual<AccessToken>({
        accessToken: "valid.access.token",
        expiresIn: 60,
      })
      expect(mockJwt.signAsync).toHaveBeenCalledWith(
        { email: "jon.snow@got.com" },
        expect.objectContaining<JwtSignOptions>({
          subject: "191e7982-9709-4982-b89e-c94b5ecec57e",
        })
      )
    })
  })
})

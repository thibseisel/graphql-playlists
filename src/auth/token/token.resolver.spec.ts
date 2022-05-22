import { UnauthorizedException } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { AuthService } from "../auth/auth.service"
import { AccessToken } from "./access-token.model"
import { TokenResolver } from "./token.resolver"

const mockAuth: jest.MockedObject<
  Pick<AuthService, "generateAccessToken" | "validateUser">
> = {
  validateUser: jest.fn(),
  generateAccessToken: jest.fn(),
}

describe("TokenResolver", () => {
  let resolver: TokenResolver

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [TokenResolver, { provide: AuthService, useValue: mockAuth }],
    }).compile()

    jest.resetAllMocks()
    resolver = module.get(TokenResolver)
  })

  describe("authenticate", () => {
    it("generates an access token given valid credentials", async () => {
      mockAuth.validateUser.mockResolvedValue({
        id: "191e7982-9709-4982-b89e-c94b5ecec57e",
        email: "jon.snow@got.com",
      })
      mockAuth.generateAccessToken.mockResolvedValue({
        accessToken: "valid.access.token",
        expiresIn: 60,
      })

      const token = await resolver.authenticate({
        email: "jon.snow@got.com",
        password: "P@ssw0rd",
      })

      expect(token).toEqual<AccessToken>({
        accessToken: "valid.access.token",
        expiresIn: 60,
      })
      expect(mockAuth.validateUser).toHaveBeenCalledWith(
        "jon.snow@got.com",
        "P@ssw0rd"
      )
      expect(mockAuth.generateAccessToken).toHaveBeenCalledWith({
        id: "191e7982-9709-4982-b89e-c94b5ecec57e",
        email: "jon.snow@got.com",
      })
    })

    it("fails with Unauthorized given invalid credentials", async () => {
      mockAuth.validateUser.mockResolvedValue(undefined)

      await expect(
        resolver.authenticate({
          email: "jon.snow@got.com",
          password: "incorrect_password",
        })
      ).rejects.toThrow(new UnauthorizedException())

      expect(mockAuth.generateAccessToken).not.toHaveBeenCalled()
    })
  })
})

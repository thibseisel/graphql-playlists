import { IsInt, IsNotEmpty, IsString, Min } from "class-validator"

export class JwtConfig {
  @IsString()
  @IsNotEmpty()
  secretKey!: string

  @IsInt()
  @Min(1)
  accessTokenLifetime!: number
}

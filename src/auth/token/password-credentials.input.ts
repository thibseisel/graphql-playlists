import { Field, InputType } from "@nestjs/graphql"
import { IsNotEmpty, IsString } from "class-validator"

@InputType({
  description: "Information known by a user to authenticate.",
})
export class PasswordCredentialsInput {
  @Field({
    description: "Email address used by a given user to create its account.",
  })
  @IsString()
  @IsNotEmpty()
  email!: string

  @Field({
    description: `
      Secret information only known by a single user that's used to secure
      access to its account.
    `.trim(),
  })
  @IsString()
  @IsNotEmpty()
  password!: string
}

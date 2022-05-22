import { Field, Int, ObjectType } from "@nestjs/graphql"

@ObjectType({
  description: `
  Access tokens are opaque sequences that are generated as part of the
  authentication process. They remove the need to specify user credentials in
  all issued requests to execute operations on behalf of the user.

  Access tokens are generally short-lived so that users are required to
  regenerate them frequently.
  `.trim(),
})
export class AccessToken {
  @Field({
    description:
      "Opaque character sequence used to authenticate requests as a " +
      "replacement for credentials. Access tokens are short lived and " +
      "become invalid after a given period of time.",
  })
  accessToken!: string

  @Field(() => Int, {
    description:
      "Number of seconds from the instant an access token has been generated " +
      "after which it becomes invalid.",
  })
  expiresIn!: number
}

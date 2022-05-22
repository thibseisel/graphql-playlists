/**
 * Helper function to throw an {@link Error} as part of evaluating an expression.
 * @param message Optional error message.
 *
 * @example
 * const user: User | undefined = findUser()
 * const name: string = user?.name ?? error("User should have a name")
 */
export function error(message?: string): never {
  throw Error(message)
}

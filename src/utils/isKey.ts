export function isKeyOf<T extends {}>(
  object: T,
  key: PropertyKey
): key is keyof T {
  return key in object;
}

export function isKey<T extends {}>(
  object: T,
  key: PropertyKey
): key is keyof T {
  return key in object;
}

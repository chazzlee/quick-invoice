export function replaceNaNWithZero(value: unknown): number {
  if (!value || Number.isNaN(value)) {
    return 0;
  }
  return typeof value === "string" ? parseFloat(value) : (value as number);
}

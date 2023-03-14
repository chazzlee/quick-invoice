// TODO: delete?? not using anymore
export function convertPercentageToFloat(value: number): number {
  if (Number.isNaN(value)) {
    value = 0;
  }

  return value / 100;
}

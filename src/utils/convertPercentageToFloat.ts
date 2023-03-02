// TODO:
export function convertPercentageToFloat(formattedPercentage: string): number {
  let percentage = parseFloat(formattedPercentage);
  if (Number.isNaN(percentage)) {
    percentage = 0;
  }

  return percentage / 100;
}

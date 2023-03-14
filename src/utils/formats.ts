import Money from "dinero.js";
import { replaceNaNWithZero } from "./replaceNaNWithZero";

// FIXME: ERROR somewhere, sometimes ("amount must be integer")

// Percentage (yes float)
// ex: 10.5 -> 0.1050
export const valueAsFloat = (valueAsPercentage: number): number => {
  try {
    const value = replaceNaNWithZero(valueAsPercentage);
    return value / 100;
  } catch (ex) {
    console.error(ex);
    return 0;
  }
};

// Percentage (yes float)
// ex: 0.50 -> 50 (%)
export const valueAsPercentage = (valueAsDecimal: number): number => {
  try {
    const value = replaceNaNWithZero(valueAsDecimal);
    return value * 100;
  } catch (ex) {
    console.error(ex);
    return 0;
  }
};

// Percentage to currency (switching from flat to percent)
// 100 (%) -> 1000000
export const valueInCentsFromPercentage = (percentageValue: number): number => {
  const value = replaceNaNWithZero(percentageValue);
  return value * 10000;
};

export const valueInPercentageFloatFromCents = (
  valueInCents: number
): number => {
  const value = replaceNaNWithZero(valueInCents);
  return value / 10000;
};

// Currency & Percentage (yes float)
// ex: 10.5 -> 1050
export const valueInMinorUnits = (floatValue: number): number => {
  const value = replaceNaNWithZero(floatValue);
  const amount = Money({ amount: Math.round(value * 100) });
  return amount.getAmount();
};

// Currency (no float)
// ex: 10000 -> 100
export const valueInDollars = (valueInCents: number): number => {
  try {
    const value = replaceNaNWithZero(valueInCents);

    const cents = Money({ amount: Math.round(value) });
    return cents.toUnit();
  } catch (ex) {
    console.error(ex);
    return 0;
  }
};

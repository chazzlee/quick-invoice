import Money from "dinero.js";

export const amountToUnit = (amount: number) => {
  return Money({ amount }).toUnit();
};

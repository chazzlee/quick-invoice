import { forwardRef } from "react";
import { valueInDollars, valueInMinorUnits } from "@/utils/formats";
import { NumericFormat } from "react-number-format";

type NumberInputProps = {
  id?: string;
  name: string;
  value: number;
  decimalScale?: number;
  hasError?: boolean;
  width?: number;
  onChange(value: number): void;
};

export const NumberInput = forwardRef<
  HTMLInputElement,
  Readonly<NumberInputProps>
>(function NumberInput(
  { id, name, value, onChange, width = 2, hasError = false, decimalScale = 2 },
  ref
) {
  return (
    <NumericFormat
      id={id}
      getInputRef={ref}
      name={name}
      value={valueInDollars(value)}
      onValueChange={(values) =>
        onChange(valueInMinorUnits(values.floatValue ?? 0))
      }
      className={`w-${width}/12 input input-bordered ${
        hasError ? "input-error" : ""
      }`}
      decimalScale={decimalScale}
      fixedDecimalScale={true}
      allowNegative={false}
    />
  );
});

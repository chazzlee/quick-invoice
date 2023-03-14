import { forwardRef } from "react";
import { NumericFormat } from "react-number-format";
import { valueAsFloat, valueAsPercentage } from "@/utils/formats";

type PercentageInputProps = Readonly<{
  name: string;
  value: number;
  decimalScale?: number;
  hasError: boolean;
  onChange(value: number): void;
  onBlur(): void;
}>;

export const PercentageInput = forwardRef<
  HTMLInputElement,
  PercentageInputProps
>(function PercentageInput(
  { name, value, decimalScale = 2, hasError = false, onChange, onBlur },
  ref
) {
  return (
    <NumericFormat
      className={`input input-bordered w-1/2 ${hasError ? "input-error" : ""}`}
      suffix={"%"}
      decimalScale={decimalScale}
      fixedDecimalScale={true}
      getInputRef={ref}
      name={name}
      value={valueAsPercentage(value)}
      onValueChange={(values) => {
        onChange(valueAsFloat(values.floatValue ?? 0));
      }}
      onBlur={onBlur}
    />
  );
});

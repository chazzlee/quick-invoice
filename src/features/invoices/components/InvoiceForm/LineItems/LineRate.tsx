import Money from "dinero.js";
import { Controller } from "react-hook-form";
import { replaceNaNWithZero } from "@/utils/replaceNaNWithZero";
import { useInvoiceFormContext } from "@/features/invoices/hooks/useInvoiceFormContext";
import { NumericFormat } from "react-number-format";

type LineRateProps = { readonly index: number };

export function LineRate({ index }: LineRateProps) {
  const { control } = useInvoiceFormContext();

  const getRateForDisplay = (valueInCents: number) => {
    const value = replaceNaNWithZero(valueInCents);
    const rateInCents = Money({ amount: value });
    return rateInCents.toUnit();
  };

  const getRateInCents = (floatValue: number) => {
    const value = replaceNaNWithZero(floatValue);
    const valueInCents = Money({ amount: Math.round(value * 100) });
    return valueInCents.getAmount();
  };

  return (
    <Controller
      control={control}
      name={`lineItems.${index}.rate`}
      render={({ field: { name, ref, onChange, value } }) => (
        <NumericFormat
          id={`rate-${index}`}
          getInputRef={ref}
          name={name}
          value={getRateForDisplay(value)}
          onValueChange={(values) =>
            onChange(getRateInCents(values.floatValue ?? 0))
          }
          className="w-2/12 input input-bordered"
          decimalScale={2}
          fixedDecimalScale={true}
          allowNegative={false}
        />
      )}
    />
  );
}

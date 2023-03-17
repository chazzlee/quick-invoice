import { Controller } from "react-hook-form";
import { useInvoiceFormContext } from "@/features/invoices/hooks/useInvoiceFormContext";
import { NumberInput } from "@/components/Inputs/NumberInput";

type LineRateProps = { index: number };

export function LineRate({ index }: LineRateProps) {
  const { control } = useInvoiceFormContext();

  return (
    <Controller
      control={control}
      name={`lineItems.${index}.rate`}
      render={({ field: { name, ref, onChange, value } }) => (
        <NumberInput
          ref={ref}
          id={`rate-${index}`}
          name={name}
          value={value}
          decimalScale={2}
          onChange={onChange}
        />
      )}
    />
  );
}

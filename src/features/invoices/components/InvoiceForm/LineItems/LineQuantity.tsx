import { TextInput } from "@/components/Inputs";
import { useInvoiceFormContext } from "@/features/invoices/hooks/useInvoiceFormContext";
import { replaceNaNWithZero } from "@/utils/replaceNaNWithZero";

type LineQuantityProps = { readonly index: number };

export function LineQuantity({ index }: LineQuantityProps) {
  const { register } = useInvoiceFormContext();

  return (
    <TextInput
      id={`quantity-${index}`}
      type="number"
      min={0}
      inputSize="sm"
      width="w-2/12"
      {...register(`lineItems.${index}.quantity`, {
        setValueAs: (value) => replaceNaNWithZero(value),
      })}
    />
  );
}

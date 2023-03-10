import { NumericFormat } from "react-number-format";
import { useInvoiceFormContext } from "@/features/invoices/hooks/useInvoiceFormContext";
import { amountToUnit } from "@/utils/money";

type LineAmountProps = { readonly index: number };

export function LineAmount({ index }: LineAmountProps) {
  const { watch } = useInvoiceFormContext();

  const amount = watch(`lineItems.${index}.amount`);

  return (
    <NumericFormat
      displayType="text"
      className="w-2/12 mt-3"
      value={amountToUnit(amount)}
      prefix={"$"}
      decimalScale={2}
      fixedDecimalScale={true}
    />
  );
}

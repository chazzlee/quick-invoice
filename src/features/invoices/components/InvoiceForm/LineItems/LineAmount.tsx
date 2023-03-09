import Money from "dinero.js";
import { NumericFormat } from "react-number-format";
import { useInvoiceFormContext } from "@/features/invoices/hooks/useInvoiceFormContext";

type LineAmountProps = { readonly index: number };

export function LineAmount({ index }: LineAmountProps) {
  const { watch } = useInvoiceFormContext();

  const amount = watch(`lineItems.${index}.amount`);

  const getAmountForDisplay = (amount: number) => {
    return Money({ amount }).toUnit();
  };

  return (
    <NumericFormat
      displayType="text"
      className="w-2/12 mt-3"
      value={getAmountForDisplay(amount)}
      prefix={"$"}
      decimalScale={2}
      fixedDecimalScale={true}
    />
  );
}

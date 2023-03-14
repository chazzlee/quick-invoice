import { Currency } from "@/components/Inputs/Currency";
import { useInvoiceWatchOne } from "@/features/invoices/hooks/useInvoiceWatchOne";

type LineAmountProps = Readonly<{ index: number }>;

export function LineAmount({ index }: LineAmountProps) {
  const amount = useInvoiceWatchOne(`lineItems.${index}.amount`);

  return <Currency className="w-2/12 mt-3" amount={amount} />;
}

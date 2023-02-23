import { useWatchInvoice } from "./useWatchInvoice";

export function useTax() {
  const { tax } = useWatchInvoice();
  const taxType = tax.type;
  const taxRate = tax.rate;

  const isNotTaxable = taxType === "no_tax";
  const isTaxable = ["on_total", "deducted", "per_item"].includes(taxType);

  return {
    taxType,
    taxRate,
    isTaxable,
    isNotTaxable,
  };
}

import { useWatchInvoice } from "./useWatchInvoice";

export function useTax() {
  const taxType = useWatchInvoice("tax.type");
  const taxRate = useWatchInvoice("tax.rate");
  const isTaxable = taxType !== "no_tax";

  return {
    taxType,
    taxRate,
    isTaxable,
  };
}

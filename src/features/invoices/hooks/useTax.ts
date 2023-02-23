import { useWatch } from "react-hook-form";
import type { InvoiceFormData } from "../types";

export function useTax() {
  const taxType = useWatch<InvoiceFormData, "tax.type">({
    name: "tax.type",
  });
  const taxRate = useWatch<InvoiceFormData, "tax.rate">({
    name: "tax.rate",
  });
  const totalTax = useWatch<InvoiceFormData, "totalTax">({
    name: "totalTax",
  });
  const isTaxable = taxType !== "no_tax";

  return {
    taxType,
    taxRate,
    totalTax,
    isTaxable,
  };
}

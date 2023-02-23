import { useWatch } from "react-hook-form";
import type { InvoiceFormData } from "../types";

export function useTerms() {
  const termsType = useWatch<InvoiceFormData, "invoice.terms.type">({
    name: "invoice.terms.type",
  });
  const hasDueDate = termsType !== "on_receipt";

  return { termsType, hasDueDate };
}

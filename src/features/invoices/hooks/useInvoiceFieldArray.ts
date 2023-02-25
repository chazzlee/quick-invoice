import { useFieldArray } from "react-hook-form";
import type { InvoiceFormData } from "../types";

export function useInvoiceFieldArray() {
  return useFieldArray<InvoiceFormData>({ name: "lineItems" });
}

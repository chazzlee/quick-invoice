import { useFieldArray } from "react-hook-form";
import { InvoiceFormData } from "../types";

export function useInvoiceFieldArray() {
  return useFieldArray<InvoiceFormData>({ name: "lineItems" });
}

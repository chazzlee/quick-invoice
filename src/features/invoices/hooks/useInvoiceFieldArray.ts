import { InvoiceFormSchema } from "@/schemas";
import { useFieldArray } from "react-hook-form";
// import type { InvoiceFormData } from "../types";

export function useInvoiceFieldArray() {
  return useFieldArray<InvoiceFormSchema>({ name: "lineItems" });
}

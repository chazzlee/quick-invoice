import { InvoiceFormSchema } from "@/schemas";
import { type FieldPath, useWatch } from "react-hook-form";

export function useInvoiceWatchOne<K extends FieldPath<InvoiceFormSchema>>(
  name: K
) {
  return useWatch<InvoiceFormSchema, K>({ name });
}

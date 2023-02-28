import { InvoiceFormSchema } from "@/schemas";
import { type FieldPath, useWatch } from "react-hook-form";
// import type { InvoiceFormData } from "../types";
import { useInvoiceFormContext } from "./useInvoiceFormContext";

export function useInvoiceWatchOne<K extends FieldPath<InvoiceFormSchema>>(
  name: K
) {
  return useWatch<InvoiceFormSchema, K>({ name });
}

const useInvoiceWatch = useWatch<InvoiceFormSchema>;

export function useInvoiceFormValues() {
  const { getValues } = useInvoiceFormContext();

  return {
    ...useInvoiceWatch(),
    ...getValues(),
  };
}

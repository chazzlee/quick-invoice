import { type FieldPath, useWatch } from "react-hook-form";
import type { InvoiceFormData } from "../types";
import { useInvoiceFormContext } from "./useInvoiceFormContext";

export function useInvoiceWatchOne<K extends FieldPath<InvoiceFormData>>(
  name: K
) {
  return useWatch<InvoiceFormData, K>({ name });
}

function useInvoiceWatch() {
  return useWatch<InvoiceFormData>();
}

export function useInvoiceFormValues() {
  const { getValues } = useInvoiceFormContext();

  return {
    ...useInvoiceWatch(),
    ...getValues(),
  };
}

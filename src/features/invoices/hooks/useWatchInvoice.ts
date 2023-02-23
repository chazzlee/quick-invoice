import { type FieldPath, useWatch } from "react-hook-form";
import type { InvoiceFormData } from "../types";

export function useWatchInvoice<K extends FieldPath<InvoiceFormData>>(name: K) {
  return useWatch<InvoiceFormData, K>({ name });
}

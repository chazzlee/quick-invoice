import { useWatch } from "react-hook-form";
import type { InvoiceFormData } from "../types";
import { useInvoiceFormContext } from "./useInvoiceFormContext";

export function useWatchInvoice() {
  const { getValues } = useInvoiceFormContext();

  return {
    ...useWatch<InvoiceFormData>(),
    ...getValues(),
  };
}

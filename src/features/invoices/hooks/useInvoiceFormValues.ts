import { useWatch } from "react-hook-form";
import { InvoiceFormData } from "../types";
import { useInvoiceFormContext } from "./useInvoiceFormContext";

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

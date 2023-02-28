import { InvoiceFormSchema } from "@/schemas";
import { useFormContext } from "react-hook-form";
// import type { InvoiceFormData } from "../types";

export function useInvoiceFormContext() {
  return useFormContext<InvoiceFormSchema>();
}

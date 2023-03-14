import { InvoiceFormSchema } from "@/schemas";
import { useFormContext } from "react-hook-form";

export const useInvoiceFormContext = useFormContext<InvoiceFormSchema>;

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AppProps } from "next/app";
import { defaultInvoice } from "@/features/invoices/defaults";
import { invoiceFormSchema, InvoiceFormSchema } from "@/schemas";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const methods = useForm<InvoiceFormSchema>({
    mode: "onSubmit",
    defaultValues: defaultInvoice,
    resolver: zodResolver(invoiceFormSchema),
  });

  return (
    <FormProvider {...methods}>
      <Component {...pageProps} />
    </FormProvider>
  );
}

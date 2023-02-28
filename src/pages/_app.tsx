import { defaultInvoice } from "@/features/invoices/defaults";
import { InvoiceFormData } from "@/features/invoices/types";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { FormProvider, useForm } from "react-hook-form";

export default function App({ Component, pageProps }: AppProps) {
  const methods = useForm<InvoiceFormData>({
    mode: "onSubmit",
    defaultValues: defaultInvoice,
  });

  return (
    <FormProvider {...methods}>
      <Component {...pageProps} />
    </FormProvider>
  );
}

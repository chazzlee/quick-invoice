import Head from "next/head";
import { Inter } from "@next/font/google";
import { InvoiceForm } from "@/features/invoices/components/InvoiceForm";
import { InvoiceAside } from "@/features/invoices/components/InvoiceAside";
import { useInvoiceFormContext } from "@/features/invoices/hooks/useInvoiceFormContext";
import { defaultInvoice } from "@/features/invoices/defaults";

export default function Home() {
  const { reset } = useInvoiceFormContext();

  return (
    <>
      <Head>
        <title>Free Invoice Generator</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container px-16 pt-8 mx-auto">
        <div className="mb-4">
          <button
            type="button"
            className="btn"
            onClick={() => reset(defaultInvoice)}
          >
            Reset
          </button>
        </div>

        <section className="grid grid-cols-[3fr_1fr] gap-8">
          <article className="px-8 py-8 mb-20 bg-white border-t-4 border-b-4 border-gray-600">
            <InvoiceForm />
          </article>

          <InvoiceAside />
        </section>
      </main>
    </>
  );
}

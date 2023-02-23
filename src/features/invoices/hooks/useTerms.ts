import { useWatchInvoice } from "./useWatchInvoice";

export function useTerms() {
  const termsType = useWatchInvoice("invoice.terms.type");
  const invoiceNumber = useWatchInvoice("invoice.number");
  const invoiceDate = useWatchInvoice("invoice.date");
  const dueDate = useWatchInvoice("invoice.terms.dueDate");
  const hasDueDate = termsType !== "on_receipt";

  return { hasDueDate, dueDate, termsType, invoiceNumber, invoiceDate };
}

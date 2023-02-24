import { useWatchInvoice } from "./useWatchInvoice";

export function useTerms() {
  const { invoice } = useWatchInvoice();

  const termsType = invoice.terms.type;
  const dueDate = invoice.terms.dueDate;
  const invoiceNumber = invoice.number;
  const invoiceDate = invoice.date;
  const extraNotes = invoice.notes;
  const hasDueDate = termsType !== "on_receipt";

  return {
    hasDueDate,
    dueDate,
    termsType,
    invoiceNumber,
    invoiceDate,
    extraNotes,
  };
}

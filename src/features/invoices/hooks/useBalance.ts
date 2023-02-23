import { useWatchInvoice } from "./useWatchInvoice";

export function useBalance() {
  const subtotal = useWatchInvoice("balance.subtotal");
  const total = useWatchInvoice("balance.total");
  const totalTax = useWatchInvoice("balance.totalTax");
  const totalDiscount = useWatchInvoice("balance.totalDiscount");
  const balanceDue = useWatchInvoice("balance.balanceDue");

  return {
    subtotal,
    totalTax,
    totalDiscount,
    total,
    balanceDue,
  };
}

import { useCallback } from "react";
import { useInvoiceFormContext } from "./useInvoiceFormContext";
import { useWatchInvoice } from "./useWatchInvoice";

export function useBalance() {
  const { getValues, setValue } = useInvoiceFormContext();
  const {
    balance: { subtotal, total, balanceDue, totalDiscount, totalTax },
  } = useWatchInvoice();

  const onUpdateSubtotal = useCallback(() => {
    const subtotal = getValues("lineItems").reduce(
      (acc, prev) => acc + prev.amount,
      0
    );
    setValue("balance.subtotal", subtotal);
  }, [getValues, setValue]);

  const onUpdateTotalTax = useCallback(() => {
    const taxRate = getValues("tax.rate");
    const taxType = getValues("tax.type");
    const lineItems = getValues("lineItems");
    const taxableItems = lineItems.filter((lineItem) => lineItem.taxable);
    const totalTax = taxableItems.reduce(
      (acc, prev) => acc + prev.amount * (taxRate / 100),
      0
    );

    switch (taxType) {
      case "no_tax": {
        setValue("balance.totalTax", 0);
        break;
      }
      case "on_total": {
        setValue("balance.totalTax", totalTax);
        break;
      }
      case "deducted": {
        setValue("balance.totalTax", totalTax * -1);
        break;
      }
      case "per_item": {
        throw new Error("NOT YET IMPLEMENTED");
      }
      default:
        throw new Error("Invalid tax type");
    }
  }, [getValues, setValue]);

  const onUpdateTotal = useCallback(() => {
    const total =
      getValues("balance.subtotal") +
      getValues("balance.totalDiscount") +
      getValues("balance.totalTax");
    setValue("balance.total", total);
  }, [getValues, setValue]);

  return {
    subtotal,
    totalTax,
    totalDiscount,
    total,
    balanceDue,
    onUpdateSubtotal,
    onUpdateTotalTax,
    onUpdateTotal,
  };
}

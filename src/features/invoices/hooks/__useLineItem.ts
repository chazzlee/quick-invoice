import { useCallback } from "react";
import { useInvoiceFormContext } from "./useInvoiceFormContext";
import { useWatchInvoice } from "./useWatchInvoice";

export function useLineItem(index: number) {
  const { setValue, getValues } = useInvoiceFormContext();
  const { lineItems } = useWatchInvoice();
  const lineItem = lineItems[index];

  const onUpdateAmount = useCallback(() => {
    const rate = getValues(`lineItems.${index}.rate`);
    const quantity = getValues(`lineItems.${index}.quantity`);
    const amount = rate * quantity;

    setValue(`lineItems.${index}.amount`, amount);
  }, [getValues, index, setValue]);

  return { lineItem, onUpdateAmount };
}

import { useCallback } from "react";
import { useFieldArray } from "react-hook-form";
import { defaultLineItem } from "../defaults";
import type { InvoiceFormData } from "../types";
import { useInvoiceFormContext } from "./useInvoiceFormContext";
// import { useWatchInvoice } from "./useWatchInvoice";

export function useLineItems() {
  const { getValues } = useInvoiceFormContext();
  const { fields, append, remove, replace } = useFieldArray<InvoiceFormData>({
    name: "lineItems",
  });

  // const { lineItems } = useWatchInvoice();

  const onClear = useCallback(
    () => replace([{ ...defaultLineItem }]),
    [replace]
  );

  const onRemove = useCallback(
    (index: number) => {
      if (fields.length === 1) {
        replace([{ ...defaultLineItem }]);
      } else {
        remove(index);
      }
    },
    [fields.length, remove, replace]
  );

  const onAddMore = useCallback(() => {
    append(defaultLineItem);
  }, [append]);

  const onUpdateTaxables = useCallback(() => {
    if (getValues("tax.type") === "no_tax") {
      replace(
        getValues("lineItems").map((lineItem) => ({
          ...lineItem,
          taxable: false,
        }))
      );
    }
  }, [replace, getValues]);

  return {
    fields,
    onClear,
    onRemove,
    onAddMore,
    onUpdateTaxables,
    lineItems,
  };
}

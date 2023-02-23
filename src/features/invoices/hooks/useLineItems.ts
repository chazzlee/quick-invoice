import { useCallback } from "react";
import { useFieldArray } from "react-hook-form";
import { defaultLineItem } from "../defaults";
import type { InvoiceFormData } from "../types";

export function useLineItems() {
  const { fields, append, remove, replace } = useFieldArray<InvoiceFormData>({
    name: "lineItems",
  });

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

  return {
    fields,
    onClear,
    onRemove,
    onAddMore,
  };
}

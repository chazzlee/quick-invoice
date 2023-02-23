import { useCallback } from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import type { InvoiceFormData } from "@/features/invoices/types";
import { defaultLineItem } from "@/features/invoices/defaults";
import { LineItemsHeader } from "./LineItemsHeader";
import { LineItem } from "./LineItem";
import { AddMoreButton } from "./AddMoreButton";

export function LineItems() {
  const taxType = useWatch<InvoiceFormData, "tax.type">({
    name: "tax.type",
    defaultValue: "no_tax",
  });
  const isTaxable = taxType !== "no_tax";

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

  return (
    <div className="my-4 line-items-container">
      <LineItemsHeader onClear={onClear} isTaxable={isTaxable} />
      {fields.map((field, index) => (
        <LineItem
          key={field.id}
          index={index}
          isTaxable={isTaxable}
          onRemove={onRemove}
        />
      ))}
      <div className="py-4 border-b border-gray-300">
        <AddMoreButton onAddMore={onAddMore} />
      </div>
    </div>
  );
}

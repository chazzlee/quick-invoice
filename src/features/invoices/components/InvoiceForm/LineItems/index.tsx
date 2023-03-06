import { useCallback } from "react";
import { defaultLineItem } from "@/features/invoices/defaults";
import { useInvoiceFieldArray } from "@/features/invoices/hooks/useInvoiceFieldArray";
import { useInvoiceFormContext } from "@/features/invoices/hooks/useInvoiceFormContext";
import { LineItemsHeader } from "./LineItemsHeader";
import { LineItem } from "./LineItem";
import { AddMoreButton } from "./AddMoreButton";

export function LineItems() {
  const { clearErrors } = useInvoiceFormContext();
  const { fields, append, remove, replace } = useInvoiceFieldArray();

  const onClear = useCallback(() => {
    clearErrors("lineItems");
    replace(defaultLineItem);
  }, [clearErrors, replace]);

  return (
    <div className="my-4 line-items-container">
      <LineItemsHeader onClear={onClear} />
      {fields.map((field, index) => (
        <LineItem
          key={field.id}
          index={index}
          onRemove={() => {
            if (index > 0) {
              clearErrors(`lineItems.${index}.description`);
              remove(index);
            } else {
              onClear();
            }
          }}
        />
      ))}
      <div className="py-4 border-b border-gray-300">
        <AddMoreButton onAddMore={() => append(defaultLineItem)} />
      </div>
    </div>
  );
}

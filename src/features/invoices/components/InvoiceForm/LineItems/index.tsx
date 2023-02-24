import { useFieldArray } from "react-hook-form";
import { LineItemsHeader } from "./LineItemsHeader";
import { LineItem } from "./LineItem";
import { AddMoreButton } from "./AddMoreButton";
import type { InvoiceFormData } from "@/features/invoices/types";
import { useWatchInvoice } from "@/features/invoices/hooks/useWatchInvoice";
import { defaultLineItem } from "@/features/invoices/defaults";

export function LineItems() {
  const taxType = useWatchInvoice("tax.type");
  const isTaxable = taxType !== "no_tax";

  const { fields, append, remove, replace, update } =
    useFieldArray<InvoiceFormData>({
      name: "lineItems",
    });

  return (
    <div className="my-4 line-items-container">
      <LineItemsHeader
        onClear={() => replace(defaultLineItem)}
        isTaxable={isTaxable}
      />
      {fields.map((field, index) => (
        <LineItem
          key={field.id}
          index={index}
          isTaxable={isTaxable}
          onUpdate={update}
          onRemove={() => {
            if (index > 0) {
              remove(index);
            } else {
              replace(defaultLineItem);
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

import { useFieldArray } from "react-hook-form";
import { LineItemsHeader } from "./LineItemsHeader";
import { LineItem } from "./LineItem";
import { AddMoreButton } from "./AddMoreButton";
import type { InvoiceFormData } from "@/features/invoices/types";
import { useWatchInvoice } from "@/features/invoices/hooks/useWatchInvoice";

export function LineItems() {
  const isTaxable = useWatchInvoice("tax.type") !== "no_tax";

  const { fields, append, remove, replace } = useFieldArray<InvoiceFormData>({
    name: "lineItems",
  });

  return (
    <div className="my-4 line-items-container">
      <LineItemsHeader onClear={() => {}} isTaxable={isTaxable} />
      {fields.map((field, index) => (
        <LineItem
          key={field.id}
          index={index}
          isTaxable={isTaxable}
          onRemove={() => {}}
        />
      ))}
      <div className="py-4 border-b border-gray-300">
        <AddMoreButton onAddMore={() => {}} />
      </div>
    </div>
  );
}

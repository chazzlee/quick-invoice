import { useTax } from "@/features/invoices/hooks/useTax";
import { useLineItems } from "@/features/invoices/hooks/useLineItems";
import { LineItemsHeader } from "./LineItemsHeader";
import { LineItem } from "./LineItem";
import { AddMoreButton } from "./AddMoreButton";
import { useFieldArray } from "react-hook-form";
import { InvoiceFormData } from "@/features/invoices/types";

export function LineItems() {
  // const { fields, onClear, onRemove, onAddMore } = useLineItems();
  const isTaxable = false;
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

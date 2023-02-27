import { useFieldArray } from "react-hook-form";
import { LineItemsHeader } from "./LineItemsHeader";
import { LineItem } from "./LineItem";
import { AddMoreButton } from "./AddMoreButton";
import { defaultLineItem } from "@/features/invoices/defaults";
import { useInvoiceFieldArray } from "@/features/invoices/hooks/useInvoiceFieldArray";
import { useInvoiceFormContext } from "@/features/invoices/hooks/useInvoiceFormContext";

export function LineItems() {
  const { clearErrors } = useInvoiceFormContext();
  const { fields, append, remove, replace } = useInvoiceFieldArray();

  return (
    <div className="my-4 line-items-container">
      <LineItemsHeader
        onClear={() => {
          clearErrors("lineItems");
          replace(defaultLineItem);
        }}
      />
      {fields.map((field, index) => (
        <LineItem
          key={field.id}
          index={index}
          onRemove={() => {
            if (index > 0) {
              clearErrors(`lineItems.${index}.description`);
              remove(index);
            } else {
              clearErrors("lineItems");
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

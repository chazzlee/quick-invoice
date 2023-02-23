import { useTax } from "@/features/invoices/hooks/useTax";
import { useLineItems } from "@/features/invoices/hooks/useLineItems";
import { LineItemsHeader } from "./LineItemsHeader";
import { LineItem } from "./LineItem";
import { AddMoreButton } from "./AddMoreButton";

export function LineItems() {
  const { isTaxable } = useTax();
  const { fields, onClear, onRemove, onAddMore } = useLineItems();

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

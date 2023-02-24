import { Textarea, TextInput } from "@/components/Inputs";
import { useInvoiceFormContext } from "@/features/invoices/hooks/useInvoiceFormContext";
import { useWatchInvoice } from "@/features/invoices/hooks/useWatchInvoice";

import { formatCurrency } from "@/utils/formatCurrency";
import { useEffect } from "react";

type LineItemProps = {
  readonly index: number;
  readonly isTaxable: boolean;
  onRemove(index: number): void;
};

export function LineItem({ index, isTaxable, onRemove }: LineItemProps) {
  const { register } = useInvoiceFormContext();
  let rate = useWatchInvoice(`lineItems.${index}.rate`);

  if (Number.isNaN(rate)) {
    rate = 0;
  }

  const quantity = useWatchInvoice(`lineItems.${index}.quantity`);
  const amount = rate * quantity;

  return (
    <div className="relative flex gap-4 py-2 pl-8 border-b border-gray-300">
      <div className="absolute left-0">
        <button
          type="button"
          className="btn btn-sm"
          onClick={() => onRemove(index)}
        >
          &times;
        </button>
      </div>
      <div className={`${isTaxable ? "w-5/12" : "w-6/12"} ml-4`}>
        <TextInput
          id={`description-${index}`}
          placeholder="Item description"
          inputSize="sm"
          {...register(`lineItems.${index}.description`)}
        />
        <Textarea
          id={`details-${index}`}
          placeholder="Additional details"
          {...register(`lineItems.${index}.details`)}
        />
      </div>
      <TextInput
        id={`rate-${index}`}
        type="number"
        min={0}
        inputSize="sm"
        width="w-2/12"
        {...register(`lineItems.${index}.rate`, {
          valueAsNumber: true,
          onChange() {},
        })}
      />
      <TextInput
        id={`quantity-${index}`}
        type="number"
        min={0}
        inputSize="sm"
        width="w-2/12"
        {...register(`lineItems.${index}.quantity`, {
          valueAsNumber: true,
          onChange() {},
        })}
      />

      <p className="w-2/12 mt-3 amount">{formatCurrency(amount)}</p>

      {isTaxable ? (
        <div className="w-1/12 mt-3">
          <input
            type="checkbox"
            className="checkbox"
            {...register(`lineItems.${index}.taxable`, {
              onChange() {},
            })}
            defaultChecked={isTaxable}
          />
        </div>
      ) : null}
    </div>
  );
}

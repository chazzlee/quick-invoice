import { useEffect } from "react";
import { Textarea, TextInput } from "@/components/Inputs";
import { useInvoiceFormValues } from "@/features/invoices/hooks/useInvoiceFormValues";
import { useInvoiceFormContext } from "@/features/invoices/hooks/useInvoiceFormContext";
import type { LineItem } from "@/features/invoices/types";
import { formatCurrency } from "@/utils/formatCurrency";
import { useTax } from "@/features/invoices/hooks/useTax";
import { useDiscount } from "@/features/invoices/hooks/useDiscount";

type LineItemProps = {
  readonly index: number;
  onRemove(index: number): void;
};

export function LineItem({ index, onRemove }: LineItemProps) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useInvoiceFormContext();
  const { lineItems } = useInvoiceFormValues();

  const { isTaxable, updateTotalTax } = useTax();
  const { updateTotalDiscount } = useDiscount();

  const lineItem = lineItems[index];
  let rate = lineItem.rate;
  if (Number.isNaN(rate)) {
    rate = 0;
  }
  const quantity = lineItem.quantity;
  const amount = lineItem.amount;

  useEffect(() => {
    function updateAmount(rate: number, quantity: number) {
      let amount = rate * quantity;
      setValue(`lineItems.${index}.amount`, amount);
    }
    function updateSubtotal() {
      const subtotal = lineItems.reduce((acc, prev) => acc + prev.amount, 0);
      setValue("balance.subtotal", subtotal);
    }
    updateAmount(rate, quantity);
    updateSubtotal();
    updateTotalDiscount();
    updateTotalTax();
  }, [
    index,
    lineItems,
    quantity,
    rate,
    setValue,
    updateTotalDiscount,
    updateTotalTax,
  ]);

  return (
    <div className="relative flex gap-4 py-2 pl-8 border-b border-gray-300">
      <div className="absolute left-0">
        <button
          type="button"
          className="btn btn-sm"
          onClick={() => {
            onRemove(index);
          }}
        >
          &times;
        </button>
      </div>
      <div className={`${isTaxable ? "w-5/12" : "w-6/12"} ml-4`}>
        <TextInput
          id={`description-${index}`}
          placeholder="Item description"
          inputSize="sm"
          {...register(`lineItems.${index}.description`, {
            required: { value: true, message: "item description is required" },
          })}
        />
        {errors.lineItems?.[index]?.description?.message ? (
          <label className="label">
            <span className="text-red-500 label-text-alt">
              {errors.lineItems?.[index]?.description?.message}
            </span>
          </label>
        ) : null}
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
        {...register(`lineItems.${index}.rate`, { valueAsNumber: true })}
      />
      <TextInput
        id={`quantity-${index}`}
        type="number"
        min={0}
        inputSize="sm"
        width="w-2/12"
        {...register(`lineItems.${index}.quantity`, { valueAsNumber: true })}
      />

      <p className="w-2/12 mt-3 amount">{formatCurrency(amount)}</p>

      {isTaxable ? (
        <div className="w-1/12 mt-3">
          <input
            type="checkbox"
            className="checkbox"
            {...register(`lineItems.${index}.taxable`, {
              onChange() {
                updateTotalTax();
              },
            })}
            defaultChecked={isTaxable}
          />
        </div>
      ) : null}
    </div>
  );
}

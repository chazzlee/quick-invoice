import { useEffect } from "react";
import { Textarea, TextInput } from "@/components/Inputs";
import { useInvoiceWatchOne } from "@/features/invoices/hooks/useInvoiceWatchOne";
import { useInvoiceFormContext } from "@/features/invoices/hooks/useInvoiceFormContext";
import { useTax } from "@/features/invoices/hooks/useTax";
import { useDiscount } from "@/features/invoices/hooks/useDiscount";
import Money from "dinero.js";
import { LineRate } from "./LineRate";
import { LineQuantity } from "./LineQuantity";
import { LineAmount } from "./LineAmount";
import { LineTaxCheckbox } from "./LineTaxCheckbox";
import { useShipping } from "@/features/invoices/hooks/useShipping";

type LineItemProps = {
  index: number;
  onRemove(index: number): void;
};

export function LineItem({ index, onRemove }: LineItemProps) {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useInvoiceFormContext();

  const { isTaxable, updateTotalTax } = useTax();
  const { updateTotalDiscount } = useDiscount();
  const { updateTotalShipping } = useShipping();

  const rate = useInvoiceWatchOne(`lineItems.${index}.rate`);
  const quantity = useInvoiceWatchOne(`lineItems.${index}.quantity`);

  useEffect(() => {
    function updateLineAmount(): void {
      const calculatedAmount = Money({ amount: rate }).multiply(quantity);
      setValue(`lineItems.${index}.amount`, calculatedAmount.getAmount());
    }

    function updateSubtotal(): void {
      const subtotal = getValues("lineItems").reduce((acc, prev) => {
        return acc.add(Money({ amount: prev.amount }));
      }, Money({ amount: 0 }));
      setValue("balance.subtotal", subtotal.getAmount());
    }

    updateLineAmount();
    updateSubtotal();
    updateTotalTax();
    updateTotalDiscount();
    updateTotalShipping();
  }, [
    getValues,
    index,
    quantity,
    rate,
    setValue,
    updateTotalDiscount,
    updateTotalTax,
    updateTotalShipping,
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
          classes={`${
            errors.lineItems?.[index]?.description ? "input-error" : ""
          }`}
          {...register(`lineItems.${index}.description`)}
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

      <LineRate index={index} />
      <LineQuantity index={index} />
      <LineAmount index={index} />

      {isTaxable ? (
        <LineTaxCheckbox
          index={index}
          isTaxable={isTaxable}
          onCheck={updateTotalTax}
        />
      ) : null}
    </div>
  );
}

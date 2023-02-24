import { Textarea, TextInput } from "@/components/Inputs";
import { useInvoiceFormContext } from "@/features/invoices/hooks/useInvoiceFormContext";
import { useWatchInvoice } from "@/features/invoices/hooks/useWatchInvoice";
import { DiscountType, LineItem, TaxType } from "@/features/invoices/types";
import { formatCurrency } from "@/utils/formatCurrency";
import { ChangeEvent, useCallback, useEffect } from "react";

type LineItemProps = {
  readonly index: number;
  readonly isTaxable: boolean;
  onUpdate(index: number, value: LineItem): void;
  onRemove(index: number): void;
};

// TODO:
export function LineItem({
  index,
  isTaxable,
  onUpdate,
  onRemove,
}: LineItemProps) {
  const { register, setValue, getValues } = useInvoiceFormContext();
  const taxType = useWatchInvoice("tax.type");

  let rate = useWatchInvoice(`lineItems.${index}.rate`);
  if (Number.isNaN(rate)) {
    rate = 0;
  }

  const subtotal = useWatchInvoice("balance.subtotal");
  const quantity = useWatchInvoice(`lineItems.${index}.quantity`);
  const amount = rate * quantity;

  useEffect(() => {
    setValue(`lineItems.${index}.amount`, amount);
    const subtotal = getValues("lineItems").reduce(
      (acc, prev) => acc + prev.amount,
      0
    );
    setValue("balance.subtotal", subtotal);
  }, [amount, getValues, index, setValue]);

  const calculateTax = (taxType: TaxType) => {
    if (taxType === "on_total") {
      const totalTax = getValues("lineItems")
        .filter((lineItem) => lineItem.taxable)
        .reduce(
          (acc, prev) => acc + prev.amount * (getValues("tax.rate") / 100),
          0
        );
      setValue("balance.totalTax", totalTax);
    } else if (taxType === "deducted") {
      const totalTax = getValues("lineItems")
        .filter((lineItem) => lineItem.taxable)
        .reduce(
          (acc, prev) => acc + prev.amount * (getValues("tax.rate") / 100),
          0
        );
      setValue("balance.totalTax", totalTax * -1);
    }
  };

  useEffect(() => {
    if (getValues("discount.type") === "percent") {
      const discountPercentage = getValues("discount.rate") / 100;
      const totalDiscount = subtotal * discountPercentage;
      setValue("balance.totalDiscount", totalDiscount);
    }
  }, [getValues, setValue, subtotal]);

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
          onChange() {
            calculateTax(taxType);
          },
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
          onChange() {
            calculateTax(taxType);
          },
        })}
      />

      <p className="w-2/12 mt-3 amount">{formatCurrency(amount)}</p>

      {isTaxable ? (
        <div className="w-1/12 mt-3">
          <input
            type="checkbox"
            className="checkbox"
            {...register(`lineItems.${index}.taxable`, {
              onChange(event: ChangeEvent<HTMLInputElement>) {
                calculateTax(taxType);
              },
            })}
            defaultChecked={isTaxable}
          />
        </div>
      ) : null}
    </div>
  );
}

// useEffect(() => {
//   setValue(`lineItems.${index}.amount`, amount);

//   const calculatedSubTotal = getValues("lineItems").reduce(
//     (acc, prev) => acc + prev.amount,
//     0
//   );
//   setValue("balance.subtotal", calculatedSubTotal);

//   const calculatedTax = getValues("lineItems")
//     .filter((lineItem) => lineItem.taxable)
//     .reduce(
//       (acc, prev) => acc + prev.amount * (getValues("tax.rate") / 100),
//       0
//     );

//   if (taxType === "on_total") {
//     setValue("balance.totalTax", calculatedTax);
//   } else if (taxType === "deducted") {
//     setValue("balance.totalTax", calculatedTax * -1);
//   } else {
//     setValue("balance.totalTax", 0);
//   }
// }, [amount, getValues, index, setValue, taxType]);

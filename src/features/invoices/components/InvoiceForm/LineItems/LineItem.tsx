import { useEffect } from "react";
import { Textarea, TextInput } from "@/components/Inputs";
import { useInvoiceFormValues } from "@/features/invoices/hooks/useInvoiceFormValues";
import { useInvoiceFormContext } from "@/features/invoices/hooks/useInvoiceFormContext";
import { useTax } from "@/features/invoices/hooks/useTax";
import { useDiscount } from "@/features/invoices/hooks/useDiscount";
import { NumericFormat } from "react-number-format";
import Money from "dinero.js";
import { replaceNaNWithZero } from "@/utils/replaceNaNWithZero";
import { LineRate } from "./LineRate";
import { LineQuantity } from "./LineQuantity";
import { LineAmount } from "./LineAmount";
import { LineTaxCheckbox } from "./LineTaxCheckbox";

type LineItemProps = {
  readonly index: number;
  onRemove(index: number): void;
};

export function LineItem({ index, onRemove }: LineItemProps) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useInvoiceFormContext();
  const { lineItems } = useInvoiceFormValues();

  const { isTaxable, updateTotalTax } = useTax();
  const { updateTotalDiscount } = useDiscount();

  const rate = watch(`lineItems.${index}.rate`);
  const quantity = watch(`lineItems.${index}.quantity`);

  useEffect(() => {
    function updateLineAmount(): void {
      try {
        const calculatedAmount = Money({ amount: rate }).multiply(quantity);
        setValue(`lineItems.${index}.amount`, calculatedAmount.getAmount());
      } catch (ex) {
        console.error(ex);
      }
    }

    function updateSubtotal(): void {
      try {
        const subtotal = lineItems.reduce((acc, prev) => {
          return acc.add(Money({ amount: prev.amount }));
        }, Money({ amount: 0 }));

        setValue("balance.subtotal", subtotal.getAmount());
      } catch (ex) {
        console.error(ex);
      }
    }

    updateLineAmount();
    updateSubtotal();
    updateTotalTax();
    updateTotalDiscount();
  }, [
    index,
    lineItems,
    quantity,
    rate,
    setValue,
    updateTotalDiscount,
    updateTotalTax,
  ]);

  // TODO:

  // useEffect(() => {
  //   // updateTotalDiscount();
  //   // updateTotalTax();
  // }, [setValue, index, lineItems, quantity, rate]);

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

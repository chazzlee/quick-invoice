import { useEffect } from "react";
import { Textarea, TextInput } from "@/components/Inputs";
import { useInvoiceFormValues } from "@/features/invoices/hooks/useInvoiceFormValues";
import { useInvoiceFormContext } from "@/features/invoices/hooks/useInvoiceFormContext";
import { formatCurrency } from "@/utils/formatCurrency";
import { useTax } from "@/features/invoices/hooks/useTax";
import { useDiscount } from "@/features/invoices/hooks/useDiscount";
import { NumericFormat } from "react-number-format";
import { Controller } from "react-hook-form";
import Money from "dinero.js";

type LineItemProps = {
  readonly index: number;
  onRemove(index: number): void;
};

const replaceNaNWithZero = (value: unknown) => {
  if (!value || Number.isNaN(value)) {
    return 0;
  }
  return value as number;
};

function LineRate({ index }: { index: number }) {
  const { control, getValues, setValue } = useInvoiceFormContext();

  const getRateForDisplay = (valueInCents: number) => {
    const value = replaceNaNWithZero(valueInCents);
    const rateInCents = Money({ amount: value });
    return rateInCents.toUnit();
  };

  const getRateInCents = (floatValue: number) => {
    const value = replaceNaNWithZero(floatValue);
    const valueInCents = Money({ amount: Math.round(value * 100) });
    return valueInCents.getAmount();
  };

  return (
    <Controller
      control={control}
      name={`lineItems.${index}.rate`}
      render={({ field: { name, ref, onChange, value } }) => (
        <NumericFormat
          id={`rate-${index}`}
          getInputRef={ref}
          name={name}
          value={getRateForDisplay(value)}
          onValueChange={(values) =>
            onChange(getRateInCents(values.floatValue ?? 0))
          }
          className="w-2/12 input input-bordered"
          decimalScale={2}
          fixedDecimalScale={true}
          allowNegative={false}
        />
      )}
    />
  );
}

function LineQuantity({ index }: { index: number }) {
  const { register } = useInvoiceFormContext();
  return (
    <TextInput
      id={`quantity-${index}`}
      type="number"
      min={0}
      inputSize="sm"
      width="w-2/12"
      {...register(`lineItems.${index}.quantity`, { valueAsNumber: true })}
    />
  );
}

function LineAmount({ index }: { index: number }) {
  const { watch } = useInvoiceFormContext();
  const amount = watch(`lineItems.${index}.amount`);

  const getAmountForDisplay = (amount: number) => {
    return Money({ amount }).toUnit();
  };

  return (
    <NumericFormat
      displayType="text"
      className="w-2/12 mt-3"
      value={getAmountForDisplay(amount)}
      prefix={"$"}
      decimalScale={2}
      fixedDecimalScale={true}
    />
  );
}

export function LineItem({ index, onRemove }: LineItemProps) {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useInvoiceFormContext();
  const { lineItems } = useInvoiceFormValues();

  const { isTaxable, updateTotalTax } = useTax();
  const { updateTotalDiscount } = useDiscount();

  const { amount } = lineItems[index];

  const rate = watch(`lineItems.${index}.rate`);
  const quantity = watch(`lineItems.${index}.quantity`);

  useEffect(() => {
    const updateAmount = () => {
      console.log("HELO");
      const calculatedAmount = Money({ amount: rate }).multiply(quantity);
      setValue(`lineItems.${index}.amount`, calculatedAmount.getAmount());
    };

    updateAmount();
  }, [index, quantity, rate, setValue]);
  // TODO: MOVE these somewhere else
  // useEffect(() => {
  //   function updateAmount(rate: string, quantity: number) {
  //     let amount = parseFloat(rate || "0") * (quantity || 0);
  //     // setValue(`lineItems.${index}.amount`, amount.toString());
  //   }
  //   function updateSubtotal() {
  //     const subtotal = lineItems
  //       .reduce((acc, prev) => acc + parseFloat(prev.amount), 0)
  //       .toString();
  //     setValue("balance.subtotal", subtotal);
  //   }
  //   // updateAmount(rate, quantity);
  //   updateSubtotal();
  //   updateTotalDiscount();
  //   updateTotalTax();
  // }, [
  //   index,
  //   lineItems,
  //   quantity,
  //   rate,
  //   setValue,
  //   updateTotalDiscount,
  //   updateTotalTax,
  // ]);

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

{
  /* RATE: <Controller
        control={control}
        name={`lineItems.${index}.rate`}
        render={({ field: { name, ref, onChange, value } }) => (
          <NumericFormat
            id={`rate-${index}`}
            getInputRef={ref}
            name={name}
            value={value}
            onValueChange={(values) => {
              onChange(values.formattedValue);
            }}
            onBlur={(e) => {
              if (!e.target.value) {
                setValue(`lineItems.${index}.rate`, NO_LINE_ITEM_RATE);
              }
            }}
            className="w-2/12 input input-bordered"
            decimalScale={2}
            fixedDecimalScale={true}
            placeholder={NO_LINE_ITEM_RATE}
            allowNegative={false}
          />
        )}
      /> */
}

{
  /* Rate : <TextInput
        id={`quantity-${index}`}
        type="number"
        min={0}
        inputSize="sm"
        width="w-2/12"
        {...register(`lineItems.${index}.quantity`, {
          valueAsNumber: true,
          onBlur(event) {
            if (!event.target.value) {
              setValue(`lineItems.${index}.quantity`, 1);
            }
          },
        })}
      /> */
}

//   <p className="w-2/12 mt-3 amount">{formatCurrency(amount)}</p>

import type { ChangeEvent } from "react";
import { FormControl, SelectInput, TextInput } from "@/components/Inputs";
import { useDiscount } from "../../hooks/useDiscount";
import { useInvoiceFormContext } from "../../hooks/useInvoiceFormContext";
import { useTax } from "../../hooks/useTax";
import { selectDiscountTypes, selectTaxTypes } from "../../selectOptions";

export function InvoiceAside() {
  const { register } = useInvoiceFormContext();
  const { isTaxable } = useTax();
  const { isPercentageDiscount, isFlatDiscount } = useDiscount();

  return (
    <aside>
      <div className="color-container">
        <h3>Color</h3>
        <p>choose your color</p>
      </div>

      <div className="pt-8 tax-container">
        <h3 className="font-semibold">Tax</h3>
        <FormControl id="tax-type" label="Type">
          <SelectInput
            selectOptions={selectTaxTypes}
            {...register("tax.type", {
              onChange(event: ChangeEvent<HTMLSelectElement>) {
                // onSelectTaxChange(
                //   event.target.value as InvoiceFormData["tax"]["type"]
                // );
              },
            })}
          />
        </FormControl>
        {isTaxable ? (
          <FormControl id="tax-rate" label="Rate">
            <TextInput
              type="number"
              min={0}
              width="w-1/2"
              {...register("tax.rate", { valueAsNumber: true })}
            />
          </FormControl>
        ) : null}
      </div>

      <div className="pt-8 discount-container">
        <h3 className="font-semibold">Discount</h3>
        <FormControl id="discount" label="Type">
          <SelectInput
            selectOptions={selectDiscountTypes}
            {...register("discount.type")}
          />
        </FormControl>
        {/* TODO:FIXME: */}
        {isPercentageDiscount && (
          <FormControl id="percent" label="Percent">
            <TextInput
              width="w-1/2"
              type="number"
              {...register("discount.rate")}
            />
          </FormControl>
        )}
        {isFlatDiscount && (
          <FormControl id="flat-amount" label="Amount">
            <TextInput
              width="w-1/2"
              type="number"
              {...register("discount.rate", {
                valueAsNumber: true,
                onChange() {
                  // updateTotalDiscount();
                },
              })}
            />
          </FormControl>
        )}
      </div>
    </aside>
  );
}

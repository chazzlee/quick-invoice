import { ChangeEvent, useEffect } from "react";
import { FormControl, SelectInput, TextInput } from "@/components/Inputs";
import { useDiscount } from "../../hooks/useDiscount";
import { useInvoiceFormContext } from "../../hooks/useInvoiceFormContext";
import { useTax } from "../../hooks/useTax";
import { selectDiscountTypes, selectTaxTypes } from "../../selectOptions";
import { useLineItems } from "../../hooks/useLineItems";
import { useBalance } from "../../hooks/useBalance";

export function InvoiceAside() {
  const { register, watch } = useInvoiceFormContext();

  const isTaxable = false;
  const isPercentageDiscount = false;
  const isFlatDiscount = false;

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
              onChange() {},
            })}
          />
        </FormControl>
        {isTaxable ? (
          <FormControl id="tax-rate" label="Rate">
            <TextInput
              type="number"
              min={0}
              width="w-1/2"
              {...register("tax.rate", {
                valueAsNumber: true,
                onChange() {},
              })}
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
              {...register("discount.rate", { valueAsNumber: true })}
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
                onChange() {},
              })}
            />
          </FormControl>
        )}
      </div>
    </aside>
  );
}

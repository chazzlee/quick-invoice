import { type ChangeEvent } from "react";
import { Controller } from "react-hook-form";
import { selectDiscountTypes, selectTaxTypes } from "../../selectOptions";
import { FormControl, SelectInput, TextInput } from "@/components/Inputs";
import { useInvoiceFormContext } from "../../hooks/useInvoiceFormContext";
import { useTax } from "../../hooks/useTax";
import { useDiscount } from "../../hooks/useDiscount";
import type { DiscountType, TaxType } from "../../types";
import { useInvoiceFieldArray } from "../../hooks/useInvoiceFieldArray";
import { useInvoiceFormValues } from "../../hooks/useInvoiceFormValues";
import { NumericFormat, PatternFormat } from "react-number-format";
import {
  NO_DISCOUNT_FLAT,
  NO_DISCOUNT_RATE,
  NO_TAX_RATE,
  NO_TOTAL,
} from "@/schemas";

export function InvoiceAside() {
  const {
    register,
    setValue,
    control,
    getValues,
    resetField,
    formState: { errors },
  } = useInvoiceFormContext();
  const taxRateInput = register("tax.rate");

  const { lineItems } = useInvoiceFormValues();
  const { replace } = useInvoiceFieldArray();
  const { taxRate, isTaxable, updateTotalTax } = useTax();

  const { isFlatDiscount, isPercentageDiscount, discountRate } = useDiscount();

  return (
    <aside>
      <div className="sticky top-0">
        <div className="color-container">
          <h3>Color</h3>
          <p>choose your color</p>
        </div>

        {/* Tax */}
        <div className="pt-8 tax-container">
          <h3 className="font-semibold">Tax</h3>
          <FormControl id="tax-type" label="Type">
            <SelectInput
              selectOptions={selectTaxTypes}
              {...register("tax.kind", {
                onChange(event: ChangeEvent<HTMLSelectElement>) {
                  const taxType = event.target.value as TaxType;
                  if (taxType === "no_tax") {
                    replace(
                      lineItems.map((item) => ({ ...item, taxable: false }))
                    );
                    setValue("tax.rate", NO_TAX_RATE);
                    setValue("balance.totalTax", NO_TOTAL);
                  } else {
                    replace(
                      lineItems.map((item) => ({ ...item, taxable: true }))
                    );

                    if (parseFloat(taxRate) > 0) {
                      updateTotalTax();
                    }
                  }
                },
              })}
            />
          </FormControl>
          {isTaxable ? (
            <FormControl
              id="tax-rate"
              label="Rate"
              error={errors.tax?.rate?.message}
            >
              <Controller
                control={control}
                name="tax.rate"
                render={({
                  field: { onChange, name, value, ref },
                  fieldState: { error },
                }) => (
                  <NumericFormat
                    className={`input input-bordered w-1/2 ${
                      error ? "input-error" : ""
                    }`}
                    defaultValue={NO_TAX_RATE}
                    suffix={"%"}
                    decimalScale={3}
                    getInputRef={ref}
                    name={name}
                    value={value}
                    placeholder={NO_TAX_RATE}
                    onValueChange={(values) => onChange(values.formattedValue)}
                    onBlur={() => {
                      if (!taxRate) {
                        setValue("tax.rate", NO_TAX_RATE);
                      }
                    }}
                  />
                )}
              />
            </FormControl>
          ) : null}
        </div>

        {/* Discount */}
        <div className="pt-8 discount-container">
          <h3 className="font-semibold">Discount</h3>
          <FormControl id="discount" label="Type">
            <SelectInput
              selectOptions={selectDiscountTypes}
              {...register("discount.kind", {
                onChange(event: ChangeEvent<HTMLSelectElement>) {
                  resetField("discount.rate");
                },
              })}
            />
          </FormControl>

          {isPercentageDiscount && (
            <FormControl
              id="percent"
              label="Percent"
              error={errors.discount?.rate?.message}
            >
              <Controller
                control={control}
                name="discount.rate"
                render={({
                  field: { onChange, name, ref, value },
                  fieldState: { error },
                }) => (
                  <NumericFormat
                    className={`input input-bordered w-1/2 ${
                      error ? "input-error" : ""
                    }`}
                    defaultValue={NO_DISCOUNT_RATE}
                    placeholder={NO_DISCOUNT_RATE}
                    suffix={"%"}
                    decimalScale={2}
                    getInputRef={ref}
                    name={name}
                    value={value}
                    onValueChange={(values) => onChange(values.formattedValue)}
                    onBlur={(event) => {
                      if (!event.target.value) {
                        setValue("discount.rate", NO_DISCOUNT_RATE);
                      }
                    }}
                  />
                )}
              />
            </FormControl>
          )}
          {isFlatDiscount && (
            <FormControl
              id="flat-amount"
              label="Amount"
              error={errors.discount?.rate?.message}
            >
              <Controller
                control={control}
                name="discount.rate"
                render={({
                  field: { onChange, name, value, ref },
                  fieldState: { error },
                }) => (
                  <NumericFormat
                    className={`input input-bordered w-1/2 ${
                      error ? "input-error" : ""
                    }`}
                    getInputRef={ref}
                    name={name}
                    value={value}
                    onValueChange={(values) => onChange(values.formattedValue)}
                    onBlur={(event) => {
                      if (!event.target.value) {
                        setValue("discount.rate", NO_DISCOUNT_FLAT);
                      }
                    }}
                    decimalScale={2}
                    defaultValue={NO_DISCOUNT_FLAT}
                    placeholder={NO_DISCOUNT_FLAT}
                  />
                )}
              />
            </FormControl>
          )}
        </div>
      </div>
    </aside>
  );
}

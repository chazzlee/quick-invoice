import { type ChangeEvent } from "react";
import { selectDiscountTypes, selectTaxTypes } from "../../selectOptions";
import { FormControl, SelectInput, TextInput } from "@/components/Inputs";
import { useInvoiceFormContext } from "../../hooks/useInvoiceFormContext";
import { useTax } from "../../hooks/useTax";
import { useDiscount } from "../../hooks/useDiscount";
import type { DiscountType, TaxType } from "../../types";
import { useInvoiceFieldArray } from "../../hooks/useInvoiceFieldArray";
import { useInvoiceFormValues } from "../../hooks/useInvoiceFormValues";

export function InvoiceAside() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useInvoiceFormContext();
  const { lineItems } = useInvoiceFormValues();
  const { replace } = useInvoiceFieldArray();
  const { taxRate, isTaxable, updateTotalTax } = useTax();

  const { isFlatDiscount, isPercentageDiscount } = useDiscount();

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
              {...register("tax.type", {
                onChange(event: ChangeEvent<HTMLSelectElement>) {
                  const taxType = event.target.value as TaxType;
                  if (taxType !== "no_tax") {
                    replace(
                      lineItems.map((item) => ({ ...item, taxable: true }))
                    );
                    if (taxRate > 0) {
                      updateTotalTax();
                    }
                  } else {
                    replace(
                      lineItems.map((item) => ({ ...item, taxable: false }))
                    );
                    setValue("tax.rate", 0);
                    setValue("balance.totalTax", 0);
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
              <TextInput
                type="number"
                min={0}
                width="w-1/2"
                {...register("tax.rate", {
                  valueAsNumber: true,
                  required: {
                    value: isTaxable,
                    message: "tax rate is required",
                  },
                  min: { value: 1, message: "tax rate must be greater than 0" },
                })}
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
              {...register("discount.type", {
                onChange(event: ChangeEvent<HTMLSelectElement>) {
                  if ((event.target.value as DiscountType) === "no_discount") {
                    setValue("discount.rate", 0);
                  }
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
              <TextInput
                width="w-1/2"
                type="number"
                {...register("discount.rate", {
                  required: {
                    value: isPercentageDiscount,
                    message: "discount percentage is required",
                  },
                  valueAsNumber: true,
                })}
              />
            </FormControl>
          )}
          {isFlatDiscount && (
            <FormControl
              id="flat-amount"
              label="Amount"
              error={errors.discount?.rate?.message}
            >
              <TextInput
                width="w-1/2"
                type="number"
                {...register("discount.rate", {
                  required: {
                    value: isFlatDiscount,
                    message: "discount amount is required",
                  },
                  valueAsNumber: true,
                })}
              />
            </FormControl>
          )}
        </div>
      </div>
    </aside>
  );
}

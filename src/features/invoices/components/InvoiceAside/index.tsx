import { FormControl, SelectInput, TextInput } from "@/components/Inputs";
import { selectDiscountTypes, selectTaxTypes } from "../../selectOptions";
import { useInvoiceFormContext } from "../../hooks/useInvoiceFormContext";
import { useWatchInvoice } from "../../hooks/useWatchInvoice";
import { ChangeEvent } from "react";
import { DiscountType, TaxType } from "../../types";

// TODO: need to reset discount to 0 on none

export function InvoiceAside() {
  const { register, setValue, getValues, resetField } = useInvoiceFormContext();
  const isTaxable = useWatchInvoice("tax.type") !== "no_tax";

  // FIXME: TODO:
  const discountType = useWatchInvoice("discount.type");
  const isPercentageDiscount = discountType === "percent";
  const isFlatDiscount = discountType === "flat_amount";

  return (
    <aside>
      <div className="sticky top-0">
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
                  const taxType = event.target.value as TaxType;
                  if (taxType === "no_tax") {
                    setValue(
                      "lineItems",
                      getValues("lineItems").map((item) => ({
                        ...item,
                        taxable: false,
                      }))
                    );
                    setValue("tax.rate", 0);
                    setValue("balance.totalTax", 0);
                  } else if (taxType === "on_total") {
                    setValue(
                      "lineItems",
                      getValues("lineItems").map((item) => ({
                        ...item,
                        taxable: true,
                      }))
                    );

                    const totalTax = getValues("lineItems")
                      .filter((lineItem) => lineItem.taxable)
                      .reduce(
                        (acc, prev) =>
                          acc + prev.amount * (getValues("tax.rate") / 100),
                        0
                      );
                    setValue("balance.totalTax", totalTax);
                  } else if (taxType === "deducted") {
                    setValue(
                      "lineItems",
                      getValues("lineItems").map((item) => ({
                        ...item,
                        taxable: true,
                      }))
                    );
                    const totalTax = getValues("lineItems")
                      .filter((lineItem) => lineItem.taxable)
                      .reduce(
                        (acc, prev) =>
                          acc + prev.amount * (getValues("tax.rate") / 100),
                        0
                      );
                    setValue("balance.totalTax", totalTax * -1);
                  }
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
                {...register("tax.rate", {
                  valueAsNumber: true,
                  onChange() {
                    const taxType = getValues("tax.type");
                    if (taxType === "on_total") {
                      const totalTax = getValues("lineItems")
                        .filter((lineItem) => lineItem.taxable)
                        .reduce(
                          (acc, prev) =>
                            acc + prev.amount * (getValues("tax.rate") / 100),
                          0
                        );
                      setValue("balance.totalTax", totalTax);
                    } else if (taxType === "deducted") {
                      const totalTax = getValues("lineItems")
                        .filter((lineItem) => lineItem.taxable)
                        .reduce(
                          (acc, prev) =>
                            acc + prev.amount * (getValues("tax.rate") / 100),
                          0
                        );
                      setValue("balance.totalTax", totalTax * -1);
                    }
                  },
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
              {...register("discount.type", {
                onChange(event) {
                  if ((event.target.value as DiscountType) === "flat_amount") {
                    const discountValue = getValues("discount.rate");
                    setValue("balance.totalDiscount", discountValue);
                  } else if (
                    (event.target.value as DiscountType) === "percent"
                  ) {
                    const discountPercentage = getValues("discount.rate") / 100;
                    const totalDiscount =
                      getValues("balance.subtotal") * discountPercentage;
                    setValue("balance.totalDiscount", totalDiscount);
                  } else {
                    setValue("discount.rate", 0);
                    setValue("balance.totalDiscount", 0);
                  }
                },
              })}
            />
          </FormControl>

          {isPercentageDiscount && (
            <FormControl id="percent" label="Percent">
              <TextInput
                width="w-1/2"
                type="number"
                {...register("discount.rate", {
                  valueAsNumber: true,
                  onChange(event) {
                    const discountPercentage =
                      parseInt(event.target.value, 10) / 100;
                    const totalDiscount =
                      getValues("balance.subtotal") * discountPercentage;
                    setValue("balance.totalDiscount", totalDiscount);
                  },
                })}
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
                  onChange(event) {
                    const discountValue = parseInt(event.target.value, 10);
                    setValue("balance.totalDiscount", discountValue);
                  },
                })}
              />
            </FormControl>
          )}
        </div>
      </div>
    </aside>
  );
}

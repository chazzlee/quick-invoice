import { FormControl, SelectInput, TextInput } from "@/components/Inputs";
import { ChangeEvent } from "react";
import { useWatch } from "react-hook-form";
import { useInvoiceFormContext } from "../../hooks/useInvoiceFormContext";
import { InvoiceFormData } from "../../types";

export function InvoiceAside() {
  const { register } = useInvoiceFormContext();
  const taxType = useWatch<InvoiceFormData, "tax.type">({
    name: "tax.type",
    defaultValue: "no_tax",
  });

  const discountType = useWatch<InvoiceFormData, "discount.type">({
    name: "discount.type",
    defaultValue: "no_discount",
  });

  const isTaxable = taxType !== "no_tax";
  const isPercentageDiscount = discountType === "percent";
  const isFlatDiscount = discountType === "flat_amount";

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
            selectOptions={[
              { label: "On total", value: "on_total" },
              { label: "Deducted", value: "deducted" },
              { label: "Per item", value: "per_item" },
              { label: "None", value: "no_tax" },
            ]}
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
            selectOptions={[
              { label: "None", value: "no_discount" },
              { label: "Percent", value: "percent" },
              { label: "Flat amount", value: "flat_amount" },
            ]}
            {...register("discount.type")}
          />
        </FormControl>
        {isPercentageDiscount && (
          <FormControl id="percent" label="Percent">
            <TextInput
              width="w-1/2"
              type="number"
              {...register("discount.value")}
            />
          </FormControl>
        )}
        {isFlatDiscount && (
          <FormControl id="flat-amount" label="Amount">
            <TextInput
              width="w-1/2"
              type="number"
              {...register("discount.value", {
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

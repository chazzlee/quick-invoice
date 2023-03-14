import { Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { selectShippingTypes } from "../../selectOptions";
import { FormControl, SelectInput } from "@/components/Inputs";
import { useInvoiceFormContext } from "../../hooks/useInvoiceFormContext";
import { useInvoiceWatchOne } from "../../hooks/useInvoiceWatchOne";
import { NO_SHIPPING_FLAT, NO_SHIPPING_RATE } from "@/schemas";

import { TaxComboBox } from "./TaxComboBox";
import { DiscountComboBox } from "./DiscountComboBox";

export function InvoiceAside() {
  const {
    register,
    setValue,
    control,
    getValues,
    resetField,
    formState: { errors },
  } = useInvoiceFormContext();

  const shippingType = useInvoiceWatchOne("shipping.kind");
  const isFlatShipping = shippingType === "flat_amount";
  const isPercentageShipping = shippingType === "percent";

  return (
    <aside>
      <div className="sticky top-0">
        <div className="color-container">
          <h3>Color</h3>
          <p>choose your color</p>
        </div>

        {/* Tax */}
        <TaxComboBox />

        {/* Discount */}
        <DiscountComboBox />

        {/* Shipping */}
        <div className="pt-8 shipping-container">
          <h3 className="font-semibold">Shipping</h3>
          <FormControl id="shipping-type" label="Shipping">
            <SelectInput
              selectOptions={selectShippingTypes}
              {...register("shipping.kind", {
                onChange(event) {
                  if (event.target.value === "no_shipping") {
                    resetField("shipTo");
                  }
                },
              })}
            />
          </FormControl>

          {isPercentageShipping && (
            <FormControl
              id="shipping-percent"
              label="Percent"
              error={errors.shipping?.rate?.message}
            >
              <Controller
                control={control}
                name="shipping.rate"
                render={({
                  field: { onChange, name, ref, value },
                  fieldState: { error },
                }) => (
                  <NumericFormat
                    className={`input input-bordered w-1/2 ${
                      error ? "input-error" : ""
                    }`}
                    defaultValue={NO_SHIPPING_RATE}
                    placeholder={NO_SHIPPING_RATE}
                    suffix={"%"}
                    decimalScale={2}
                    getInputRef={ref}
                    name={name}
                    value={value}
                    onValueChange={(values) => onChange(values.formattedValue)}
                    onBlur={(event) => {
                      if (!event.target.value) {
                        setValue("shipping.rate", NO_SHIPPING_RATE);
                      }
                    }}
                  />
                )}
              />
            </FormControl>
          )}

          {isFlatShipping && (
            <FormControl
              id="shipping-flat-amount"
              label="Amount"
              error={errors.shipping?.rate?.message}
            >
              <Controller
                control={control}
                name="shipping.rate"
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
                        setValue("shipping.rate", NO_SHIPPING_FLAT);
                      }
                    }}
                    decimalScale={2}
                    defaultValue={NO_SHIPPING_FLAT}
                    placeholder={NO_SHIPPING_FLAT}
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

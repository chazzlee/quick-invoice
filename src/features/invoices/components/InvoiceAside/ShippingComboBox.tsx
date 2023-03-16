import { type ChangeEvent } from "react";
import { FormControl } from "@/components/Inputs";
import { Controller } from "react-hook-form";
import { useInvoiceFormContext } from "../../hooks/useInvoiceFormContext";
import { useShipping } from "../../hooks/useShipping";
import { selectShippingTypes } from "../../selectOptions";
import { ComboBox } from "./ComboBox";
import { PercentageInput } from "@/components/Inputs/PercentageInput";
import { NumberInput } from "@/components/Inputs/NumberInput";
import { ShippingType } from "../../types";
import {
  valueInCentsFromPercentage,
  valueInPercentageFloatFromCents,
} from "@/utils/formats";

export function ShippingComboBox() {
  const {
    control,
    setValue,
    formState: { errors },
  } = useInvoiceFormContext();

  const { shippingRate, isFlatShipping, isPercentageShipping } = useShipping();
  const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value as ShippingType) {
      case "flat_amount": {
        setValue("shipping.rate", valueInCentsFromPercentage(shippingRate));
        break;
      }
      case "percent": {
        setValue(
          "shipping.rate",
          valueInPercentageFloatFromCents(shippingRate)
        );
        break;
      }
      case "free":
      case "none":
        setValue("shipping.rate", 0);
        break;

      default:
        throw new Error("Invalid shipping type!");
    }
  };

  return (
    <ComboBox
      id="shipping-type"
      name="shipping.kind"
      title="Shipping"
      selectOptions={selectShippingTypes}
      onSelectChange={onSelectChange}
    >
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
              <PercentageInput
                ref={ref}
                name={name}
                value={value}
                decimalScale={2}
                hasError={!!error}
                onChange={onChange}
                onBlur={() => {}}
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
              <NumberInput
                ref={ref}
                hasError={!!error}
                name={name}
                width={6}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </FormControl>
      )}
    </ComboBox>
  );
}

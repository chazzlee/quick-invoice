import type { ChangeEvent } from "react";
import { FormControl } from "@/components/Inputs";
import { NumberInput } from "@/components/Inputs/NumberInput";
import { PercentageInput } from "@/components/Inputs/PercentageInput";
import {
  valueInCentsFromPercentage,
  valueInPercentageFloatFromCents,
} from "@/utils/formats";
import { Controller } from "react-hook-form";
import { useDiscount } from "../../hooks/useDiscount";
import { useInvoiceFormContext } from "../../hooks/useInvoiceFormContext";
import { selectDiscountTypes } from "../../selectOptions";
import type { DiscountType } from "../../types";
import { ComboBox } from "./ComboBox";

export function DiscountComboBox() {
  const {
    control,
    setValue,
    formState: { errors },
  } = useInvoiceFormContext();

  const { isFlatDiscount, isPercentageDiscount, discountRate } = useDiscount();
  const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value as DiscountType) {
      case "flat_amount": {
        setValue("discount.rate", valueInCentsFromPercentage(discountRate));
        break;
      }
      case "percent": {
        setValue(
          "discount.rate",
          valueInPercentageFloatFromCents(discountRate)
        );
        break;
      }
      case "none": {
        setValue("discount.rate", 0);
        break;
      }
      default:
        throw new Error("Invalid discount type!");
    }
  };

  return (
    <ComboBox
      id="discount-type"
      name="discount.kind"
      title="Discount"
      selectOptions={selectDiscountTypes}
      onSelectChange={onSelectChange}
    >
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
              <PercentageInput
                ref={ref}
                name={name}
                value={value}
                hasError={!!error}
                decimalScale={2}
                onChange={onChange}
                onBlur={() => {
                  console.log("maybe need to do something?");
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

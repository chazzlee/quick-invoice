import type { ChangeEvent } from "react";
import type { TaxType } from "../../types";
import { Controller } from "react-hook-form";
import { FormControl, PercentageInput } from "@/components/Inputs";
import { selectTaxTypes } from "../../selectOptions";
import { useTax } from "../../hooks/useTax";
import { useInvoiceFormContext } from "../../hooks/useInvoiceFormContext";
import { useInvoiceFieldArray } from "../../hooks/useInvoiceFieldArray";
import { ComboBox } from "./ComboBox";

export function TaxComboBox() {
  const { replace } = useInvoiceFieldArray();

  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useInvoiceFormContext();
  const { taxRate, isTaxable, updateTotalTax } = useTax();

  const onSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const taxType = event.target.value as TaxType;
    if (taxType === "none") {
      replace(
        getValues("lineItems").map((item) => ({
          ...item,
          taxable: false,
        }))
      );
      setValue("tax.rate", 0);
      setValue("balance.totalTax", 0);
    } else {
      replace(
        getValues("lineItems").map((item) => ({
          ...item,
          taxable: true,
        }))
      );

      if (taxRate > 0) {
        updateTotalTax();
      }
    }
  };

  return (
    <ComboBox
      id="tax-type"
      name="tax.kind"
      title="Tax"
      selectOptions={selectTaxTypes}
      onSelectChange={onSelectChange}
    >
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
              <PercentageInput
                ref={ref}
                name={name}
                value={value}
                decimalScale={3}
                hasError={!!error}
                onChange={onChange}
                onBlur={() => {
                  if (!taxRate) {
                    setValue("tax.rate", 0);
                  }
                }}
              />
            )}
          />
        </FormControl>
      ) : null}
    </ComboBox>
  );
}

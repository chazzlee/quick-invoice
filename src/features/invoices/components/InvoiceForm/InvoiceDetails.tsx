import { FormControl, SelectInput, TextInput } from "@/components/Inputs";
import { useWatch } from "react-hook-form";
import { useInvoiceFormValues } from "../../hooks/useInvoiceFormValues";
import { useInvoiceFormContext } from "../../hooks/useInvoiceFormContext";
import { selectTerms } from "../../selectOptions";
import type { TermsType } from "../../types";

const SAMPLE_30_DAYS = "2023-06-01";
const SAMPLE_60_DAYS = "2023-07-20";

export function InvoiceDetails() {
  const { register, setValue } = useInvoiceFormContext();
  const { invoice } = useInvoiceFormValues();
  const termsType = invoice.terms.type;
  const hasDueDate = termsType !== "on_receipt";

  return (
    <div className="invoice-details">
      <FormControl id="invoice-number" label="Number">
        <TextInput width="w-1/2" {...register("invoice.number")} />
      </FormControl>
      <FormControl id="invoice-date" label="Date">
        <TextInput type="date" width="w-1/2" {...register("invoice.date")} />
      </FormControl>
      <FormControl id="invoice-terms" label="Terms">
        <SelectInput
          defaultLabel="Choose terms"
          selectOptions={selectTerms}
          {...register("invoice.terms.type", {
            onChange(event) {
              const termsType = event.target.value as TermsType;
              if (termsType === "30_days") {
                setValue("invoice.terms.dueDate", SAMPLE_30_DAYS);
              } else if (termsType === "60_days") {
                setValue("invoice.terms.dueDate", SAMPLE_60_DAYS);
              } else {
                setValue("invoice.terms.dueDate", "");
              }
            },
          })}
        />
      </FormControl>
      {hasDueDate ? (
        <FormControl id="due-date" label="Due date">
          <TextInput
            type="date"
            width="w-1/2"
            {...register("invoice.terms.dueDate")}
          />
        </FormControl>
      ) : null}
    </div>
  );
}

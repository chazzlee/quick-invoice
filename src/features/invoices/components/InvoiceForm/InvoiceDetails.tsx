import { FormControl, SelectInput, TextInput } from "@/components/Inputs";
import { useInvoiceWatchOne } from "../../hooks/useInvoiceFormValues";
import { useInvoiceFormContext } from "../../hooks/useInvoiceFormContext";
import { selectTerms } from "../../selectOptions";
import type { TermsType } from "../../types";
import { addDays, formatISO, startOfToday } from "date-fns";

const getDueDate = (termsType: TermsType): string => {
  if (termsType === "custom") {
    return formatISO(startOfToday(), { representation: "date" });
  }
  const daysToAdd = parseInt(termsType, 10);
  return formatISO(addDays(startOfToday(), daysToAdd), {
    representation: "date",
  });
};

export function InvoiceDetails() {
  const { register, setValue } = useInvoiceFormContext();

  const termsType = useInvoiceWatchOne("invoice.terms.type");
  const hasDueDate = termsType !== "0_days";

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
              setValue("invoice.terms.dueDate", getDueDate(termsType));
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

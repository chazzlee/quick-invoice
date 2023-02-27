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
  const {
    register,
    setValue,
    trigger,
    formState: { errors },
  } = useInvoiceFormContext();

  const termsType = useInvoiceWatchOne("invoice.terms.type");
  const hasDueDate = termsType !== "0_days";

  return (
    <div className="invoice-details">
      <FormControl
        id="invoice-number"
        label="Number"
        error={errors.invoice?.number?.message}
      >
        <TextInput
          width="w-1/2"
          {...register("invoice.number", {
            required: { value: true, message: "invoice number is required" },
          })}
        />
      </FormControl>
      <FormControl
        id="invoice-date"
        label="Date"
        error={errors.invoice?.date?.message}
      >
        <TextInput
          type="date"
          width="w-1/2"
          {...register("invoice.date", {
            required: { value: true, message: "invoice date is required" },
          })}
        />
      </FormControl>
      <FormControl id="invoice-terms" label="Terms">
        <SelectInput
          defaultLabel="Choose terms"
          selectOptions={selectTerms}
          {...register("invoice.terms.type", {
            onChange(event) {
              const termsType = event.target.value as TermsType;
              setValue("invoice.terms.dueDate", getDueDate(termsType));
              if (hasDueDate) {
                trigger("invoice.terms.dueDate");
              }
            },
          })}
        />
      </FormControl>
      {hasDueDate ? (
        <FormControl
          id="due-date"
          label="Due date"
          error={errors.invoice?.terms?.dueDate?.message}
        >
          <TextInput
            type="date"
            width="w-1/2"
            {...register("invoice.terms.dueDate", {
              required: { value: hasDueDate, message: "Due date is required" },
            })}
          />
        </FormControl>
      ) : null}
    </div>
  );
}

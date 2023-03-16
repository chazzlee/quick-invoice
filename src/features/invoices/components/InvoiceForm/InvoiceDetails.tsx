import { FormControl, SelectInput, TextInput } from "@/components/Inputs";
import { useInvoiceWatchOne } from "../../hooks/useInvoiceWatchOne";
import { useInvoiceFormContext } from "../../hooks/useInvoiceFormContext";
import { selectTerms } from "../../selectOptions";
import type { TermsType } from "../../types";
import { addDays, formatISO, startOfToday } from "date-fns";

// TODO: include day of?
const getDueDate = (termsType: TermsType, start: Date) => {
  if (termsType === "custom") {
    return formatISO(start, { representation: "date" });
  }
  const daysToAdd = parseInt(termsType, 10);

  return formatISO(addDays(start, daysToAdd), {
    representation: "date",
  });
};

export function InvoiceDetails() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useInvoiceFormContext();

  const termsType = useInvoiceWatchOne("invoice.terms.kind");
  const date = useInvoiceWatchOne("invoice.date");
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
          classes={`${errors.invoice?.number ? "input-error" : ""}`}
          {...register("invoice.number")}
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
          classes={`${errors.invoice?.date ? "input-error" : ""}`}
          {...register("invoice.date", {
            valueAsDate: false,
            onChange(event) {
              if (hasDueDate) {
                setValue(
                  "invoice.terms.dueDate",
                  getDueDate(termsType, new Date(event.target.value))
                );
              }
            },
          })}
        />
      </FormControl>
      <FormControl id="invoice-terms" label="Terms">
        <SelectInput
          defaultLabel="Choose terms"
          classes={`${errors.invoice?.terms?.kind ? "input-error" : ""}`}
          selectOptions={selectTerms}
          {...register("invoice.terms.kind", {
            onChange(event) {
              const termsType = event.target.value as TermsType;
              // TODO: FIXME:
              setValue(
                "invoice.terms.dueDate",
                getDueDate(termsType, new Date(date))
              );
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
            classes={`${errors.invoice?.terms?.dueDate ? "input-error" : ""}`}
            width="w-1/2"
            {...register("invoice.terms.dueDate", { valueAsDate: false })}
          />
        </FormControl>
      ) : null}
    </div>
  );
}

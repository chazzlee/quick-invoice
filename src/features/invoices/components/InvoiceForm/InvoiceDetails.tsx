import { FormControl, SelectInput, TextInput } from "@/components/Inputs";
import { useWatch } from "react-hook-form";
import { useInvoiceFormContext } from "../../hooks/useInvoiceFormContext";
import { useWatchInvoice } from "../../hooks/useWatchInvoice";
import { selectTerms } from "../../selectOptions";
import type { InvoiceFormData } from "../../types";

export function InvoiceDetails() {
  const { register } = useInvoiceFormContext();
  const termsType = useWatchInvoice("invoice.terms.type");
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
          {...register("invoice.terms.type")}
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

import { FormControl, SelectInput, TextInput } from "@/components/Inputs";
import { useInvoiceFormContext } from "../../hooks/useInvoiceFormContext";
import { useTerms } from "../../hooks/useTerms";
import { selectTerms } from "../../selectOptions";

export function InvoiceDetails() {
  const { register } = useInvoiceFormContext();
  const { hasDueDate } = useTerms();

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

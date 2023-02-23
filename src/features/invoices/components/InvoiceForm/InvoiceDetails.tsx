import { FormControl, SelectInput, TextInput } from "@/components/Inputs";
import { useInvoiceFormContext } from "../../hooks/useInvoiceFormContext";

export function InvoiceDetails() {
  const { register, watch } = useInvoiceFormContext();
  const termsType = watch("invoice.terms.type");
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
          selectOptions={[
            { value: "on_receipt", label: "On receipt" },
            { value: "30_days", label: "30 days" },
            { value: "60_days", label: "60 days" },
          ]}
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

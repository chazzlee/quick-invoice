import { FormControl, Textarea } from "@/components/Inputs";
import { useInvoiceFormContext } from "../../hooks/useInvoiceFormContext";

export function ExtraNotes() {
  const { register } = useInvoiceFormContext();

  return (
    <div className="notes-container">
      <FormControl id="notes" label="Notes">
        <Textarea
          placeholder="Notes - additional terms and conditions"
          {...register("notes")}
        />
      </FormControl>
    </div>
  );
}

import { FormControl, TextInput } from "@/components/Inputs";
import { useInvoiceFormContext } from "../../hooks/useInvoiceFormContext";

export function InvoiceTitle() {
  const { register } = useInvoiceFormContext();

  return (
    <FormControl id="title" label="Invoice title">
      <TextInput {...register("title")} classes="text-xl font-semibold" />
    </FormControl>
  );
}

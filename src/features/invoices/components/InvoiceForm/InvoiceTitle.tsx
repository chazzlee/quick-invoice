import { FormControl, TextInput } from "@/components/Inputs";
import { useInvoiceFormContext } from "../../hooks/useInvoiceFormContext";

export function InvoiceTitle() {
  const {
    register,
    formState: { errors },
  } = useInvoiceFormContext();

  return (
    <FormControl id="title" label="Invoice title" error={errors.title?.message}>
      <TextInput
        {...register("title")}
        classes={`text-xl font-semibold ${errors.title ? "input-error" : ""}`}
      />
    </FormControl>
  );
}

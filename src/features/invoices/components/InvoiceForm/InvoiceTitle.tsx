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
        {...register("title", {
          required: { value: true, message: "Invoice title is required" },
          maxLength: {
            value: 50,
            message: "Invoice title cannot exceed 50 characters",
          },
        })}
        classes="text-xl font-semibold"
      />
    </FormControl>
  );
}

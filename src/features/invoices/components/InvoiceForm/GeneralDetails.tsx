import { FormControl, TextInput } from "@/components/Inputs";
import { useInvoiceFormContext } from "../../hooks/useInvoiceFormContext";

type GeneralDetailsProps = {
  title: "from" | "to";
};

const generalFields = [
  { name: "name", type: "text", required: true },
  { name: "email", type: "email", required: true },
  { name: "phone", type: "tel", required: true },
] as const;

export function GeneralDetails({ title }: GeneralDetailsProps) {
  const {
    register,
    formState: { errors },
  } = useInvoiceFormContext();

  return (
    <div className="general-details">
      <h3 className="text-xl font-semibold capitalize">
        {title === "to" ? "bill to" : title}
      </h3>
      {generalFields.map((field) => (
        <FormControl
          key={`${title}-${field.name}`}
          id={`${title}-${field.name}`}
          label={field.name}
          error={errors?.[title]?.[field.name]?.message}
        >
          <TextInput
            type={field.type}
            classes={`${errors?.[title]?.[field.name] ? "input-error" : ""}`}
            {...register(`${title}.${field.name}`)}
          />
        </FormControl>
      ))}
    </div>
  );
}

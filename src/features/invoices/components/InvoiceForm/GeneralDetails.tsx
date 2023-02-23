import { FormControl, TextInput } from "@/components/Inputs";
import { useInvoiceFormContext } from "../../hooks/useInvoiceFormContext";

type GeneralDetailsProps = {
  title: "from" | "to";
};

const generalFields = ["name", "email", "phone"] as const;

export function GeneralDetails({ title }: GeneralDetailsProps) {
  const { register } = useInvoiceFormContext();

  return (
    <div className="general-details">
      <h3 className="text-xl font-semibold capitalize">
        {title === "to" ? "bill to" : title}
      </h3>
      {generalFields.map((field) => (
        <FormControl
          key={`${title}-${field}`}
          id={`${title}-${field}`}
          label={field}
        >
          <TextInput {...register(`${title}.${field}`)} />
        </FormControl>
      ))}
    </div>
  );
}

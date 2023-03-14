import type { ReactNode, ChangeEvent } from "react";
import type { SelectOption } from "../../selectOptions";
import { FieldPath } from "react-hook-form";
import { useInvoiceFormContext } from "../../hooks/useInvoiceFormContext";
import { InvoiceFormSchema } from "@/schemas";
import { FormControl, SelectInput } from "@/components/Inputs";

type ComboBoxProps = {
  id: string;
  title: string;
  name: FieldPath<InvoiceFormSchema>;
  selectOptions: SelectOption[];
  onSelectChange(event: ChangeEvent<HTMLSelectElement>): void;
  children: ReactNode;
};

export function ComboBox({
  id,
  title,
  name,
  selectOptions,
  onSelectChange,
  children,
}: ComboBoxProps) {
  const { register } = useInvoiceFormContext();

  return (
    <div className="pt-8">
      <h3 className="font-semibold">{title}</h3>
      <FormControl id={id} label="Type">
        <SelectInput
          selectOptions={selectOptions}
          {...register(name, {
            onChange(event) {
              onSelectChange(event);
            },
          })}
        />
      </FormControl>
      {children}
    </div>
  );
}

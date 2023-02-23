import { FormControl, SelectInput, TextInput } from "@/components/Inputs";
import { useInvoiceFormContext } from "../../hooks/useInvoiceFormContext";

type AddressDetailsProps = { id: "from" | "to" };

export function AddressDetails({ id }: AddressDetailsProps) {
  const { register } = useInvoiceFormContext();

  return (
    <div className="address">
      <h3 className="font-semibold capitalize">Address</h3>
      <FormControl id={`${id}-street`} label="Street">
        <TextInput {...register(`${id}.address.street`)} />
      </FormControl>
      <FormControl id={`${id}-city`} label="City">
        <TextInput {...register(`${id}.address.city`)} />
      </FormControl>
      <div className="flex">
        <FormControl id={`${id}-state`} label="State">
          <SelectInput
            selectOptions={[]}
            defaultLabel="Choose state"
            {...register(`${id}.address.state`)}
          />
        </FormControl>
        <FormControl id={`${id}-zipCode`} label="Zip code">
          <TextInput width="w-1/2" {...register(`${id}.address.zipCode`)} />
        </FormControl>
      </div>
    </div>
  );
}

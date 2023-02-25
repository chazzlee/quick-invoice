import { FormControl, SelectInput, TextInput } from "@/components/Inputs";
import { useEffect } from "react";
import { useInvoiceFormContext } from "../../hooks/useInvoiceFormContext";
import { selectStates } from "../../selectOptions";

type AddressDetailsProps = { id: "from" | "to" };

// TODO: debounce, or trigger on blur...
export function AddressDetails({ id }: AddressDetailsProps) {
  const { register, watch, setValue } = useInvoiceFormContext();

  const city = watch(`${id}.address.city`);
  const state = watch(`${id}.address.state`);

  useEffect(() => {
    if (city && state) {
      fetch(`/api/zipCode?city=${city}&state=${state}`)
        .then((response) => response.json())
        .then((data) => setValue(`${id}.address.zipCode`, data.zip_codes[0]));
    }
  }, [city, id, setValue, state]);

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
            selectOptions={selectStates}
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

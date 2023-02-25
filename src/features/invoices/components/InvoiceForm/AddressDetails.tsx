import { FormControl, SelectInput, TextInput } from "@/components/Inputs";
import { useEffect } from "react";
import { useWatch } from "react-hook-form";
import { useInvoiceFormContext } from "../../hooks/useInvoiceFormContext";
import { useInvoiceWatchOne } from "../../hooks/useInvoiceFormValues";
import { selectStates } from "../../selectOptions";
import type { InvoiceFormData } from "../../types";

type AddressDetailsProps = { id: "from" | "to" };

// TODO: debounce, or trigger on blur...
export function AddressDetails({ id }: AddressDetailsProps) {
  const { register, setValue } = useInvoiceFormContext();

  const city = useInvoiceWatchOne(`${id}.address.city`);
  const state = useInvoiceWatchOne(`${id}.address.state`);
  const zipCode = useInvoiceWatchOne(`${id}.address.zipCode`);

  useEffect(() => {
    if (zipCode.length === 5) {
      fetch(`/api/zipCode?zipCode=${zipCode}`)
        .then((response) => response.json())
        .then((data) => {
          setValue(`${id}.address.city`, data.city);
          setValue(`${id}.address.state`, data.state);
        });
    }
    //  Populate address from zipcode

    // Populate zipcode from city and state
    // if (city && state) {
    //   fetch(`/api/zipCode?city=${city}&state=${state}`)
    //     .then((response) => response.json())
    //     .then((data) => setValue(`${id}.address.zipCode`, data.zip_codes[0]));
    // }
  }, [id, setValue, zipCode]);

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

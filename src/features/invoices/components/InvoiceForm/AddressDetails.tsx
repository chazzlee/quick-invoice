import { FormControl, SelectInput, TextInput } from "@/components/Inputs";
import { ChangeEvent, useEffect } from "react";
import { useWatch } from "react-hook-form";
import { useInvoiceFormContext } from "../../hooks/useInvoiceFormContext";
import { useInvoiceWatchOne } from "../../hooks/useInvoiceFormValues";
import { selectStates } from "../../selectOptions";

type AddressDetailsProps = { id: "from" | "to" };

// TODO: debounce, rethink trigger logic
export function AddressDetails({ id }: AddressDetailsProps) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useInvoiceFormContext();

  const city = useInvoiceWatchOne(`${id}.address.city`);
  const state = useInvoiceWatchOne(`${id}.address.state`);
  const zipCode = useInvoiceWatchOne(`${id}.address.zipCode`);

  useEffect(() => {
    if (zipCode.length === 5 && (city.length === 0 || state.length === 0)) {
      fetch(`/api/zipCode?zipCode=${zipCode}`)
        .then((response) => response.json())
        .then((data) => {
          setValue(`${id}.address.city`, data.city);
          setValue(`${id}.address.state`, data.state);
        });
    }

    if (city.length >= 2 && state.length === 2) {
      fetch(`/api/zipCode?city=${city}&state=${state}`)
        .then((response) => response.json())
        .then((data) => setValue(`${id}.address.zipCode`, data.zipCode));
    }

    return () => {
      console.log("Unmounting");
    };
  }, [city, city.length, id, setValue, state, state.length, zipCode]);

  return (
    <div className="address">
      <h3 className="font-semibold capitalize">Address</h3>
      <FormControl
        id={`${id}-street`}
        label="Street"
        error={errors[id]?.address?.street?.message}
      >
        <TextInput
          {...register(`${id}.address.street`, {
            required: { value: true, message: "street is required" },
          })}
        />
      </FormControl>
      <FormControl
        id={`${id}-city`}
        label="City"
        error={errors[id]?.address?.city?.message}
      >
        <TextInput
          {...register(`${id}.address.city`, {
            required: { value: true, message: "city is required" },
          })}
        />
      </FormControl>
      <div className="flex">
        <FormControl
          id={`${id}-state`}
          label="State"
          error={errors[id]?.address?.state?.message}
        >
          <SelectInput
            selectOptions={selectStates}
            defaultLabel="Choose state"
            {...register(`${id}.address.state`, {
              required: { value: true, message: "state is required" },
            })}
          />
        </FormControl>
        <FormControl
          id={`${id}-zipCode`}
          label="Zip code"
          error={errors[id]?.address?.zipCode?.message}
        >
          <TextInput
            width="w-1/2"
            {...register(`${id}.address.zipCode`, {
              required: { value: true, message: "zip code is required" },
              minLength: { value: 5, message: "zip code must be 5 digits" },
              maxLength: { value: 5, message: "zip code must be 5 digits" },
            })}
          />
        </FormControl>
      </div>
    </div>
  );
}

import { type ChangeEvent } from "react";
import { Controller } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { FormControl, SelectInput, TextInput } from "@/components/Inputs";
import { useInvoiceFormContext } from "../../hooks/useInvoiceFormContext";
import { selectStates } from "../../selectOptions";

export function ShippingDetails() {
  const {
    register,
    control,
    setValue,
    getValues,
    resetField,
    formState: { errors },
  } = useInvoiceFormContext();

  const handleToggle = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setValue("shipTo.name", getValues("to.name"));
      setValue("shipTo.email", getValues("to.email"));
      setValue("shipTo.phone", getValues("to.phone"));
      setValue("shipTo.address", getValues("to.address"));
    } else {
      resetField("shipping");
    }
  };

  return (
    <div className="shipping">
      <h3>Ship to</h3>
      <div className="w-1/2 form-control">
        <label className="cursor-pointer label">
          <span className="label-text">Same as bill to</span>
          <input type="checkbox" className="checkbox" onChange={handleToggle} />
        </label>
      </div>

      <FormControl
        id="ship-to-name"
        label="Name"
        error={errors.shipTo?.name?.message}
      >
        <TextInput
          classes={`${errors.shipTo?.name ? "input-error" : ""}`}
          {...register("shipTo.name")}
        />
      </FormControl>
      <FormControl
        id="ship-to-email"
        label="Email"
        error={errors.shipTo?.email?.message}
      >
        <TextInput
          type="email"
          classes={`${errors.shipTo?.email ? "input-error" : ""}`}
          {...register("shipTo.email")}
        />
      </FormControl>
      <FormControl
        id="ship-to-phone"
        label="phone"
        error={errors.shipTo?.phone?.message}
      >
        <TextInput
          classes={`${errors.shipTo?.phone ? "input-error" : ""}`}
          {...register("shipTo.phone")}
        />
      </FormControl>
      <FormControl
        id="ship-to-street"
        label="Street"
        error={errors.shipTo?.address?.street?.message}
      >
        <TextInput
          classes={`${errors.shipTo?.address?.street ? "input-error" : ""}`}
          {...register("shipTo.address.street")}
        />
      </FormControl>
      <FormControl
        id="ship-to-city"
        label="City"
        error={errors.shipTo?.address?.city?.message}
      >
        <TextInput
          classes={`${errors.shipTo?.address?.city ? "input-error" : ""}`}
          {...register("shipTo.address.city")}
        />
      </FormControl>
      <div className="flex">
        <FormControl
          id={`ship-to-state`}
          label="State"
          error={errors.shipTo?.address?.state?.message}
        >
          <SelectInput
            selectOptions={selectStates}
            defaultLabel="Choose state"
            classes={`${errors.shipTo?.address?.state ? "select-error" : ""}`}
            {...register("shipTo.address.state")}
          />
        </FormControl>
        <FormControl
          id="ship-to-zipCode"
          label="Zip code"
          error={errors.shipTo?.address?.zipCode?.message}
        >
          <Controller
            control={control}
            name={"shipTo.address.zipCode"}
            render={({
              field: { onChange, name, value, ref },
              fieldState: { error },
            }) => (
              <PatternFormat
                className={`w-1/2 input input-bordered ${
                  error ? "input-error" : ""
                }`}
                placeholder="00000"
                format="#####"
                getInputRef={ref}
                name={name}
                value={value}
                onChange={onChange}
                valueIsNumericString={true}
              />
            )}
          />
        </FormControl>
      </div>
    </div>
  );
}

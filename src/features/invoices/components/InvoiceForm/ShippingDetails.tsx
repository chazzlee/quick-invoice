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
      setValue("shipping.name", getValues("to.name"));
      setValue("shipping.email", getValues("to.email"));
      setValue("shipping.phone", getValues("to.phone"));
      setValue("shipping.address", getValues("to.address"));
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
        id="shipping-name"
        label="Name"
        error={errors.shipping?.name?.message}
      >
        <TextInput
          classes={`${errors.shipping?.name ? "input-error" : ""}`}
          {...register("shipping.name")}
        />
      </FormControl>
      <FormControl
        id="shipping-email"
        label="Email"
        error={errors.shipping?.email?.message}
      >
        <TextInput
          type="email"
          classes={`${errors.shipping?.email ? "input-error" : ""}`}
          {...register("shipping.email")}
        />
      </FormControl>
      <FormControl
        id="shipping-phone"
        label="phone"
        error={errors.shipping?.phone?.message}
      >
        <TextInput
          classes={`${errors.shipping?.phone ? "input-error" : ""}`}
          {...register("shipping.phone")}
        />
      </FormControl>
      <FormControl
        id="shipping-street"
        label="Street"
        error={errors.shipping?.address?.street?.message}
      >
        <TextInput
          classes={`${errors.shipping?.address?.street ? "input-error" : ""}`}
          {...register("shipping.address.street")}
        />
      </FormControl>
      <FormControl
        id="shipping-city"
        label="City"
        error={errors.shipping?.address?.city?.message}
      >
        <TextInput
          classes={`${errors.shipping?.address?.city ? "input-error" : ""}`}
          {...register("shipping.address.city")}
        />
      </FormControl>
      <div className="flex">
        <FormControl
          id={`shipping-state`}
          label="State"
          error={errors.shipping?.address?.state?.message}
        >
          <SelectInput
            selectOptions={selectStates}
            defaultLabel="Choose state"
            classes={`${errors.shipping?.address?.state ? "select-error" : ""}`}
            {...register("shipping.address.state")}
          />
        </FormControl>
        <FormControl
          id="shipping-zipCode"
          label="Zip code"
          error={errors.shipping?.address?.zipCode?.message}
        >
          <Controller
            control={control}
            name={"shipping.address.zipCode"}
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

import type { SelectOption } from "@/features/invoices/selectOptions";
import { type ComponentPropsWithRef, forwardRef } from "react";

type SelectInputProps = ComponentPropsWithRef<"select"> & {
  selectOptions: SelectOption[];
  classes?: string;
  defaultLabel?: string;
};

// TODO: default selected
// eslint-disable-next-line react/display-name
export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ defaultLabel, selectOptions = [], classes = "", ...rest }, ref) => {
    return (
      <select
        ref={ref}
        className={`w-1/2 select select-bordered select-md ${classes}`}
        {...rest}
        defaultValue="default"
      >
        {defaultLabel ? (
          <option key="default-select" value="default" disabled>
            {defaultLabel}
          </option>
        ) : null}
        {selectOptions.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);

import { type ComponentPropsWithRef, forwardRef } from "react";

export type SelectOption = {
  label: string;
  value: string;
};

type SelectInputProps = ComponentPropsWithRef<"select"> & {
  selectOptions: SelectOption[];
  defaultLabel?: string;
};

// eslint-disable-next-line react/display-name
export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ defaultLabel, selectOptions = [], ...rest }, ref) => {
    return (
      <select
        ref={ref}
        className="w-1/2 select select-bordered select-md"
        {...rest}
      >
        {defaultLabel ? (
          <option key="default-select" disabled>
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

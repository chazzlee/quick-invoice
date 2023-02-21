import { type ComponentPropsWithRef, forwardRef } from "react";

type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

type SelectInputProps = ComponentPropsWithRef<"select"> & {
  selectOptions: SelectOption[];
};

// eslint-disable-next-line react/display-name
export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ selectOptions = [], ...rest }, ref) => {
    return (
      <select
        ref={ref}
        className="w-1/2 select select-bordered select-md"
        {...rest}
      >
        {selectOptions.map((option, index) => (
          <option key={index} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);

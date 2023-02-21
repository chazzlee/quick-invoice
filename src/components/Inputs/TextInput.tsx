import {
  type ComponentPropsWithRef,
  type HTMLInputTypeAttribute,
  forwardRef,
} from "react";

type TextInputProps = ComponentPropsWithRef<"input"> & {
  id?: string;
  type?: HTMLInputTypeAttribute;
  inputSize?: "xs" | "sm" | "md" | "lg" | "xl";
  width?: "w-full" | "w-1/2" | "w-2/12";
};

// eslint-disable-next-line react/display-name
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ id, inputSize = "md", type = "text", width = "w-full", ...rest }, ref) => {
    return (
      <input
        ref={ref}
        id={id}
        type={type}
        className={`input input-bordered input-${inputSize} ${width}`}
        {...rest}
      />
    );
  }
);

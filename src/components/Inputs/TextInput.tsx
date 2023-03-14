import {
  type ComponentPropsWithRef,
  type HTMLInputTypeAttribute,
  forwardRef,
} from "react";

// TODO: inputSize doesn't work
type TextInputProps = Readonly<
  ComponentPropsWithRef<"input"> & {
    id?: string;
    type?: HTMLInputTypeAttribute;
    inputSize?: "xs" | "sm" | "md" | "lg" | "xl";
    width?: "w-full" | "w-1/2" | "w-2/12";
    classes?: string;
  }
>;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(
    {
      id,
      inputSize = "md",
      type = "text",
      width = "w-full",
      classes = "",
      ...rest
    },
    ref
  ) {
    return (
      <input
        ref={ref}
        id={id}
        type={type}
        className={`input input-bordered input-${inputSize} ${width} ${classes}`}
        {...rest}
      />
    );
  }
);

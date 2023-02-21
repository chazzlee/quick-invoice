import { type ComponentPropsWithRef, type ReactNode, forwardRef } from "react";

type FormControlProps = ComponentPropsWithRef<"input"> & {
  name: string;
  label?: string;
  inputSize?: "xs" | "sm" | "md" | "lg";
  classes?: string[];
  children?: ReactNode;
};

// eslint-disable-next-line react/display-name
export const FormControl = forwardRef<HTMLInputElement, FormControlProps>(
  (props, ref) => {
    const {
      id,
      label = "",
      inputSize = "md",
      children,
      type = "text",
      classes = [],
      ...rest
    } = props;

    return (
      <div className="w-full form-control">
        <label className="label" htmlFor={id}>
          <span className="capitalize label-text-alt">{label}</span>
        </label>
        {children ? (
          children
        ) : (
          <input
            id={id}
            type={type}
            className={`w-full input input-bordered input-${inputSize} ${classes?.join(
              " "
            )}`}
            ref={ref}
            {...rest}
          />
        )}
      </div>
    );
  }
);

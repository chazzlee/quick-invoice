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
      inputSize = "sm",
      children,
      type = "text",
      classes = [],
      ...rest
    } = props;

    return (
      <div className="form-control w-full">
        <label className="label" htmlFor={id}>
          <span className="label-text-alt capitalize">{label}</span>
        </label>
        {children ? (
          children
        ) : (
          <input
            id={id}
            type={type}
            className={`input input-bordered input-${inputSize} ${classes?.join(
              " "
            )} w-full`}
            ref={ref}
            {...rest}
          />
        )}
      </div>
    );
  }
);

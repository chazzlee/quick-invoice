import { type ComponentPropsWithRef, forwardRef } from "react";

type FileInputProps = ComponentPropsWithRef<"input"> & {};
// eslint-disable-next-line react/display-name
export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ id, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        id={id}
        type="file"
        className="file-input file-input-bordered"
        {...rest}
      />
    );
  }
);

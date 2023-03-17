import { type ComponentPropsWithRef, forwardRef } from "react";

type FileInputProps = ComponentPropsWithRef<"input"> & {};

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  function FileInput({ id, ...rest }, ref) {
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

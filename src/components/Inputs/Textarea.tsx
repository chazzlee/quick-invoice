import { type ComponentPropsWithRef, forwardRef } from "react";

type TextareaProps = ComponentPropsWithRef<"textarea"> & {};
// eslint-disable-next-line react/display-name
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ ...rest }, ref) => {
    return (
      <textarea
        ref={ref}
        className="w-full h-24 px-3 mt-2 resize-none textarea textarea-bordered"
        {...rest}
      />
    );
  }
);

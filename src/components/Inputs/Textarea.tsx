import { type ComponentPropsWithRef, forwardRef } from "react";

type TextareaProps = Readonly<ComponentPropsWithRef<"textarea"> & {}>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ ...rest }, ref) {
    return (
      <textarea
        ref={ref}
        className="w-full h-24 px-3 mt-2 resize-none textarea textarea-bordered"
        {...rest}
      />
    );
  }
);

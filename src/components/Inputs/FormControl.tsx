import { cloneElement, type ReactElement, type ReactNode } from "react";

type FormControlProps = {
  id: string;
  label: string;
  children: ReactNode;
};

export function FormControl({ id, label, children }: FormControlProps) {
  return (
    <div className="w-full form-control">
      <label className="label" htmlFor={id}>
        <span className="capitalize label-text-alt">{label}</span>
      </label>
      {cloneElement(children as ReactElement, { id })}
    </div>
  );
}

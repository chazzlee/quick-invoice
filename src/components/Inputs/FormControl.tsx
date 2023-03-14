import { cloneElement, type ReactElement, type ReactNode } from "react";

type FormControlProps = Readonly<{
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}>;

export function FormControl({ id, label, error, children }: FormControlProps) {
  return (
    <div className="w-full form-control">
      <label className="label" htmlFor={id}>
        <span className="capitalize label-text-alt">{label}</span>
      </label>
      {cloneElement(children as ReactElement, { id })}
      {error ? (
        <label className="label">
          <span className="text-red-500 label-text-alt">{error}</span>
        </label>
      ) : null}
    </div>
  );
}

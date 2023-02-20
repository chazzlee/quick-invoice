import type { ReactNode } from "react";

type FormControlProps = {
  label: string;
  children: ReactNode;
};

export function FormControl({ label, children }: FormControlProps) {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text-alt">{label}</span>
      </label>
      {children}
    </div>
  );
}

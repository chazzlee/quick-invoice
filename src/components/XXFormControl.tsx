import type { ReactNode } from "react";

type XFormControlProps = {
  label: string;
  children: ReactNode;
};

export function XFormControl({ label, children }: XFormControlProps) {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text-alt">{label}</span>
      </label>
      {children}
    </div>
  );
}

import { type ReactNode } from "react";

type GeneralDetailsProps = {
  title: string;
  children: ReactNode;
};

export function GeneralDetails({ title, children }: GeneralDetailsProps) {
  return (
    <div className="mt-6">
      <h3 className="capitalize font-semibold">{title}</h3>
      {children}
    </div>
  );
}

type AddressProps = { children: ReactNode };
export function Address({ children }: AddressProps) {
  return (
    <div className="mt-6">
      <h3 className="capitalize font-semibold">Address</h3>
      {children}
    </div>
  );
}

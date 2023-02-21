import { type ReactNode } from "react";

type GeneralDetailsProps = {
  title: string;
  children: ReactNode;
};

export function GeneralDetails({ title, children }: GeneralDetailsProps) {
  return (
    <div className="mt-40">
      <h3 className="text-xl font-semibold capitalize">{title}</h3>
      {children}
    </div>
  );
}

type AddressProps = { children: ReactNode };
export function Address({ children }: AddressProps) {
  return (
    <div className="mt-6">
      <h3 className="font-semibold capitalize">Address</h3>
      {children}
    </div>
  );
}

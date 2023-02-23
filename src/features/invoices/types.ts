import type { Nullable } from "@/utils/types";

export type InvoiceDetails = {
  number: string;
  date: Nullable<Date>;
  terms: {
    type: "on_receipt" | "30_days" | "60_days";
    dueDate: Nullable<Date>;
  };
};

export type GeneralDetails = {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
};

export type LineItem = {
  description: string;
  details: string;
  rate: number;
  quantity: number;
  amount: number;
  taxable: boolean;
};

export type InvoiceFormData = {
  title: string;
  logo: Nullable<FileList>;
  from: GeneralDetails;
  to: GeneralDetails;
  invoice: InvoiceDetails;
  lineItems: LineItem[];
  notes: string;
  subtotal: number;
  totalTax: number;
  total: number;
  totalDiscount: number;
  tax: {
    type: "on_total" | "no_tax" | "deducted" | "per_item";
    rate: number;
  };
  balanceDue: number;
  discount: {
    type: "no_discount" | "percent" | "flat_amount";
    value: number;
  };
};

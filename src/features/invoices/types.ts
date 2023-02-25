import type { Nullable } from "@/utils/types";

export type InvoiceDetails = {
  number: string;
  date: string;
  notes: string;
  terms: {
    type: TermsType;
    dueDate: string;
  };
};

export type AddressDetails = {
  street: string;
  city: string;
  state: string;
  zipCode: string;
};

export type GeneralDetails = {
  name: string;
  email: string;
  phone: string;
  address: AddressDetails;
};

export type LineItem = {
  description: string;
  details: string;
  rate: number;
  quantity: number;
  amount: number;
  taxable: boolean;
};

export type BalanceDetails = {
  subtotal: number;
  totalTax: number;
  totalDiscount: number;
  total: number;
  balanceDue: number;
};
export type InvoiceFormData = {
  title: string;
  logo: Nullable<FileList>;
  from: GeneralDetails;
  to: GeneralDetails;
  invoice: InvoiceDetails;
  balance: BalanceDetails;
  discount: { type: DiscountType; rate: number };
  tax: { type: TaxType; rate: number };
  lineItems: LineItem[];
};

export type TermsType = "on_receipt" | "30_days" | "60_days";
export type TaxType = "on_total" | "no_tax" | "deducted" | "per_item";
export type DiscountType = "no_discount" | "percent" | "flat_amount";

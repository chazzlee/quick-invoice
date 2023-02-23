import type { Nullable } from "@/utils/types";

type TermsType = "on_receipt" | "30_days" | "60_days";
export type InvoiceDetails = {
  number: string;
  date: Nullable<Date>;
  terms: {
    type: TermsType;
    dueDate: Nullable<Date>;
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

type TaxType = "on_total" | "no_tax" | "deducted" | "per_item";
type DiscountType = "no_discount" | "percent" | "flat_amount";

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

// export type InvoiceFormData = {
//   title: string;
//   logo: Nullable<FileList>;
//   from: GeneralDetails;
//   to: GeneralDetails;
//   invoice: InvoiceDetails;
//   lineItems: LineItem[];
//   notes: string;
//   subtotal: number;
//   totalTax: number;
//   totalDiscount: number;
//   total: number;
//   balanceDue: number;
//   tax: {
//     type: TaxType;
//     rate: number;
//   };
//   discount: {
//     type: DiscountType;
//     rate: number;
//   };
// };

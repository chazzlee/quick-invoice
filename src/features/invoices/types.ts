import type { Nullable } from "@/utils/types";

// export type InvoiceDetails = {
//   number: string;
//   date: string;
//   notes: string;
//   terms: {
//     kind: TermsType;
//     dueDate: string;
//   };
// };

// export type AddressDetails = {
//   street: string;
//   city: string;
//   state: string;
//   zipCode: string;
// };

// export type GeneralDetails = {
//   name: string;
//   email: string;
//   phone: string;
//   address: AddressDetails;
// };

// export type LineItem = {
//   description: string;
//   details: string;
//   rate: number;
//   quantity: number;
//   amount: number;
//   taxable: boolean;
// };

// export type BalanceDetails = {
//   subtotal: number;
//   totalTax: number;
//   totalDiscount: number;
//   total: number;
//   balanceDue: number;
// };
// export type InvoiceFormData = {
//   title: string;
//   logo: Nullable<FileList>;
//   from: GeneralDetails;
//   to: GeneralDetails;
//   invoice: InvoiceDetails;
//   balance: BalanceDetails;
//   discount: { kind: DiscountType; rate: number };
//   tax: { kind: TaxType; rate: number };
//   lineItems: LineItem[];
// };

// TODO:
export type TermsType =
  | "0_days"
  | "1_day"
  | "custom"
  | "2_days"
  | "3_days"
  | "4_days"
  | "5_days"
  | "6_days"
  | "7_days"
  | "14_days"
  | "21_days"
  | "30_days"
  | "45_days"
  | "60_days"
  | "90_days"
  | "120_days"
  | "180_days"
  | "365_days";

export const TERMS_TYPE = [
  "0_days",
  "1_day",
  "custom",
  "2_days",
  "3_days",
  "4_days",
  "5_days",
  "6_days",
  "7_days",
  "14_days",
  "21_days",
  "30_days",
  "45_days",
  "60_days",
  "90_days",
  "120_days",
  "180_days",
  "365_days",
] as const;

export type TaxType = "on_total" | "no_tax" | "deducted" | "per_item";
export const TAX_TYPE = ["on_total", "no_tax", "deducted", "per_item"] as const;

export type DiscountType = "no_discount" | "percent" | "flat_amount";
export const DISCOUNT_TYPE = ["no_discount", "percent", "flat_amount"] as const;

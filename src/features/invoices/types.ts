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

export type TermsType = typeof TERMS_TYPE[number];

export const TAX_TYPES = ["on_total", "none", "deducted", "per_item"] as const;
export type TaxType = typeof TAX_TYPES[number];

export const DISCOUNT_TYPES = ["none", "percent", "flat_amount"] as const;
export type DiscountType = typeof DISCOUNT_TYPES[number];

export const SHIPPING_TYPES = [
  "none",
  "free",
  "percent",
  "flat_amount",
] as const;
export type ShippingType = typeof SHIPPING_TYPES[number];

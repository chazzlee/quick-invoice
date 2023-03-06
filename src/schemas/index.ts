import { TERMS_TYPE } from "@/features/invoices/types";
import { z } from "zod";

const ONLY_DIGITS_REGEX = /^[-+]?[0-9]+[.]?[0-9]*([eE][-+]?[0-9]+)?$/;
export const NO_TAX_RATE = "0.000%" as const;
export const NO_DISCOUNT_RATE = "0.00%" as const;
export const NO_DISCOUNT_FLAT = "0.00" as const;
export const NO_LINE_ITEM_RATE = "0.00" as const;
export const NO_AMOUNT = "0.00" as const;
export const NO_TOTAL = "0.00" as const;

//TODO: set  defaults for num inputs

export const generalDetailsSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Must be a valid email address" }),
  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .regex(/^(1\s?)?(\d{3}|\(\d{3}\))[\s\-]?\d{3}[\s\-]?\d{4}$/gm, {
      message: "Phone number must be in a valid format",
    }), //TODO:
  address: z.object({
    street: z.string().min(2, { message: "Street is required" }),
    state: z
      .string()
      .length(2, { message: "Must be a valid state in the United States" }), //TODO:
    city: z.string().min(1, { message: "City is required" }),
    zipCode: z
      .string()
      .regex(/^\d{5}(?:[-\s]\d{4})?$/, { message: "Must be a valid Zip Code" }),
  }),
});

//TODO:
const lineItemSchema = z.object({
  description: z.string().min(1, { message: "Item description is required" }),
  details: z.string(),
  rate: z.string().regex(ONLY_DIGITS_REGEX).default(NO_LINE_ITEM_RATE),
  quantity: z.number().default(1),
  amount: z.string().regex(ONLY_DIGITS_REGEX).default(NO_AMOUNT),
  taxable: z.boolean().default(false),
});

export const invoiceFormSchema = z.object({
  title: z.string().min(1, { message: "Invoice title is required" }).max(50),
  logo: z.any(), //TODO:
  from: generalDetailsSchema,
  to: generalDetailsSchema,
  shipping: generalDetailsSchema.optional(),
  invoice: z.object({
    number: z.string().min(1),
    date: z.string(),
    notes: z.string(),
    terms: z.object({
      kind: z.enum(TERMS_TYPE),
      dueDate: z.string(),
    }),
  }),
  balance: z.object({
    subtotal: z.string().regex(ONLY_DIGITS_REGEX).default(NO_TOTAL),
    totalTax: z.string().regex(ONLY_DIGITS_REGEX).default(NO_TOTAL),
    totalDiscount: z.string().regex(ONLY_DIGITS_REGEX).default(NO_TOTAL),
    total: z.string().regex(ONLY_DIGITS_REGEX).default(NO_TOTAL),
    balanceDue: z.string().regex(ONLY_DIGITS_REGEX).default(NO_TOTAL),
  }),
  tax: z.discriminatedUnion("kind", [
    z.object({
      kind: z.literal("no_tax"),
      rate: z.literal(NO_TAX_RATE).default(NO_TAX_RATE),
    }),
    z.object({
      kind: z.enum(["on_total", "per_item", "deducted"]),
      rate: z.string().endsWith("%").default(NO_TAX_RATE),
    }),
  ]),
  discount: z.discriminatedUnion("kind", [
    z.object({
      kind: z.literal("no_discount"),
      rate: z.literal(NO_DISCOUNT_FLAT).default(NO_DISCOUNT_FLAT),
    }),
    z.object({
      kind: z.literal("flat_amount"),
      rate: z.string().regex(ONLY_DIGITS_REGEX).default(NO_DISCOUNT_FLAT),
    }),
    z.object({
      kind: z.literal("percent"),
      rate: z.string().endsWith("%").default(NO_DISCOUNT_RATE),
    }),
  ]),
  lineItems: z.array(lineItemSchema),
});

export type InvoiceFormSchema = z.infer<typeof invoiceFormSchema>;
export type GeneralDetailsSchema = z.infer<typeof generalDetailsSchema>;
export type LineItemSchema = z.infer<typeof lineItemSchema>;

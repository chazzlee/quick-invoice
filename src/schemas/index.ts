import { TERMS_TYPE } from "@/features/invoices/types";
import { z } from "zod";

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

const lineItemSchema = z.object({
  description: z.string().min(1, { message: "Item description is required" }),
  details: z.string(),
  rate: z.number(),
  quantity: z.number(),
  amount: z.number(),
  taxable: z.boolean(),
});

export const invoiceFormSchema = z.object({
  title: z.string().min(1, { message: "Invoice title is required" }).max(50),
  logo: z.any(), //TODO:
  from: generalDetailsSchema,
  to: generalDetailsSchema,
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
    subtotal: z.number(),
    totalTax: z.number(),
    totalDiscount: z.number(),
    total: z.number(),
    balanceDue: z.number(),
  }),
  tax: z.discriminatedUnion("kind", [
    z.object({ kind: z.literal("no_tax"), rate: z.number().min(0).max(0) }),
    z.object({
      kind: z.enum(["on_total", "per_item", "deducted"]),
      rate: z.number().gt(0, { message: "Tax rate must be greater than 0" }),
    }),
  ]),
  discount: z.discriminatedUnion("kind", [
    z.object({
      kind: z.literal("no_discount"),
      rate: z.number().min(0).max(0),
    }),
    z.object({
      kind: z.enum(["percent", "flat_amount"]),
      rate: z.number().gt(0, { message: "Discount must be greater than 0" }),
    }),
  ]),
  lineItems: z.array(lineItemSchema),
});

export type InvoiceFormSchema = z.infer<typeof invoiceFormSchema>;
export type GeneralDetailsSchema = z.infer<typeof generalDetailsSchema>;
export type LineItemSchema = z.infer<typeof lineItemSchema>;

import { TERMS_TYPE } from "@/features/invoices/types";
import { z } from "zod";

// FIXME:
const ONLY_DIGITS_REGEX = /^[-+]?[0-9]+[.]?[0-9]*([eE][-+]?[0-9]+)?$/;

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
  rate: z.number().default(0),
  quantity: z.number().default(0),
  amount: z.number().default(0),
  taxable: z.boolean().default(false),
});

export const invoiceFormSchema = z.object({
  title: z.string().min(1, { message: "Invoice title is required" }).max(50),
  logo: z.any().nullable(), //TODO:refine type (.instanceof(File) is not working)
  from: generalDetailsSchema,
  to: generalDetailsSchema,
  shipTo: generalDetailsSchema.optional(), //TODO:
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
    subtotal: z.number().default(0),
    totalTax: z.number().default(0),
    totalDiscount: z.number().default(0),
    totalShipping: z.number().default(0),
    total: z.number().default(0),
    balanceDue: z.number().default(0),
  }),
  tax: z.discriminatedUnion("kind", [
    z.object({
      kind: z.literal("none"),
      rate: z.literal(0),
    }),
    z.object({
      kind: z.enum(["on_total", "per_item", "deducted"]), //TODO:
      rate: z.number().default(0),
    }),
  ]),
  discount: z.discriminatedUnion("kind", [
    z.object({
      kind: z.literal("none"),
      rate: z.literal(0),
    }),
    z.object({
      kind: z.enum(["flat_amount", "percent"]),
      rate: z.number().default(0),
    }),
  ]),
  shipping: z.discriminatedUnion("kind", [
    z.object({
      kind: z.literal("none"),
      rate: z.literal(0),
    }),
    z.object({
      kind: z.literal("free"),
      rate: z.literal(0),
    }),
    z.object({
      kind: z.literal("flat_amount"),
      rate: z.number().default(0),
    }),
    z.object({
      kind: z.literal("percent"),
      rate: z.number().default(0),
    }),
  ]),
  lineItems: z.array(lineItemSchema),
});

export type InvoiceFormSchema = z.infer<typeof invoiceFormSchema>;
export type GeneralDetailsSchema = z.infer<typeof generalDetailsSchema>;
export type LineItemSchema = z.infer<typeof lineItemSchema>;

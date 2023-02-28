import { DISCOUNT_TYPE, TAX_TYPE, TERMS_TYPE } from "@/features/invoices/types";
import { z } from "zod";

export const generalDetailsSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().trim().min(1).trim(), //TODO:
  address: z.object({
    street: z.string().trim().min(2),
    state: z.string().trim().length(2), //TODO:
    city: z.string().trim().min(1),
    zipCode: z.string().trim().length(5), //TODO:
  }),
});

const lineItemSchema = z.object({
  description: z.string().min(1).trim(),
  details: z.string().trim(),
  rate: z.number(),
  quantity: z.number(),
  amount: z.number(),
  taxable: z.boolean(),
});

export const invoiceFormSchema = z.object({
  title: z.string().min(1, { message: "Invoice title is required" }).max(50),
  logo: z.any(),
  from: generalDetailsSchema,
  to: generalDetailsSchema,
  invoice: z.object({
    number: z.string().min(1).trim(),
    date: z.string(),
    notes: z.string().trim(),
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
  discount: z.discriminatedUnion("kind", [
    z.object({
      kind: z.literal("no_discount"),
      rate: z.number().min(0).max(0),
    }),
    z.object({ kind: z.enum(["percent", "flat_amount"]), rate: z.number() }),
  ]),
  tax: z.discriminatedUnion("kind", [
    z.object({ kind: z.literal("no_tax"), rate: z.number().min(0).max(0) }),
    z.object({
      kind: z.enum(["on_total", "per_item", "deducted"]),
      rate: z.number().min(1),
    }),
  ]),
  lineItems: z.array(lineItemSchema),
});

export type InvoiceFormSchema = z.infer<typeof invoiceFormSchema>;
export type GeneralDetailsSchema = z.infer<typeof generalDetailsSchema>;
export type LineItemSchema = z.infer<typeof lineItemSchema>;

import { formatISO, startOfToday } from "date-fns";
import {
  GeneralDetailsSchema,
  InvoiceFormSchema,
  LineItemSchema,
  NO_AMOUNT,
  NO_DISCOUNT_FLAT,
  NO_DISCOUNT_RATE,
  NO_LINE_ITEM_RATE,
  NO_TAX_RATE,
} from "@/schemas";

export const defaultGeneralDetails: GeneralDetailsSchema = {
  name: "",
  email: "",
  phone: "",
  address: {
    street: "",
    city: "",
    state: "",
    zipCode: "",
  },
};

export const defaultLineItem: LineItemSchema = {
  description: "",
  details: "",
  rate: NO_LINE_ITEM_RATE,
  quantity: 1,
  amount: NO_AMOUNT,
  taxable: false,
};

export const defaultInvoice: InvoiceFormSchema = {
  title: "Invoice",
  logo: null,
  from: structuredClone(defaultGeneralDetails),
  to: structuredClone(defaultGeneralDetails),
  invoice: {
    number: "INV0001",
    date: formatISO(startOfToday(), { representation: "date" }),
    notes: "",
    terms: {
      kind: "0_days",
      dueDate: "",
    },
  },
  tax: {
    kind: "no_tax",
    rate: NO_TAX_RATE,
  },
  discount: {
    kind: "no_discount",
    rate: NO_DISCOUNT_FLAT,
  },
  lineItems: [defaultLineItem],
  balance: {
    subtotal: 0,
    total: 0,
    totalTax: 0,
    totalDiscount: 0,
    balanceDue: 0,
  },
};

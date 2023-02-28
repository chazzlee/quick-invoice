import { formatISO, startOfToday } from "date-fns";
import {
  GeneralDetailsSchema,
  InvoiceFormSchema,
  LineItemSchema,
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
  rate: 0,
  quantity: 1,
  amount: 0,
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
    rate: 0,
  },
  discount: {
    kind: "no_discount",
    rate: 0,
  },
  lineItems: [{ ...defaultLineItem }],
  balance: {
    subtotal: 0,
    total: 0,
    totalTax: 0,
    totalDiscount: 0,
    balanceDue: 0,
  },
};

import type { GeneralDetails, InvoiceFormData, LineItem } from "./types";
import { formatISO, startOfToday } from "date-fns";

export const defaultGeneralDetails: GeneralDetails = {
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

export const defaultLineItem: LineItem = {
  description: "",
  details: "",
  rate: 0,
  quantity: 1,
  amount: 0,
  taxable: false,
};

export const defaultInvoice: InvoiceFormData = {
  title: "Invoice",
  logo: null,
  from: structuredClone(defaultGeneralDetails),
  to: structuredClone(defaultGeneralDetails),
  invoice: {
    number: "INV0001",
    date: formatISO(startOfToday(), { representation: "date" }),
    notes: "",
    terms: {
      type: "0_days",
      dueDate: "",
    },
  },
  tax: {
    type: "no_tax",
    rate: 0,
  },
  discount: {
    type: "no_discount",
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

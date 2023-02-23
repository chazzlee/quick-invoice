import type { GeneralDetails, InvoiceFormData, LineItem } from "./types";

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
    date: null,
    terms: {
      type: "on_receipt",
      dueDate: null,
    },
  },
  tax: { type: "no_tax", rate: 0 },
  discount: {
    type: "no_discount",
    value: 0,
  },
  lineItems: [{ ...defaultLineItem }],
  notes: "",
  subtotal: 0,
  total: 0,
  totalTax: 0,
  totalDiscount: 0,
  balanceDue: 0,
};
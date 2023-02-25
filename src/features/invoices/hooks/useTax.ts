import { useCallback } from "react";
import { useInvoiceFormContext } from "./useInvoiceFormContext";
import { useInvoiceFormValues } from "./useInvoiceFormValues";
import { useInvoiceFieldArray } from "./useInvoiceFieldArray";
import type { LineItem } from "../types";

export function useTax() {
  const { setValue } = useInvoiceFormContext();
  const { tax, lineItems } = useInvoiceFormValues();
  const { replace } = useInvoiceFieldArray();

  const taxType = tax.type;
  const taxRate = tax.rate;
  const isTaxable = taxType !== "no_tax";

  const updateTotalTax = useCallback(() => {
    const totalTax = calculateTotalTax(lineItems, taxRate);
    if (taxType === "on_total") {
      setValue("balance.totalTax", totalTax);
    } else if (taxType === "deducted") {
      setValue("balance.totalTax", totalTax * -1);
    } else if (taxType === "per_item") {
      console.log("TODO: MUST IMPLEMENT");
      setValue("balance.totalTax", totalTax);
    } else {
      setValue("balance.totalTax", 0);
    }
  }, [lineItems, setValue, taxRate, taxType]);

  const selectTaxType = useCallback(() => {
    if (taxType !== "no_tax") {
      replace(lineItems.map((item) => ({ ...item, taxable: true })));
      if (taxRate > 0) {
        updateTotalTax();
      }
    } else {
      replace(lineItems.map((item) => ({ ...item, taxable: false })));
      setValue("tax.rate", 0);
      setValue("balance.totalTax", 0);
    }
  }, [replace, setValue, lineItems, taxRate, taxType, updateTotalTax]);

  return {
    taxType,
    taxRate,
    isTaxable,
    updateTotalTax,
    selectTaxType,
  };
}

function calculateTotalTax(lineItems: LineItem[], taxRate: number): number {
  return lineItems
    .filter((lineItem) => lineItem.taxable)
    .reduce((acc, prev) => acc + prev.amount * (taxRate / 100), 0);
}

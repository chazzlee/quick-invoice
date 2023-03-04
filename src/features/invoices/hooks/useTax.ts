import { useCallback } from "react";
import { useInvoiceFormContext } from "./useInvoiceFormContext";
import { useInvoiceFormValues } from "./useInvoiceFormValues";
import { useInvoiceFieldArray } from "./useInvoiceFieldArray";
import { LineItemSchema, NO_TOTAL } from "@/schemas";
import { convertPercentageToFloat } from "@/utils/convertPercentageToFloat";

export function useTax() {
  const { setValue } = useInvoiceFormContext();
  const { tax, lineItems } = useInvoiceFormValues();
  const { replace } = useInvoiceFieldArray();

  const taxType = tax.kind;
  const taxRate = tax.rate;
  const isTaxable = taxType !== "no_tax";

  const updateTotalTax = useCallback(() => {
    const totalTax = calculateTotalTax(
      lineItems,
      convertPercentageToFloat(taxRate)
    );

    if (taxType === "on_total") {
      setValue("balance.totalTax", totalTax.toString());
    } else if (taxType === "deducted") {
      setValue("balance.totalTax", (totalTax * -1).toString());
    } else if (taxType === "per_item") {
      console.log("TODO: MUST IMPLEMENT");
      setValue("balance.totalTax", totalTax.toString());
    } else {
      setValue("balance.totalTax", NO_TOTAL);
    }
  }, [lineItems, setValue, taxRate, taxType]);

  return {
    taxType,
    taxRate,
    isTaxable,
    updateTotalTax,
  };
}

function calculateTotalTax(
  lineItems: LineItemSchema[],
  taxRate: number
): number {
  return lineItems
    .filter((lineItem) => lineItem.taxable)
    .reduce((acc, prev) => acc + parseFloat(prev.amount) * taxRate, 0);
}

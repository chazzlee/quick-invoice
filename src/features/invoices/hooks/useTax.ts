import { useCallback } from "react";
import { useInvoiceFormContext } from "./useInvoiceFormContext";
import { useInvoiceFormValues } from "./useInvoiceFormValues";
import { useInvoiceFieldArray } from "./useInvoiceFieldArray";
import { LineItemSchema } from "@/schemas";
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
    .reduce((acc, prev) => acc + prev.amount * taxRate, 0);
}

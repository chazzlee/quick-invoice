import { useCallback } from "react";
import { useInvoiceFormContext } from "./useInvoiceFormContext";
import { useInvoiceWatchOne } from "./useInvoiceWatchOne";
import Money from "dinero.js";

export function useTax() {
  const { setValue, getValues } = useInvoiceFormContext();

  const taxType = useInvoiceWatchOne("tax.kind");
  const taxRate = useInvoiceWatchOne("tax.rate");
  const isTaxable = taxType !== "none";

  const updateTotalTax = useCallback(() => {
    const lineItems = getValues("lineItems");
    const totalTax = lineItems
      .filter((item) => item.taxable)
      .reduce((acc, prev) => {
        return acc.add(Money({ amount: prev.amount }).multiply(taxRate));
      }, Money({ amount: 0 }));

    switch (taxType) {
      case "on_total": {
        setValue("balance.totalTax", totalTax.getAmount());
        break;
      }
      case "deducted": {
        setValue("balance.totalTax", totalTax.multiply(-1).getAmount());
        break;
      }
      case "per_item": {
        console.log("TODO: must implement");
        setValue("balance.totalTax", totalTax.getAmount());
        break;
      }
      case "none": {
        setValue("balance.totalTax", 0);
        break;
      }
      default:
        throw new Error("Invalid tax type");
    }
  }, [getValues, setValue, taxRate, taxType]);

  return {
    taxType,
    taxRate,
    isTaxable,
    updateTotalTax,
  };
}

import { useCallback } from "react";
import { useInvoiceFormContext } from "./useInvoiceFormContext";
import { useInvoiceWatchOne } from "./useInvoiceWatchOne";

export function useDiscount() {
  const { setValue, getValues } = useInvoiceFormContext();

  const discountType = useInvoiceWatchOne("discount.kind");
  const discountRate = useInvoiceWatchOne("discount.rate");
  const isDiscountable = discountType !== "none";
  const isPercentageDiscount = discountType === "percent";
  const isFlatDiscount = discountType === "flat_amount";

  const updateTotalDiscount = useCallback(() => {
    switch (discountType) {
      case "flat_amount": {
        setValue("balance.totalDiscount", discountRate * -1);
        break;
      }
      case "percent": {
        const totalDiscount = getValues("balance.subtotal") * discountRate * -1;
        setValue("balance.totalDiscount", totalDiscount);
        break;
      }
      case "none": {
        setValue("balance.totalDiscount", 0);
        break;
      }
      default:
        throw new Error("Invalid discount type!");
    }
  }, [discountRate, discountType, getValues, setValue]);

  return {
    discountType,
    discountRate,
    isDiscountable,
    isPercentageDiscount,
    isFlatDiscount,
    updateTotalDiscount,
  };
}

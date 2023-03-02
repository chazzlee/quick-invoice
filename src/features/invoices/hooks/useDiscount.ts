import { convertPercentageToFloat } from "@/utils/convertPercentageToFloat";
import { useCallback } from "react";
import { useInvoiceFormContext } from "./useInvoiceFormContext";
import { useInvoiceFormValues } from "./useInvoiceFormValues";

export function useDiscount() {
  const { setValue } = useInvoiceFormContext();
  const { discount, balance } = useInvoiceFormValues();

  const discountType = discount.kind;
  const discountRate = discount.rate;
  const isDiscountable = discountType !== "no_discount";
  const isPercentageDiscount = discountType === "percent";
  const isFlatDiscount = discountType === "flat_amount";

  const subtotal = balance.subtotal;

  const updateTotalDiscount = useCallback(() => {
    if (discountType === "flat_amount") {
      // TODO: NaN
      setValue("balance.totalDiscount", discountRate);
    } else if (discountType === "percent") {
      const discountPercentage = convertPercentageToFloat(discountRate);
      const totalDiscount = subtotal * discountPercentage;
      setValue("balance.totalDiscount", totalDiscount);
    } else {
      setValue("balance.totalDiscount", 0);
    }
  }, [discountRate, discountType, setValue, subtotal]);

  return {
    discountType,
    discountRate,
    isDiscountable,
    isPercentageDiscount,
    isFlatDiscount,
    updateTotalDiscount,
  };
}

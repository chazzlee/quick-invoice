import { useWatchInvoice } from "./useWatchInvoice";

export function useDiscount() {
  const discountType = useWatchInvoice("discount.type");
  const discountRate = useWatchInvoice("discount.rate");

  const isDiscountable = discountType !== "no_discount";
  const isPercentageDiscount = discountType === "percent";
  const isFlatDiscount = discountType === "flat_amount";

  return {
    discountType,
    discountRate,
    isDiscountable,
    isPercentageDiscount,
    isFlatDiscount,
  };
}

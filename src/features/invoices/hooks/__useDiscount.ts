import { useWatchInvoice } from "./useWatchInvoice";

export function useDiscount() {
  const {
    discount: { type, rate },
  } = useWatchInvoice();

  const isDiscountable = type !== "no_discount";
  const isPercentageDiscount = type === "percent";
  const isFlatDiscount = type === "flat_amount";

  return {
    discountType: type,
    discountRate: rate,
    isDiscountable,
    isPercentageDiscount,
    isFlatDiscount,
  };
}

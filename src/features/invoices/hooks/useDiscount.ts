import { useWatch } from "react-hook-form";
import { InvoiceFormData } from "../types";

export function useDiscount() {
  const totalDiscount = useWatch<InvoiceFormData, "totalDiscount">({
    name: "totalDiscount",
  });
  const discountType = useWatch<InvoiceFormData, "discount.type">({
    name: "discount.type",
  });
  const discountRate = useWatch<InvoiceFormData, "discount.rate">({
    name: "discount.rate",
  });
  const isDiscountable = discountType !== "no_discount";
  const isPercentageDiscount = discountType === "percent";
  const isFlatDiscount = discountType === "flat_amount";

  return {
    totalDiscount,
    discountType,
    discountRate,
    isDiscountable,
    isPercentageDiscount,
    isFlatDiscount,
  };
}

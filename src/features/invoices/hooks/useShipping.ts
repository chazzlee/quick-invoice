import { useCallback } from "react";
import { useInvoiceFormContext } from "./useInvoiceFormContext";
import { useInvoiceWatchOne } from "./useInvoiceWatchOne";

export function useShipping() {
  const { setValue, getValues } = useInvoiceFormContext();
  const shippingRate = useInvoiceWatchOne("shipping.rate");
  const shippingType = useInvoiceWatchOne("shipping.kind");
  const isShippable = shippingType !== "none";
  const isFlatShipping = shippingType === "flat_amount";
  const isPercentageShipping = shippingType === "percent";
  const isFreeShipping = shippingType === "free";

  const updateTotalShipping = useCallback(() => {
    switch (shippingType) {
      case "flat_amount": {
        setValue("balance.totalShipping", shippingRate);
        break;
      }
      case "percent": {
        const totalShipping = getValues("balance.subtotal") * shippingRate;
        setValue("balance.totalShipping", totalShipping);
        break;
      }
      case "free":
      case "none": {
        setValue("balance.totalShipping", 0);
        break;
      }
      default:
        throw new Error("Invalid shipping type!");
    }
  }, [getValues, setValue, shippingRate, shippingType]);

  return {
    shippingRate,
    shippingType,
    isShippable,
    isFlatShipping,
    isPercentageShipping,
    isFreeShipping,
    updateTotalShipping,
  };
}

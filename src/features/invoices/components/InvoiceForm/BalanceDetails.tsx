import { NO_DISCOUNT_RATE, NO_TAX_RATE, NO_TOTAL } from "@/schemas";
import { convertPercentageToFloat } from "@/utils/convertPercentageToFloat";
import { formatCurrency } from "@/utils/formatCurrency";
import { amountToUnit } from "@/utils/money";
import { useEffect } from "react";
import { NumericFormat } from "react-number-format";
import { useDiscount } from "../../hooks/useDiscount";
import { useInvoiceFormContext } from "../../hooks/useInvoiceFormContext";
import { useInvoiceFormValues } from "../../hooks/useInvoiceFormValues";
import { useTax } from "../../hooks/useTax";

export function BalanceDetails() {
  const { watch, setValue, getValues } = useInvoiceFormContext();
  const { balance, shipping } = useInvoiceFormValues();
  const {
    subtotal,
    totalDiscount,
    totalTax,
    total,
    balanceDue,
    totalShipping,
  } = balance;
  const { taxRate, isTaxable } = useTax();
  const { isDiscountable, isPercentageDiscount, discountRate } = useDiscount();
  const isShippable = shipping.kind !== "no_shipping";

  // useEffect(() => {
  //   setValue(
  //     "balance.total",
  //     `${
  //       parseFloat(subtotal) +
  //       parseFloat(totalTax) -
  //       parseFloat(totalDiscount) +
  //       parseFloat(shipping.rate)
  //     }`
  //   );
  //   setValue("balance.balanceDue", total);
  // }, [setValue, shipping.rate, subtotal, total, totalDiscount, totalTax]);

  // TODO: move out -- need to update blaance after select change etc
  // useEffect(() => {
  //   function updateTotalShipping() {
  //     if (shipping.kind === "flat_amount") {
  //       setValue("balance.totalShipping", shipping.rate);
  //     } else if (shipping.kind === "percent") {
  //       const shippingPercentage = convertPercentageToFloat(shipping.rate);
  //       const totalShipping = parseFloat(subtotal) * shippingPercentage;
  //       setValue("balance.totalShipping", totalShipping.toString());
  //     } else if (shipping.kind === "free") {
  //       setValue("balance.totalShipping", "FREE");
  //     } else {
  //       setValue("balance.totalShipping", NO_TOTAL);
  //     }
  //   }
  //   updateTotalShipping();
  // }, [setValue, shipping.kind, shipping.rate, subtotal]);

  return (
    <div className="grid grid-cols-2 gap-8 pt-4">
      <div className="col-start-2">
        <div className="flex justify-between w-1/2">
          <p>Subtotal</p>
          <NumericFormat
            displayType="text"
            value={amountToUnit(subtotal)}
            prefix={"$"}
            decimalScale={2}
            fixedDecimalScale={true}
          />
        </div>
        {isDiscountable ? (
          <div className="flex justify-between w-1/2">
            <p>
              Discount{" "}
              {isPercentageDiscount && `(${discountRate || NO_DISCOUNT_RATE})`}
            </p>
            <p>TODO: total discount</p>
            {/* <p>{formatCurrency(parseFloat(totalDiscount) * -1)}</p> */}
          </div>
        ) : null}
        {isTaxable ? (
          <div className="flex justify-between w-1/2">
            <p>Tax ({taxRate || NO_TAX_RATE})</p>
            <p>{formatCurrency(totalTax)}</p>
          </div>
        ) : null}
        <div className="flex justify-between w-1/2">
          <p>Total</p>
          <p>{formatCurrency(total)}</p>
        </div>
        {isShippable ? (
          <div className="flex justify-between w-1/2">
            <p>Shipping</p>
            <p>
              {shipping.kind === "free"
                ? totalShipping
                : formatCurrency(totalShipping)}
            </p>
          </div>
        ) : null}
        <div className="flex justify-between w-1/2">
          <p className="font-semibold">Balance Due</p>
          <p className="font-semibold">{formatCurrency(balanceDue)}</p>
        </div>
      </div>
    </div>
  );
}

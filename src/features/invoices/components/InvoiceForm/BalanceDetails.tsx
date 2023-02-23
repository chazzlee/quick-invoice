import { formatCurrency } from "@/utils/formatCurrency";
import { useWatchInvoice } from "../../hooks/useWatchInvoice";

export function BalanceDetails() {
  // TODO:
  const subtotal = 0;
  const totalDiscount = 0;
  const totalTax = 0;
  const total = 0;
  const balanceDue = 0;

  const isDiscountable = useWatchInvoice("discount.type") !== "no_discount";
  const isPercentageDiscount = useWatchInvoice("discount.type") === "percent";
  const discountRate = useWatchInvoice("discount.rate");
  const isTaxable = useWatchInvoice("tax.type") !== "no_tax";
  const taxRate = useWatchInvoice("tax.rate");

  return (
    <div className="grid grid-cols-2 gap-8 pt-4">
      <div className="col-start-2">
        <div className="flex justify-between w-1/2">
          <p>Subtotal</p>
          <p>{formatCurrency(subtotal)}</p>
        </div>
        {isDiscountable ? (
          <div className="flex justify-between w-1/2">
            <p>Discount {isPercentageDiscount && `(${discountRate}%)`}</p>
            <p>{formatCurrency(totalDiscount)}</p>
          </div>
        ) : null}
        {isTaxable ? (
          <div className="flex justify-between w-1/2">
            <p>Tax ({taxRate}%)</p>
            <p>{formatCurrency(totalTax)}</p>
          </div>
        ) : null}
        <div className="flex justify-between w-1/2">
          <p>Total</p>
          <p>{formatCurrency(total)}</p>
        </div>
        <div className="flex justify-between w-1/2">
          <p className="font-semibold">Balance Due</p>
          <p className="font-semibold">{formatCurrency(balanceDue)}</p>
        </div>
      </div>
    </div>
  );
}

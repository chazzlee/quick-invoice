import { formatCurrency } from "@/utils/formatCurrency";
import { useEffect } from "react";
import { useInvoiceFormContext } from "../../hooks/useInvoiceFormContext";
import { useWatchInvoice } from "../../hooks/useWatchInvoice";

export function BalanceDetails() {
  const { setValue } = useInvoiceFormContext();
  // TODO:

  const isDiscountable = useWatchInvoice("discount.type") !== "no_discount";
  const isPercentageDiscount = useWatchInvoice("discount.type") === "percent";
  const discountRate = useWatchInvoice("discount.rate");
  const discountType = useWatchInvoice("discount.type");
  const taxType = useWatchInvoice("tax.type");
  const isTaxable = taxType !== "no_tax";
  const taxRate = useWatchInvoice("tax.rate");

  const subtotal = useWatchInvoice("balance.subtotal");

  const totalTax = useWatchInvoice("balance.totalTax");
  const totalDiscount = useWatchInvoice("balance.totalDiscount");
  const total = useWatchInvoice("balance.total");
  const balanceDue = useWatchInvoice("balance.balanceDue");

  useEffect(() => {
    setValue("balance.total", subtotal + totalTax - totalDiscount);
    setValue("balance.balanceDue", total);
  }, [setValue, subtotal, total, totalDiscount, totalTax]);

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
            <p>{formatCurrency(totalDiscount * -1)}</p>
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

// useEffect(() => {
//   switch (discountType) {
//     case "flat_amount": {
//       setValue("balance.totalDiscount", discountRate * -1);
//       break;
//     }
//     case "percent": {
//       setValue("balance.totalDiscount", (discountRate / 100) * subtotal * -1);
//       break;
//     }
//     case "no_discount": {
//       setValue("balance.totalDiscount", 0);
//       break;
//     }
//     default:
//       throw new Error("Invalid discount type");
//   }
// }, [discountRate, discountType, setValue, subtotal]);

// useEffect(() => {
//   setValue("balance.total", subtotal + totalDiscount + totalTax);
//   setValue("balance.balanceDue", subtotal + totalDiscount + totalTax);
// }, [setValue, subtotal, totalDiscount, totalTax]);

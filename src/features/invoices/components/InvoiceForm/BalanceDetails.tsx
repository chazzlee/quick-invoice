import { NO_DISCOUNT_RATE } from "@/schemas";
import { formatCurrency } from "@/utils/formatCurrency";
import { useEffect } from "react";
import { useDiscount } from "../../hooks/useDiscount";
import { useInvoiceFormContext } from "../../hooks/useInvoiceFormContext";
import { useInvoiceFormValues } from "../../hooks/useInvoiceFormValues";
import { useTax } from "../../hooks/useTax";

export function BalanceDetails() {
  const { setValue } = useInvoiceFormContext();
  const { balance } = useInvoiceFormValues();
  const { subtotal, totalDiscount, totalTax, total, balanceDue } = balance;
  const { taxRate, isTaxable } = useTax();
  const { isDiscountable, isPercentageDiscount, discountRate } = useDiscount();

  useEffect(() => {
    setValue("balance.total", subtotal + totalTax - totalDiscount);
    setValue("balance.balanceDue", total);
  }, [setValue, subtotal, total, totalDiscount, totalTax]);

  console.log(discountRate || "hello");
  return (
    <div className="grid grid-cols-2 gap-8 pt-4">
      <div className="col-start-2">
        <div className="flex justify-between w-1/2">
          <p>Subtotal</p>
          <p>{formatCurrency(subtotal)}</p>
        </div>
        {isDiscountable ? (
          <div className="flex justify-between w-1/2">
            <p>
              Discount{" "}
              {isPercentageDiscount && `(${discountRate || NO_DISCOUNT_RATE})`}
            </p>
            <p>{formatCurrency(totalDiscount * -1)}</p>
          </div>
        ) : null}
        {isTaxable ? (
          <div className="flex justify-between w-1/2">
            <p>Tax ({taxRate})</p>
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

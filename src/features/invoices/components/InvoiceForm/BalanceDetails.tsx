import { formatCurrency } from "@/utils/formatCurrency";
import { useBalance } from "../../hooks/useBalance";
import { useDiscount } from "../../hooks/useDiscount";
import { useTax } from "../../hooks/useTax";

export function BalanceDetails() {
  const { isTaxable, taxRate, totalTax } = useTax();
  const { isDiscountable, isPercentageDiscount, discountRate, totalDiscount } =
    useDiscount();
  const { subtotal, total, balanceDue } = useBalance();

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

import { formatCurrency } from "@/utils/formatCurrency";

export function BalanceDetails() {
  const subtotal = 0;
  const isDiscountable = false;
  const isPercentageDiscount = false;
  const discountRate = 0;
  const totalDiscount = 0;

  const isTaxable = false;
  const taxRate = 0;
  const totalTax = 0;
  const total = 0;
  const balanceDue = 0;

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

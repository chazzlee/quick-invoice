import { formatCurrency } from "@/utils/formatCurrency";
import { useWatch } from "react-hook-form";
import type { InvoiceFormData } from "../../types";

export function BalanceDetails() {
  const subtotal = useWatch<InvoiceFormData, "subtotal">({
    name: "subtotal",
    defaultValue: 0,
  });

  const discount = useWatch<InvoiceFormData, "discount">({
    name: "discount",
    defaultValue: { type: "no_discount", value: 0 },
  });

  const totalDiscount = useWatch<InvoiceFormData, "totalDiscount">({
    name: "totalDiscount",
    defaultValue: 0,
  });

  const tax = useWatch<InvoiceFormData, "tax">({
    name: "tax",
    defaultValue: { type: "no_tax", rate: 0 },
  });

  const totalTax = useWatch<InvoiceFormData, "totalTax">({
    name: "totalTax",
    defaultValue: 0,
  });

  const total = useWatch<InvoiceFormData, "total">({
    name: "total",
    defaultValue: 0,
  });

  const balanceDue = useWatch<InvoiceFormData, "balanceDue">({
    name: "balanceDue",
    defaultValue: 0,
  });

  const isTaxable = tax.type !== "no_tax";

  const isDiscountable = discount.type !== "no_discount";
  const isPercentageDiscount = discount.type === "percent";

  return (
    <div className="grid grid-cols-2 gap-8 pt-4">
      <div className="col-start-2">
        <div className="flex justify-between w-1/2">
          <p>Subtotal</p>
          <p>{formatCurrency(subtotal)}</p>
        </div>
        {isDiscountable ? (
          <div className="flex justify-between w-1/2">
            <p>Discount {isPercentageDiscount && `(${discount.value}%)`}</p>
            <p>{formatCurrency(totalDiscount)}</p>
          </div>
        ) : null}
        {isTaxable ? (
          <div className="flex justify-between w-1/2">
            <p>Tax ({tax.rate}%)</p>
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

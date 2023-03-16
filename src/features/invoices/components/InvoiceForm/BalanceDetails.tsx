import { formatCurrency } from "@/utils/formatCurrency";
import { useEffect } from "react";
import { NumericFormat } from "react-number-format";
import { useDiscount } from "../../hooks/useDiscount";
import { useInvoiceFormContext } from "../../hooks/useInvoiceFormContext";
import { useInvoiceWatchOne } from "../../hooks/useInvoiceWatchOne";
import { useTax } from "../../hooks/useTax";
import { Currency } from "@/components/Inputs/Currency";
import Money from "dinero.js";
import { valueAsPercentage } from "@/utils/formats";
import { useShipping } from "../../hooks/useShipping";

export function BalanceDetails() {
  const { setValue } = useInvoiceFormContext();

  const subtotal = useInvoiceWatchOne("balance.subtotal");
  const totalDiscount = useInvoiceWatchOne("balance.totalDiscount");
  const totalTax = useInvoiceWatchOne("balance.totalTax");
  const total = useInvoiceWatchOne("balance.total");
  const balanceDue = useInvoiceWatchOne("balance.balanceDue");
  const totalShipping = useInvoiceWatchOne("balance.totalShipping");

  const { isShippable, isFreeShipping } = useShipping();
  const { taxRate, isTaxable } = useTax();
  const { isDiscountable, isPercentageDiscount, discountRate } = useDiscount();

  useEffect(() => {
    function updateTotal() {
      const total = Money({ amount: subtotal })
        .add(Money({ amount: Math.round(totalTax) }))
        .add(Money({ amount: Math.round(totalDiscount) }))
        .add(Money({ amount: Math.round(totalShipping) }));
      setValue("balance.total", total.getAmount());
    }

    updateTotal();
  }, [setValue, subtotal, totalDiscount, totalTax, totalShipping]);

  // useEffect(() => {
  //   setValue("balance.balanceDue", total);
  // }, [setValue, shipping.rate, subtotal, total, totalDiscount, totalTax]);

  // TODO: move out -- need to update blaance after select change etc

  return (
    <div className="grid grid-cols-2 gap-8 pt-4">
      <div className="col-start-2">
        <div className="flex justify-between w-1/2">
          <p>Subtotal</p>
          <Currency amount={subtotal} />
        </div>
        {isDiscountable ? (
          <div className="flex justify-between w-1/2">
            <p>
              <span>Discount </span>
              {isPercentageDiscount ? (
                <span>
                  (
                  <NumericFormat
                    displayType="text"
                    value={valueAsPercentage(discountRate)}
                    suffix={"%"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                  />
                  )
                </span>
              ) : null}
            </p>
            <Currency amount={totalDiscount} />
          </div>
        ) : null}

        {isTaxable ? (
          <div className="flex justify-between w-1/2">
            <p>
              <span>Tax </span>
              <span>
                (
                <NumericFormat
                  displayType="text"
                  value={valueAsPercentage(taxRate)}
                  suffix={"%"}
                  decimalScale={3}
                  fixedDecimalScale={true}
                />
                )
              </span>
            </p>
            <Currency amount={totalTax} />
          </div>
        ) : null}

        {isShippable ? (
          <div className="flex justify-between w-1/2">
            <p>Shipping</p>
            <p>
              {isFreeShipping ? "FREE" : <Currency amount={totalShipping} />}
            </p>
          </div>
        ) : null}

        <div className="flex justify-between w-1/2">
          <p>Total</p>
          <Currency amount={total} />
        </div>

        {/*  */}
        <div className="flex justify-between w-1/2">
          <p className="font-semibold">Balance Due</p>
          <p className="font-semibold">{formatCurrency(balanceDue)}</p>
        </div>
      </div>
    </div>
  );
}
